/**
 * Krishna Glass House — Blog Listing Page Template
 * Clean, light-themed, modern reading UI using Tailwind CSS CDN.
 */

const BASE_URL = process.env.BASE_URL || 'https://www.krishnaglasshouse.com';

export function renderBlogList(posts) {
  const postCards = posts.map(post => `
    <article class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <a href="/blogs/${post.slug}" class="block">
        <div class="aspect-[16/9] overflow-hidden">
          <img src="${post.imageUrl}" alt="${post.imageAlt || post.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        </div>
        <div class="p-6">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 capitalize">${(post.category || 'blog').replace(/-/g, ' ')}</span>
            <time class="text-xs text-gray-400" datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">${post.title}</h2>
          <p class="text-sm text-gray-500 line-clamp-2">${post.excerpt || ''}</p>
          <div class="mt-4 flex items-center text-blue-600 text-sm font-semibold">
            Read Article
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
    </article>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Expert Glass, Aluminium & PVC Blog | Krishna Glass House</title>
  <meta name="description" content="Expert insights on toughened glass, aluminium windows, PVC panels, LED mirrors, and interior design trends from Krishna Glass House, Janakpuri, Delhi.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/blogs">

  <!-- Open Graph -->
  <meta property="og:title" content="Blog — Krishna Glass House | Glass, Aluminium & PVC Experts">
  <meta property="og:description" content="Expert insights on toughened glass, aluminium fabrication, PVC works, and interior design trends in Delhi NCR.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/blogs">
  <meta property="og:image" content="${BASE_URL}/images/hero-slide-1.png">
  <meta property="og:site_name" content="Krishna Glass House">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog — Krishna Glass House">
  <meta name="twitter:description" content="Expert insights on glass, aluminium & PVC works for Delhi NCR homes and offices.">

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style>

  <!-- JSON-LD: Blog -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Krishna Glass House Blog",
    "description": "Expert insights on glass, aluminium, PVC works, and interior design trends from Krishna Glass House, Janakpuri, Delhi.",
    "url": "${BASE_URL}/blogs",
    "publisher": {
      "@type": "LocalBusiness",
      "@id": "${BASE_URL}/#business",
      "name": "Krishna Glass House",
      "telephone": "+918700162623",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 2, Mohan Nagar, Pankha Road, Opp. D-Block Janakpuri",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110046",
        "addressCountry": "IN"
      }
    }
  }
  </script>

  <!-- JSON-LD: BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE_URL}/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "${BASE_URL}/blogs"}
    ]
  }
  </script>
</head>
<body class="bg-gray-50 text-gray-900 min-h-screen">

  <!-- Header -->
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <a href="${BASE_URL}/" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span class="text-white font-bold text-sm">K</span>
          </div>
          <div class="hidden sm:block">
            <div class="font-bold text-gray-900 text-sm leading-tight">KRISHNA GLASS HOUSE</div>
            <div class="text-[10px] text-gray-400 uppercase tracking-wider">Aluminium & PVC Works</div>
          </div>
        </a>
        <nav class="flex items-center gap-6">
          <a href="${BASE_URL}/" class="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline">Home</a>
          <a href="${BASE_URL}/services.html" class="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline">Services</a>
          <a href="/blogs" class="text-sm font-semibold text-blue-600">Blog</a>
          <a href="${BASE_URL}/contact.html" class="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline">Contact</a>
          <a href="tel:+918700162623" class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            Call Now
          </a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16 sm:py-24 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <nav class="mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center justify-center gap-2 text-sm text-blue-200">
          <li><a href="${BASE_URL}/" class="hover:text-white transition-colors">Home</a></li>
          <li class="text-blue-300">/</li>
          <li class="text-white font-medium">Blog</li>
        </ol>
      </nav>
      <h1 class="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">Expert Insights & Guides</h1>
      <p class="text-lg text-blue-100 max-w-2xl mx-auto">Industry-leading tips on glass work, aluminium fabrication, PVC solutions, and interior design trends — from Delhi NCR's trusted interior hub.</p>
    </div>
  </section>

  <!-- Blog Grid -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    ${posts.length > 0 ? `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${postCards}
      </div>
    ` : `
      <div class="text-center py-20">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Blog Coming Soon</h2>
        <p class="text-gray-500">We're preparing expert articles on glass, aluminium, and PVC works. Check back soon!</p>
      </div>
    `}
  </main>

  ${renderFooter()}
</body>
</html>`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderFooter() {
  return `
  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span class="text-white font-bold">K</span>
            </div>
            <div>
              <div class="font-bold text-sm">KRISHNA GLASS HOUSE</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-wider">Aluminium & PVC Works</div>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">Premium Interior Hub in Janakpuri, New Delhi. Glass, Aluminium, PVC, Wallpapers & LED Mirrors since 2021.</p>
          <p class="text-xs text-gray-500 mt-2">GSTIN: 07DPZPB3958D1ZL</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-sm mb-4 text-gray-200">Quick Links</h4>
          <nav class="flex flex-col gap-2">
            <a href="${BASE_URL}/" class="text-sm text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="${BASE_URL}/services.html" class="text-sm text-gray-400 hover:text-white transition-colors">Services</a>
            <a href="${BASE_URL}/gallery.html" class="text-sm text-gray-400 hover:text-white transition-colors">Portfolio</a>
            <a href="${BASE_URL}/about.html" class="text-sm text-gray-400 hover:text-white transition-colors">About Us</a>
            <a href="/blogs" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-sm mb-4 text-gray-200">Our Services</h4>
          <nav class="flex flex-col gap-2">
            <a href="${BASE_URL}/services.html#glass-facades" class="text-sm text-gray-400 hover:text-white transition-colors">Glass Facades</a>
            <a href="${BASE_URL}/services.html#aluminium" class="text-sm text-gray-400 hover:text-white transition-colors">Aluminium & uPVC</a>
            <a href="${BASE_URL}/services.html#pvc" class="text-sm text-gray-400 hover:text-white transition-colors">PVC & Wallpapers</a>
            <a href="${BASE_URL}/services.html#railings" class="text-sm text-gray-400 hover:text-white transition-colors">Glass Railings</a>
            <a href="${BASE_URL}/services.html#led-mirrors" class="text-sm text-gray-400 hover:text-white transition-colors">LED Mirrors</a>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-sm mb-4 text-gray-200">Contact Us</h4>
          <div class="flex flex-col gap-3 text-sm text-gray-400">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Shop No. 2, Mohan Nagar, Pankha Road, Opp. D-Block, Janakpuri, New Delhi — 110046</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <a href="tel:+918700162623" class="hover:text-white transition-colors">+91 87001 62623</a>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:mfskufgu@gmail.com" class="hover:text-white transition-colors">mfskufgu@gmail.com</a>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Mon–Sun: 10 AM – 8 PM (Closed Wed)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">© ${new Date().getFullYear()} Krishna Glass House. All rights reserved. | GSTIN: 07DPZPB3958D1ZL</p>
        <p class="text-xs text-gray-500">Designed by <a href="https://mitanshu.explyra.me/" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">Mitanshu Bhasin</a></p>
      </div>
    </div>
  </footer>`;
}

export { renderFooter, formatDate };
