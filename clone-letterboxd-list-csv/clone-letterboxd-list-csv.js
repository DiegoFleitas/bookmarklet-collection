javascript:(function(){
  var e = $('.really-lazy-load');
  bxd.loadReallyLazyPosters(e);
  $(document).ajaxStop(() => {
    const posterContainersXPath = '//li[contains(@class, "poster-container")]';
    const uriXPath = './/a[@class="frame has-menu"]/@href';
    const titleXPath = './/span[@class="frame-title"]/text()';
    const posterContainersNodeSet = document.evaluate(posterContainersXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
    let csvData = 'LetterboxdURI,tmdbID,imdbID,Title';
  
    for (let i = 0; i < posterContainersNodeSet.snapshotLength; i++) {
      const posterContainerNode = posterContainersNodeSet.snapshotItem(i);
  
      const uriNode = document.evaluate(uriXPath, posterContainerNode, null, XPathResult.STRING_TYPE, null);
      const titleNode = document.evaluate(titleXPath, posterContainerNode, null, XPathResult.STRING_TYPE, null);
  
      csvData += `\nhttps://letterboxd.com${uriNode.stringValue},,"${titleNode.stringValue}"`;
    }
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.click();

    URL.revokeObjectURL(url);
  });
})()
