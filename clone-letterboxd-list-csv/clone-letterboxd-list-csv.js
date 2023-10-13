javascript:(function(){
  function cloneList() {
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
  

    const urlSegments = window.location.pathname.split('/');
    let fileName = 'data.csv';
    if (urlSegments.includes('list')) {
      fileName = urlSegments[urlSegments.indexOf('list') + 1] + '.csv';
    }

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.click();

    URL.revokeObjectURL(url);
    $(document).off('ajaxStop');
  }
  var e = $('.really-lazy-load');
  bxd.loadReallyLazyPosters(e);
  $(document).ajaxStop(() => {
    cloneList();
  });
  if (!e.length) {
    cloneList();
  }
})()
