chrome.browserAction.onClicked.addListener(function(tab) {
  // this logs to the background page oof
  console.log('Splinter is at your service!');
  // but logs inside the script work as expected

  chrome.tabs.executeScript(tab.id, {
    code: `
      console.log("RUNNING");
      console.log("");
      console.log("");

      var node = document.querySelector("#splinter-wrapper")
      if (!node) {
        console.log("creating wrapper")
        node = document.createElement("DIV");
        node.setAttribute("id", "splinter-wrapper")
        var text = document.createTextNode("Partner has played:");
        // text node isn't really an HTML node, just text inside the element
        node.appendChild(text);
        node.style = "background-color:blue; display: flex; flex-direction: row; align-items: center; justify-content: center;color: white;"
        document.querySelector(".dealViewerToolbarClass").appendChild(node);
      } else {
        console.log('already have wrapper');
      }

      // this allows us to rerun the script on the page
      console.log(typeof scan === 'undefined');
      if (typeof scan === 'undefined') {
        let scan = function() {
          console.log('doing stuff');
        }

        let timeoutHandle = setInterval(scan, 3000);
        console.log('initializing setInterval', timeoutHandle);
        console.log(timeoutHandle);
      }
    `
  }, function(array) {
    console.log('completed!');
  });
});
