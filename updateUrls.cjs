import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const IGNORE_DIRS = ['node_modules', 'dist', '.git', '.wrangler', 'functions'];

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (IGNORE_DIRS.includes(file)) continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.html', '.js', '.txt', '.xml', '.json'].includes(ext) || file === '_redirects' || file === '_headers' || file === 'README.md') {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const allFiles = scanDirectory(ROOT_DIR);
console.log(`Found ${allFiles.length} files to scan for URL updates.`);

let updatedCount = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace explyra URLs
  content = content.replace(/krishnaglass\.explyra\.me/g, 'www.krishnaglasshouse.com');
  
  // For HTML files, do SEO injections
  if (filePath.endsWith('.html')) {
    // Determine the path for canonical URL
    let relativeRoute = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    if (relativeRoute === 'index.html') relativeRoute = '';
    
    const canonicalHtml = `<link rel="canonical" href="https://www.krishnaglasshouse.com/${relativeRoute}">`;
    
    // Inject canonical if not present
    if (!content.includes('rel="canonical"')) {
      content = content.replace('</head>', `  ${canonicalHtml}\n</head>`);
    } else {
      // update existing canonical
      content = content.replace(/<link rel="canonical" href="[^"]+">/, canonicalHtml);
    }
    
    // Add additional SEO tags if missing
    if (!content.includes('<meta property="og:type"')) {
      const extraTags = `
  <meta property="og:site_name" content="Krishna Glass House">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Krishna Glass House">
`;
      // Inject right before </head> if not present
      content = content.replace('</head>', `${extraTags}</head>`);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${path.relative(ROOT_DIR, filePath)}`);
  }
}

console.log(`URL replacement and SEO updates completed. ${updatedCount} files changed.`);
