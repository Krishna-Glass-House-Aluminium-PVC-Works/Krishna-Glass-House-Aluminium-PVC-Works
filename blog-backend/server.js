/**
 * Krishna Glass House — Blog Backend Server (GitOps Edition)
 * 
 * Pure static file architecture:
 *   1. Vertex AI Gemini generates blog content (JSON)
 *   2. Rendered as standalone HTML → blogs/<slug>.html
 *   3. blogs/index.html updated with new post card
 *   4. blogs/sitemap.xml updated with new URL
 *   5. All 3 files committed atomically to GitHub via REST API
 *   6. Cloudflare Pages auto-deploys on push
 * 
 * NO DATABASE. NO FIRESTORE. PURE GITOPS.
 */

import express from 'express';
import { generateBlogPost }          from './services/ai-generator.js';
import { renderBlogPostHtml }        from './services/post-template.js';
import { getFile, commitMultiple }   from './services/github.js';
import { injectCardIntoIndex, buildIndexHtml, POSTS_START } from './services/index-injector.js';
import { injectUrlIntoSitemap, buildSitemapXml, SITEMAP_ENTRY_MARKER } from './services/sitemap-updater.js';

const app  = express();
const PORT = parseInt(process.env.PORT) || 8080;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('❌ FATAL: ADMIN_TOKEN env var is not set. Refusing to start.');
  process.exit(1);
}

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const t = Date.now();
  res.on('finish', () => console.log(`${req.method} ${req.path} ${res.statusCode} (${Date.now()-t}ms)`));
  next();
});

// ── Auth middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
}

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'kgh-blog-gitops',
    timestamp: new Date().toISOString(),
  });
});

// ── Setup: Initialize blogs/index.html and blogs/sitemap.xml ─────────────────
// Call once to bootstrap the static files in the repo.
app.post('/api/setup', requireAuth, async (req, res) => {
  try {
    console.log('🔧 Running setup — creating blogs/index.html and blogs/sitemap.xml...');

    const filesToCommit = [];

    // Check if index.html already exists
    const existingIndex = await getFile('blogs/index.html');
    if (!existingIndex) {
      console.log('  Creating blogs/index.html...');
      filesToCommit.push({ path: 'blogs/index.html', content: buildIndexHtml([]) });
    } else {
      console.log('  blogs/index.html already exists — skipping.');
    }

    // Check if sitemap.xml already exists
    const existingSitemap = await getFile('blogs/sitemap.xml');
    if (!existingSitemap) {
      console.log('  Creating blogs/sitemap.xml...');
      filesToCommit.push({ path: 'blogs/sitemap.xml', content: buildSitemapXml([]) });
    } else {
      console.log('  blogs/sitemap.xml already exists — skipping.');
    }

    if (filesToCommit.length === 0) {
      return res.json({ success: true, message: 'Setup already complete — all files exist.' });
    }

    const result = await commitMultiple(filesToCommit, '🚀 chore: initialize blog infrastructure');
    console.log('✅ Setup complete!');
    res.json({ success: true, committed: filesToCommit.map(f => f.path), commit: result.commitSha });
  } catch (err) {
    console.error('❌ Setup error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Generate daily blog post ──────────────────────────────────────────────────
app.post('/api/generate-daily', requireAuth, async (_req, res) => {
  const specificTopic = _req.body?.topic || null;

  try {
    console.log('🚀 Starting blog generation pipeline...');

    // Step 1: Generate content via Vertex AI
    console.log('  [1/4] Calling Vertex AI Gemini...');
    const post = await generateBlogPost(specificTopic);
    console.log(`  ✓ Generated: "${post.title}" (slug: ${post.slug})`);

    // Step 2: Render standalone post HTML
    console.log('  [2/4] Rendering standalone HTML...');
    const postHtml = renderBlogPostHtml(post);

    // Step 3: Read current index.html and sitemap.xml from GitHub
    console.log('  [3/4] Reading current files from GitHub...');
    const [indexFile, sitemapFile] = await Promise.all([
      getFile('blogs/index.html'),
      getFile('blogs/sitemap.xml'),
    ]);

    if (!indexFile) {
      return res.status(400).json({
        success: false,
        error: 'blogs/index.html not found in GitHub. Run POST /api/setup first.',
      });
    }
    if (!sitemapFile) {
      return res.status(400).json({
        success: false,
        error: 'blogs/sitemap.xml not found in GitHub. Run POST /api/setup first.',
      });
    }

    // Step 4: Inject new card and sitemap entry
    const updatedIndex   = injectCardIntoIndex(indexFile.content, post);
    const updatedSitemap = injectUrlIntoSitemap(sitemapFile.content, post);

    // Step 5: Commit all 3 files atomically to GitHub
    console.log('  [4/4] Committing 3 files to GitHub...');
    const dateStr = new Date().toLocaleDateString('en-IN');
    const result = await commitMultiple(
      [
        { path: `blogs/${post.slug}.html`, content: postHtml },
        { path: 'blogs/index.html',        content: updatedIndex },
        { path: 'blogs/sitemap.xml',       content: updatedSitemap },
      ],
      `📝 blog: "${post.title}" [${dateStr}]`
    );

    console.log(`✅ Pipeline complete! Commit: ${result.commitSha}`);
    console.log(`   Cloudflare Pages will deploy in ~60 seconds.`);
    console.log(`   URL: https://www.krishnaglasshouse.com/blogs/${post.slug}.html`);

    res.json({
      success: true,
      post: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        url: `/blogs/${post.slug}.html`,
        heroImage: post.heroImage,
      },
      github: { commitSha: result.commitSha },
      message: 'Cloudflare Pages will auto-deploy in ~60 seconds.',
    });

  } catch (err) {
    console.error('❌ Generation pipeline failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Simple admin dashboard ────────────────────────────────────────────────────
app.get('/admin', (req, res) => {
  const token = req.query.token;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).send(loginPage());
  }
  res.send(dashboardPage(token));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  KGH Blog Engine — GitOps Edition             ║
║  Port: ${PORT}                                   ║
║                                               ║
║  POST /api/setup           Bootstrap repo     ║
║  POST /api/generate-daily  Generate post      ║
║  GET  /admin               Admin panel        ║
║  GET  /health              Health check       ║
╚═══════════════════════════════════════════════╝`);
});

// ── Inline Admin UI ───────────────────────────────────────────────────────────
function loginPage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>KGH Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;background:#f8f9fc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:16px;padding:40px;width:100%;max-width:380px;box-shadow:0 4px 24px rgba(0,0,0,.08);text-align:center}
.logo{width:48px;height:48px;background:linear-gradient(135deg,#1A6FBB,#2196F3);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:20px;margin:0 auto 16px}
h1{font-size:20px;margin-bottom:4px}p{font-size:13px;color:#888;margin-bottom:24px}
input{width:100%;padding:12px 16px;border:1px solid #e0e0e0;border-radius:10px;font-size:14px;outline:none;font-family:Inter,sans-serif;margin-bottom:14px}
input:focus{border-color:#1A6FBB;box-shadow:0 0 0 3px rgba(26,111,187,.1)}
button{width:100%;padding:12px;background:#1A6FBB;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif}
button:hover{background:#14549A}</style></head>
<body><div class="card">
<div class="logo">K</div>
<h1>KGH Blog Admin</h1>
<p>Enter your admin token to continue</p>
<form onsubmit="event.preventDefault();const t=document.getElementById('t').value;if(t)window.location='/admin?token='+encodeURIComponent(t)">
<input type="password" id="t" placeholder="Admin token" required autofocus>
<button type="submit">Access Dashboard</button>
</form>
</div></body></html>`;
}

function dashboardPage(token) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>KGH Blog Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;background:#f8f9fc;color:#1a1a2e}
nav{background:#fff;border-bottom:1px solid #e8eaf0;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:700;font-size:15px;color:#1A6FBB}
.main{max-width:680px;margin:40px auto;padding:0 20px}
.card{background:#fff;border-radius:14px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,.07);margin-bottom:24px}
h1{font-size:22px;font-weight:800;margin-bottom:4px}
.sub{font-size:14px;color:#888;margin-bottom:24px}
h2{font-size:16px;font-weight:700;margin-bottom:12px}
label{display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:6px}
input[type=text]{width:100%;padding:11px 14px;border:1px solid #ddd;border-radius:9px;font-size:14px;font-family:Inter,sans-serif;outline:none;margin-bottom:14px}
input:focus{border-color:#1A6FBB}
.btn-row{display:flex;gap:10px}
button{padding:11px 22px;border:none;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all .2s}
.btn-gen{background:#1A6FBB;color:#fff}.btn-gen:hover{background:#14549A}
.btn-setup{background:#f0f4ff;color:#1A6FBB;border:1px solid #c8d8f5}.btn-setup:hover{background:#dde8fa}
.status{margin-top:16px;padding:14px 18px;border-radius:10px;font-size:14px;display:none}
.status.loading{background:#e8f0fd;color:#1A6FBB;display:block}
.status.success{background:#e8f8ee;color:#2e7d32;display:block}
.status.error  {background:#fdecea;color:#c62828;display:block}
.info{background:#e8f0fd;border-radius:10px;padding:14px 18px;font-size:13px;color:#444;line-height:1.7}
.info code{background:#dde8fa;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:12px}
a.back{text-decoration:none;font-size:13px;color:#888}a.back:hover{color:#1A6FBB}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{display:inline-block;animation:spin 1s linear infinite;margin-right:6px}
</style></head>
<body>
<nav>
  <span class="logo">🏠 KGH Blog Admin</span>
  <a href="https://www.krishnaglasshouse.com/blogs" target="_blank" class="back">View Blog →</a>
</nav>
<div class="main">
  <div class="card">
    <h1>Blog Generator</h1>
    <p class="sub">Generates a new SEO-optimized article via Vertex AI and pushes it to GitHub. Cloudflare Pages auto-deploys in ~60 seconds.</p>

    <h2>Generate New Post</h2>
    <label>Topic (optional — leave blank for auto-rotation)</label>
    <input type="text" id="topicInput" placeholder="e.g. Frameless glass railings for balconies in Delhi">

    <div class="btn-row">
      <button class="btn-gen" onclick="generate()" id="genBtn">🚀 Generate Blog Post</button>
      <button class="btn-setup" onclick="runSetup()" id="setupBtn">🔧 Run Setup (first time only)</button>
    </div>

    <div class="status" id="status"></div>
  </div>

  <div class="card">
    <h2>How It Works</h2>
    <div class="info">
      1. Click <strong>Generate Blog Post</strong> → Vertex AI writes the article<br>
      2. Script renders <code>blogs/&lt;slug&gt;.html</code>, updates <code>blogs/index.html</code> + <code>blogs/sitemap.xml</code><br>
      3. All 3 files committed to GitHub in <strong>one atomic commit</strong><br>
      4. Cloudflare Pages detects the push and deploys in <strong>~60 seconds</strong><br>
      5. Article live at <code>krishnaglasshouse.com/blogs/&lt;slug&gt;.html</code>
    </div>
  </div>
</div>

<script>
const TOKEN = '${token}';

async function generate() {
  const btn = document.getElementById('genBtn');
  const status = document.getElementById('status');
  const topic = document.getElementById('topicInput').value.trim();

  btn.disabled = true;
  btn.innerHTML = '<span class="spin">⟳</span> Generating... (30-60s)';
  status.className = 'status loading';
  status.textContent = '⏳ Contacting Vertex AI and GitHub...';

  try {
    const res = await fetch('/api/generate-daily', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+TOKEN},
      body: JSON.stringify(topic ? {topic} : {}),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      status.className = 'status success';
      status.innerHTML = \`✅ <strong>Post generated!</strong><br>
        Title: \${data.post.title}<br>
        Commit: <code>\${data.github.commitSha.slice(0,7)}</code><br>
        URL (live in ~60s): <a href="https://www.krishnaglasshouse.com\${data.post.url}" target="_blank">krishnaglasshouse.com\${data.post.url}</a>\`;
    } else {
      status.className = 'status error';
      status.textContent = '❌ Error: ' + (data.error || 'Unknown error');
    }
  } catch(e) {
    status.className = 'status error';
    status.textContent = '❌ Network error: ' + e.message;
  }
  btn.disabled = false;
  btn.innerHTML = '🚀 Generate Blog Post';
}

async function runSetup() {
  const btn = document.getElementById('setupBtn');
  const status = document.getElementById('status');
  btn.disabled = true;
  btn.textContent = '⟳ Running setup...';
  status.className = 'status loading';
  status.textContent = '⏳ Creating index.html and sitemap.xml in GitHub...';

  try {
    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+TOKEN},
    });
    const data = await res.json();
    if (res.ok && data.success) {
      status.className = 'status success';
      status.innerHTML = '✅ Setup complete! ' + (data.message || '');
    } else {
      status.className = 'status error';
      status.textContent = '❌ ' + (data.error || 'Setup failed');
    }
  } catch(e) {
    status.className = 'status error';
    status.textContent = '❌ ' + e.message;
  }
  btn.disabled = false;
  btn.innerHTML = '🔧 Run Setup (first time only)';
}
</script>
</body></html>`;
}
