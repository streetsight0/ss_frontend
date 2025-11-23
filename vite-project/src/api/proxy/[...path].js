export default async function handler(req, res) {
  const backend = process.env.API_BACKEND_URL; 
  const path = req.query.path.join("/");
  const url = `${backend}/api/${path}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined,
      },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(502).json({
      error: "Bad Gateway",
      details: err.message,
    });
  }
}
