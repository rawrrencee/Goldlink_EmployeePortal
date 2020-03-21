console.log("hi");

$("#testButton").click(function () {

var jsonData = $.ajax({
    url: "ajax/stocktakes.ajax.php",
    dataType: "json",
    method: "POST",
    data: "get_all_stocktakes"
  }).done(function(results) {
    // Split product type and data into separate arrays
    var labels = [], data = [];
    labels = jsonData.productCategory;
    data = jsonData.stockCount;
    console.log(labels);
    console.log(data);
  });

  // Create the chart.js data structure using 'labels' and 'data'
    var tempData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }

    // create options variable
    var tempOptions = {
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
    }

    // Get the context of the canvas element we want to select
    var ctx = $('#inventoryBarChart').get(0).getContext('2d');
    tempOptions.datasetFill = false
    // Instantiate a new chart
    var barChart = new Chart(ctx).Bar(tempData, tempOptions);


});

