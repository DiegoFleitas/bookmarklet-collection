"use strict";

const js = require("@eslint/js");
const globals = require("globals");

// Each bookmarklet is a standalone `javascript:` payload pasted into a third-party
// page: not a module, no shared scope, and deliberately exempt from linting.
// Everything else in the repo is linted with TAP-free `eslint:recommended`.
module.exports = [
  {
    ignores: [
      "**/index.js",
      "docs/bookmarklet-integrity.json",
      ".hermes/**",
      "lychee/**",
      "node_modules/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["eslint.config.js", "scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
];
