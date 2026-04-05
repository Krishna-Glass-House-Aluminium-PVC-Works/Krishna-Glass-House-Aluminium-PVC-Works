/**
 * Blog Post Static HTML Generator
 * 
 * Takes parsed data from Gemini and renders a complete, standalone
 * HTML file for a blog post — ready to be committed to GitHub.
 */

const BASE_URL = 'https://www.krishnaglasshouse.com';

export function renderBlogPostHtml(post) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const schemaLD = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${BASE_URL}/blogs/${post.slug}`,
        headline: post.title,
        description: post.metaDescription,
        image: { '@type': 'ImageObject', url: post.heroImage, width: 1280, height: 720 },
        author: { '@type': 'Organization', name: 'Krishna Glass House', url: BASE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Krishna Glass House',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/${post.slug}` },
        articleSection: post.category,
        url: `${BASE_URL}/blogs/${post.slug}`,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#business`,
        name: 'Krishna Glass House',
        alternateName: 'Krishna Glass House Aluminium & PVC Works',
        description: 'Expert glass work, aluminium fabrication, and PVC works in Janakpuri, West Delhi.',
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
        geo: { '@type': 'GeoCoordinates', latitude: 28.6242, longitude: 77.0823 },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '19:00' },
        ],
        sameAs: ['https://www.instagram.com/krishnaglasshouse'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blogs/${post.slug}` },
        ],
      },
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(post.title)} | Krishna Glass House</title>
  <meta name="description" content="${escAttr(post.metaDescription)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/blogs/${post.slug}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escAttr(post.title)}">
  <meta property="og:description" content="${escAttr(post.metaDescription)}">
  <meta property="og:image" content="${post.heroImage}">
  <meta property="og:url" content="${BASE_URL}/blogs/${post.slug}">
  <meta property="og:site_name" content="Krishna Glass House">
  <meta property="article:published_time" content="${post.publishedAt}">
  <meta property="article:section" content="${post.category}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escAttr(post.title)}">
  <meta name="twitter:description" content="${escAttr(post.metaDescription)}">
  <meta name="twitter:image" content="${post.heroImage}">

  <!-- Geo Meta -->
  <meta name="geo.region" content="IN-DL">
  <meta name="geo.placename" content="Janakpuri, New Delhi">
  <meta name="geo.position" content="28.6242;77.0823">
  <meta name="ICBM" content="28.6242, 77.0823">

  <!-- Schema JSON-LD -->
  <script type="application/ld+json">${schemaLD}</script>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

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

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }

    /* ── Nav ─────────────────────────────────────────────── */
    .site-nav {
      background: var(--white);
      border-bottom: 1px solid var(--border);
      position: sticky; top: 0; z-index: 100;
    }
    .nav-inner {
      max-width: 1140px; margin: 0 auto; padding: 0 20px;
      display: flex; align-items: center; justify-content: space-between;
      height: 64px;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; color: var(--text);
    }
    .nav-logo-mark {
      width: 38px; height: 38px; border-radius: 10px;
      background: linear-gradient(135deg, var(--primary), #2196F3);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 800; font-size: 16px;
    }
    .nav-brand { font-weight: 700; font-size: 15px; line-height: 1.2; }
    .nav-sub   { font-size: 11px; color: var(--text-secondary); }
    .nav-links { display: flex; gap: 24px; list-style: none; }
    .nav-links a { text-decoration: none; font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: color .2s; }
    .nav-links a:hover { color: var(--primary); }
    .nav-links .active { color: var(--primary); }
    .nav-cta {
      display: flex; align-items: center; gap: 8px;
      background: var(--primary); color: #fff; text-decoration: none;
      padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
      transition: background .2s;
    }
    .nav-cta:hover { background: var(--primary-dark); }

    /* ── Header ──────────────────────────────────────────── */
    .post-header {
      max-width: 800px; margin: 48px auto 0; padding: 0 20px;
    }
    .breadcrumb {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;
    }
    .breadcrumb a { color: var(--primary); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .category-badge {
      display: inline-block; padding: 4px 12px; border-radius: 20px;
      background: #e8f0fd; color: var(--primary);
      font-size: 12px; font-weight: 600; letter-spacing: .4px;
      text-transform: uppercase; margin-bottom: 16px;
    }
    .post-title {
      font-size: clamp(26px, 5vw, 40px); font-weight: 800;
      line-height: 1.25; color: var(--text); margin-bottom: 16px;
    }
    .post-meta {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;
    }
    .post-meta svg { width: 14px; height: 14px; }

    /* ── Hero Image ──────────────────────────────────────── */
    .hero-wrap {
      max-width: 800px; margin: 0 auto 48px; padding: 0 20px;
    }
    .hero-wrap img {
      width: 100%; height: auto; max-height: 440px; object-fit: cover;
      border-radius: var(--radius); box-shadow: var(--card-shadow);
    }

    /* ── Article Body ────────────────────────────────────── */
    .post-layout {
      max-width: 1140px; margin: 0 auto 80px; padding: 0 20px;
      display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start;
    }

    .post-body { min-width: 0; }
    article { background: var(--white); border-radius: var(--radius); padding: 40px 44px; box-shadow: var(--card-shadow); }
    
    article h1 { display: none; } /* h1 is in post-header */
    article h2 { font-size: 22px; font-weight: 700; color: var(--text); margin: 32px 0 12px; padding-top: 8px; border-top: 2px solid var(--border); }
    article h3 { font-size: 18px; font-weight: 600; color: var(--text); margin: 24px 0 10px; }
    article p  { font-family: 'Merriweather', serif; font-size: 16px; line-height: 1.85; color: #2d2d3a; margin-bottom: 20px; }
    article ul, article ol { margin: 0 0 20px 24px; }
    article li { font-family: 'Merriweather', serif; font-size: 15px; line-height: 1.8; color: #2d2d3a; margin-bottom: 6px; }
    article strong { color: var(--text); font-weight: 700; }
    article a { color: var(--primary); text-decoration: underline; }

    /* Images inside article */
    .blog-hero-img, .blog-mid-img {
      width: 100%; border-radius: 10px; margin: 24px 0; box-shadow: 0 2px 16px rgba(0,0,0,.1);
      object-fit: cover; max-height: 360px;
    }

    /* FAQ */
    .faq-section { margin-top: 32px; border-top: 2px solid var(--border); padding-top: 24px; }
    .faq-section h2 { border-top: none; margin-top: 0; }
    .faq-section h3 { color: var(--primary); font-size: 16px; margin-bottom: 6px; }
    .faq-section p  { font-size: 15px; margin-bottom: 20px; }

    /* CTA Banner */
    .post-cta {
      margin-top: 32px; padding: 28px 32px; border-radius: 12px;
      background: linear-gradient(135deg, #1A6FBB 0%, #0D47A1 100%);
      color: #fff; text-align: center;
    }
    .post-cta h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .post-cta p  { font-family: 'Inter', sans-serif; font-size: 14px; opacity: .9; margin-bottom: 20px; }
    .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .cta-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 22px; border-radius: 8px;
      font-size: 14px; font-weight: 600; text-decoration: none; transition: all .2s;
    }
    .cta-btn-wa  { background: #25D366; color: #fff; }
    .cta-btn-wa:hover  { background: #1da851; }
    .cta-btn-ph  { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
    .cta-btn-ph:hover  { background: rgba(255,255,255,.25); }

    /* Share */
    .share-bar {
      margin-top: 32px; padding: 20px 0; border-top: 1px solid var(--border);
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    }
    .share-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
    .share-btn {
      padding: 7px 16px; border-radius: 7px; font-size: 13px; font-weight: 500;
      text-decoration: none; color: #fff; transition: opacity .2s;
    }
    .share-btn:hover { opacity: .85; }
    .share-wa { background: #25D366; }
    .share-tw { background: #1DA1F2; }
    .share-li { background: #0A66C2; }

    /* ── Sidebar ─────────────────────────────────────────── */
    .sidebar { position: sticky; top: 80px; }

    .sidebar-card {
      background: var(--white); border-radius: var(--radius); padding: 24px;
      box-shadow: var(--card-shadow); margin-bottom: 20px;
    }
    .sidebar-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 16px; }

    .contact-lines p  { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
    .contact-lines a  { color: var(--primary); text-decoration: none; }
    .contact-lines a:hover { text-decoration: underline; }

    .contact-btn {
      display: block; text-align: center; padding: 11px 0; border-radius: 8px;
      font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 14px;
      transition: opacity .2s;
    }
    .contact-btn:hover { opacity: .85; }
    .btn-wa { background: #25D366; color: #fff; }
    .btn-call { background: var(--primary); color: #fff; margin-top: 8px; }

    .related-list { list-style: none; }
    .related-list li { padding: 10px 0; border-bottom: 1px solid var(--border); }
    .related-list li:last-child { border-bottom: none; }
    .related-list a { font-size: 13px; color: var(--text); text-decoration: none; font-weight: 500; line-height: 1.4; display: block; }
    .related-list a:hover { color: var(--primary); }

    /* ── Footer ──────────────────────────────────────────── */
    footer {
      background: #0d1b2a; color: #a0aabb; padding: 56px 20px 24px;
    }
    .footer-grid {
      max-width: 1140px; margin: 0 auto;
      display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px;
      margin-bottom: 40px;
    }
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
    .footer-bottom {
      max-width: 1140px; margin: 0 auto;
      border-top: 1px solid #1e2d3d; padding-top: 20px;
      font-size: 12px; color: #5a6a7a; text-align: center;
    }

    /* ── Responsive ──────────────────────────────────────── */
    @media (max-width: 900px) {
      .post-layout { grid-template-columns: 1fr; }
      .sidebar { position: static; }
      .nav-links { display: none; }
      article { padding: 24px 20px; }
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
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.449A12 12 0 0 0 .1 14.64L0 24l9.51-2.49A12 12 0 0 0 20.52 3.449ZM12 21.6a9.95 9.95 0 0 1-5.07-1.39l-.36-.21-3.75.98 1-3.65-.24-.37A9.96 9.96 0 1 1 12 21.6Zm5.46-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15s-.78.97-.95 1.17-.35.22-.65.07a8.16 8.16 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.6l.44-.51c.14-.17.18-.3.28-.5.09-.2.05-.37-.02-.52s-.68-1.63-.93-2.24c-.24-.59-.49-.5-.68-.51h-.58a1.1 1.1 0 0 0-.8.38 3.37 3.37 0 0 0-1.05 2.5 5.87 5.87 0 0 0 1.22 3.1 13.44 13.44 0 0 0 5.14 4.54c.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42s.25-1.29.17-1.42c-.07-.12-.27-.2-.57-.35Z"/></svg>
      WhatsApp Us
    </a>
  </div>
</nav>

<!-- Post Header -->
<header class="post-header">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a>
    <span aria-hidden="true">›</span>
    <a href="/blogs">Blog</a>
    <span aria-hidden="true">›</span>
    <span>${escHtml(post.title)}</span>
  </nav>
  <div class="category-badge">${escHtml(post.category)}</div>
  <h1 class="post-title">${escHtml(post.title)}</h1>
  <div class="post-meta">
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <time datetime="${post.publishedAt}">${publishedDate}</time>
    </span>
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      8 min read
    </span>
    <span>by Krishna Glass House</span>
  </div>
</header>

<!-- Hero Image -->
<div class="hero-wrap">
  <img src="${post.heroImage}" alt="${escAttr(post.title)}" width="1280" height="720" loading="eager">
</div>

<!-- Main Layout -->
<div class="post-layout">

  <!-- Article Body -->
  <main class="post-body">
    <article>
      ${post.bodyHtml}
    </article>

    <!-- CTA Banner -->
    <div class="post-cta" role="complementary">
      <h3>Ready to Transform Your Space?</h3>
      <p>Visit Krishna Glass House at Janakpuri, West Delhi for expert consultation, free site visit, and competitive quotes on all glass, aluminium, and PVC works.</p>
      <div class="cta-buttons">
        <a href="https://wa.me/918700162623?text=Hi%20Krishna%20Glass%20House%2C%20I%20read%20your%20blog%20and%20would%20like%20a%20quote." class="cta-btn cta-btn-wa" target="_blank" rel="noopener noreferrer">
          💬 WhatsApp for Free Quote
        </a>
        <a href="tel:+918700162623" class="cta-btn cta-btn-ph">
          📞 +91 87001 62623
        </a>
      </div>
    </div>

    <!-- Share Bar -->
    <div class="share-bar">
      <span class="share-label">Share this article:</span>
      <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + BASE_URL + '/blogs/' + post.slug)}" class="share-btn share-wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(BASE_URL + '/blogs/' + post.slug)}" class="share-btn share-tw" target="_blank" rel="noopener noreferrer">Twitter</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(BASE_URL + '/blogs/' + post.slug)}" class="share-btn share-li" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </main>

  <!-- Sidebar -->
  <aside class="sidebar">
    <!-- Contact Card -->
    <div class="sidebar-card">
      <div class="sidebar-title">📍 Get a Free Quote</div>
      <div class="contact-lines">
        <p><strong>Krishna Glass House</strong><br>
        Aluminium &amp; PVC Works</p>
        <p style="margin-top:10px">Shop No. 2, Mohan Nagar,<br>Pankha Road, Opp. D-Block,<br>Janakpuri, New Delhi – 110046</p>
        <p style="margin-top:10px">📞 <a href="tel:+918700162623">+91 87001 62623</a></p>
        <p>🕐 Mon–Sat: 10 AM – 7 PM</p>
      </div>
      <a href="https://wa.me/918700162623?text=Hi%20KGH%2C%20I%20need%20a%20quote%20for%20glass%20work." class="contact-btn btn-wa" target="_blank" rel="noopener noreferrer">💬 Chat on WhatsApp</a>
      <a href="tel:+918700162623" class="contact-btn btn-call">📞 Call Now</a>
    </div>

    <!-- Related Posts placeholder (injected dynamically if possible) -->
    <div class="sidebar-card">
      <div class="sidebar-title">📚 More Articles</div>
      <ul class="related-list" id="related-posts">
        <li><a href="/blogs">Browse all blog posts →</a></li>
      </ul>
    </div>
  </aside>

</div>

<!-- Footer -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-brand-name">Krishna Glass House</div>
      <div class="footer-brand-sub">Aluminium &amp; PVC Works — Est. 2008</div>
      <p class="footer-desc">Premium glass fabrication, aluminium windows &amp; doors, UPVC systems, and LED mirrors for homes and offices across Delhi NCR. Serving Janakpuri, Dwarka, Uttam Nagar, and West Delhi since 2008.</p>
    </div>
    <div>
      <div class="footer-heading">Quick Links</div>
      <ul class="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/catalog.html">Products</a></li>
        <li><a href="/blogs">Blog</a></li>
        <li><a href="/#contact">Contact</a></li>
        <li><a href="/blogs/sitemap.xml">Blog Sitemap</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-heading">Contact Us</div>
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
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}
