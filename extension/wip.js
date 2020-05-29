// once this is ready, put this into the background.js file "code" block


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

var northCards = []
var southCards = []
var eastCards = []
var westCards = []

function compareY(a, b) {
  if (a.lowY > b.lowY) {
    return 1;
  }
  if (a.lowY < b.lowY) {
    return -1;
  }
  return 0;
}

function compareX(a, b) {
  if (a.lowX > b.lowX) {
    return 1;
  }
  if (a.lowX < b.lowX) {
    return -1;
  }
  return 0;
}

// check the dom for cards in the play area
var scan = function() {
  console.log('scanning');
  // look at all 52 cards see which ones are in the play area

  var playedCards = []
  document.querySelectorAll(".coverClass .cardArea > .topLeft").forEach((node, i) => {
    var point = fromClientRectToBox(node)
    // see if this overlaps our idea center (not tolerant of resizing right now)
    var overlap = boxesHaveOverlap(centerRect, point)
    // if it overlaps, take note and push to playedCards
    if (overlap) {
      // console.log(point.info);
      playedCards.push(point)
    }
  });

  console.log(playedCards);

  // trick completed, determine who played what
  if (playedCards.length === 4) {
    console.log('ready to process!');

    // { lowX: , lowY: , highX: , highY: , info: }
    var sortedByMinX = playedCards.sort(compareX)
    var eastCard = sortedByMinX[3];
    var westCard = sortedByMinX[0];
    var sortedByMinY = playedCards.sort(compareY)
    var northCard = sortedByMinY[0];
    var southCard = sortedByMinY[3];

    if (northCards.includes(northCard.info)) {
      console.log('already seen these cards');
    } else {
      console.log('processing');
      console.log(playedCards);
      northCards.push(northCard.info)
      southCards.push(southCard.info)
      eastCards.push(eastCard.info)
      westCards.push(westCard.info)

      // TODO
      // update our UI
      // document.querySelectorAll("#splinter-wrapper") ...
      // insert our inner HTML that we care about here
    }
  }

  console.log("cards that we've seen played")
  console.log("northCards", northCards)
  console.log("southCards", southCards)
  console.log("eastCards", eastCards)
  console.log("westCards", westCards)
}

var timeoutHandle = setInterval(scan, 10000);
console.log('timeoutHandle', timeoutHandle);
// clearInterval(timeoutHandle)

// TODO
// what was lead?
