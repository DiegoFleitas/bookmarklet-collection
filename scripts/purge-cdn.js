#!/usr/bin/env node
"use strict";
const https = require("https"), crypto = require("crypto"), fs = require("fs");
const m = JSON.parse(fs.readFileSync(__dirname + "/../docs/bookmarklet-integrity.json"));
const name = process.argv.slice(2).filter(a => a !== "--")[0];
const list = name ? [name] : Object.keys(m);
const get = u => new Promise((r, j) => https.get(u, s => { let b = ""; s.on("data", c => b += c); s.on("end", () => r(b)); }).on("error", j));
(async () => {
  for (const n of list) {
    await get(`https://purge.jsdelivr.net/gh/DiegoFleitas/bookmarklet-collection@main/${n}/index.js`);
    const cdn = `https://cdn.jsdelivr.net/gh/DiegoFleitas/bookmarklet-collection@main/${n}/index.js`;
    for (let i = 0; i < 20; i++) {
      const h = "sha384-" + crypto.createHash("sha384").update(await get(cdn), "utf8").digest("base64");
      if (h === m[n]) { console.log(`✅ ${n} — ${(i + 1) * 12}s`); break; }
      if (i === 19) { console.log(`⏳ ${n} — timeout`); process.exit(1); }
      await new Promise(r => setTimeout(r, 12000));
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
