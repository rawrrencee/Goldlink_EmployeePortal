$(document).ready(function () {
  getTotalCategorySalesByTime_DEFAULT();
  documentTogglePdtCatInventoryFilter();
});

$("#pdtCatSalesInventoryStartDate").datepicker({
  orientation: "bottom",
  autoclose: true,
  format: "yyyy-mm-dd"
});

$("#pdtCatSalesInventoryEndDate").datepicker({
  orientation: "bottom",
  autoclose: true,
  format: "yyyy-mm-dd"
});

$("#filterPdtCatSalesInventoryByDateButtonDown").click(function () {
  $("#filterPdtCatSalesInventoryByDateButtonDown").hide();
  $("#filterPdtCatSalesInventoryByDateButtonUp").show();

  $("#filterPdtCatSalesInventoryByDate").show();
});

$("#filterPdtCatSalesInventoryByDateButtonUp").click(function () {
  $("#filterPdtCatSalesInventoryByDateButtonUp").hide();
  $("#filterPdtCatSalesInventoryByDateButtonDown").show();

  $("#filterPdtCatSalesInventoryByDate").hide();
});

function getTotalCategorySalesByTime_DEFAULT() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  startDate = moment(firstDay).format('YYYY-MM-DD');
  endDate = moment(date).format('YYYY-MM-DD');

  $.ajax({
      url: "ajax/sales.ajax.php",
      dataType: "json",
      method: "POST",
      data: {
          get_total_category_sales_by_start_date: startDate,
          get_total_category_sales_by_end_date: endDate
      },
      success: function (answer) {
          console.log(answer);
          initPdtCatSalesInventoryTable(answer);
          initTop10PdtCatSalesInventoryChart(answer);
          initTop100PdtCatSalesInventoryChart(answer);
          initDisplayFilterPdtCatSalesInventoryByDatePeriodMsg(startDate, endDate)
      }
  });
}

function initPdtCatSalesInventoryTable(ajaxResponse) {
  if ($.fn.DataTable.isDataTable('#pdtCatSalesInventoryByDateTable')) {
      $("#pdtCatSalesInventoryByDateTable").DataTable().destroy();
      $("#pdtCatSalesInventoryByDateTableBody").html("");
  }
  if (ajaxResponse.length === 0) {
      $("#pdtCatSalesInventoryByDateTableBody").append(
          `
          <tr>
              <td class="text-center" colspan="5">No data available.</td>
          </tr>
          `
      );
  } else {
      for (let i = 0; i < ajaxResponse.length; i++) {
          $("#pdtCatSalesInventoryByDateTableBody").append(
              `
              <tr>
                  <td>` + ajaxResponse[i]['category'] + `</td>
                  <td>` + ajaxResponse[i]['totalQty'] + `</td>
                  <td>` + ajaxResponse[i]['totalDiscSales'] + `</td>
              </tr>
              `
          );
      }
      if (!$.fn.DataTable.isDataTable('#pdtCatSalesInventoryByDateTable')) {
          $("#pdtCatSalesInventoryByDateTable").DataTable({
              "lengthMenu": [5, 10, 15, 20, 50, 100],
              "order": [2, 'desc']
          });
      }
  }
}

function initTop10PdtCatSalesInventoryChart(ajaxResponse) {

  if (window.top10CategorySalesByDateBarChart != undefined) {
      window.top10CategorySalesByDateBarChart.destroy();
  }

  let labels = [];
  let data = [];
  let sum_total_sales = 0;

  (ajaxResponse).sort(function (a, b) {
      if (parseFloat(a['totalDiscSales']) > parseFloat(b['totalDiscSales'])) return -1;
      if (parseFloat(a['totalDiscSales']) < parseFloat(b['totalDiscSales'])) return 1;
      return 0;
  });

  for (let i = 0; i < ajaxResponse.length; i++) {
    let limit = 10;
      if (ajaxResponse[i]['totalDiscSales'] == 0) {
          continue;
      }
      if (i < limit) {
          labels.push(ajaxResponse[i]['category']);
          data.push(ajaxResponse[i]['totalDiscSales']);
      }
      sum_total_sales += parseFloat(ajaxResponse[i]['totalDiscSales']);
  }

  /* Create color array */
  const dataLength = data.length;
  const colorScale = d3.interpolateBrBG;

  const colorRangeInfo = {
      colorStart: 0.1,
      colorEnd: 0.4,
      useEndAsStart: true
  };
  var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

  var ctx = document.getElementById('pdtCatSalesInventoryChartTop10').getContext('2d');

  window.top10CategorySalesByDateBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Store',
              data: data,
              backgroundColor: COLORS,
              hoverBackgroundColor: COLORS,
              borderColor: COLORS,
              borderWidth: 1
          }],
      },
      options: {
          plugins: {
              labels: [
              ],
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      drawOnChartArea: false
                  },
                  ticks: {
                      callback: function (value) {
                          return value.substr(0, 11); //truncate
                      },
                  }
              }]
          },
          tooltips: {
              enabled: true,
              mode: 'label',
              callbacks: {
                  title: function (tooltipItems, data) {
                      var idx = tooltipItems[0].index;
                      return data.labels[idx]; //do something with title
                  },
                  label: function (tooltipItems, data) {
                      //var idx = tooltipItems.index;
                      //return data.labels[idx] + ' €';
                      return "Total Sales: $" + tooltipItems.yLabel;
                  }
              }
          },
          title: {
              display: true,
              text: 'Total sales: $' + Number(sum_total_sales).toFixed(2),
              position: 'top',
              fontSize: 14
          },

          maintainAspectRatio: false,
          legend: {
              display: false
          }
      },
  });
}

function initTop100PdtCatSalesInventoryChart(ajaxResponse) {

  if (window.top100CategorySalesByDateBarChart != undefined) {
      window.top100CategorySalesByDateBarChart.destroy();
  }

  let labels = [];
  let data = [];
  let sum_total_sales = 0;

  (ajaxResponse).sort(function (a, b) {
      if (parseFloat(a['totalDiscSales']) > parseFloat(b['totalDiscSales'])) return -1;
      if (parseFloat(a['totalDiscSales']) < parseFloat(b['totalDiscSales'])) return 1;
      return 0;
  });

  for (let i = 0; i < ajaxResponse.length; i++) {
    let limit = 100;
      if (ajaxResponse[i]['totalDiscSales'] == 0) {
          continue;
      }
      if (i < limit) {
          labels.push(ajaxResponse[i]['category']);
          data.push(ajaxResponse[i]['totalDiscSales']);
      }
      sum_total_sales += parseFloat(ajaxResponse[i]['totalDiscSales']);
  }

  /* Create color array */
  const dataLength = data.length;
  const colorScale = d3.interpolateBrBG;

  const colorRangeInfo = {
      colorStart: 0.1,
      colorEnd: 0.4,
      useEndAsStart: true
  };
  var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

  var ctx = document.getElementById('pdtCatSalesInventoryChartTop100').getContext('2d');

  window.top100CategorySalesByDateBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Store',
              data: data,
              backgroundColor: COLORS,
              hoverBackgroundColor: COLORS,
              borderColor: COLORS,
              borderWidth: 1
          }],
      },
      options: {
          plugins: {
              labels: [
              ],
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      drawOnChartArea: false
                  },
                  ticks: {
                      callback: function (value) {
                          return value.substr(0, 11); //truncate
                      },
                  }
              }]
          },
          tooltips: {
              enabled: true,
              mode: 'label',
              callbacks: {
                  title: function (tooltipItems, data) {
                      var idx = tooltipItems[0].index;
                      return data.labels[idx]; //do something with title
                  },
                  label: function (tooltipItems, data) {
                      //var idx = tooltipItems.index;
                      //return data.labels[idx] + ' €';
                      return "Total Sales: $" + tooltipItems.yLabel;
                  }
              }
          },
          title: {
              display: true,
              text: 'Total sales: $' + Number(sum_total_sales).toFixed(2),
              position: 'top',
              fontSize: 14
          },

          maintainAspectRatio: false,
          legend: {
              display: false
          }
      },
  });
}

function initDisplayFilterPdtCatSalesInventoryByDatePeriodMsg(startDate, endDate) {
  $("#currentFilterPdtCatSalesInventoryByDatePeriodMsg").html("");
  $("#currentFilterPdtCatSalesInventoryByDatePeriodMsg").append(
      `
      <p class="text-info">Displaying results for <b>` + startDate + ` - ` + endDate + `</b></p>
      `
  );
}

function documentTogglePdtCatInventoryFilter() {
  $("#filterPdtCatSalesInventoryByDateButtonUp").hide();
  $("#filterPdtCatSalesInventoryByDateButtonDown").show();

  $("#filterPdtCatSalesInventoryByDate").hide();
}