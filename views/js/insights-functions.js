// Make the dashboard widgets sortable Using jquery UI
$('.connectedSortable').sortable({
  placeholder: 'sort-highlight',
  connectWith: '.connectedSortable',
  handle: '.box-header, .nav-tabs',
  forcePlaceholderSize: true,
  zIndex: 999999
});
$('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

function calculatePoint(i, intervalSize, colorRangeInfo) {
  var {
    colorStart,
    colorEnd,
    useEndAsStart
  } = colorRangeInfo;
  return (useEndAsStart ?
    (colorEnd - (i * intervalSize)) :
    (colorStart + (i * intervalSize)));
}

/* Must use an interpolated color scale, which has a range of [0, 1] */
function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var {
    colorStart,
    colorEnd
  } = colorRangeInfo;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}