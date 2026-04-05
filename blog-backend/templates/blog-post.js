/**
 * Krishna Glass House — Single Blog Post Template
 * Clean typography, full SEO with BlogPosting + LocalBusiness schema.
 */

import { renderFooter, formatDate } from './blog-list.js';

const BASE_URL = process.env.BASE_URL || 'https://www.krishnaglasshouse.com';

export function renderBlogPost(post, recentPosts = []) {
  const publishDate = post.publishedAt || new Date().toISOString();
  const formattedDate = formatDate(publishDate);
  const categoryLabel = (post.category || 'blog').replace(/-/g, ' ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} | Krishna Glass House Blog</title>
  <meta name="description" content="${post.metaDescription || post.excerpt || ''}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${BASE_URL}/blogs/${post.slug}">

  <!-- Geo SEO -->
  <meta name="geo.region" content="IN-DL">
  <meta name="geo.placename" content="Janakpuri, New Delhi">
  <meta name="geo.position" content="28.614;77.081">

  <!-- Open Graph -->
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.metaDescription || post.excerpt || ''}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${BASE_URL}/blogs/${post.slug}">
  <meta property="og:image" content="${post.imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${post.imageAlt || post.title}">
  <meta property="og:site_name" content="Krishna Glass House">
  <meta property="og:locale" content="en_IN">
  <meta property="article:published_time" content="${publishDate}">
  <meta property="article:modified_time" content="${post.updatedAt || publishDate}">
  <meta property="article:author" content="Krishna Glass House">
  <meta property="article:section" content="${categoryLabel}">
  ${(post.tags || []).map(tag => `<meta property="article:tag" content="${tag}">`).join('\n  ')}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@KrishnaGla18836">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.metaDescription || post.excerpt || ''}">
  <meta name="twitter:image" content="${post.imageUrl}">

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .prose { font-family: 'Merriweather', Georgia, serif; }
    .prose h1 { font-family: 'Inter', sans-serif; font-size: 2.25rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; color: #111827; }
    .prose h2 { font-family: 'Inter', sans-serif; font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    .prose h3 { font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: #374151; }
    .prose p { font-size: 1.075rem; line-height: 1.85; margin-bottom: 1.25rem; color: #374151; }
    .prose ul, .prose ol { margin-bottom: 1.25rem; padding-left: 1.5rem; }
    .prose li { font-size: 1.05rem; line-height: 1.75; margin-bottom: 0.5rem; color: #4b5563; }
    .prose strong { color: #111827; }
    .prose a { color: #2563eb; text-decoration: underline; }
    .prose a:hover { color: #1d4ed8; }
    .prose img { border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .prose blockquote { border-left: 4px solid #3b82f6; padding-left: 1.25rem; margin: 1.5rem 0; font-style: italic; color: #6b7280; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style>

  <!-- JSON-LD: BlogPosting -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.metaDescription || post.excerpt || ''}",
    "image": "${post.imageUrl}",
    "datePublished": "${publishDate}",
    "dateModified": "${post.updatedAt || publishDate}",
    "author": {
      "@type": "Organization",
      "name": "Krishna Glass House",
      "url": "${BASE_URL}/"
    },
    "publisher": {
      "@type": "LocalBusiness",
      "@id": "${BASE_URL}/#business",
      "name": "Krishna Glass House",
      "logo": {
        "@type": "ImageObject",
        "url": "${BASE_URL}/images/kgh.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${BASE_URL}/blogs/${post.slug}"
    },
    "articleSection": "${categoryLabel}",
    "keywords": ${JSON.stringify(post.tags || [])},
    "url": "${BASE_URL}/blogs/${post.slug}",
    "inLanguage": "en-IN"
  }
  </script>

  <!-- JSON-LD: LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": "${BASE_URL}/#business",
    "name": "Krishna Glass House",
    "alternateName": "Krishna Glass House Aluminium & PVC Works",
    "description": "Best glass and interior hub in Janakpuri, West Delhi. Specialists in Toughened Glass, Glass Railing Installation, Aluminium Partition Dealers, uPVC Windows & Doors, PVC Wall Panels, LED Mirrors.",
    "url": "${BASE_URL}/",
    "telephone": "+918700162623",
    "email": "mfskufgu@gmail.com",
    "foundingDate": "2021-12",
    "priceRange": "₹₹",
    "image": "${BASE_URL}/images/hero-slide-1.png",
    "logo": "${BASE_URL}/images/kgh.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 2, Mohan Nagar, Pankha Road, Opp. D-Block Janakpuri",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110046",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.614,
      "longitude": 77.081
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/krishnaglass09/",
      "https://www.facebook.com/krishnaglass09",
      "https://twitter.com/KrishnaGla18836",
      "https://www.youtube.com/@krishnaglasshouse.netfly"
    ]
  }
  </script>

  <!-- JSON-LD: BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE_URL}/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "${BASE_URL}/blogs"},
      {"@type": "ListItem", "position": 3, "name": "${escapeHtml(post.title)}", "item": "${BASE_URL}/blogs/${post.slug}"}
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

  <!-- Hero Image -->
  <div class="w-full aspect-[21/9] max-h-[450px] overflow-hidden relative">
    <img src="${post.imageUrl}" alt="${post.imageAlt || post.title}" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
  </div>

  <!-- Article -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Main Content -->
      <article class="flex-1 max-w-none lg:max-w-[720px]">
        <!-- Breadcrumb -->
        <nav class="mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-sm text-gray-400">
            <li><a href="${BASE_URL}/" class="hover:text-blue-600 transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/blogs" class="hover:text-blue-600 transition-colors">Blog</a></li>
            <li>/</li>
            <li class="text-gray-600 truncate max-w-[200px]">${escapeHtml(post.title)}</li>
          </ol>
        </nav>

        <!-- Meta -->
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 capitalize">${categoryLabel}</span>
          <time class="text-sm text-gray-400" datetime="${publishDate}">${formattedDate}</time>
          <span class="text-sm text-gray-300">•</span>
          <span class="text-sm text-gray-400">by Krishna Glass House</span>
        </div>

        <!-- Tags -->
        ${(post.tags && post.tags.length > 0) ? `
        <div class="flex flex-wrap gap-2 mb-8">
          ${post.tags.map(tag => `<span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-md">#${tag}</span>`).join('')}
        </div>` : ''}

        <!-- Article Body -->
        <div class="prose max-w-none">
          ${post.content}

          ${post.secondaryImageUrl ? `
          <figure class="my-8">
            <img src="${post.secondaryImageUrl}" alt="${post.secondaryImageAlt || 'Related glass and aluminium work'}" class="w-full rounded-xl" loading="lazy">
            <figcaption class="text-center text-sm text-gray-400 mt-2">${post.secondaryImageAlt || ''}</figcaption>
          </figure>` : ''}
        </div>

        <!-- CTA Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 mt-12 text-white">
          <h3 class="text-xl font-bold mb-2" style="font-family:'Inter',sans-serif; color: white; border: none; margin-top: 0;">Need Expert Help With Your Project?</h3>
          <p style="color: rgba(255,255,255,0.9); font-family:'Inter',sans-serif; font-size: 0.95rem;">Krishna Glass House provides free site consultations for all glass, aluminium, and PVC projects across Delhi NCR.</p>
          <div class="flex flex-wrap gap-3 mt-4">
            <a href="https://wa.me/918700162623?text=Hi%2C%20I%20read%20your%20blog%20and%20need%20help%20with%20a%20project." target="_blank" rel="noopener"
               class="px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors no-underline" style="text-decoration:none; color:#2563eb;">
              WhatsApp Us
            </a>
            <a href="tel:+918700162623"
               class="px-5 py-2.5 bg-white/20 text-white font-semibold rounded-xl text-sm hover:bg-white/30 transition-colors no-underline border border-white/30" style="text-decoration:none; color:white;">
              Call +91 87001 62623
            </a>
          </div>
        </div>

        <!-- Share -->
        <div class="border-t border-gray-100 mt-8 pt-6">
          <p class="text-sm font-semibold text-gray-600 mb-3" style="font-family:'Inter',sans-serif;">Share this article:</p>
          <div class="flex gap-3">
            <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + BASE_URL + '/blogs/' + post.slug)}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" style="text-decoration:none;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(BASE_URL + '/blogs/' + post.slug)}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors" style="text-decoration:none;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BASE_URL + '/blogs/' + post.slug)}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-100 transition-colors" style="text-decoration:none;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
          </div>
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="lg:w-[320px] flex-shrink-0">
        <div class="sticky top-24 space-y-8">
          <!-- About Card -->
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span class="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <p class="font-bold text-sm">Krishna Glass House</p>
                <p class="text-xs text-gray-400">Janakpuri, New Delhi</p>
              </div>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">Premium glass, aluminium & PVC interior solutions. 5-star rated on Google. Serving Delhi NCR since 2021.</p>
            <a href="tel:+918700162623" class="block w-full text-center px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors no-underline" style="text-decoration:none; color:white;">
              📞 Call +91 87001 62623
            </a>
          </div>

          <!-- Recent Posts -->
          ${recentPosts.length > 0 ? `
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 class="font-bold text-sm mb-4 text-gray-900" style="font-family:'Inter',sans-serif; border:none; margin-top:0;">Recent Articles</h3>
            <div class="space-y-4">
              ${recentPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(p => `
                <a href="/blogs/${p.slug}" class="flex gap-3 group" style="text-decoration:none;">
                  <img src="${p.imageUrl}" alt="${p.imageAlt || p.title}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0">
                  <div>
                    <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">${p.title}</p>
                    <time class="text-xs text-gray-400">${formatDate(p.publishedAt)}</time>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>` : ''}
        </div>
      </aside>
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
