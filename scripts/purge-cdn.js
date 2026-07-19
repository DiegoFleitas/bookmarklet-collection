#!/usr/bin/env node
"use strict";

// Purge jsDelivr CDN cache for this repo's @main branch.
// jsDelivr returns "status": "finished" immediately, then takes ~1-5 min
// for edge propagation across Cloudflare and Fastly.
//
// To verify propagation, compare the SHA-384 of the CDN-served file
// against the entry in docs/bookmarklet-integrity.json.
//
// See https://github.com/jsdelivr/jsdelivr#caching

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const pathModule = require("path");

const MANIFEST_PATH = pathModule.resolve(__dirname, "..", "docs", "bookmarklet-integrity.json");

const arg = process.argv[2];
const verify = arg === "purge";
const name = verify ? process.argv[3] : arg;
const purgePath = name
  ? `/gh/DiegoFleitas/bookmarklet-collection@main/${name}/index.js`
  : `/gh/DiegoFleitas/bookmarklet-collection@main`;
const cdnBase = "https://cdn.jsdelivr.net";

function request(method, url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const opts = { hostname: u.hostname, path: u.pathname + u.search, method };
    https.request(opts, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(body));
    }).on("error", reject).end();
  });
}

async function main() {
  console.log(`purging ${purgePath} …`);
  const body = await request("GET", `https://purge.jsdelivr.net${purgePath}`);
  const parsed = JSON.parse(body);
  console.log(JSON.stringify(parsed, null, 2));

  const pathEntry = parsed.paths?.[purgePath];
  if (pathEntry?.throttled) {
    console.warn("\nthrottled — try again in a few seconds");
  }

  if (!verify) return;

  const entriesToVerify = name ? [name] : Object.keys(JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")));

  console.log("\nwaiting 5s for propagation …");
  await new Promise((r) => setTimeout(r, 5000));

  for (const entry of entriesToVerify) {
    const cdnUrl = `${cdnBase}/gh/DiegoFleitas/bookmarklet-collection@main/${entry}/index.js`;
    const cdnBody = await request("GET", cdnUrl);
    const hash = "sha384-" + crypto.createHash("sha384").update(cdnBody, "utf8").digest("base64");
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    const expected = manifest[entry];
    const ok = hash === expected;
    console.log(`${ok ? "✓" : "✗"} ${entry} ${ok ? "matches" : "MISMATCH — expected " + expected + " got " + hash}`);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
