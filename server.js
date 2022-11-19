import * as mockttp from "mockttp";

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
