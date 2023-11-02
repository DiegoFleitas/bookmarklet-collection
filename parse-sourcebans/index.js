javascript: (function () {
  var l = (function (n) {
    for (
      var t = [],
        e = document.evaluate(
          n,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        ),
        l = 0;
      l < e.snapshotLength;
      l++
    )
      t.push(e.snapshotItem(l));
    return t;
  })('//a[contains(@href,"profiles/7")]/@href');
  console.log(l),
    (async function () {
      let t = [];
      for (let n = 0; n < l.length; n++) {
        var e = l[n];
        t.push(e.value);
      }
      alert(JSON.stringify(t));
    })();
})();
