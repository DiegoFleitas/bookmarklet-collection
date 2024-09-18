(() => {
let url = "https://web.archive.org/web/20130720113437oe_/http://wayback-fakeurl.archive.org/yt/7VcYz6KZtqs";

// Prompt for YouTube ID
let youtubeId = prompt("Enter the YouTube ID:");

// Append the new YouTube ID to the URL
let newUrl = `${url}/${youtubeId}`;

// Open the new URL in a new tab
window.open(newUrl, "_blank");
})();
