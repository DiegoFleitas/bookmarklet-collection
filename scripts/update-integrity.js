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

const dirs = getBookmarkletDirs();
const manifest = {};

for (const dir of dirs) {
  const indexPath = path.join(REPO_ROOT, dir, "index.js");
  const content = fs.readFileSync(indexPath, "utf8");
  manifest[dir] = "sha384-" + sha384Base64(content);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`Wrote ${MANIFEST_PATH} with ${Object.keys(manifest).length} entries.`);
