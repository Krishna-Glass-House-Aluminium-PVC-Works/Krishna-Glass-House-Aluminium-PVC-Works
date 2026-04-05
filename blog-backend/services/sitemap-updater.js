/**
 * 🗺️ Updates sitemap content for new blog posts (CommonJS)
 */
const updateSitemap = (xml, slug) => {
    const entry = `
  <url>
    <loc>https://krishnaglasshouse.com/blogs/${slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`;

    const marker = '<!-- SITEMAP_START -->';
    if (!xml.includes(marker)) return xml;
    return xml.replace(marker, marker + entry);
};

module.exports = { updateSitemap };
