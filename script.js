let bids = [];

const getBidder = function(cell) {
  const wnes = $(".auctionBoxHeaderCellClass").map(function(index, bidderCell) {
    const bounding = bidderCell.getBoundingClientRect();
    return { min: bounding.left, max: bounding.right };
  });
  const rect = cell.getBoundingClientRect();
  const center = (rect.left + rect.right) / 2;
  if (center < wnes[0].max) {
    return "w";
  }
  if (center > wnes[1].min && center < wnes[1].max) {
    return "n";
  }
  if (center > wnes[2].min && center < wnes[2].max) {
    return "e";
  }
  if (center > wnes[3].min) {
    return "s";
  }
}

const listAndPostBids = function() {
  ourLog("running");
  let children = $(".auctionClass .auctionBoxCellClass");

  if (children.length > bids.length) {
    ourLog("replacing");
    bids = children.map(function(index, val) {
      const bid = { bidder: getBidder(val), val: val.innerText };
      return bid;
    }).get();

    ourLog("updated");
    ourLog(bids);
    ourLog("bids look like:");
    ourLog(JSON.stringify(bids));

    $.ajax({
        type: "POST",
        url: "https://sunrun.ngrok.io",
        data: JSON.stringify(bids),
        contentType: "application/json",
        success: function(data) {
          ourLog(data);
        }
    })
  }
}

let timeoutHandle = setInterval(listAndPostBids, 3000);
ourLog("timeoutHandle ->", timeoutHandle);
ourLog("to clear the timeout, enter 'clearTimeout(timeoutHandle)' into console");

$(".dealViewerToolbarClass").append("<div style='border: 1px solid red'>HI</div>")
