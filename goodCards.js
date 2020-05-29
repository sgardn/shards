let cards = $(".backgroundFront")
let thisAdd = [] 
let unplayedRectanges = cards.map(function(i, c) {
let rect = c.getBoundingClientRect()

if ((rect.width == 0) || (rect.height == 0)) {
              let cardStringLength = c.innerText.length / 2
              if (c.innerText.substring(0,2) == "10") { 
              if (cardsPlayed.indexOf("T".concat(c.innerText[2])) == -1) {cardsPlayed.push("T".concat(c.innerText[2])) 
              }
              }
              else {if (cardsPlayed.indexOf(c.innerText.substring(0,cardStringLength)) == -1) { cardsPlayed.push(c.innerText.substring(0,cardStringLength)) }}
              }

else  {
           if ((myArrX.indexOf(rect.x) == -1)  && (myArrY.indexOf(rect.y) == -1 )) {
           let thisCard = c.getElementsByClassName("topLeft")[0].innerText
           let thisRank = thisCard.substring(0,thisCard.length-2)
           if (thisRank == "10") { thisRank = "T" }
           let a = myArrY.sort((a,b) => (a-b))
           thisAdd.push(thisRank.concat(thisCard[thisCard.length-1]))
    }  }
})

console.log("cardsPreviouslyPlayed", cardsPlayed)
console.log("thisTrick",thisAdd)

for ( i=0; i< thisAdd.length; i++) {  if ( cardsPlayed.indexOf(thisAdd[i]) < 0) {cardsPlayed.push(thisAdd[i]) }  }

let allPlayed = [[],[],[],[]] 
let hands = [north, south, east, west] 
for( i=0; i<cardsPlayed.length; i++) {  
     for(j=0; j<4; j++) {  if (hands[j].indexOf(cardsPlayed[i]) != -1) { allPlayed[j].push(cardsPlayed[i]) } }
}
console.log("allPlayed",allPlayed)
