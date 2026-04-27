const fs = require("fs");
const path = require("path");

const appDir = process.argv[2];

if (!appDir) {
  console.error("Expected an app directory argument.");
  process.exit(1);
}

const targets = [
  ".next/dev/server/middleware",
  ".next/dev/server/middleware-build-manifest.js",
  ".next/dev/server/middleware-manifest.json",
  ".next/dev/server/middleware.js",
  ".next/dev/server/middleware.js.map",
  ".next/dev/static/development/_clientMiddlewareManifest.js",
  ".next/server/middleware",
  ".next/server/middleware-build-manifest.js",
  ".next/server/middleware-manifest.json",
  ".next/server/middleware.js",
  ".next/server/middleware.js.map",
  ".next/server/middleware.js.nft.json",
].map((target) => path.join(appDir, target));

for (const target of targets) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch {
    // Ignore cleanup misses so local dev still starts.
  }
}
