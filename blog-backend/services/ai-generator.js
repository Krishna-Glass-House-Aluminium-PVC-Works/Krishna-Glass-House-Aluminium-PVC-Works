const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const slugify = require('slugify');

/**
 * 💡 Generates a 1200+ word SEO-optimized blog post for Krishna Glass House
 */
async function generateBlogPost(userTopic = null) {
  const project = process.env.GCP_PROJECT_ID || 'explyras';
  const location = process.env.GCP_LOCATION || 'us-central1';
  const apiKey = process.env.GEMINI_API_KEY;

  const topics = [
    'Best LED Mirror Designs for Modern Bathrooms in Delhi',
    'How to Choose the Right Toughened Glass for Your Railing',
    'UPVC vs Aluminium Windows: Which is better for NCR climate?',
    'Frameless Glass Partitions: A Guide to Modern Office Interiors',
    'Custom Glass Work: Elevating Luxury Homes in Delhi/NCR',
    'The Rise of Smart Mirrors in Modern Architecture',
  ];

  const topic = userTopic || topics[Math.floor(Math.random() * topics.length)];
  
  const prompt = `
    Write a 1200+ word, highly detailed, and SEO-optimized blog post for "Krishna Glass House", a premium provider of Glass, Aluminium, and PVC works in Delhi/NCR.
    
    Topic: "${topic}"
    Target Audience: Homeowners, Architects, and Interior Designers in Delhi, Gurugram, and Noida.
    Tone: Professional, Authoritative, yet approachable.
    Model to use: Gemini 2.0 Flash (Response must be high quality).

    Structure requirements (Output MUST BE VALID JSON):
    1. Title: Catchy, SEO-rich title.
    2. Excerpt: A 160-character meta description.
    3. Content: HTML format (use <h2>, <h3>, <p>, <ul>, <li>).
       - Contextualize for Delhi/NCR (mention weather, dust, premium aesthetics).
       - Include "Krishna Glass House" as the expert recommendation.
    4. Keywords: 5-7 SEO keywords.
    5. FAQ: 3-4 Frequently Asked Questions.

    Return ONLY a JSON object:
    {
      "title": "...",
      "excerpt": "...",
      "content": "...",
      "keywords": ["...", "..."],
      "faq": [ {"q": "...", "a": "..."} ]
    }
  `;

  let modelResult;

  try {
    // Primary: Try Vertex AI (GCP Native)
    console.log('--- Attempting Generation via Vertex AI ---');
    const vertexAI = new VertexAI({ project, location });
    const vertexModel = vertexAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-001'
    });

    const result = await vertexModel.generateContent(prompt);
    const response = await result.response;
    modelResult = response.candidates[0].content.parts[0].text;

  } catch (error) {
    console.warn('⚠️ Vertex AI Failed. Using Fallback SDK with API Key...');
    
    if (!apiKey) throw new Error('GEMINI_API_KEY is missing for fallback generation.');

    const genAI = new GoogleGenerativeAI(apiKey);
    const sdkModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); 

    const result = await sdkModel.generateContent(prompt);
    const response = await result.response;
    modelResult = response.text();
  }

  // Parse and finalize
  try {
    const cleanText = modelResult.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanText);
    data.slug = slugify(data.title, { lower: true, strict: true });
    data.date = new Date().toISOString();
    return data;
  } catch (parseError) {
    console.error('Failed to parse AI response:', modelResult);
    throw new Error('AI returned invalid format. Please try again.');
  }
}

module.exports = { generateBlogPost };
