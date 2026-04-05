const express = require('express');
const cors = require('cors');
const { generateBlogPost } = require('./services/ai-generator');
const { getFile, commitMultiple } = require('./services/github');
const { renderPostHtml } = require('./services/post-template');
const { injectPostCard } = require('./services/index-injector');
const { updateSitemap } = require('./services/sitemap-updater');

const app = express();
const PORT = process.env.PORT || 8080;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Middleware: Auth check
const authMiddleware = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

/**
 * 🎨 Admin Dashboard UI (Lightweight)
 */
app.get('/admin', authMiddleware, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KGH Blog Admin</title>
        <style>
            body { font-family: 'Inter', system-ui; padding: 2rem; background: #f9fafb; color: #111827; line-height: 1.5; }
            .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); max-width: 600px; margin: auto; }
            h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
            button { background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; transition: background 0.2s; }
            button:hover { background: #1d4ed8; }
            button:disabled { background: #94a3b8; cursor: not-allowed; }
            pre { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; white-space: pre-wrap; font-size: 0.875rem; margin-top: 1rem; }
            .status { margin-top: 1rem; font-weight: 500; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Krishna Glass House Blog Admin</h1>
            <div style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Custom Topic (Optional):</label>
                <input type="text" id="topic" placeholder="e.g. Benefits of Glass Railings in Delhi" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-bottom: 1rem;">
                <button id="genBtn" onclick="generate()">✨ Generate Blog Post</button>
            </div>
            <hr style="border: 0.5px solid #e5e7eb; margin: 2rem 0;">
            <div>
                <button onclick="setup()" style="background: #059669;">🚀 Run Initial Setup</button>
            </div>
            <div id="status" class="status"></div>
            <pre id="output" style="display:none"></pre>
        </div>

        <script>
            const token = new URLSearchParams(window.location.search).get('token');
            const log = (msg, data) => {
                const out = document.getElementById('output');
                out.style.display = 'block';
                out.textContent = msg + (data ? '\\n' + JSON.stringify(data, null, 2) : '');
            };

            async function generate() {
                const btn = document.getElementById('genBtn');
                const status = document.getElementById('status');
                const topic = document.getElementById('topic').value;
                
                btn.disabled = true;
                status.textContent = '⏳ Generating 1200+ words with Gemini 2.0 Flash...';
                
                try {
                    const res = await fetch('/api/generate-daily', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                        body: JSON.stringify({ topic })
                    });
                    const data = await res.json();
                    if (data.success) {
                        status.textContent = '✅ Success! Post live on GitHub.';
                        log('Post committed to GitHub!', data);
                    } else {
                        status.textContent = '❌ Error: ' + data.error;
                        log('Failed:', data);
                    }
                } catch (err) {
                    status.textContent = '❌ Network Error';
                    log(err.message);
                } finally {
                    btn.disabled = false;
                }
            }

            async function setup() {
                if (!confirm('Run initial setup? (dist/blogs/index.html & sitemap.xml)')) return;
                try {
                    const res = await fetch('/api/setup', {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                    const data = await res.json();
                    alert(data.message || data.error);
                } catch (err) { alert(err.message); }
            }
        </script>
    </body>
    </html>
  `);
});

/**
 * 📝 API: Generate Post (1200+ words AI)
 */
app.post('/api/generate-daily', authMiddleware, async (req, res) => {
  const { topic: userTopic } = req.body;
  
  try {
    console.log('🚀 Starting GitOps Pipeline for blog generation...');
    
    // Step 1: AI Generate (Gemini 2.0 Flash)
    const post = await generateBlogPost(userTopic);
    console.log(`  [1/4] Generated: "${post.title}"`);
    
    // Step 2: Render standalone HTML
    const postHtml = renderPostHtml(post);
    console.log('  [2/4] Rendered HTML');
    
    // Step 3: Fetch current files from GitHub (dist/ path)
    const [indexFile, sitemapFile] = await Promise.all([
      getFile('dist/blogs/index.html'),
      getFile('dist/blogs/sitemap.xml'),
    ]);
    
    if (!indexFile || !sitemapFile) {
      throw new Error('Initial files missing in GitHub. Run /api/setup first.');
    }
    
    // Step 4: Inject updates
    const updatedIndex = injectPostCard(indexFile.content, post);
    const updatedSitemap = updateSitemap(sitemapFile.content, post.slug);
    console.log('  [3/4] Injected updates');
    
    // Step 5: Atomic Commit to GitHub
    const dateStr = new Date().toLocaleDateString('en-IN');
    const result = await commitMultiple([
      { path: `dist/blogs/${post.slug}.html`, content: postHtml },
      { path: 'dist/blogs/index.html', content: updatedIndex },
      { path: 'dist/blogs/sitemap.xml', content: updatedSitemap },
    ], `📝 blog: "${post.title}" [${dateStr}]`);
    
    console.log(`  [4/4] Committed to GitHub! Tree: ${result.sha}`);
    
    res.json({
      success: true,
      title: post.title,
      slug: post.slug,
      url: `https://krishnaglasshouse.com/blogs/${post.slug}.html`,
      commit: result.sha
    });

  } catch (error) {
    console.error('❌ Pipeline Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🚀 API: Initial Setup (Bootstrap dist/blogs files)
 */
app.post('/api/setup', authMiddleware, async (req, res) => {
  try {
    // Check if index.html already exists
    const existing = await getFile('dist/blogs/index.html');
    if (existing) return res.json({ message: 'Setup already complete — all files exist.' });

    const initialIndex = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Blog - Krishna Glass House</title>
          <link rel="stylesheet" href="/index.css">
          <style>
              .blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; padding: 2rem; max-width: 1200px; margin: auto; }
              .post-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: 0.3s; }
              .post-card:hover { transform: translateY(-5px); }
              .card-content { padding: 1.5rem; }
          </style>
      </head>
      <body class="bg-light">
          <section class="py-20 text-center bg-dark text-white">
              <h1 class="text-5xl font-bold">Latest Articles</h1>
              <p class="mt-4 opacity-75">Expert insights from Delhi's leading glass & interior works</p>
          </section>
          <div class="blog-grid"><!-- POSTS_START --><!-- POSTS_END --></div>
      </body>
      </html>
    `;

    const initialSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- SITEMAP_START -->
<!-- SITEMAP_END -->
</urlset>`;

    await commitMultiple([
      { path: 'dist/blogs/index.html', content: initialIndex },
      { path: 'dist/blogs/sitemap.xml', content: initialSitemap }
    ], '🚀 init: blog structure in dist/');

    res.json({ success: true, message: '✅ Setup complete! Created index.html and sitemap.xml' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 KGH Backend listening on port ${PORT}`));
