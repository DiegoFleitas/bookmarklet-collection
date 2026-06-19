# Virtual scrollwheel

Injects three fixed buttons on the right edge of any long webpage:

- **Up arrow**: hover to scroll up continuously; click to jump to the top
- **Pause icon**: returns to the resting scroll position
- **Down arrow**: hover to scroll down continuously; click to jump to the bottom

The controls stay fixed during scrolling and fade to semi-transparent when not hovered.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Visit any long webpage.
3. Click the bookmarklet to inject the scroll controls.

## Notes

- Controls use inline styles and CSS shapes, with no external assets.
- The bookmarklet detects whether the page or an inner container scrolls and attaches to the largest scrollable element automatically.
- Aggressive custom CSS or JavaScript on the host page may interfere with button placement or behavior.
