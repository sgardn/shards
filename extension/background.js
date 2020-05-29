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

// document.querySelectorAll(".coverClass .cardArea > .topLeft").forEach(function(a) {
//   console.log(a)
// })


var rangeHasOverlap = function(r1, r2) { // r -> { low: , high: }
  if (r1.low <= r2.low) {
    return r1.high > r2.low
  }

  return r2.high > r1.low // r2.low is lower than r1.lower
}

// p -> { lowX: , lowY: , highX: , highY: }
var boxesHaveOverlap = function(p1, p2) {
  var xOverlap = rangeHasOverlap({ low: p1.lowX, high: p1.highX }, { low: p2.lowX, high: p2.highX })
  var yOverlap = rangeHasOverlap({ low: p1.lowY, high: p1.highY }, { low: p2.lowY, high: p2.highY })
  return xOverlap && yOverlap
}

var fromClientRectToBox = function(node) {
  // we're running this on the topLeft class
  var cr = node.parentElement.getBoundingClientRect()

  return {
    info: node.innerText.replace(/\n/g, ""),
    lowY: cr.top,
    highY: cr.bottom,
    lowX: cr.left,
    highX: cr.right,
  }
}



var generateCenterRectangle = function() {
  // going one element too far down with the selector here
  // we backtrack with parent element
  var example = document.querySelectorAll(".coverClass .cardArea > .topLeft")[0].parentElement.getBoundingClientRect()
  var exampleCard = {
    height: example.height,
    width: example.width,
  }

  var rect = document.querySelectorAll(".cardSurfaceClass")[0].getBoundingClientRect()
  var centerLeft = rect.left + (rect.width / 2) - (exampleCard.width / 2)
  var centerRight = rect.left + (rect.width / 2) + (exampleCard.width / 2)
  var centerTop = rect.top + (rect.height / 2) - (exampleCard.height / 2)
  var centerBottom = rect.top + (rect.height / 2) + (exampleCard.height / 2)

  return {
    lowY: centerTop,
    highY: centerBottom,
    lowX: centerLeft,
    highX: centerRight,
  }
}

var centerRect = generateCenterRectangle()

// find the center of the play space
// played cards will overlap with a center card

// insert a child with these dimensions
// 52 elements
// 13 -> clubs diamonds hearts spades
document.querySelectorAll(".coverClass .cardArea > .topLeft").forEach((node, i) => {
  var point = fromClientRectToBox(node)
  var overlapsCenter = boxesHaveOverlap(centerRect, point)
  if (overlapsCenter) {
    console.log('overlap!');
    console.log(point.info);
  }
});



var bcr = document.querySelectorAll(".coverClass .cardArea > .topLeft")[30].getBoundingClientRect()
var pnt = {
  lowY: bcr.bottom,
  highY: bcr.top,
  lowX: bcr.left,
  highX: bcr.right,
}

var northCards = []
var southCards = []
var eastCards = []
var westCards = []
var playedTricks = []


// check the dom for cards in the play area
var scan = function() {
  // look at all 52 cards
  // see which ones are in the play area

  var playedCards = []
  document.querySelectorAll(".coverClass .cardArea > .topLeft").forEach((node, i) => {
    var point = fromClientRectToBox(node)
    // see if this overlaps our idea center (not tolerant of resizing right now)
    var overlap = boxesHaveOverlap(centerRect, point)
    // if it overlaps, take note and push to playedCards
    if (overlap) {
      console.log(point.info);
      playedCards.push(point)
    }
  });

  // trick completed, determine who played what
  if (playedCards.length === 4) {
    // if we haven't seen these cards...

    // northCard = playedCards
    // whether it was in suit

    // update our UI
    // document.querySelectorAll("#splinter-wrapper") ...
    // insert our inner HTML that we care about here
  }
}

var timeoutHandle = setInterval(scan, 300);
console.log('timeoutHandle', timeoutHandle);
clearInterval(timeoutHandle)
