/**
 * Krishna Glass House — Dynamic Sitemap Generator
 * Auto-generates sitemap.xml for all blog posts.
 */

const BASE_URL = process.env.BASE_URL || 'https://www.krishnaglasshouse.com';

export function renderSitemap(posts) {
  const urls = posts.map(post => {
    const lastmod = post.updatedAt || post.publishedAt || new Date().toISOString();
    const dateOnly = lastmod.split('T')[0];

    return `  <url>
    <loc>${BASE_URL}/blogs/${post.slug}</loc>
    <lastmod>${dateOnly}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
    ${post.imageUrl ? `<image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.imageAlt || post.title)}</image:caption>
    </image:image>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Blog Index Page -->
  <url>
    <loc>${BASE_URL}/blogs</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>

  <!-- Blog Posts -->
${urls}

</urlset>`;
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
