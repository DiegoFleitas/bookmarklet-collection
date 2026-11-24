javascript: (function () {
  async function openQuick(link) {
    let win = window.open(link, "_blank");
    if (!win) return;
    await sleep(3000);
    win.close();
  }
  /* hrefs come from the host page: allowlist scheme and host before opening */
  function isAllowed(rawValue) {
    try {
      const target = new URL(rawValue, window.location.href);
      return (
        target.protocol === "https:" &&
        (target.hostname === "steamcommunity.com" ||
          target.hostname.endsWith(".steamcommunity.com") ||
          target.hostname === "steamid.uk" ||
          target.hostname.endsWith(".steamid.uk"))
      );
    } catch (e) {
      return false;
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function xpath(xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(
      xpathToExecute,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
      result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
  }
  var res = xpath('//a[contains(@href,"profile/")][not(ancestor::table)]/@href');
  console.log(res);
  async function main() {
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      let link = res[i];
      console.log(link.value);
      if (!isAllowed(link.value)) {
        console.log("skipped untrusted href", link.value);
        continue;
      }
      await openQuick(link.value);
    }
  }
  main();
})();
