import fs from 'fs-extra';
import path from 'path';
import { minify } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, './');
const distDir = path.resolve(__dirname, './dist');

const IGNORE_FILES = [
  'node_modules',
  'dist',
  '.git',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'build.js',
  'README.md',
  'wrangler.toml',
  '.wrangler'
];

async function compressImage(filePath, destPath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);

  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    // Convert all supported images to WebP
    const webpPath = destPath.replace(/\.[^/.]+$/, ".webp");
    console.log(`- Converting to WebP: ${fileName}`);
    await sharp(filePath)
      .webp({ quality: 85 }) // slightly higher quality for WebP
      .toFile(webpPath);
    return true; // Extension changed
  }
  
  // For SVG or other images, just copy
  await fs.copy(filePath, destPath);
  return false;
}

async function build() {
  console.log('🚀 Starting build process...');

  // 1. Clean and Create dist
  if (fs.existsSync(distDir)) {
    await fs.emptyDir(distDir);
  } else {
    await fs.mkdirSync(distDir);
  }

  // 2. Copy files to dist (excluding ignored)
  console.log('📦 Copying files...');
  const files = await fs.readdir(srcDir);
  for (const file of files) {
    if (!IGNORE_FILES.includes(file)) {
      await fs.copy(path.join(srcDir, file), path.join(distDir, file));
    }
  }

  // 3. Process Images (Recursive)
  console.log('🖼️  Optimizing images...');
  const imageReplacements = new Set();
  const allDistFiles = await fs.readdir(distDir, { recursive: true });

  for (const file of allDistFiles) {
    const filePath = path.join(distDir, file);
    const stat = await fs.lstat(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const didChange = await compressImage(filePath, filePath);
      if (didChange) {
        imageReplacements.add(path.basename(file));
        await fs.remove(filePath); // Remove original only if changed to webp
      }
    }
  }

  // 4. Minify & Replace Extensions in HTML/CSS
  console.log('✨ Minifying files and updating references...');
  const distFiles = await fs.readdir(distDir, { recursive: true });
  const cleanCSS = new CleanCSS();

  for (const file of distFiles) {
    const filePath = path.join(distDir, file);
    const stat = await fs.lstat(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    
    // Read content for transformation (only for text files)
    if (['.html', '.css', '.js', '.json'].includes(ext)) {
      let content = await fs.readFile(filePath, 'utf8');

      // Replace image names in HTML, CSS, and JS
      imageReplacements.forEach(originalName => {
        const webpName = originalName.replace(/\.[^/.]+$/, ".webp");
        // Regex to match the original filename in quotes, src attributes, or style URLs
        // We look for the filename followed by a boundary or a character that isn't part of a filename
        const escaped = originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'g');
        content = content.replace(regex, webpName);
      });

      // Minification
      try {
        if (ext === '.html') {
          content = await minify(content, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
          });
        } 
        else if (ext === '.css') {
          content = cleanCSS.minify(content).styles || content;
        } 
        else if (ext === '.js' && !file.includes('.min.js')) {
          const minified = await minifyJS(content);
          content = minified.code || content;
        }
      } catch (err) {
        console.warn(`⚠️  Failed to minify ${file}:`, err.message);
      }

      await fs.writeFile(filePath, content);
    }
  }

  // Copy Cloudflare config files to dist for deployment
  const cfFiles = ['_headers', '_redirects'];
  for (const cf of cfFiles) {
    const cfPath = path.join(srcDir, cf);
    if (fs.existsSync(cfPath)) {
      await fs.copy(cfPath, path.join(distDir, cf));
    }
  }

  console.log('✅ Build complete! Files are ready in the /dist folder.');
  console.log('💡 Tip: Deploy with "npm run deploy"');
}

build().catch(console.error);
