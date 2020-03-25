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

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("chartdiv", am4charts.PieChart);
  
  // Add data
  chart.data = [ {
    "country": "Lithuania",
    "litres": 501.9
  }, {
    "country": "Czech Republic",
    "litres": 301.9
  }, {
    "country": "Ireland",
    "litres": 201.1
  }, {
    "country": "Germany",
    "litres": 165.8
  }, {
    "country": "Australia",
    "litres": 139.9
  }, {
    "country": "Austria",
    "litres": 128.3
  }, {
    "country": "UK",
    "litres": 99
  }, {
    "country": "Belgium",
    "litres": 60
  }, {
    "country": "The Netherlands",
    "litres": 50
  } ];
  
  // Set inner radius
  chart.innerRadius = am4core.percent(50);
  
  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
  
  }); // end am4core.ready()