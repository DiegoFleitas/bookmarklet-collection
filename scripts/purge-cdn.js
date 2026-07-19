#!/usr/bin/env node
"use strict";
const https = require("https"), crypto = require("crypto"), fs = require("fs");
const m = JSON.parse(fs.readFileSync(__dirname + "/../docs/bookmarklet-integrity.json"));
const name = process.argv.slice(2).filter(a => a !== "--")[0];
const list = name ? [name] : Object.keys(m);
const get = u => new Promise((r, j) => {
  const req = https.get(u, s => { let b = ""; s.on("data", c => b += c); s.on("end", () => r(b)); });
  req.on("error", j);
  req.setTimeout(15000, () => req.destroy(new Error(`request timed out: ${u}`)));
});
(async () => {
  for (const n of list) {
    console.log(`purging ${n} …`);
    const path = `/gh/DiegoFleitas/bookmarklet-collection@main/${n}/index.js`;
    /* jsDelivr reports status "finished" even when it throttled the purge into a no-op. */
    const res = JSON.parse(await get(`https://purge.jsdelivr.net${path}`));
    const info = (res.paths || {})[path] || {};
    if (info.throttled) {
      console.log(`⚠️  ${n} — jsDelivr throttled the purge, retry in ${info.throttlingReset}s; not waiting`);
      continue;
    }
    const cdn = `https://cdn.jsdelivr.net${path}`;
    for (let i = 0; i < 20; i++) {
      const h = "sha384-" + crypto.createHash("sha384").update(await get(cdn), "utf8").digest("base64");
      if (h === m[n]) { console.log(`✅ ${n} — propagated after ${i * 12}s`); break; }
      if (i === 19) { console.log(`⏳ ${n} — still stale after 240s, giving up`); process.exit(1); }
      console.log(`   ${(i + 1) * 12}s — edge still stale, retrying`);
      await new Promise(r => setTimeout(r, 12000));
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
