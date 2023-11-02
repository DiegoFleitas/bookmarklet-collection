# bookmarklet-collection

A collection of old bookmarklets I wrote and still use once in a full moon. Most of them are not actively maintained and may not work as expected today. Better placed on a repo than among the (too many) bookmarks on my Firefox browser.

This repository utilizes a clever setup using GitHub Pages to provide a dynamic list of all the bookmarklets contained herein. Each bookmarklet is housed in its own directory at the root level of the repository. The [`gh-pages`](https://github.com/DiegoFleitas/bookmarklet-collection/tree/gh-pages) branch hosts an `index.html` file which, when accessed, fetches the list of directories (each representing a bookmarklet) from the GitHub API, and dynamically creates draggable bookmarklet links for each one. This way, the page always reflects the current set of bookmarklets in the repository without any manual updating of the HTML file.

## Live Bookmarklet Page

Visit [the live page](https://diegofleitas.github.io/bookmarklet-collection/) to see all the bookmarklets and drag them to your bookmarks bar.

## How it Works

1. **GitHub Pages Setup**: A `gh-pages` branch is created to host the `index.html` file which is accessible via GitHub Pages at `https://diegofleitas.github.io/bookmarklet-collection/`.
2. **Dynamic Directory Listing**: The `index.html` file contains JavaScript that fetches the list of directories in the repository using the GitHub API. Each directory represents a bookmarklet.
3. **Draggable Bookmarklet Links**: For each directory, the JavaScript fetches the corresponding `index.js` file which contains the bookmarklet code, and creates a draggable link on the page.

## Resources

- [JS Builder](http://subsimple.com/bookmarklets/jsbuilder.htm): A tool for creating and testing bookmarklets.
- [Esprima Validator](https://esprima.org/demo/validate.html): A JavaScript syntax validator to ensure your code is free of syntax errors. (This won't catch comments, remember you can't have those in a single-line bookmarklet :wink:)
