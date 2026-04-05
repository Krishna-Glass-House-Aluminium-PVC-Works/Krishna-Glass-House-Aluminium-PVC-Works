/**
 * Krishna Glass House — Admin Panel Template
 * Token-protected admin UI for manual blog generation.
 */

const BASE_URL = process.env.BASE_URL || 'https://www.krishnaglasshouse.com';

export function renderAdminLogin() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Krishna Glass House Blog</title>
  <meta name="robots" content="noindex, nofollow">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
        <span class="text-white font-bold text-xl">K</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Blog Admin</h1>
      <p class="text-sm text-gray-500 mt-1">Krishna Glass House — Content Management</p>
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <form id="loginForm">
        <label class="block mb-2 text-sm font-medium text-gray-700">Admin Token</label>
        <input type="password" id="tokenInput" placeholder="Enter your admin token" required
               class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
        <button type="submit" class="w-full mt-4 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm">
          Access Dashboard
        </button>
      </form>
    </div>
  </div>
  <script>
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const token = document.getElementById('tokenInput').value;
      if (token) {
        localStorage.setItem('kgh_admin_token', token);
        window.location.href = '/blogs/admin?token=' + encodeURIComponent(token);
      }
    });

    // Auto-fill if token exists
    const saved = localStorage.getItem('kgh_admin_token');
    if (saved) document.getElementById('tokenInput').value = saved;
  </script>
</body>
</html>`;
}

export function renderAdminDashboard(recentPosts = []) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard — Krishna Glass House Blog</title>
  <meta name="robots" content="noindex, nofollow">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { animation: spin 1s linear infinite; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
    .slide-in { animation: slideIn 0.3s ease-out; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">

  <!-- Header -->
  <header class="bg-white border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span class="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <div class="font-bold text-gray-900 text-sm">Blog Admin</div>
            <div class="text-[10px] text-gray-400">Krishna Glass House</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="/blogs" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">← View Blog</a>
          <button onclick="logout()" class="text-sm text-red-500 hover:text-red-700 transition-colors">Logout</button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p class="text-sm text-gray-400 mb-1">Total Posts</p>
        <p class="text-3xl font-bold text-gray-900">${recentPosts.length}</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p class="text-sm text-gray-400 mb-1">Latest Post</p>
        <p class="text-sm font-semibold text-gray-700 truncate">${recentPosts.length > 0 ? recentPosts[0].title : 'None yet'}</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p class="text-sm text-gray-400 mb-1">Status</p>
        <p class="text-sm font-semibold text-green-600 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          System Active
        </p>
      </div>
    </div>

    <!-- Generate Section -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
      <h2 class="text-lg font-bold text-gray-900 mb-1">Generate New Blog Post</h2>
      <p class="text-sm text-gray-500 mb-6">Use Vertex AI to generate a new SEO-optimized article. This may take 30-60 seconds.</p>

      <div class="flex flex-col sm:flex-row gap-4 items-start">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-500 mb-1.5">Topic (Optional)</label>
          <input type="text" id="topicInput" placeholder="Leave empty for auto-rotation or enter a specific topic"
                 class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
        </div>
        <button onclick="generateBlog()" id="generateBtn"
                class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed mt-5 sm:mt-0 self-end">
          🚀 Generate Blog Now
        </button>
      </div>

      <!-- Status -->
      <div id="statusArea" class="hidden mt-6"></div>
    </div>

    <!-- Recent Posts -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="font-bold text-gray-900">Recent Posts</h2>
      </div>
      ${recentPosts.length > 0 ? `
        <div class="divide-y divide-gray-50">
          ${recentPosts.map(post => `
            <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-start gap-4 min-w-0">
                  <img src="${post.imageUrl}" alt="" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
                  <div class="min-w-0">
                    <a href="/blogs/${post.slug}" class="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors block truncate">${post.title}</a>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full capitalize">${(post.category || 'blog').replace(/-/g, ' ')}</span>
                      <span class="text-xs text-gray-400">${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                </div>
                <a href="/blogs/${post.slug}" target="_blank" class="text-xs text-blue-600 hover:underline flex-shrink-0">View →</a>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="px-6 py-12 text-center">
          <p class="text-gray-400 text-sm">No blog posts yet. Generate your first one above!</p>
        </div>
      `}
    </div>
  </main>

  <script>
    const TOKEN = new URLSearchParams(window.location.search).get('token') || localStorage.getItem('kgh_admin_token');
    if (!TOKEN) window.location.href = '/blogs/admin';

    function logout() {
      localStorage.removeItem('kgh_admin_token');
      window.location.href = '/blogs/admin';
    }

    async function generateBlog() {
      const btn = document.getElementById('generateBtn');
      const statusArea = document.getElementById('statusArea');
      const topic = document.getElementById('topicInput').value.trim();

      btn.disabled = true;
      btn.innerHTML = '<svg class="w-4 h-4 inline spinner mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Generating...';

      statusArea.className = 'mt-6 slide-in';
      statusArea.innerHTML = '<div class="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm"><svg class="w-5 h-5 spinner flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg><span>Contacting Vertex AI... This may take 30-60 seconds.</span></div>';

      try {
        const body = topic ? JSON.stringify({ topic }) : '{}';
        const res = await fetch('/api/generate-daily', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TOKEN,
          },
          body,
        });

        const data = await res.json();

        if (res.ok && data.success) {
          statusArea.innerHTML = \`
            <div class="px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm slide-in">
              <p class="font-semibold">✅ Blog post generated successfully!</p>
              <p class="mt-1"><strong>Title:</strong> \${data.post.title}</p>
              <a href="/blogs/\${data.post.slug}" target="_blank" class="inline-block mt-2 text-green-600 font-semibold hover:underline">View Post →</a>
            </div>\`;
          setTimeout(() => window.location.reload(), 3000);
        } else {
          statusArea.innerHTML = \`<div class="px-4 py-3 bg-red-50 text-red-700 rounded-xl text-sm slide-in"><p class="font-semibold">❌ Generation failed</p><p class="mt-1">\${data.error || 'Unknown error'}</p></div>\`;
        }
      } catch (err) {
        statusArea.innerHTML = \`<div class="px-4 py-3 bg-red-50 text-red-700 rounded-xl text-sm slide-in"><p class="font-semibold">❌ Network error</p><p class="mt-1">\${err.message}</p></div>\`;
      }

      btn.disabled = false;
      btn.innerHTML = '🚀 Generate Blog Now';
    }
  </script>
</body>
</html>`;
}
