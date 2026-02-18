#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const EXCLUDED_DIRS = ["docs", ".github", "scripts"];
const REPO_ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(REPO_ROOT, "docs", "bookmarklet-integrity.json");

function isBookmarkletDir(name) {
  if (name.startsWith(".")) return false;
  if (EXCLUDED_DIRS.includes(name)) return false;
  return true;
}

function sha384Base64(content) {
  return crypto.createHash("sha384").update(content, "utf8").digest("base64");
}

function getBookmarkletDirs() {
  const entries = fs.readdirSync(REPO_ROOT, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && isBookmarkletDir(e.name))
    .map((e) => e.name)
    .sort();
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const dirs = getBookmarkletDirs();
let failed = false;

for (const dir of dirs) {
  const indexPath = path.join(REPO_ROOT, dir, "index.js");
  if (!fs.existsSync(indexPath)) {
    console.error(`Bookmarklet dir ${dir}/ is missing index.js`);
    failed = true;
    continue;
  }
  const expected = manifest[dir];
  if (expected === undefined) {
    console.error(`Manifest missing entry for: ${dir}. Run scripts/update-integrity.js`);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(indexPath, "utf8");
  const actual = "sha384-" + sha384Base64(content);
  if (actual !== expected) {
    console.error(`Integrity mismatch for ${dir}: expected ${expected}, got ${actual}. Run scripts/update-integrity.js`);
    failed = true;
  }
}

const manifestDirs = Object.keys(manifest).sort();
for (const dir of manifestDirs) {
  if (!dirs.includes(dir)) {
    console.error(`Manifest has extra entry for missing dir: ${dir}. Run scripts/update-integrity.js`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Integrity check passed.");
