import server from '../dist/server/server.js';

export default async function handler(req, res) {
  const response = await server.fetch(req);
  
  res.statusCode = response.status;
  
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }
  
  res.end(await response.text());
}
