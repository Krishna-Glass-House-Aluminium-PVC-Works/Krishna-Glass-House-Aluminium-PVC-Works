/**
 * Index Injector — Parses and updates /blogs/index.html
 * 
 * Reads the current blog listing page, injects a new card at the top
 * of the posts grid, and returns the updated HTML string.
 * 
 * Uses simple string markers (<!-- POSTS_START --> / <!-- POSTS_END -->)
 * so we never need a DOM parser on the server.
 */

const BASE_URL = 'https://www.krishnaglasshouse.com';

// Markers that must exist in blogs/index.html
export const POSTS_START = '<!-- POSTS_START -->';
export const POSTS_END   = '<!-- POSTS_END -->';
export const SITEMAP_START = '<!-- SITEMAP_URLS_START -->';
export const SITEMAP_END   = '<!-- SITEMAP_URLS_END -->';

/**
 * Build a blog post card HTML snippet for the listing page.
 */
function buildCard(post) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return `
      <!-- POST:${post.slug} -->
      <article class="post-card">
        <a href="/blogs/${post.slug}" class="card-img-link" aria-label="${escAttr(post.title)}">
          <img src="${post.heroImage}" alt="${escAttr(post.title)}" loading="lazy" class="card-img">
          <span class="card-category">${escHtml(post.category)}</span>
        </a>
        <div class="card-body">
          <h2 class="card-title">
            <a href="/blogs/${post.slug}">${escHtml(post.title)}</a>
          </h2>
          <p class="card-excerpt">${escHtml(post.excerpt)}</p>
          <div class="card-meta">
            <time datetime="${post.publishedAt}">${date}</time>
            <a href="/blogs/${post.slug}" class="read-more">Read More →</a>
          </div>
        </div>
      </article>`;
}

/**
 * Inject a new post card into an existing blogs/index.html content.
 * Inserts at the top (most recent first) between the marker comments.
 * Returns the modified HTML string.
 */
export function injectCardIntoIndex(currentHtml, post) {
  if (!currentHtml.includes(POSTS_START) || !currentHtml.includes(POSTS_END)) {
    throw new Error(`blogs/index.html is missing required markers:\n  ${POSTS_START}\n  ${POSTS_END}`);
  }

  const card = buildCard(post);

  // Insert new card right after the POSTS_START marker
  return currentHtml.replace(
    POSTS_START,
    `${POSTS_START}${card}`
  );
}

/**
 * Build a complete fresh blogs/index.html (used for first-run setup).
 * Pass an array of posts (newest first).
 */
export function buildIndexHtml(posts = []) {
  const cards = posts.map(buildCard).join('\n');
  const schemaLD = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${BASE_URL}/blogs`,
        name: 'Krishna Glass House Blog',
        description: 'Expert insights on glass work, aluminium fabrication, PVC systems, and interior design for Delhi homes and businesses.',
        url: `${BASE_URL}/blogs`,
        publisher: { '@type': 'Organization', name: 'Krishna Glass House', url: BASE_URL },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#business`,
        name: 'Krishna Glass House',
        alternateName: 'Krishna Glass House Aluminium & PVC Works',
        url: BASE_URL,
        telephone: '+91-87001-62623',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 2, Mohan Nagar, Pankha Road, Opp. D-Block',
          addressLocality: 'Janakpuri',
          addressRegion: 'New Delhi',
          postalCode: '110046',
          addressCountry: 'IN',
        },
      },
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | Glass, Aluminium & PVC Insights — Krishna Glass House</title>
  <meta name="description" content="Expert tips, guides, and trends on glass work, aluminium windows, UPVC doors, and interior design for homes and businesses in Delhi NCR. By Krishna Glass House, Janakpuri.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/blogs">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Blog | Krishna Glass House — Glass, Aluminium & PVC Insights">
  <meta property="og:description" content="Expert tips on glass work, aluminium fabrication, and UPVC systems for Delhi homes.">
  <meta property="og:url" content="${BASE_URL}/blogs">
  <meta property="og:image" content="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85">
  <meta property="og:site_name" content="Krishna Glass House">

  <!-- Geo -->
  <meta name="geo.region" content="IN-DL">
  <meta name="geo.placename" content="Janakpuri, New Delhi">

  <!-- Schema -->
  <script type="application/ld+json">${schemaLD}</script>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #1A6FBB;
      --primary-dark: #14549A;
      --accent: #F5A623;
      --text: #1a1a2e;
      --text-secondary: #5a6072;
      --border: #e8eaf0;
      --bg: #f8f9fc;
      --white: #ffffff;
      --card-shadow: 0 4px 24px rgba(0,0,0,.08);
      --radius: 14px;
    }

    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); }

    /* Nav */
    .site-nav { background: var(--white); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
    .nav-inner { max-width: 1140px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); }
    .nav-logo-mark { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, var(--primary), #2196F3); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 16px; }
    .nav-brand { font-weight: 700; font-size: 15px; }
    .nav-sub { font-size: 11px; color: var(--text-secondary); }
    .nav-links { display: flex; gap: 24px; list-style: none; }
    .nav-links a { text-decoration: none; font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: color .2s; }
    .nav-links a:hover, .nav-links .active { color: var(--primary); }
    .nav-cta { display: flex; align-items: center; gap: 8px; background: var(--primary); color: #fff; text-decoration: none; padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; transition: background .2s; }
    .nav-cta:hover { background: var(--primary-dark); }

    /* Hero */
    .blog-hero { background: linear-gradient(135deg, #0d1b2a 0%, #1A6FBB 100%); color: #fff; text-align: center; padding: 72px 20px 80px; }
    .hero-tag { display: inline-block; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25); padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: .8px; text-transform: uppercase; margin-bottom: 20px; }
    .hero-h1 { font-size: clamp(28px, 6vw, 48px); font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
    .hero-sub { font-size: 16px; color: rgba(255,255,255,.75); max-width: 520px; margin: 0 auto 32px; line-height: 1.6; }
    .hero-search { display: flex; max-width: 440px; margin: 0 auto; }
    .hero-search input { flex: 1; padding: 13px 18px; border-radius: 10px 0 0 10px; border: none; font-size: 14px; outline: none; font-family: 'Inter', sans-serif; }
    .hero-search button { padding: 13px 20px; background: var(--accent); color: #fff; border: none; border-radius: 0 10px 10px 0; cursor: pointer; font-weight: 600; font-size: 14px; transition: background .2s; }
    .hero-search button:hover { background: #e09520; }

    /* Filter bar */
    .filter-bar { background: var(--white); border-bottom: 1px solid var(--border); }
    .filter-inner { max-width: 1140px; margin: 0 auto; padding: 12px 20px; display: flex; gap: 8px; overflow-x: auto; }
    .filter-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid var(--border); background: var(--white); font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all .2s; color: var(--text-secondary); }
    .filter-btn:hover, .filter-btn.active { background: var(--primary); border-color: var(--primary); color: #fff; }

    /* Posts grid */
    .posts-section { max-width: 1140px; margin: 0 auto 80px; padding: 48px 20px 0; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
    .section-title { font-size: 20px; font-weight: 700; }
    .post-count { font-size: 13px; color: var(--text-secondary); }

    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; }

    /* Card */
    .post-card { background: var(--white); border-radius: var(--radius); overflow: hidden; box-shadow: var(--card-shadow); transition: transform .25s, box-shadow .25s; }
    .post-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.14); }
    .card-img-link { display: block; position: relative; overflow: hidden; height: 200px; }
    .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
    .post-card:hover .card-img { transform: scale(1.04); }
    .card-category { position: absolute; top: 12px; left: 12px; background: rgba(26,111,187,.9); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; }
    .card-body { padding: 22px 22px 20px; }
    .card-title { font-size: 17px; font-weight: 700; line-height: 1.35; margin-bottom: 10px; }
    .card-title a { text-decoration: none; color: var(--text); transition: color .2s; }
    .card-title a:hover { color: var(--primary); }
    .card-excerpt { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card-meta { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); border-top: 1px solid var(--border); padding-top: 14px; }
    .read-more { color: var(--primary); font-weight: 600; text-decoration: none; }
    .read-more:hover { text-decoration: underline; }

    /* Empty state */
    .empty-state { text-align: center; padding: 80px 20px; color: var(--text-secondary); grid-column: 1/-1; }
    .empty-state h2 { font-size: 20px; margin-bottom: 8px; }
    .empty-state p  { font-size: 14px; }

    /* Bottom CTA */
    .bottom-cta { background: linear-gradient(135deg, #0d1b2a, #1A6FBB); color: #fff; text-align: center; padding: 64px 20px; }
    .bottom-cta h2 { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
    .bottom-cta p  { opacity: .8; margin-bottom: 28px; font-size: 15px; }
    .cta-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .cta-btn-wa { background: #25D366; color: #fff; padding: 13px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px; transition: opacity .2s; }
    .cta-btn-wa:hover { opacity: .88; }
    .cta-btn-ph { background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3); color: #fff; padding: 13px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; transition: background .2s; }
    .cta-btn-ph:hover { background: rgba(255,255,255,.25); }

    /* Footer */
    footer { background: #0d1b2a; color: #a0aabb; padding: 56px 20px 24px; }
    .footer-grid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-brand-name { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .footer-brand-sub  { font-size: 12px; color: #7a8799; margin-bottom: 14px; }
    .footer-desc { font-size: 13px; line-height: 1.75; color: #8a9ab0; }
    .footer-heading { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #fff; margin-bottom: 14px; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 8px; }
    .footer-links a { font-size: 13px; color: #8a9ab0; text-decoration: none; transition: color .2s; }
    .footer-links a:hover { color: #fff; }
    .footer-addr { font-size: 13px; line-height: 1.8; color: #8a9ab0; }
    .footer-addr a { color: #64b5f6; text-decoration: none; }
    .footer-addr a:hover { text-decoration: underline; }
    .footer-bottom { max-width: 1140px; margin: 0 auto; border-top: 1px solid #1e2d3d; padding-top: 20px; font-size: 12px; color: #5a6a7a; text-align: center; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .posts-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    }
  </style>
</head>
<body>

<!-- Navigation -->
<nav class="site-nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <div class="nav-logo-mark">K</div>
      <div>
        <div class="nav-brand">Krishna Glass House</div>
        <div class="nav-sub">Aluminium &amp; PVC Works</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/catalog.html">Products</a></li>
      <li><a href="/blogs" class="active">Blog</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <a href="https://wa.me/918700162623" class="nav-cta" target="_blank" rel="noopener noreferrer">
      💬 WhatsApp Us
    </a>
  </div>
</nav>

<!-- Hero -->
<section class="blog-hero">
  <div class="hero-tag">Knowledge Hub</div>
  <h1 class="hero-h1">Glass, Aluminium &amp; PVC<br>Expert Insights</h1>
  <p class="hero-sub">Guides, trends, and expert advice on the latest in glass works, aluminium fabrication, and UPVC systems for Delhi homes and businesses.</p>
  <div class="hero-search" role="search">
    <input type="text" id="searchInput" placeholder="Search articles..." aria-label="Search articles">
    <button onclick="handleSearch()" aria-label="Search">Search</button>
  </div>
</section>

<!-- Filter Bar -->
<div class="filter-bar" role="navigation" aria-label="Filter by category">
  <div class="filter-inner">
    <button class="filter-btn active" onclick="filterPosts('all', this)" data-filter="all">All Posts</button>
    <button class="filter-btn" onclick="filterPosts('glass', this)" data-filter="glass">Glass Work</button>
    <button class="filter-btn" onclick="filterPosts('aluminium', this)" data-filter="aluminium">Aluminium</button>
    <button class="filter-btn" onclick="filterPosts('pvc', this)" data-filter="pvc">PVC / UPVC</button>
    <button class="filter-btn" onclick="filterPosts('mirror', this)" data-filter="mirror">LED Mirrors</button>
    <button class="filter-btn" onclick="filterPosts('interior', this)" data-filter="interior">Interior Trends</button>
  </div>
</div>

<!-- Posts Grid -->
<section class="posts-section">
  <div class="section-header">
    <h2 class="section-title">Latest Articles</h2>
    <span class="post-count" id="postCount"></span>
  </div>
  <div class="posts-grid" id="postsGrid">
${POSTS_START}
${posts.length === 0 ? `
      <div class="empty-state">
        <h2>No posts yet</h2>
        <p>Check back soon — we publish new articles weekly.</p>
      </div>` : cards}
${POSTS_END}
  </div>
</section>

<!-- Bottom CTA -->
<section class="bottom-cta">
  <h2>Have a Project in Mind?</h2>
  <p>Get a free consultation from our experts at Krishna Glass House, Janakpuri, West Delhi.</p>
  <div class="cta-group">
    <a href="https://wa.me/918700162623?text=Hi%20KGH%2C%20I%20need%20a%20quote." class="cta-btn-wa" target="_blank" rel="noopener noreferrer">💬 WhatsApp for Free Quote</a>
    <a href="tel:+918700162623" class="cta-btn-ph">📞 +91 87001 62623</a>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-brand-name">Krishna Glass House</div>
      <div class="footer-brand-sub">Aluminium &amp; PVC Works — Est. 2008</div>
      <p class="footer-desc">Premium glass, aluminium, and PVC works for homes &amp; offices across Delhi NCR. Serving Janakpuri, Dwarka, Uttam Nagar, and West Delhi since 2008.</p>
    </div>
    <div>
      <div class="footer-heading">Quick Links</div>
      <ul class="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/catalog.html">Products &amp; Services</a></li>
        <li><a href="/blogs">Blog</a></li>
        <li><a href="/#contact">Contact Us</a></li>
        <li><a href="/blogs/sitemap.xml">Blog Sitemap</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-heading">Visit Our Store</div>
      <div class="footer-addr">
        Shop No. 2, Mohan Nagar<br>
        Pankha Road, Opp. D-Block<br>
        Janakpuri, New Delhi – 110046<br><br>
        <a href="tel:+918700162623">📞 +91 87001 62623</a><br>
        <a href="https://wa.me/918700162623" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a><br>
        <a href="https://maps.google.com/?q=Krishna+Glass+House+Janakpuri+Delhi" target="_blank" rel="noopener noreferrer">🗺️ Google Maps</a><br><br>
        Mon – Sat: 10:00 AM – 7:00 PM
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; ${new Date().getFullYear()} Krishna Glass House — All rights reserved.
    &nbsp;|&nbsp; <a href="/sitemap.xml" style="color:#5a6a7a;text-decoration:none">Sitemap</a>
    &nbsp;|&nbsp; <a href="/blogs/sitemap.xml" style="color:#5a6a7a;text-decoration:none">Blog Sitemap</a>
  </div>
</footer>

<script>
  // Live filter
  function filterPosts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('.post-card');
    let visible = 0;
    cards.forEach(card => {
      const cat = card.querySelector('.card-category')?.textContent?.toLowerCase() || '';
      const show = category === 'all' || cat.includes(category);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.getElementById('postCount').textContent = visible + ' article' + (visible !== 1 ? 's' : '');
  }

  // Search
  function handleSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) return;
    const cards = document.querySelectorAll('.post-card');
    let visible = 0;
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const show = text.includes(q);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.getElementById('postCount').textContent = visible + ' result' + (visible !== 1 ? 's' : '') + ' for "' + q + '"';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  }

  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });

  // Init count
  const allCards = document.querySelectorAll('.post-card');
  const cnt = allCards.length;
  if (cnt > 0) document.getElementById('postCount').textContent = cnt + ' article' + (cnt !== 1 ? 's' : '');
</script>

</body>
</html>`;
}

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
