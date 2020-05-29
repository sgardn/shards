let cards = $(".backgroundFront")
let myArrAll = [] 
let myArrX = []
let myArrY = []
let unplayedRectanges = cards.map(function(i, c) {
	let rect = c.getBoundingClientRect()
  if ((rect.width != 0) || (rect.height != 0)) {
         if (c.innerText.length == 9) { 
           myArrAll.push(["T".concat(c.innerText[3]),rect.x,rect.y]) }
         else { 
            myArrAll.push([c.innerText[0].concat(c.innerText[2]),rect.x,rect.y]) }
         if (myArrY.indexOf(rect.y) == -1) {myArrY.push(rect.y) }
         if (myArrX.indexOf(rect.x) == -1) {myArrX.push(rect.x) }
	   return ( myArrX, myArrY)  }})
let a = myArrY.sort((a,b) => (a-b))
// console.log(myArrAll)
let north = [] 
let south = [] 
let east = [] 
let west = [] 
let ew = [[0],[0],[0],[0]]
thresh = [0,0,0,0] 
let splitIndex = [0,0,0,0]
let ewMax = 0
for(i = 0; i < myArrAll.length; i++) { 
   if (myArrAll[i][2] == a[0] ) { north.push(myArrAll[i][0])  }
   if (myArrAll[i][2] == a[5] ) { south.push(myArrAll[i][0])  }
   for(j = 0; j < 4; j++) {
     if (myArrAll[i][2] == a[j+1] ) { 
     ew[j].push(myArrAll[i][1]) 
     if (myArrAll[i][1] > ewMax) { ewMax = myArrAll[i][1] }     }}}
let thisMax = 0 
for(k = 0; k < 4; k++) {
    ew[k].push(ewMax) 
    for (m=0; m< ew[k].length-1; m++) {
     if (ew[k].sort((a,b) =>(a-b))[m+1] - ew[k].sort((a,b) =>(a-b))[m] > thresh[k]) { 
     thresh[k] = ew[k].sort((a,b) =>(a-b))[m+1] - ew[k].sort((a,b) =>(a-b))[m] 
     splitIndex[k] = ew[k].sort((a,b) =>(a-b))[m]    }}
      }
for(i = 0; i < myArrAll.length; i++) {
  for(p = 1; p < 5; p++) {
   if (myArrAll[i][2] == a[p]) { 
       if (myArrAll[i][1] > splitIndex[p-1]) {east.push(myArrAll[i][0])  }
       else { west.push(myArrAll[i][0]) } }} }
let cardsPlayed = [] 
console.log("NORTH", north, "SOUTH", south, "EAST", east, "WEST", west) 
