export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = process.env.API_BACKEND_URL; // From Vercel ENV

  const targetUrl = `${backendUrl}/${path.join("/")}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization || "",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed", details: error });
  }
}
