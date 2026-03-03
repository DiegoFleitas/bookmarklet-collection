## Overview

This bookmarklet injects a small helper object called `Spy` that lets you observe DOM changes for a specific element on the current page.

When a watched element is modified, JavaScript execution pauses (via `debugger`) and a stack trace is logged so you can see what code caused the change.

## Usage

1. Save the script from `index.js` as a bookmarklet and click it while on any webpage.
2. Open your browser's developer tools and select the element of interest in the **Elements** tab.
3. Switch to the **Console** tab and run:
   - `Spy.observe($0)`
4. Interact with the page until the watched element changes.

When the element is modified:

- Execution will pause at `Spy["break"]` due to a `debugger` statement.
- A stack trace will be printed via `console.trace()`, allowing you to inspect the state of the page and calling code.

## Notes

- This is primarily a **debugging tool**; you should only use it on pages you are allowed to inspect and debug.
- You can stop observing elements by reloading the page or removing the `Spy` hooks in the console.
