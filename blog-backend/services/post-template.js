/**
 * 🎨 Renders consistent, premium standalone blog posts for Krishna Glass House
 */
const renderPostHtml = (post) => {
  const publishedDate = new Date().toISOString();
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Blog - Krishna Glass House</title>
    <meta name="description" content="${post.excerpt}">
    <link rel="stylesheet" href="/index.css">
    
    <!-- Open Graph / SEO -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://krishnaglasshouse.com/blogs/${post.slug}.html">
</head>
<body class="bg-light">
    <!-- Post Body -->
    <article class="max-w-4xl mx-auto py-20 px-6 bg-white shadow-xl rounded-2xl -mt-10 mb-20">
        <header class="mb-12 text-center">
            <h1 class="text-5xl font-bold mb-6">${post.title}</h1>
            <div class="text-gray-500 uppercase tracking-widest text-sm font-semibold">
                Published on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        </header>

        <div class="prose lg:prose-xl mx-auto content-section">
            ${post.content}
        </div>

        <!-- FAQ Section -->
        ${post.faq ? `
        <section class="mt-16 pt-16 border-t">
            <h2 class="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div class="space-y-6">
                ${post.faq.map(f => `
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-2">${f.q}</h3>
                    <p class="text-gray-700">${f.a}</p>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <footer class="mt-20 pt-10 border-t text-center">
            <p class="text-lg font-semibold">Ready to upgrade your space?</p>
            <a href="/" class="btn-primary mt-4 inline-block">Back to Home</a>
        </footer>
    </article>
</body>
</html>
  `;
};

module.exports = { renderPostHtml };
