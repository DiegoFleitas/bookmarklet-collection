[Bookmarklet Source](index.js)(Right-click to save as a bookmark, or drag to bookmark bar)

This JavaScript bookmarklet creates an object called Spy that observes changes in the DOM of a webpage. To use it for inspecting a specific DOM element, follow these steps:

    Save the script as a bookmarklet and click it while on a webpage.
    Open your browser's developer tools and select the desired element in the "Elements" tab.
    In the "Console" tab, enter Spy.observe($0). The $0 represents the currently selected element.

Now, whenever the selected element is modified, the JavaScript execution will pause due to the debugger statement in the Spy["break"] function. The stack trace will be logged using console.trace(), allowing you to inspect the state of the script and the webpage at that moment.
