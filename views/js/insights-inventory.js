$(document).ready(function() {
  currentDate = new Date();
  //Date picker
  $("#inventoryInsightsDatePicker")
    .datepicker()
    .datepicker("setDate", currentDate);

  //initInventoryBarGraph();
});

$("#inventoryInsightsDatePicker").datepicker({
  autoclose: true,
  format: "dd/mm/yyyy"
});

$("#inventoryInsightsDatePicker")
  .datepicker()
  .on("changeDate", function(e) {
    //a string is in the format dd/mm/yyyy is returned
    chosenDate = $("#inventoryInsightsDatePicker").val();

    $.ajax({
      url: "ajax/stocktakes.ajax.php",
      dataType: "json",
      method: "POST",
      data: { get_all_stocktakes: chosenDate },
      success: function(answer) {
        let data = [];
        let labels = [];
        if (answer != -1 && answer.length != 0) {
          for (let i = 0; i < answer.length; i++) {
            stockCount = answer[i]["stockCount"];
            if (stockCount != 0) {
              data.push(stockCount);
              productCategory = answer[i]["productCategory"];
              if (productCategory.includes("-")) {
                productCategory = productCategory.substr(0, 2);
              }
              labels.push(productCategory);
            }
          }
          showInventoryBarGraph(data, labels);
        }
      }
    });
  });

function showInventoryBarGraph(data, labels) {
  // Create the chart.js data structure using 'labels' and 'data'
  chartData = {
    labels: labels,
    datasets: [
      {
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: data
      }
    ]
  };

  // create options variable
  chartOptions = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - If there is a stroke on each bar
    barShowStroke: true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,
    //String - A legend template
    legendTemplate:
      '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    //Boolean - whether to make the chart responsive
    responsive: true,
    maintainAspectRatio: true
  };

  // Get the context of the canvas element we want to select
  var ctx = $("#inventoryBarChart")
    .get(0)
    .getContext("2d");

  if (window.barChart != undefined) {
    window.barChart.destroy();
  }
  // Instantiate a new chart
  window.barChart = new Chart(ctx).Bar(chartData, chartOptions);
}
