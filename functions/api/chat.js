export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    
    // Check if the API key G is available in the Cloudflare environment
    if (!env.G) {
      return new Response(JSON.stringify({ error: { message: "API key 'G' not configured in Cloudflare" } }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call Gemini API using the OpenAI-compatible endpoint
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    
    // Ensure the model is set to gemini-2.5-flash
    body.model = "gemini-2.5-flash"; 
    
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.G}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: { message: err.message } }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
