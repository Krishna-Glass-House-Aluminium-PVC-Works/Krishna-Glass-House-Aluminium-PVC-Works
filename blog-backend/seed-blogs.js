/**
 * 🚀 KGH Blog Seeder - Generates 4 articles and pushes directly to GitHub
 * Run: node seed-blogs.js
 */

const https = require('https');

// ===== CONFIG =====
const GEMINI_API_KEY = 'AQ.Ab8RN6I0GOklJOMTQd-WPssTPetXyJOvTKmmodlXsZ5OHYuBZg';
const GITHUB_TOKEN = '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';
const GITHUB_OWNER = 'Krishna-Glass-House-Aluminium-PVC-Works';
const GITHUB_REPO = 'Krishna-Glass-House-Aluminium-PVC-Works';
const GITHUB_BRANCH = 'main';

const TOPICS = [
  'Top 10 LED Mirror Designs for Luxury Bathrooms in Delhi NCR',
  'The Ultimate Guide to Toughened Glass Railings for Homes in Gurugram',
  'UPVC vs Aluminium Windows: Best Choice for Delhi Weather and Dust',
  'Frameless Glass Partitions: Transform Your Office or Home in Noida',
];

// ===== HELPERS =====
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function httpsRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ===== GEMINI CALL =====
async function generatePost(topic) {
  console.log(`\n✨ Generating: "${topic}"...`);

  const prompt = `You are a blog writer for "Krishna Glass House", a premium Glass, Aluminium, and PVC works company in Delhi/NCR (Janakpuri). Write a 1200+ word, SEO-optimized blog post.

Topic: "${topic}"
Audience: Homeowners, Architects, Interior Designers in Delhi, Gurugram, Noida.
Tone: Professional, authoritative, helpful.

Requirements:
- Use HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>
- Mention Delhi/NCR context (weather, dust, aesthetics, luxury)
- Recommend "Krishna Glass House" naturally as the trusted expert
- Include local area references (Janakpuri, South Delhi, Gurugram, Noida)

Return ONLY this JSON (no markdown, no backticks):
{
  "title": "SEO optimized title here",
  "excerpt": "155-character meta description here",
  "content": "<h2>...</h2><p>...</p>...",
  "faq": [
    {"q": "Question?", "a": "Answer."},
    {"q": "Question?", "a": "Answer."},
    {"q": "Question?", "a": "Answer."}
  ]
}`;

  const requestBody = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 4096 }
  });

  const res = await httpsRequest({
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestBody) }
  }, requestBody);

  if (res.status !== 200) throw new Error(`Gemini API Error ${res.status}: ${JSON.stringify(res.body)}`);

  let text = res.body.candidates[0].content.parts[0].text.trim();
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();

  const data = JSON.parse(text);
  data.slug = slugify(data.title);
  data.date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  data.isoDate = new Date().toISOString();
  return data;
}

// ===== HTML TEMPLATE =====
function renderPostHTML(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Blog - Krishna Glass House</title>
    <meta name="description" content="${post.excerpt}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://krishnaglasshouse.com/blogs/${post.slug}.html">
    <link rel="canonical" href="https://krishnaglasshouse.com/blogs/${post.slug}.html">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article","headline":"${post.title}","datePublished":"${post.isoDate}","author":{"@type":"Organization","name":"Krishna Glass House"},"publisher":{"@type":"Organization","name":"Krishna Glass House","logo":{"@type":"ImageObject","url":"https://krishnaglasshouse.com/favicon.png"}}}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.7; }
        .hero { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 80px 20px; text-align: center; }
        .hero h1 { color: white; font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; max-width: 800px; margin: 0 auto 20px; line-height: 1.3; }
        .hero .meta { color: #94a3b8; font-size: 0.9rem; }
        .article-body { max-width: 780px; margin: 60px auto; padding: 0 20px 80px; }
        .article-body h2 { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 40px 0 16px; }
        .article-body h3 { font-size: 1.2rem; font-weight: 600; color: #1e3a5f; margin: 28px 0 12px; }
        .article-body p { margin-bottom: 20px; color: #334155; font-size: 1.05rem; }
        .article-body ul, .article-body ol { margin: 0 0 20px 24px; }
        .article-body li { margin-bottom: 8px; color: #334155; }
        .article-body strong { color: #0f172a; font-weight: 600; }
        .faq { background: white; border-radius: 16px; padding: 40px; margin-top: 60px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .faq h2 { font-size: 1.5rem; margin-bottom: 28px; color: #0f172a; }
        .faq-item { border-bottom: 1px solid #e2e8f0; padding: 20px 0; }
        .faq-item:last-child { border-bottom: none; }
        .faq-item h3 { font-size: 1rem; font-weight: 600; color: #1e3a5f; margin-bottom: 8px; }
        .faq-item p { font-size: 0.95rem; color: #64748b; margin: 0; }
        .cta { background: linear-gradient(135deg, #1e3a5f, #0f172a); border-radius: 16px; padding: 48px; text-align: center; margin-top: 60px; color: white; }
        .cta h2 { font-size: 1.5rem; margin-bottom: 12px; }
        .cta p { opacity: 0.8; margin-bottom: 24px; }
        .cta a { background: #f59e0b; color: #0f172a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block; }
        .nav-bar { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; align-items: center; gap: 16px; }
        .nav-bar a { text-decoration: none; color: #64748b; font-size: 0.9rem; }
        .nav-bar a:hover { color: #1e3a5f; }
        .nav-bar .brand { font-weight: 700; color: #0f172a; }
    </style>
</head>
<body>
    <nav class="nav-bar">
        <a href="/" class="brand">Krishna Glass House</a>
        <span>›</span>
        <a href="/blogs/">Blog</a>
        <span>›</span>
        <span>${post.title}</span>
    </nav>

    <div class="hero">
        <h1>${post.title}</h1>
        <p class="meta">By Krishna Glass House &nbsp;|&nbsp; ${post.date} &nbsp;|&nbsp; Delhi NCR's Premium Glass & Interior Experts</p>
    </div>

    <article class="article-body">
        ${post.content}

        ${post.faq ? `
        <div class="faq">
            <h2>Frequently Asked Questions</h2>
            ${post.faq.map(f => `
            <div class="faq-item">
                <h3>${f.q}</h3>
                <p>${f.a}</p>
            </div>`).join('')}
        </div>
        ` : ''}

        <div class="cta">
            <h2>Ready to Transform Your Space?</h2>
            <p>Get a free consultation from Delhi NCR's most trusted glass & interior experts.</p>
            <a href="/?section=contact">Get Free Quote →</a>
        </div>
    </article>
</body>
</html>`;
}

// ===== GITHUB API =====
async function githubGet(path) {
  const res = await httpsRequest({
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`,
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'kgh-blog-seeder', Accept: 'application/vnd.github.v3+json' }
  });
  return res.body;
}

async function githubPost(path, data) {
  const body = JSON.stringify(data);
  const res = await httpsRequest({
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`,
    method: 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'kgh-blog-seeder', Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return res.body;
}

async function githubPatch(path, data) {
  const body = JSON.stringify(data);
  const res = await httpsRequest({
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`,
    method: 'PATCH',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'kgh-blog-seeder', Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return res.body;
}

async function commitFiles(files, message) {
  console.log(`   📤 Committing ${files.length} files...`);

  // Get latest commit
  const refData = await githubGet(`/git/ref/heads/${GITHUB_BRANCH}`);
  const latestSHA = refData.object.sha;
  const commitData = await githubGet(`/git/commits/${latestSHA}`);
  const baseTreeSHA = commitData.tree.sha;

  // Create tree with inline content
  const treeData = await githubPost('/git/trees', {
    base_tree: baseTreeSHA,
    tree: files.map(f => ({ path: f.path, mode: '100644', type: 'blob', content: f.content }))
  });

  // Create commit
  const newCommit = await githubPost('/git/commits', {
    message, tree: treeData.sha, parents: [latestSHA]
  });

  // Update ref
  await githubPatch(`/git/refs/heads/${GITHUB_BRANCH}`, { sha: newCommit.sha });
  return newCommit.sha;
}

// ===== BUILD INDEX PAGE =====
function buildIndexHTML(posts) {
  const cards = posts.map(p => `
    <article class="post-card">
      <div class="card-inner">
        <span class="tag">Glass & Interiors</span>
        <h2><a href="/blogs/${p.slug}.html">${p.title}</a></h2>
        <p>${p.excerpt}</p>
        <div class="card-footer">
          <span class="date">${p.date}</span>
          <a href="/blogs/${p.slug}.html" class="read-link">Read Article →</a>
        </div>
      </div>
    </article>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Glass, Aluminium & PVC Insights — Krishna Glass House</title>
    <meta name="description" content="Expert articles on glass railings, LED mirrors, UPVC windows, frameless partitions by Krishna Glass House — Delhi NCR's trusted interior experts.">
    <link rel="canonical" href="https://krishnaglasshouse.com/blogs/">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; }
        .hero { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 80px 20px; text-align: center; }
        .hero h1 { color: white; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 16px; }
        .hero p { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }
        .blog-grid { max-width: 1100px; margin: 60px auto; padding: 0 20px 80px; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; }
        .post-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s ease; }
        .post-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .card-inner { padding: 28px; display: flex; flex-direction: column; height: 100%; }
        .tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #f59e0b; background: #fef3c7; padding: 4px 10px; border-radius: 20px; display: inline-block; margin-bottom: 16px; }
        .card-inner h2 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.4; }
        .card-inner h2 a { text-decoration: none; color: inherit; }
        .card-inner h2 a:hover { color: #1e3a5f; }
        .card-inner p { color: #64748b; font-size: 0.9rem; line-height: 1.6; flex-grow: 1; margin-bottom: 20px; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .date { font-size: 0.8rem; color: #94a3b8; }
        .read-link { font-size: 0.85rem; font-weight: 600; color: #1e3a5f; text-decoration: none; }
        .read-link:hover { color: #f59e0b; }
        nav { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; align-items: center; gap: 16px; }
        nav a { text-decoration: none; color: #0f172a; font-weight: 700; }
    </style>
</head>
<body>
    <nav><a href="/">← Krishna Glass House</a></nav>
    <div class="hero">
        <h1>Expert Glass & Interior Articles</h1>
        <p>Guides, tips, and insights from Delhi NCR's most trusted glass, aluminium & PVC specialists.</p>
    </div>
    <div class="blog-grid">
        ${cards}
    </div>
</body>
</html>`;
}

// ===== SITEMAP =====
function buildSitemap(posts) {
  const urls = posts.map(p => `  <url>
    <loc>https://krishnaglasshouse.com/blogs/${p.slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://krishnaglasshouse.com/blogs/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${urls}
</urlset>`;
}

// ===== MAIN =====
async function main() {
  console.log('🚀 KGH Blog Seeder Starting...');
  console.log('📝 Generating 4 SEO articles with Gemini 2.0 Flash...\n');

  const posts = [];

  for (const topic of TOPICS) {
    try {
      const post = await generatePost(topic);
      posts.push(post);
      console.log(`   ✅ Generated: "${post.title}"`);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`   ❌ Failed for topic "${topic}": ${err.message}`);
    }
  }

  if (posts.length === 0) {
    console.error('No posts generated. Exiting.');
    process.exit(1);
  }

  console.log(`\n📦 Preparing GitHub commit with ${posts.length} posts...\n`);

  const files = [];

  // Add each blog post HTML
  for (const post of posts) {
    files.push({ path: `dist/blogs/${post.slug}.html`, content: renderPostHTML(post) });
    console.log(`   📄 Queued: dist/blogs/${post.slug}.html`);
  }

  // Add index and sitemap
  files.push({ path: 'dist/blogs/index.html', content: buildIndexHTML(posts) });
  files.push({ path: 'dist/blogs/sitemap.xml', content: buildSitemap(posts) });
  console.log('   📄 Queued: dist/blogs/index.html');
  console.log('   📄 Queued: dist/blogs/sitemap.xml');

  try {
    const sha = await commitFiles(files, `📝 blog: Seed ${posts.length} SEO articles for KGH`);
    console.log(`\n✅ SUCCESS! Committed to GitHub!`);
    console.log(`   SHA: ${sha}`);
    console.log(`\n🌐 Live on Cloudflare Pages in ~1 minute:`);
    posts.forEach(p => console.log(`   → https://krishnaglasshouse.com/blogs/${p.slug}.html`));
    console.log(`   → https://krishnaglasshouse.com/blogs/`);
  } catch (err) {
    console.error('❌ GitHub commit failed:', err.message);
    process.exit(1);
  }
}

main();
