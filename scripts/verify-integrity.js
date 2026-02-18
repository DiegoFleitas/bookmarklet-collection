#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const REPO_ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(REPO_ROOT, "docs", "bookmarklet-integrity.json");

function isBookmarkletDir(name) {
  if (name.startsWith(".")) return false;
  const indexPath = path.join(REPO_ROOT, name, "index.js");
  return fs.existsSync(indexPath);
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

function loadManifest() {
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read or parse integrity manifest at: ${MANIFEST_PATH}`);
    console.error("Run scripts/update-integrity.js to (re)generate the manifest.");
    if (err && err.message) {
      console.error(`Underlying error: ${err.message}`);
    }
    process.exit(1);
  }
}

const manifest = loadManifest();
const dirs = getBookmarkletDirs();
const dirsSet = new Set(dirs);
let failed = false;

for (const dir of dirs) {
  const expected = manifest[dir];
  if (expected === undefined) {
    console.error(`Manifest missing entry for: ${dir}. Run scripts/update-integrity.js`);
    failed = true;
    continue;
  }
  const indexPath = path.join(REPO_ROOT, dir, "index.js");
  const content = fs.readFileSync(indexPath, "utf8");
  const actual = "sha384-" + sha384Base64(content);
  if (actual !== expected) {
    console.error(`Integrity mismatch for ${dir}: expected ${expected}, got ${actual}. Run scripts/update-integrity.js`);
    failed = true;
  }
}

const manifestDirs = Object.keys(manifest).sort();
const dirsSet = new Set(dirs);
for (const dir of manifestDirs) {
  if (!dirsSet.has(dir)) {
    console.error(`Manifest has extra entry for missing dir: ${dir}. Run scripts/update-integrity.js`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Integrity check passed.");
