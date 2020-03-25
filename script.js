// run this from a teaching table

function ourLog(a) {
  console.log("SHARDS: ", a);
}

let bids = []

function getBidder(cell) {
  const wnes = $(".auctionBoxHeaderCellClass").map(function(index, bidderCell) {
    const bounding = bidderCell.getBoundingClientRect()
    return { min: bounding.left, max: bounding.right }
  })
  // ourLog(wnes);
  const rect = cell.getBoundingClientRect()
  const center = (rect.left + rect.right) / 2
  // ourLog(rect);
  // ourLog("found center", center);
  if (center < wnes[0].max) {
    return "w"
  }
  if (center > wnes[1].min && center < wnes[1].max) {
    return "n"
  }
  if (center > wnes[2].min && center < wnes[2].max) {
    return "e"
  }
  if (center > wnes[3].min) {
    return "s"
  }
}

function listAndPostBids() {
  ourLog("running")
  let children = $(".auctionClass .auctionBoxCellClass")

  // we've detected a new bid
  if (children.length > bids.length) {
    ourLog("replacing")
    bids = children.map(function(index, val) {
      // ourLog(index, val.innerText, val.getBoundingClientRect())
      const bid = { bidder: getBidder(val), val: val.innerText }
      return bid
    }).get()
    // get rid of jquery object
    ourLog("updated")
    ourLog(bids)
    ourLog("bids look like:");
    ourLog(JSON.stringify(bids));

    $.ajax({
        type: "POST",
        url: "https://sunrun.ngrok.io",
        data: JSON.stringify(bids),
        contentType: "application/json",
        success: function(data) {
          ourLog("Got back from server")
          ourLog(data)
        }
    })
  }
}

// setInterval runs every n miliseconds
let timeoutHandle = setInterval(listAndPostBids, 3000)
ourLog("timeoutHandle ->", timeoutHandle)
ourLog("to clear the timeout, enter 'clearTimeout(timeoutHandle)' into console")
