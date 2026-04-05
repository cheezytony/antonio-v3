import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    // Get the host from headers - Vercel provides this
    const host = req.headers.host || 'localhost';
    const protocol = 'https';
    
    // Build the full URL
    const url = `${protocol}://${host}${req.url}`;

    // Create a Web API Request object
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
    });

    const response = await server.fetch(request);

    res.statusCode = response.status;

    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    res.end(await response.text());
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
}
