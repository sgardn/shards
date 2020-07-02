function getPartnerSignals(cards, leads) {
  var i;   let hearts = [String.fromCharCode(9829)];  let spades = [String.fromCharCode(9824)];  let clubs = [String.fromCharCode(9827)]; let diams = [String.fromCharCode(9830)];

  let justSuits = [] ;
  for (i = 0; i < cards.length ; i++) {
    justSuits.push(leads[i][0])

    if (leads[i].charCodeAt(0) == 9824 ) {
      if (cards[i].charCodeAt(0) == 9824) {
        spades.push(cards[i][1])
      } else {
        spades.push(cards[i])
      }
    }
    if (leads[i].charCodeAt(0) == 9829 ) {
      if (cards[i].charCodeAt(0) == 9829) {
        hearts.push(cards[i][1])
      } else {
        hearts.push(cards[i])
      }
    }
    if (leads[i].charCodeAt(0) == 9830 ) {
      if (cards[i].charCodeAt(0) == 9830) {
        diams.push(cards[i][1])
      } else {
        diams.push(cards[i])
      }
    }
    if (leads[i].charCodeAt(0) == 9827 ) {
      if (cards[i].charCodeAt(0) == 9827) {
        clubs.push(cards[i][1])
      } else {
        clubs.push(cards[i])
      }
    }
  }

  return [spades, hearts, diams, clubs];
}

function scanPlayingArea(cardsPlayedByPartner, leadList, spot ) {
  let cardName = "" ;  let card = "" ;  let visibleCount = 0 ;  let partnerCount = 0 ; let topCard = [] ; let leftCard = [] ; let rightCard = []  ; let bottomCard = [] ; suitLed = "";
  let hearts = [] ; let spades = []  ;  let diams = [] ; let clubs = [] ;

  let c = document.querySelectorAll(".cardSurfaceClass")[0].parentElement.getBoundingClientRect()

  // [left, right, top, bottom] for each player's played cards to the center
  // IDEA - this is safer if we just look at 0 - 4 cards in center and piece together who played what based on position and overlapping (z-index)
  let tBox = [ .43 * c.width + c.left , .47 * c.width + c.left, .29 * c.height + c.top, .35 * c.height + c.top ]
  let lBox = [ .37 * c.width + c.left , .42 * c.width + c.left, .39 * c.height + c.top, .45 * c.height + c.top ]
  let rBox = [ .48 * c.width + c.left , .52 * c.width + c.left, .35 * c.height + c.top, .41 * c.height + c.top ]
  let bBox = [ .43 * c.width + c.left , .48 * c.width + c.left, .46 * c.height + c.top, .53 * c.height + c.top ]

  // this doesn't match facedown cards because they have no "topLeft"
  // only matches face up cards (in play, self, and dummy)
  document.querySelectorAll(".coverClass .cardArea .topLeft").forEach(function(a) {

    // TODO ignore cards with 0 top position
     card = a.parentElement.getBoundingClientRect();
     // undisplayed cards have top value of 0
     if (card.top != 0) { visibleCount++ };
     // only count visible cards
     if ( card.top > c.top  && (card.top - c.top) / c.height <=  .05 ) { partnerCount++ }

     if (a.innerText.substring(0,1) == '1')  {cardName =  a.getElementsByClassName("suit")[0].innerText  + "T" }
     else { cardName =   a.getElementsByClassName("suit")[0].innerText + a.innerText.substring(0,1) }

     if ( card.left > tBox[0] && card.left < tBox[1] && card.top > tBox[2] && card.top < tBox[3] ) {
       topCard =  [ card.left, card.top, cardName ];
       // console.log("topCard", topCard)
     }
     if ( card.left > lBox[0] && card.left < lBox[1] && card.top > lBox[2] && card.top < lBox[3] ) {
       leftCard = [ card.left, card.top, cardName ];
       // console.log("leftCard", leftCard)
     }
     if ( card.left > rBox[0] && card.left < rBox[1] && card.top > rBox[2] && card.top < rBox[3] ) {
       rightCard = [card.left, card.top, cardName ];
       // console.log("rightCard", rightCard)
     }
     if ( card.left > bBox[0] && card.left < bBox[1] && card.top > bBox[2] && card.top < bBox[3] ) {
       bottomCard = [ card.left, card.top, cardName ];
       // console.log("bottomCard", bottomCard)
     }
  })

  if (visibleCount === 52) {
    return "Complete"
  }

   // console.log(visibleCount, partnerCount);
   if (partnerCount != 0) {
     // console.log("Not Defending");
     return "Not Defending"
   };

   // each card is really an array of three values
   // [left, top, name]
   // where name is "6H"

   if ( topCard.length == 3 && leftCard.length == 0 ) {
      // console.log("top card Led", topCard[2]);
      if (!leadList.includes(topCard[2])) {
        leadList.push(topCard[2])
      }
   }

   if ( leftCard.length == 3 && bottomCard.length == 0 ) {
     // console.log("left card Led", leftCard[2]);
     if (!leadList.includes(leftCard[2])) {
       leadList.push(leftCard[2])
     }
   }

   if ( bottomCard.length == 3 && rightCard.length == 0 ) {
     // console.log("bottom card Led", bottomCard[2]);
     if (!leadList.includes(bottomCard[2])) {
       leadList.push(bottomCard[2])
     }
   }

   if (rightCard.length == 3 && topCard.length == 0 ) {
     // console.log("right card Led", rightCard[2]);
     if (!leadList.includes(rightCard[2])) {
       leadList.push(rightCard[2])
     }
   }

   if (cardsPlayedByPartner.length > 0 && spot.length == 2 && topCard[0] == spot[0] && topCard[1] == spot[1] && !cardsPlayedByPartner.includes(topCard[2]) ) {
     cardsPlayedByPartner.push(topCard[2])
   } //  PROCESS NEW LIST HERE

   if (spot.length == 0 && topCard.length == 3 ) {
     // cards played by partner base case
     cardsPlayedByPartner = [topCard[2]];

     // west (left) declarer
     // waiting for 27 cards - your 13, dummy 13, and partner's lead because dummy is east (right)
     // presence of the "right card" indicates that the transition for partner's card is done
     if (visibleCount == 27 && rightCard.length == 3 ) {
       spot = [topCard[0],topCard[1]]
     }

     // east (right) declarer
     // waiting for 28 cards - your 13, dummy 13, declarer + partner to play 1 each
     if (visibleCount == 28 && bottomCard.length == 3 && leftCard.length == 3 && rightCard.length == 3 ) {
       spot = [topCard[0],topCard[1]]
     }
   }
   return [cardsPlayedByPartner, leadList, spot];
};

let partnerCardSpot = []
let cardsPlayedByPartner = []
let cardsLed = []

let handle = setInterval(function() {
  let vals = scanPlayingArea(cardsPlayedByPartner, cardsLed, partnerCardSpot)
  if (vals === "Not Defending") {
    console.log("BAD")
  } else {
    cardsPlayedByPartner = vals[0]
    cardsLed = vals[1]
    partnerCardSpot = vals[2]
  }
  // console.log("cardsPlayedByPartner", cardsPlayedByPartner);
  // console.log("cardsLed", cardsLed);

  console.log(getPartnerSignals(cardsPlayedByPartner, cardsLed))
  // write to DOM based on results
}, 500);

console.log("handle is: ", handle);

clearInterval(handle)


// WIP promise oriented stuff

async function testW(safety, cardList) {
   let nextCard = getTopHandPlayedCard()
   if (nextCard != "noCard" && !cardList.includes(nextCard) ) { cardList.push(nextCard) ; console.log(cardList)  }
   await sleep(600)
   if (cardList.length > 5) { console.log( " timed out after 5 card") ; return }
   if (safety > 80)  { console.log("timed out after", safety, "tries") ; return }
   return testW(safety +1, cardList) }


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
