/**
 * Cloudflare Worker — KGH Blog Reverse Proxy
 *
 * Rules:
 *   /admin*         → Forward to Cloud Run admin panel
 *   /api/*          → Forward to Cloud Run API (secured by ADMIN_TOKEN in header)
 *   /blogs/sitemap.xml → Forward to Cloud Run (dynamic, will be static file after setup)
 *   /blogs*         → Let Cloudflare Pages serve the STATIC files (no proxy needed)
 *   Everything else → Cloudflare Pages static site (passthrough)
 *
 * IMPORTANT: After running /api/setup and generating your first posts,
 * the /blogs/* files are STATIC in your GitHub repo and served directly
 * by Cloudflare Pages — no Cloud Run proxy needed for them!
 * Cloud Run is ONLY needed for /admin and /api/generate-daily.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ── Route to Cloud Run: Admin panel + API endpoints only ──────────────────
    if (path.startsWith('/admin') || path.startsWith('/api/')) {
      return proxyToCloudRun(request, url, env);
    }

    // ── Everything else (including /blogs/*): Let Cloudflare Pages handle it ──
    // Blogs are static HTML files committed to the repo, served by Pages directly.
    return fetch(request);
  },
};

/**
 * Proxy a request to the Cloud Run backend.
 */
async function proxyToCloudRun(request, url, env) {
  const CLOUD_RUN_URL = 'https://kgh-blog-411853553644.us-central1.run.app';

  if (!CLOUD_RUN_URL) {
    return new Response('CLOUD_RUN_URL is not configured in Worker environment.', { status: 503 });
  }

  // Rewrite the URL to Cloud Run
  const targetUrl = CLOUD_RUN_URL.replace(/\/$/, '') + url.pathname + url.search;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    // Forward response with no-cache headers for API endpoints
    const headers = new Headers(response.headers);
    if (url.pathname.startsWith('/api/')) {
      headers.set('Cache-Control', 'no-store');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (err) {
    return new Response(`Cloud Run proxy error: ${err.message}`, { status: 502 });
  }
}
