/**
 * Vertex AI Gemini — Blog Content Generator
 * 
 * Generates complete, SEO-optimized standalone HTML blog posts
 * about glass works, aluminium fabrication, and PVC for Krishna Glass House.
 */

import { VertexAI } from '@google-cloud/vertexai';
import slugify from 'slugify';

/* ── Topic bank ─────────────────────────────────────────────────────────────── */
const TOPICS = [
  'Benefits of toughened glass railings for Indian homes and balconies in Delhi',
  'Frameless glass shower enclosures: A complete guide for Indian bathrooms',
  'Spider glazing vs curtain wall systems: Which is right for your Delhi building?',
  'How to choose the right glass thickness for balcony railings: 8mm vs 10mm vs 12mm',
  'Saint-Gobain vs Modiguard toughened glass: Honest comparison for Delhi consumers',
  'Glass facades for commercial buildings in Delhi NCR: Types, costs, and installation',
  'Modern glass office partition design ideas for Delhi workspaces in 2026',
  'Structural glazing: How it transforms building exteriors in West Delhi',
  'Aluminium sliding windows vs casement windows: Which suits Delhi weather better?',
  'Soundproof double-glazed aluminium windows: A must for homes near busy Delhi roads',
  'Aluminium composite panels (ACP): How they transform commercial building exteriors',
  'Aluminium bifold doors: Seamlessly merge indoor and outdoor spaces in your Delhi home',
  'Powder coating vs anodizing: Which aluminium finish lasts longer in Indian climate?',
  'Slim-line aluminium partitions for modern Delhi offices: Benefits and cost guide',
  'Custom aluminium louvers for building facades: Ventilation meets aesthetics in Delhi',
  'UPVC windows and doors: Why they are the #1 choice for Delhi homeowners in 2026',
  'PVC wall panels vs traditional tiles: Honest cost and durability comparison for India',
  'Waterproof PVC false ceilings: The best solution for Indian kitchens and bathrooms',
  'How UPVC windows can cut your AC bills by up to 30% in Delhi extreme summers',
  'Top PVC wall panel design trends for Indian living rooms in 2026',
  'LED mirrors with Bluetooth speakers: Transforming Delhi bathroom experiences',
  'How to choose the perfect LED mirror size for your bathroom vanity',
  'Anti-fog LED mirrors: An essential upgrade for Delhi winters',
  'Top 10 interior design trends reshaping Delhi homes in 2026',
  'Combining wallpaper and PVC panels to achieve a luxury look on a budget in Delhi',
  'Glass partition walls for home offices: Productivity and privacy in Delhi apartments',
  'Rooftop glass enclosures in Delhi: Design, permits, and cost breakdown 2026',
  'Best aluminium window profiles for coastal and humid zones in India',
  'Fire-rated glass doors: When you need them and what they cost in India',
  'Smart glass (electrochromic) for Delhi homes: Is it worth the investment in 2026?',
];

const IMAGE_MAP = {
  glass: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=85',
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1280&q=85',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&q=85',
  ],
  aluminium: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&q=85',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1280&q=85',
    'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1280&q=85',
  ],
  pvc: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1280&q=85',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1280&q=85',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1280&q=85',
  ],
  mirror: [
    'https://images.unsplash.com/photo-1528461153984-d0039e2040af?w=1280&q=85',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1280&q=85',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1280&q=85',
  ],
  interior: [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1280&q=85',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1280&q=85',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1280&q=85',
  ],
};

function detectCategory(topic) {
  const t = topic.toLowerCase();
  if (t.includes('mirror') || t.includes('led')) return 'mirror';
  if (t.includes('aluminium') || t.includes('aluminum')) return 'aluminium';
  if (t.includes('pvc') || t.includes('upvc')) return 'pvc';
  if (t.includes('interior') || t.includes('design') || t.includes('trend')) return 'interior';
  return 'glass';
}

function pickImage(category) {
  const pool = IMAGE_MAP[category] || IMAGE_MAP.glass;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ── Main export ────────────────────────────────────────────────────────────── */
export async function generateBlogPost(specificTopic = null) {
  const vertexAI = new VertexAI({
    project: process.env.GCP_PROJECT_ID,
    location: process.env.GCP_LOCATION || 'us-central1',
  });

  const model = vertexAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
    generationConfig: {
      temperature: 0.85,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });

  const topic = specificTopic || TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const category = detectCategory(topic);
  const heroImage = pickImage(category);
  const midImage  = pickImage(category);

  const prompt = `You are an expert SEO content writer for "Krishna Glass House" — a premium glass, aluminium, and PVC interior works company located at Shop No. 2, Mohan Nagar, Pankha Road, Opp. D-Block, Janakpuri, New Delhi - 110046. Phone: +91 87001 62623. WhatsApp: https://wa.me/918700162623.

Write a COMPLETE, production-ready blog post about: "${topic}"

CONTENT RULES:
- 1200-1800 words of informative body content
- Naturally mention "Krishna Glass House" 3-5 times with local SEO context (Janakpuri, West Delhi, Delhi NCR, Pankha Road)
- Include realistic INR price ranges where relevant (₹ symbol)
- End with a strong CTA paragraph mentioning our shop address and phone number
- Professional yet warm, engaging tone for Indian homeowners and business owners

OUTPUT FORMAT: Return ONLY a valid JSON object (no markdown, no backticks) with these exact keys:
{
  "title": "The exact H1 title — keyword-rich and compelling",
  "metaDescription": "160-char max SEO meta description with primary keyword near the start",
  "excerpt": "2-sentence teaser for the blog listing card",
  "slug": "url-friendly-slug-with-hyphens-no-special-chars",
  "category": "${category}",
  "bodyHtml": "Complete HTML body content with <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <strong> tags. Include 3-4 FAQ items in a div.faq-section at the end. DO NOT include <html>, <head>, <body> wrapper tags. Use &amp; for & in HTML."
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.candidates[0].content.parts[0].text.trim();

  // Strip markdown code fences if Gemini adds them
  const jsonText = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (e) {
    // Try extracting JSON from response
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Gemini response was not valid JSON: ${raw.slice(0, 300)}`);
    parsed = JSON.parse(match[0]);
  }

  return {
    ...parsed,
    slug: slugify(parsed.slug || parsed.title, { lower: true, strict: true }),
    heroImage,
    midImage,
    publishedAt: new Date().toISOString(),
    publishedDateDisplay: today,
  };
}
