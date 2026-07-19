#!/usr/bin/env node
"use strict";
const fs = require("fs");
const name = process.argv.slice(2).filter(a => a !== "--")[0];
if (!name) { console.error("usage: pnpm run build -- <name>"); process.exit(1); }
const out = fs.readFileSync(__dirname + "/../" + name + "/index.js", "utf8").replace(/\s+/g, " ").trim();

// Collapsing newlines lets any // comment swallow the rest of the file, so verify before emitting.
try {
  new Function(out.replace(/^javascript:/, ""));
} catch (e) {
  console.error(`built bookmarklet does not parse: ${e.message}`);
  console.error("hint: a // line comment in the source comments out everything after it once newlines are collapsed; use /* */ instead");
  process.exit(1);
}

console.log(out);
