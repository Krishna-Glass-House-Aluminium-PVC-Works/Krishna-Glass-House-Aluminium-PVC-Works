/**
 * 🚀 KGH Direct Push - Pre-written 4 articles, pushes directly to GitHub
 * Run: node push-articles.js
 */

const https = require('https');

const GITHUB_TOKEN = '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';
const GITHUB_OWNER = 'Krishna-Glass-House-Aluminium-PVC-Works';
const GITHUB_REPO = 'Krishna-Glass-House-Aluminium-PVC-Works';
const GITHUB_BRANCH = 'main';

// ===== PRE-WRITTEN SEO ARTICLES =====
const ARTICLES = [
  {
    slug: 'top-10-led-mirror-designs-luxury-bathrooms-delhi',
    title: 'Top 10 LED Mirror Designs for Luxury Bathrooms in Delhi NCR',
    excerpt: 'Discover the best LED mirror designs trusted by Delhi\'s top architects. From backlit to smart touch mirrors — elevate your bathroom with Krishna Glass House.',
    date: 'April 6, 2025',
    content: `<h2>Why LED Mirrors Are the New Standard for Luxury Bathrooms in Delhi NCR</h2>
<p>Delhi NCR homeowners have always had an eye for premium design. Whether you live in the upscale colonies of South Delhi, the IT hubs of Gurugram, or the planned sectors of Noida — the bathroom has become a statement of personal luxury. And at the center of that luxury statement today is the <strong>LED mirror</strong>.</p>
<p>At <strong>Krishna Glass House, Janakpuri</strong>, we've installed hundreds of custom LED mirrors across Delhi NCR over the past decade. In this guide, we shortlist the 10 most sought-after LED mirror designs that our clients — architects, interior designers, and discerning homeowners — are choosing in 2025.</p>

<h2>1. Full-Length Backlit LED Mirror</h2>
<p>The full-length backlit mirror is the showstopper of modern bathrooms. Measuring 5–6 feet in height, it casts a soft, even glow around the entire frame, eliminating shadows. Popular in villas across Vasant Vihar and DLF Cyber City residences, this mirror pairs beautifully with marble or Italian tile walls.</p>
<ul>
  <li>Ideal size: 4×6 ft to 4×7 ft</li>
  <li>Light color: Warm white (3000K) or Neutral white (4000K)</li>
  <li>Best for: Master bathrooms, walk-in wardrobes</li>
</ul>

<h2>2. Copper-Free Anti-Fog Smart Mirror</h2>
<p>Delhi winters bring humidity, and Delhi summers bring steam. A copper-free, anti-fog LED mirror with touch dimmer control is a must-have for any bathroom that sees daily steam from hot showers. These mirrors maintain crystal clarity even after the hottest shower sessions.</p>

<h2>3. Hexagonal LED Wall Mirror</h2>
<p>Geometric mirrors are trending across Mumbai and Bengaluru, and Delhi is catching up fast. The hexagonal LED mirror adds a bold, artsy character to powder rooms and guest bathrooms. We custom-fabricate these in sizes from 24 inches to 48 inches at our Janakpuri workshop.</p>

<h2>4. Frameless LED Mirror with Side Strips</h2>
<p>For a minimalist, contemporary look, frameless LED mirrors with vertical or horizontal light strips are ideal. These are particularly popular in Noida sector 50–100 range apartments where clean lines and neutral tones dominate the interior palette.</p>

<h2>5. LED Mirror Cabinet (With Storage)</h2>
<p>Space is at a premium in Delhi's urban apartments. An LED mirror cabinet combines premium aesthetics with practical storage — housing medicines, toiletries, and grooming essentials behind a sleek mirrored surface. The LED frame ensures perfect lighting for grooming.</p>

<h2>6. Round LED Bathroom Mirror</h2>
<p>Round mirrors have seen a massive resurgence in 2024–25. They add softness and elegance to bathrooms dominated by sharp angles. A round LED mirror with a circular backlight halo effect is particularly striking in monochrome or dark-toned bathrooms.</p>

<h2>7. Hollywood-Style LED Mirror with Bulb Frame</h2>
<p>Inspired by vanity mirrors on film sets, these mirrors feature visible bulbs arranged around a rectangular or oval frame. They're perfect for dressing tables and makeup stations. Clients in Gurugram's DLF Magnolias and South Delhi's Panchsheel Park love these for their personal dressing suites.</p>

<h2>8. Smart Touch LED Mirror with Sensor Display</h2>
<p>The future of bathroom mirrors is here. Smart touch mirrors come with an embedded display showing time, date, temperature, and even weather. Touch-sensitive zones control brightness and color temperature. These are custom installations that Krishna Glass House specialists handle with full wiring and mounting.</p>

<h2>9. Rectancular LED Mirror with Shelf</h2>
<p>A sleek rectangular LED mirror with an integrated glass shelf is a practical yet stylish upgrade. Ideal for single-sink bathrooms, the shelf comfortably holds soap dispensers, plants, or decorative items — making your counter look effortlessly organized.</p>

<h2>10. Custom Shape LED Mirrors</h2>
<p>The most exclusive option — a completely custom-shaped LED mirror designed to your architect's specification. We've delivered arch-top mirrors for heritage bungalows in Civil Lines, irregular edge mirrors for boutique hotels in Aerocity, and multi-panel LED arrangements for premium spas in Saket.</p>

<h2>Why Choose Krishna Glass House for LED Mirrors?</h2>
<p>With over a decade of experience in premium glass works across Delhi NCR, Krishna Glass House offers:</p>
<ul>
  <li><strong>Free in-home consultation</strong> and measurement</li>
  <li><strong>Custom fabrication</strong> in our Janakpuri workshop</li>
  <li><strong>Professional installation</strong> by trained technicians</li>
  <li><strong>1-year warranty</strong> on LED components</li>
  <li>Projects delivered across Delhi, Gurugram, Noida, Faridabad, and Ghaziabad</li>
</ul>

<h2>Conclusion</h2>
<p>An LED mirror isn't just a functional fixture — it's the jewel of your bathroom. Whether you want a minimalist frameless design or a statement Hollywood mirror, Krishna Glass House has the expertise, craftsmanship, and material quality to deliver it perfectly.</p>
<p>📞 <strong>Call us today for a free consultation:</strong> Visit our showroom in Janakpuri or book an in-home visit across Delhi NCR.</p>`
  },

  {
    slug: 'ultimate-guide-toughened-glass-railings-homes-gurugram',
    title: 'The Ultimate Guide to Toughened Glass Railings for Homes in Gurugram',
    excerpt: 'Everything you need to know about toughened glass railings — safety, design, cost, and maintenance for homes & offices in Gurugram and Delhi NCR.',
    date: 'April 6, 2025',
    content: `<h2>Why Toughened Glass Railings Are the First Choice in Gurugram's Premium Homes</h2>
<p>If you've visited any premium residential society in Gurugram — DLF Camellias, Emaar Palm Drive, Sobha City, or M3M Golf Estate — you've almost certainly seen floor-to-ceiling frameless glass railings framing balconies, staircases, and terraces. These aren't just aesthetically stunning; they're engineered for safety, durability, and longevity.</p>
<p><strong>Krishna Glass House</strong> has installed toughened glass railings in over 200+ residential and commercial properties across Gurugram, South Delhi, and Noida. Here is everything you need to know before making this important investment for your home.</p>

<h2>What Is Toughened Glass?</h2>
<p>Toughened glass (also called tempered glass) is processed through a controlled thermal or chemical treatment that makes it 4–5 times stronger than regular annealed glass. Crucially, when it does break, it shatters into small, granular, blunt pieces instead of sharp dangerous shards — making it the safest choice for railings near children, pets, and high traffic areas.</p>

<h2>Types of Toughened Glass Railings</h2>
<h3>1. Frameless Glass Railings</h3>
<p>The most premium choice. Glass panels are fixed using stainless steel channel clamps or spigots at the base, with no vertical frame visible. The result is an unobstructed view — perfect for Gurugram high-rises with golf course or city skyline views.</p>

<h3>2. Semi-Frameless Railings</h3>
<p>Glass panels are held in place by vertical posts at certain intervals, typically 3–4 feet apart. This offers a clean look at a slightly lower cost than fully frameless installations.</p>

<h3>3. Framed Glass Railings with Aluminium Profile</h3>
<p>A budget-friendly, durable option where glass panels sit in an aluminium frame. Popular in residential staircase applications where the aesthetic priority is clean but not ultra-minimalist.</p>

<h2>Glass Thickness: What's Right for Your Railing?</h2>
<ul>
  <li><strong>10mm toughened glass</strong> — Standard for indoor railings, gym enclosures</li>
  <li><strong>12mm toughened glass</strong> — Recommended for balcony and terrace railings</li>
  <li><strong>15mm or 17.5mm laminated glass</strong> — For commercial applications, high-rise buildings above 10 floors</li>
</ul>
<p>As per Indian building standards (IS 2553), balcony railings must be at minimum 900mm–1100mm in height. Krishna Glass House ensures full compliance with structural safety codes on every project.</p>

<h2>Benefits of Glass Railings for Gurugram Properties</h2>
<ul>
  <li><strong>Unobstructed Views:</strong> Preserve your premium real estate's view corridors</li>
  <li><strong>Low Maintenance:</strong> Unlike iron, glass doesn't rust. A simple wipe with a microfiber cloth keeps it pristine</li>
  <li><strong>Modern Aesthetics:</strong> Instantly elevates the perceived value and luxury of your property</li>
  <li><strong>Durability:</strong> UV-resistant, scratch-resistant, weatherproof — handles Delhi NCR's extreme summer heat and monsoon rains equally well</li>
  <li><strong>Resale Value:</strong> Premium fixtures like glass railings tangibly increase property resale and rental appeal</li>
</ul>

<h2>Cost of Toughened Glass Railings in Gurugram</h2>
<p>Pricing depends on glass thickness, fixing system, and linear footage:</p>
<ul>
  <li>Semi-frameless (12mm): ₹850–₹1,200 per sq. ft.</li>
  <li>Fully frameless (12mm): ₹1,200–₹1,800 per sq. ft.</li>
  <li>Laminated safety glass (17.5mm): ₹1,500–₹2,500 per sq. ft.</li>
</ul>
<p>For an accurate site-specific quote, contact Krishna Glass House for a free on-site measurement and consultation.</p>

<h2>Maintenance Tips for Glass Railings in Delhi NCR</h2>
<p>Delhi NCR's air quality brings one unique challenge — dust. During peak summer and pollution season, glass railings require more frequent cleaning. Here are maintenance tips from our experts:</p>
<ul>
  <li>Clean weekly with a soft microfiber cloth and a mild glass cleaner</li>
  <li>Avoid abrasive scrubbers or acidic cleaners that can etch the glass surface</li>
  <li>Apply Rain-X or similar hydrophobic coating on outdoor panels yearly</li>
  <li>Inspect the base clamps and spigots every 6 months — tighten if any movement is felt</li>
</ul>

<h2>Why Trust Krishna Glass House?</h2>
<p>We are a trusted name in premium glass installations across Delhi NCR with over a decade of hands-on experience. Our Gurugram projects include residential villas, luxury apartments, boutique hotels, and commercial offices. Every installation comes with a comprehensive structural warranty and post-installation support.</p>

<h2>Conclusion</h2>
<p>Toughened glass railings are the defining feature of modern premium homes in Gurugram and Delhi NCR. They combine unmatched safety with breathtaking visual elegance. Whether you're renovating a DLF villa, fitting out a new apartment in Noida, or upgrading your office in Aerocity — Krishna Glass House has the expertise to deliver the perfect glass railing solution for your space.</p>`
  },

  {
    slug: 'upvc-vs-aluminium-windows-best-choice-delhi-weather',
    title: 'UPVC vs Aluminium Windows: Best Choice for Delhi\'s Heat, Dust & Monsoon',
    excerpt: 'Compare UPVC and Aluminium windows for Delhi NCR homes — thermal efficiency, dust resistance, cost, and which is better for your property.',
    date: 'April 6, 2025',
    content: `<h2>The Window Dilemma Every Delhi Homeowner Faces</h2>
<p>When renovating or building a new home in Delhi NCR, the window question inevitably comes up: <strong>UPVC or Aluminium?</strong> Both materials have their advocates, and both have distinct advantages depending on your property type, budget, and the specific challenges of Delhi's notorious climate — extreme heat in May–June, dust storms, and heavy monsoon rains.</p>
<p>At <strong>Krishna Glass House, Janakpuri</strong>, we've supplied and installed thousands of windows across Delhi, Gurugram, Noida, and Faridabad. This guide is designed to give you an honest, practical comparison to help you make the right choice.</p>

<h2>Delhi's Climate: Why It Matters for Window Selection</h2>
<p>Delhi experiences one of the most extreme urban climates in India:</p>
<ul>
  <li><strong>Summer:</strong> Temperatures regularly hit 44–47°C. Direct sun exposure makes window materials expand and contract significantly</li>
  <li><strong>Dust Storms (Aandhi):</strong> Fine Rajasthan dust infiltrates poorly sealed windows, coating interiors with a film within hours</li>
  <li><strong>Monsoon:</strong> Heavy rainfall and humidity stress window seals, frames, and glass pane junctions</li>
  <li><strong>Winter Fog:</strong> Condensation on glass can dampen wooden frames — but not UPVC or aluminium</li>
</ul>

<h2>UPVC Windows: The Thermal Champion</h2>
<p>UPVC (Unplasticised PVC) is a rigid plastic material that has transformed the window industry globally. Here's why it works for Delhi:</p>

<h3>Thermal Insulation</h3>
<p>UPVC has very low thermal conductivity — it does not conduct heat or cold efficiently. This means less heat enters your room in summer, and less warm air escapes in winter. If you're heavily dependent on air conditioning (as most Delhi homes are), UPVC windows can significantly reduce your electricity bills.</p>

<h3>Dust & Weather Sealing</h3>
<p>Multi-chamber UPVC profiles with quality rubber gaskets create an excellent seal against dust infiltration. If you live near a main road in any Delhi sector, UPVC is significantly better at keeping out the particulate-laden city air.</p>

<h3>Maintenance</h3>
<p>UPVC never needs painting, never rusts, and doesn't warp with moisture. A simple wipe-down is all it requires. Ideal for busy families who want hassle-free maintenance.</p>

<h3>UPVC Limitations</h3>
<ul>
  <li>Not available in slim profiles — UPVC frames are bulkier than aluminium</li>
  <li>Color options are more limited (mostly white, grey, wood-finish foil laminates)</li>
  <li>Less structurally rigid over very large spans (>6 ft)</li>
</ul>

<h2>Aluminium Windows: The Architect's Favourite</h2>
<p>Aluminium has long been the material of choice for architecturally driven projects — and for good reason.</p>

<h3>Slim Profiles & Contemporary Design</h3>
<p>Aluminium extrusions can be manufactured in extremely thin profiles — some as slim as 35–40mm — allowing for larger glass panes and a clean, modern look. This is why every premium villa and commercial project in Delhi NCR uses aluminium fenestration.</p>

<h3>Colour & Finish Flexibility</h3>
<p>Powder coating on aluminium allows virtually any RAL color. Matte black aluminium frames are trending across designer homes in South Delhi and Gurugram. Anodized finishes add additional corrosion resistance.</p>

<h3>Structural Strength</h3>
<p>Aluminium is inherently stronger than UPVC. This matters for large openings like floor-to-ceiling windows or sliding doors exceeding 8 feet. Aluminium handles these spans without deflection or sagging.</p>

<h3>Aluminium Limitations</h3>
<ul>
  <li>Higher thermal conductivity — without thermal breaks, aluminium frames conduct heat from outside to inside</li>
  <li>Higher cost compared to standard UPVC products</li>
  <li>Requires powder coat touch-up if scratched, unlike UPVC which is color-throughout</li>
</ul>

<h2>The Verdict: Which Is Better for Delhi NCR Homes?</h2>
<p>Choose <strong>UPVC</strong> if:</p>
<ul>
  <li>Your primary concern is energy efficiency and AC cost reduction</li>
  <li>You want low maintenance for a long-term family home</li>
  <li>Your budget is mid-range (₹450–₹700 per sq. ft.)</li>
  <li>Standard window sizes and configurations (casement, sliding)</li>
</ul>

<p>Choose <strong>Aluminium</strong> if:</p>
<ul>
  <li>You want a contemporary, architecturally refined look</li>
  <li>You have large openings, bay windows, or floor-to-ceiling glazing</li>
  <li>Design flexibility in color and finish is important</li>
  <li>You're building a premium villa, boutique hotel, or commercial space</li>
</ul>

<h2>Krishna Glass House: Expert Installation Across Delhi NCR</h2>
<p>Whether you choose UPVC or aluminium, quality of installation matters as much as the product itself. Poorly installed windows leak air and dust regardless of the material. Krishna Glass House has specialized window installation teams with experience across apartment blocks in Noida, independent houses in South Delhi, and commercial complexes in Gurugram.</p>
<p>We offer free site visits, detailed BOQ (Bill of Quantities), and transparent pricing with no hidden charges.</p>`
  },

  {
    slug: 'frameless-glass-partitions-transform-office-home-noida',
    title: 'Frameless Glass Partitions: Transform Your Office or Home in Noida',
    excerpt: 'Frameless glass partitions create open, light-filled spaces without sacrificing privacy. Explore design ideas and installation tips for Noida homes and offices.',
    date: 'April 6, 2025',
    content: `<h2>The Glass Partition Revolution in Delhi NCR Workspaces and Homes</h2>
<p>Walk into any modern co-working space in Noida Sector 62, any tech company office in Gurugram Cyber Hub, or any newly renovated villa in Greater Noida — and you'll notice the defining design element: frameless glass partitions. These sleek, transparent dividers have replaced heavy walls and opaque partitions across Delhi NCR, and for good reason.</p>
<p><strong>Krishna Glass House</strong> has been at the forefront of this design transformation, delivering premium frameless glass partition solutions for residences, offices, retail stores, hospitality spaces, and healthcare facilities across the NCR region.</p>

<h2>What Are Frameless Glass Partitions?</h2>
<p>Frameless glass partitions are structural glass panels installed with minimal or no visible frame, using precision-engineered hardware — channel floor tracks, top channels, and patch fittings — to create seamless, transparent divisions between spaces. Unlike traditional partitions with aluminium or timber frames, frameless systems maximize the visual impact of the glass itself.</p>

<h2>Types of Glass Partitions We Install</h2>

<h3>1. Single Glazed Frameless Partitions</h3>
<p>The most popular choice for offices and home studios. Single 12mm toughened glass panels in floor-to-ceiling configurations create an airy, open feel while defining separate zones. These are commonly used in conference rooms, cabins, and home offices.</p>

<h3>2. Double Glazed Partitions (Acoustic)</h3>
<p>For spaces requiring acoustic privacy — boardrooms, HR interview rooms, doctor's consulting rooms — double glazed frameless partitions with an air gap between panels significantly reduce sound transmission. Essential for Noida's growing healthcare clinic and business park projects.</p>

<h3>3. Frosted / Back-Painted Glass Partitions</h3>
<p>Privacy doesn't always mean opacity. Frosted glass allows light to pass while obscuring direct visibility. Back-painted glass partitions (in any RAL color) can add bold visual elements to an interior. Both are widely used in reception areas, meeting pods, and residential bedroom-to-bathroom transitions.</p>

<h3>4. Sliding Glass Partition Systems</h3>
<p>For interiors that require flexible space management, large-format frameless sliding glass panels mounted on a ceiling track allow spaces to open up or be divided on demand. Popular in Noida apartments with open-plan living and dining areas where the host wants the flexibility to create privacy.</p>

<h2>Why Frameless Glass Partitions Are Ideal for Delhi NCR Properties</h2>

<h3>Maximizes Natural Light</h3>
<p>Delhi NCR's sunny climate is a resource too valuable to waste. Traditional walls block natural light, forcing dependence on artificial lighting. Glass partitions allow sunlight to penetrate deep into interior spaces, reducing electricity consumption and creating cheerful, health-promoting work environments.</p>

<h3>Creates an Illusion of Space</h3>
<p>In a real estate market where floor space comes at a premium — especially in Noida sectors, Gurugram towers, and Delhi's built-up residential colonies — glass partitions create a visual sense of spaciousness that solid walls cannot. This is particularly valuable for 2BHK and 3BHK apartments that need to feel larger than they are.</p>

<h3>Brand and Design Statement</h3>
<p>For businesses, a glass-partitioned office communicates transparency, modernity, and confidence. For homeowners, a glass study room or dressing partition signals design sophistication. It's one of the high-impact, relatively cost-efficient upgrades you can make to any interior.</p>

<h2>Glass Partition Cost in Noida & Delhi NCR</h2>
<ul>
  <li>Single glazed frameless (12mm toughened): ₹750–₹1,100 per sq. ft.</li>
  <li>Frosted or back-painted glass partition: ₹900–₹1,300 per sq. ft.</li>
  <li>Double glazed acoustic partition: ₹1,400–₹2,000 per sq. ft.</li>
  <li>Sliding glass partition (per panel): ₹45,000–₹90,000 depending on size</li>
</ul>

<h2>Installation Process: What to Expect from Krishna Glass House</h2>
<ol>
  <li><strong>Free Site Survey:</strong> Our design consultant visits your space to understand your layout, ceiling height, floor type, and usage requirement</li>
  <li><strong>Design Proposal:</strong> We prepare a 2D layout and material specification, with options for glass type, hardware finish (stainless steel, matte black, brass), and handle style</li>
  <li><strong>Fabrication:</strong> Glass panels are cut and toughened to exact dimensions in our workshop and delivered to site</li>
  <li><strong>Installation:</strong> Our professional team installs the floor channel, top channel, glass panels, and hardware in typically 1–2 days for a medium-sized space</li>
  <li><strong>Post-Installation:</strong> We conduct a final quality check, adjust all hardware, and hand over with a full warranty document</li>
</ol>

<h2>Maintaining Glass Partitions in Delhi's Dusty Environment</h2>
<p>Delhi and Noida air brings dust, and regular cleaning keeps your glass partitions looking pristine:</p>
<ul>
  <li>Wipe down with a microfiber cloth and mild glass cleaner weekly</li>
  <li>For fingerprints (common in office settings), a dry microfiber cloth is usually sufficient</li>
  <li>Avoid ammonia-based cleaners on frosted glass — they can damage the etching</li>
  <li>Apply an anti-static spray to reduce dust adherence on large flat glass surfaces</li>
</ul>

<h2>Transform Your Space with Krishna Glass House</h2>
<p>Whether you're redesigning your Noida office to boost team collaboration, upgrading your Delhi home with a stylish glass study, or creating a premium retail environment in Gurugram — Krishna Glass House brings the expertise, material quality, and design sensibility your project deserves.</p>
<p>We serve clients across the entire NCR — Delhi, Gurugram, Noida, Greater Noida, Faridabad, and Ghaziabad — with the same commitment to quality and craftsmanship that has made us one of the most trusted names in premium glass solutions.</p>
<p><strong>Contact us today</strong> for a free consultation and elevate your space to the next level.</p>`
  }
];

// ===== HELPERS =====
function buildPostHTML(article) {
  const faqSection = article.faq ? `
    <div class="faq">
        <h2>Frequently Asked Questions</h2>
        ${article.faq.map(f => `
        <div class="faq-item">
            <h3>${f.q}</h3>
            <p>${f.a}</p>
        </div>`).join('')}
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} | Blog - Krishna Glass House</title>
    <meta name="description" content="${article.excerpt}">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://krishnaglasshouse.com/blogs/${article.slug}.html">
    <link rel="canonical" href="https://krishnaglasshouse.com/blogs/${article.slug}.html">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${article.title}","datePublished":"2025-04-06","author":{"@type":"Organization","name":"Krishna Glass House"},"publisher":{"@type":"Organization","name":"Krishna Glass House","logo":{"@type":"ImageObject","url":"https://krishnaglasshouse.com/favicon.png"}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',sans-serif;background:#f8fafc;color:#1e293b;line-height:1.7}
        .nav-bar{background:white;border-bottom:1px solid #e2e8f0;padding:16px 32px;display:flex;align-items:center;gap:12px}
        .nav-bar a{text-decoration:none;color:#64748b;font-size:.9rem}.nav-bar a:first-child{font-weight:700;color:#0f172a}
        .hero{background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:70px 24px;text-align:center}
        .hero h1{color:white;font-size:clamp(1.5rem,3.5vw,2.5rem);font-weight:800;max-width:820px;margin:0 auto 16px;line-height:1.3}
        .hero .meta{color:#94a3b8;font-size:.85rem}
        .article-body{max-width:780px;margin:60px auto;padding:0 24px 80px}
        .article-body h2{font-size:1.55rem;font-weight:700;color:#0f172a;margin:44px 0 14px}
        .article-body h3{font-size:1.15rem;font-weight:600;color:#1e3a5f;margin:28px 0 10px}
        .article-body p{margin-bottom:18px;color:#334155;font-size:1.05rem}
        .article-body ul,.article-body ol{margin:0 0 18px 26px}
        .article-body li{margin-bottom:7px;color:#334155}
        .article-body strong{color:#0f172a;font-weight:600}
        .faq{background:white;border-radius:16px;padding:40px;margin-top:60px;box-shadow:0 4px 24px rgba(0,0,0,.06)}
        .faq h2{font-size:1.4rem;margin-bottom:28px;color:#0f172a}
        .faq-item{border-bottom:1px solid #f1f5f9;padding:18px 0}
        .faq-item:last-child{border-bottom:none}
        .faq-item h3{font-size:.95rem;font-weight:600;color:#1e3a5f;margin-bottom:6px}
        .faq-item p{font-size:.9rem;color:#64748b;margin:0}
        .cta{background:linear-gradient(135deg,#1e3a5f,#0f172a);border-radius:16px;padding:48px;text-align:center;margin-top:60px;color:white}
        .cta h2{font-size:1.4rem;margin-bottom:10px}
        .cta p{opacity:.8;margin-bottom:24px;font-size:.95rem}
        .cta a{background:#f59e0b;color:#0f172a;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-size:.95rem}
    </style>
</head>
<body>
    <nav class="nav-bar">
        <a href="/">Krishna Glass House</a>
        <span>›</span>
        <a href="/blogs/">Blog</a>
        <span>›</span>
        <span style="color:#0f172a">${article.title}</span>
    </nav>
    <div class="hero">
        <h1>${article.title}</h1>
        <p class="meta">Krishna Glass House &nbsp;|&nbsp; ${article.date} &nbsp;|&nbsp; Delhi NCR's Premium Glass & Interior Experts</p>
    </div>
    <article class="article-body">
        ${article.content}
        ${faqSection}
        <div class="cta">
            <h2>Ready to Transform Your Space?</h2>
            <p>Get a free consultation from Delhi NCR's most trusted glass & interior experts.</p>
            <a href="/?section=contact">Get Free Quote →</a>
        </div>
    </article>
</body>
</html>`;
}

function buildIndexHTML() {
  const cards = ARTICLES.map(a => `
    <article class="post-card">
        <div class="card-inner">
            <span class="tag">Glass & Interiors</span>
            <h2><a href="/blogs/${a.slug}.html">${a.title}</a></h2>
            <p>${a.excerpt}</p>
            <div class="card-footer">
                <span class="date">${a.date}</span>
                <a href="/blogs/${a.slug}.html" class="read-link">Read Article →</a>
            </div>
        </div>
    </article>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Glass, Aluminium & PVC Insights — Krishna Glass House</title>
    <meta name="description" content="Expert articles on glass railings, LED mirrors, UPVC windows, frameless partitions by Krishna Glass House — Delhi NCR's trusted interior experts.">
    <link rel="canonical" href="https://krishnaglasshouse.com/blogs/">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',sans-serif;background:#f8fafc;color:#1e293b}
        nav{background:white;border-bottom:1px solid #e2e8f0;padding:16px 32px}
        nav a{text-decoration:none;color:#0f172a;font-weight:700;font-size:.9rem}
        .hero{background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:80px 20px;text-align:center}
        .hero h1{color:white;font-size:clamp(2rem,5vw,3rem);font-weight:800;margin-bottom:14px}
        .hero p{color:#94a3b8;font-size:1rem;max-width:560px;margin:0 auto}
        .blog-grid{max-width:1100px;margin:60px auto;padding:0 20px 80px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:28px}
        .post-card{background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.06);transition:all .3s ease}
        .post-card:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,.12)}
        .card-inner{padding:28px;display:flex;flex-direction:column;height:100%}
        .tag{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#f59e0b;background:#fef3c7;padding:4px 10px;border-radius:20px;display:inline-block;margin-bottom:14px}
        .card-inner h2{font-size:1.05rem;font-weight:700;color:#0f172a;margin-bottom:10px;line-height:1.4;flex-grow:1}
        .card-inner h2 a{text-decoration:none;color:inherit}
        .card-inner h2 a:hover{color:#1e3a5f}
        .card-inner p{color:#64748b;font-size:.88rem;line-height:1.6;margin-bottom:18px}
        .card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #f1f5f9;margin-top:auto}
        .date{font-size:.78rem;color:#94a3b8}
        .read-link{font-size:.82rem;font-weight:600;color:#1e3a5f;text-decoration:none}
        .read-link:hover{color:#f59e0b}
    </style>
</head>
<body>
    <nav><a href="/">← Krishna Glass House</a></nav>
    <div class="hero">
        <h1>Expert Glass & Interior Articles</h1>
        <p>Guides, tips, and insights from Delhi NCR's most trusted glass, aluminium & PVC specialists.</p>
    </div>
    <div class="blog-grid">${cards}</div>
</body>
</html>`;
}

function buildSitemap() {
  const urls = ARTICLES.map(a => `  <url>
    <loc>https://krishnaglasshouse.com/blogs/${a.slug}.html</loc>
    <lastmod>2025-04-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://krishnaglasshouse.com/blogs/</loc><lastmod>2025-04-06</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
${urls}
</urlset>`;
}

// ===== GITHUB API =====
async function apiCall(method, path, data) {
  const body = data ? JSON.stringify(data) : null;
  const opts = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`,
    method,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'kgh-blog-pusher',
      Accept: 'application/vnd.github.v3+json',
      ...(body && { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) })
    }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch { resolve(d); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function pushAll() {
  console.log('\n🚀 Krishna Glass House — Blog Pusher\n');
  console.log('📡 Connecting to GitHub...');

  const ref = await apiCall('GET', `/git/ref/heads/${GITHUB_BRANCH}`);
  const latestSHA = ref.object?.sha;
  if (!latestSHA) { console.error('❌ GitHub auth failed or repo not found'); process.exit(1); }

  const commit = await apiCall('GET', `/git/commits/${latestSHA}`);
  const baseTree = commit.tree.sha;
  console.log(`✅ Connected — repo: ${GITHUB_OWNER}/${GITHUB_REPO}, branch: ${GITHUB_BRANCH}\n`);

  const files = [];

  // Build all article files — push to ROOT /blogs/ (build.js copies root -> dist)
  for (const article of ARTICLES) {
    const html = buildPostHTML(article);
    files.push({ path: `blogs/${article.slug}.html`, content: html });
    console.log(`   📄 Ready: blogs/${article.slug}.html`);
  }

  // Overwrite index and sitemap at root /blogs/
  files.push({ path: 'blogs/index.html', content: buildIndexHTML() });
  console.log('   📄 Ready: blogs/index.html (replacing existing)');

  console.log(`\n📦 Creating GitHub tree with ${files.length} files...`);
  const tree = await apiCall('POST', '/git/trees', {
    base_tree: baseTree,
    tree: files.map(f => ({ path: f.path, mode: '100644', type: 'blob', content: f.content }))
  });

  const newCommit = await apiCall('POST', '/git/commits', {
    message: '📝 blog: Add 4 SEO-optimized articles for Krishna Glass House',
    tree: tree.sha,
    parents: [latestSHA]
  });

  await apiCall('PATCH', `/git/refs/heads/${GITHUB_BRANCH}`, { sha: newCommit.sha });

  console.log(`\n✅ SUCCESS! All files committed to GitHub!`);
  console.log(`   SHA: ${newCommit.sha}\n`);
  console.log('🌐 Live on Cloudflare Pages in ~1 minute:');
  ARTICLES.forEach(a => console.log(`   → https://krishnaglasshouse.com/blogs/${a.slug}.html`));
  console.log('   → https://krishnaglasshouse.com/blogs/\n');
}

pushAll().catch(err => { console.error('❌ Fatal error:', err.message); process.exit(1); });
