

function getSignals(cards, leads) {  
        var i;   let hearts = [String.fromCharCode(9829)] ;  let spades = [String.fromCharCode(9824)] ;  let clubs = [String.fromCharCode(9827)]  ; let diams = [String.fromCharCode(9830)] ;
        console.log("cards", cards) ;
        console.log("leads", leads) ;  
        let justSuits = [] ; 
        for (i = 0; i < cards.length ; i++) {
            justSuits.push(leads[i][0]) 
      //    console.log(cards[i],leads[i], cards[i].charCodeAt(0), leads[i].charCodeAt(0)) ; 
       //   console.log(leads[i].charCodeAt(0) == 9824, cards[i].charCodeAt(0) == 9824) ; 
            if (leads[i].charCodeAt(0) == 9824 ) {
                if (cards[i].charCodeAt(0) == 9824)  { spades.push(cards[i][1])  }
                else { spades.push(cards[i]) }
            }
            if (leads[i].charCodeAt(0) == 9829 ) {
                if (cards[i].charCodeAt(0) == 9829)  { hearts.push(cards[i][1])  }
                else { hearts.push(cards[i]) }
           }
           if (leads[i].charCodeAt(0) == 9830 ) {
                if (cards[i].charCodeAt(0) == 9830)  { diams.push(cards[i][1])  }
                else { diams.push(cards[i]) }
           }
           if (leads[i].charCodeAt(0) == 9827 ) {
                if (cards[i].charCodeAt(0) == 9827)  { clubs.push(cards[i][1])  }
                else { clubs.push(cards[i]) }
           }
        } 
          console.log(justSuits) ; 
          console.log( spades[0] + " " + spades[1] + " " + spades[2], "   " + hearts[0] + " " + hearts[1] + " " + hearts[2] + " " + hearts[3], "   " + diams[0] + " " + diams[1] + " " + diams[2]) 
          console.log( spades.slice(0,3), hearts.slice(0,4), diams.slice(0,3), clubs.slice(0,3)) ; 
          return [ spades, "hearts", hearts, "diams", diams, clubs]  ;
  }



function shortTop( topList, leadList, spot ) {

      let cardName = "" ;  let card = "" ;  let visibleCount = 0 ;  let partnerCount = 0 ; let topCard = [] ; let leftCard = [] ; let rightCard = []  ; let bottomCard = [] ; suitLed = ""; 
      let hearts = [] ; let spades = []  ;  let diams = [] ; let clubs = [] ; 

      let c = document.querySelectorAll(".cardSurfaceClass")[0].parentElement.getBoundingClientRect()

      let tBox = [ .43 * c.width + c.left , .47 * c.width + c.left, .29 * c.height + c.top, .35 * c.height + c.top ]
      let lBox = [ .37 * c.width + c.left , .42 * c.width + c.left, .39 * c.height + c.top, .45 * c.height + c.top ]
      let rBox = [ .48 * c.width + c.left , .52 * c.width + c.left, .35 * c.height + c.top, .41 * c.height + c.top ]    
      let bBox = [ .43 * c.width + c.left , .48 * c.width + c.left, .46 * c.height + c.top, .53 * c.height + c.top ]

      document.querySelectorAll(".coverClass .cardArea .topLeft").forEach(function(a) {
         
         card = a.parentElement.getBoundingClientRect() ;
         if (card.top != 0) { visibleCount++ };   
         if ( card.top > c.top  && (card.top - c.top) / c.height <=  .05 ) { partnerCount++ }
         
         if (a.innerText.substring(0,1) == '1')  {cardName =  a.getElementsByClassName("suit")[0].innerText  + "T" }
         else { cardName =   a.getElementsByClassName("suit")[0].innerText + a.innerText.substring(0,1) }
         
         if ( card.left > tBox[0] && card.left < tBox[1] && card.top > tBox[2] && card.top < tBox[3] ) { topCard =  [ card.left, card.top, cardName ] ; console.log("topCard", topCard) } ; 
         if ( card.left > lBox[0] && card.left < lBox[1] && card.top > lBox[2] && card.top < lBox[3] ) { leftCard = [ card.left, card.top, cardName ] ; console.log("leftCard", leftCard) } ;
         if ( card.left > rBox[0] && card.left < rBox[1] && card.top > rBox[2] && card.top < rBox[3] ) { rightCard = [card.left, card.top, cardName ] ; console.log("rightCard", rightCard) } ;
         if ( card.left > bBox[0] && card.left < bBox[1] && card.top > bBox[2] && card.top < bBox[3] ) { bottomCard = [ card.left, card.top, cardName ] ; console.log("bottomCard", bottomCard) } ;
      })

       console.log(visibleCount, partnerCount) ;

       if (partnerCount != 0) { console.log("Not Defending"); return "Not Defending" };
       
       if ( topCard.length == 3 && leftCard.length == 0 )  { console.log("top card Led", topCard[2]); if (!leadList.includes(topCard[2])) {leadList.push(topCard[2])} }
       if ( leftCard.length == 3 && bottomCard.length == 0 )  { console.log("left card Led", leftCard[2]) ; if (!leadList.includes(leftCard[2])) {leadList.push(leftCard[2])} }
       if ( bottomCard.length == 3 && rightCard.length == 0 )  { console.log("bottom card Led", bottomCard[2]) ; if (!leadList.includes(bottomCard[2])) {leadList.push(bottomCard[2])} }
       if ( rightCard.length == 3 && topCard.length == 0 )  { console.log("right card Led", rightCard[2]) ; if (!leadList.includes(rightCard[2])) {leadList.push(rightCard[2])} }


       if (topList.length > 0 && spot.length == 2 && topCard[0] == spot[0] && topCard[1] == spot[1] && !topList.includes(topCard[2]) ) { topList.push(topCard[2]) } ;  //  PROCESS NEW LIST HERE
       if (partnerCount == 0 && spot.length == 0 && topCard.length == 3 ) {
           topList = [topCard[2]] ; 
           if (visibleCount == 27 && rightCard.length == 3 ) { spot = [topCard[0],topCard[1]]  }
           if (visibleCount == 28 &&  bottomCard.length == 3 && leftCard.length == 3 && rightCard.length == 3 ) { spot = [topCard[0],topCard[1]]  }
           }
       return [ topList, leadList, spot]  ;
  }  ;


async function testW(safety, cardList) {
   let nextCard = getTopHandPlayedCard() 
   if (nextCard != "noCard" && !cardList.includes(nextCard) ) { cardList.push(nextCard) ; console.log(cardList)  } 
   await sleep(600) 
   if (cardList.length > 5) { console.log( " timed out after 5 card") ; return }
   if (safety > 80)  { console.log("timed out after", safety, "tries") ; return }
   return testW(safety +1, cardList) } 


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }



