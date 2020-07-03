


function getZIndex (e) {
    var z = document.defaultView.getComputedStyle(e).getPropertyValue('z-index');
    if (isNaN(z)) return getZIndex(e.parentNode);


getZIndex = function (e) {      
    var z = document.defaultView.getComputedStyle(e).getPropertyValue('z-index');
    if (isNaN(z)) return getZIndex(e.parentNode);
    else return z; 
};

function scanByZIndex( topList, leadList, seenCards) {

      let partnerCount = 0 ;  let leadCount = leadList.length ;
      let c = document.querySelectorAll(".cardSurfaceClass")[0].parentElement.getBoundingClientRect()
      let pBox = [ .37 * c.width + c.left , .52 * c.width + c.left, .29 * c.height + c.top, .53 * c.height + c.top ]

      document.querySelectorAll(".coverClass .cardArea .topLeft").forEach(function(a) {
           let card = a.parentElement.getBoundingClientRect() ;
           if (card.top != 0) { 

                // counting visible cards in top hand --  if > 1, we are not defending or hand is finished - might be 1 if top hand card is starting to move
                if ( card.top > c.top  && (card.top - c.top) / c.height <=  .05 ) { partnerCount++ } ;

                // rename "10" cards to "T" 
                if (a.innerText.substring(0,1) == '1')  {cardName =  a.getElementsByClassName("suit")[0].innerText  + "T" }
                else { cardName =   a.getElementsByClassName("suit")[0].innerText + a.innerText.substring(0,1) }

                // first trick - pushing dummy cards and bottom cards to seenCards -- so when they first move, they're never interpreted as top hand cards 
                if ( leadCount == 0 && !seenCards.includes(cardName) && (card.top > .8 * c.height + c.top || card.left <= pBox[0] || card.left >= pBox[1] )) { seenCards.push(cardName) } ; 

                // any cards in playing area can still be a lead card, but only cards missing from the two shown hands can become partner cards
                // unlike shown hands, cards fron unshown hands move orthogonally when initially put in play, so don't cross playing areas of other hand cards - fixes move problem
                if ( card.left > pBox[0] && card.left < pBox[1] && card.top > pBox[2] && card.top < pBox[3] ) {
                      if (getZIndex(a) == 90 && !leadList.includes(cardName) ) {leadList.push(cardName) } ;
                      if ( !seenCards.includes(cardName) ) {
                           seenCards.push(cardName)  ;
                           if (card.top < .35 * c.height + c.top && !topList.includes(cardName) ) { topList.push(cardName) }  ;
                      }
                } 

           }
      })

      if (partnerCount > 1) { console.log("Not Defending"); return "Not Defending" };
      return [ topList, leadList, seenCards]  ;
  }  ;

function getPartnerSignals(cards, leads) {

  let spades = [String.fromCharCode(9824)];
  let hearts = [String.fromCharCode(9829)];
  let diams = [String.fromCharCode(9830)];
  let clubs = [String.fromCharCode(9827)]; 

  var i ; 
  for (i = 0; i < cards.length ; i++) {      // for each card played by top hand 

    if (leads[i].charCodeAt(0) == 9824 ) {   // spades led
      if (cards[i].charCodeAt(0) == 9824) {
        spades.push(cards[i][1])             //  just add card rank when when top hand follows suit
      } else {
        spades.push(cards[i])                //  add card rank and card suit when top hand doesn't follow suit
      }
    }
    if (leads[i].charCodeAt(0) == 9829 ) {   // hearts led
      if (cards[i].charCodeAt(0) == 9829) {
        hearts.push(cards[i][1])
      } else {
        hearts.push(cards[i])
      }
    }
    if (leads[i].charCodeAt(0) == 9830 ) {   // diamonds led 
      if (cards[i].charCodeAt(0) == 9830) {
        diams.push(cards[i][1])
      } else {
        diams.push(cards[i])
      }
    }
    if (leads[i].charCodeAt(0) == 9827 ) {   // clubs led 
      if (cards[i].charCodeAt(0) == 9827) {
        clubs.push(cards[i][1])
      } else {
        clubs.push(cards[i])
      }
    }
  }

  return [spades, hearts, diams, clubs];
}
