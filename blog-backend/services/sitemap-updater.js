/**
 * Sitemap Updater — Parses and updates /blogs/sitemap.xml
 * 
 * Reads the current sitemap, adds a new <url> entry for the new post,
 * and returns the updated XML string.
 * 
 * Uses the <!-- SITEMAP_URLS_START --> / <!-- SITEMAP_URLS_END --> markers.
 */

const BASE_URL = 'https://www.krishnaglasshouse.com';

export const SITEMAP_ENTRY_MARKER = '<!-- SITEMAP_URLS_START -->';

/**
 * Build a sitemap <url> entry for a blog post.
 */
function buildUrlEntry(post) {
  const date = post.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0];
  return `
  <!-- POST:${post.slug} -->
  <url>
    <loc>${BASE_URL}/blogs/${post.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
    <image:image>
      <image:loc>${post.heroImage}</image:loc>
      <image:title>${escXml(post.title)}</image:title>
      <image:caption>${escXml(post.excerpt || post.title)}</image:caption>
    </image:image>
  </url>`;
}

/**
 * Inject a new post URL entry into the existing sitemap XML content.
 * Inserts right after the SITEMAP_ENTRY_MARKER comment.
 */
export function injectUrlIntoSitemap(currentXml, post) {
  if (!currentXml.includes(SITEMAP_ENTRY_MARKER)) {
    throw new Error(`blogs/sitemap.xml is missing the required marker: ${SITEMAP_ENTRY_MARKER}`);
  }

  const entry = buildUrlEntry(post);
  return currentXml.replace(SITEMAP_ENTRY_MARKER, `${SITEMAP_ENTRY_MARKER}${entry}`);
}

/**
 * Build a complete fresh blogs/sitemap.xml (used for initial setup).
 */
export function buildSitemapXml(posts = []) {
  const today = new Date().toISOString().split('T')[0];
  const entries = posts.map(buildUrlEntry).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Blog Index -->
  <url>
    <loc>${BASE_URL}/blogs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>

${SITEMAP_ENTRY_MARKER}
${entries}

</urlset>`;
}

function escXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
