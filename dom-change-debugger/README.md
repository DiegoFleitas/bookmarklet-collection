# DOM change debugger

Injects a `Spy` helper object that uses a `MutationObserver` to watch a chosen element for DOM changes. When the element is mutated, JavaScript execution pauses at a `debugger` statement and a stack trace is logged, so you can see what code triggered the change.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL. Click it on any page to inject `Spy`.
2. In DevTools, select the element of interest in the **Elements** panel.
3. In the **Console**, run:
   ```js
   Spy.observe($0)
   ```
4. Interact with the page. When the element changes, execution pauses and a stack trace appears.

## Notes

- Reload the page or call `Spy.disconnect()` in the console to stop observing.
- Only use this on pages you are authorized to debug.
