// import express from "express";

// const app = express();

// const PORT = process.env.PORT || 6789;

// app.get("/healthz-new", (req, res) => {
//   res.status(200).send("OK");
// });

// app.get("/fetch", (req, res) => {
//   res.status(200).send("Hello world");
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on ${PORT}`);
// });

import * as mockttp from "mockttp";

(async () => {
  const PORT = process.env.PORT || 6789;
  const https = await mockttp.generateCACertificate();
  const server = mockttp.getLocal({
    https,
    http2: true,
    recordTraffic: false,
  });

  server.forAnyRequest().thenPassThrough();
  await server.start(PORT);

  const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);
  console.log(`Server running on port ${server.port}`);
  console.log(`CA cert fingerprint ${caFingerprint}`);
})();
