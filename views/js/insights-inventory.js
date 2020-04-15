$(document).ready(function () {
    getPdtCatSalesInventoryByTime_DEFAULT();
    getIndividualCategoryStocktakesByTime_DEFAULT();
    documentTogglePdtCatInventoryFilter();
    documentToggleIndividualCategoryStocktakesFilter();
});

$("#pdtCatSalesInventorySelectDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#categoryInventoryByStartDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#categoryInventoryByEndDate").datepicker({
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

$("#filterCategoryInventoryByDateButtonDown").click(function () {
    $("#filterCategoryInventoryByDateButtonDown").hide();
    $("#filterCategoryInventoryByDateButtonUp").show();

    $("#filterCategoryInventoryByDate").show();
});

$("#filterCategoryInventoryByDateButtonUp").click(function () {
    $("#filterCategoryInventoryByDateButtonUp").hide();
    $("#filterCategoryInventoryByDateButtonDown").show();

    $("#filterCategoryInventoryByDate").hide();
});

$("#categoryInventoryHeader").on('click', '#resetCategoryInventoryToDefault', function () {
    let startDate = $("#categoryInventoryByStartDate").val();
    let endDate = $("#categoryInventoryByEndDate").val();
    let category = $("#categoryInventoryByName").val();
    
    if (startDate === "" || endDate === "") {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        startDate = moment(firstDay).format('YYYY-MM-DD');
        endDate = moment(date).format('YYYY-MM-DD');
    }
    if (category === "") {
        category = "AZT-CU";
    }
    getIndividualCategoryStocktakesByTime(startDate, endDate, category);
    replaceCategoryHeaderWithItemHeader("");
  });


$("#pdtCatSalesInventoryFilterApply").click(function () {
    let startDate = $("#pdtCatSalesInventorySelectDate").val();

    $("#filterPdtCatSalesInventoryByDateMsg").html("");
    if (startDate === "") {
        $("#filterPdtCatSalesInventoryByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Date cannot be empty.
            </p>
            `
        );

        return;
    }

    getPdtCatSalesInventoryByTime(startDate);
    documentTogglePdtCatInventoryFilter();
});

$("#categoryInventoryByDateFilterApply").click(function () {

    let startDate = $("#categoryInventoryByStartDate").val();
    let endDate = $("#categoryInventoryByEndDate").val();
    let category = $("#categoryInventoryByName").val();

    $("#filterCategoryInventoryByDateMsg").html("");
    if (startDate === "" || endDate === "" || category === "") {
        $("#filterCategoryInventoryByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start/End Date & Category cannot be empty.
            </p>
            `
        );

        return;
    }

    let startDate_Date = Date.parse(startDate);
    let endDate_Date = Date.parse(endDate);

    if (startDate_Date > endDate_Date) {
        $("#filterCategoryInventoryByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start Date cannot be before End Date.
            </p>
            `
        );

        return;
    }

    getIndividualCategoryStocktakesByTime(startDate, endDate, category);
    documentTogglePdtCatInventoryFilter();
});

$('#categoryInventoryItemsByDateTable tbody').on('click', 'tr', function () {
    let table = $("#categoryInventoryItemsByDateTable").DataTable();
    let data = table.row(this).data();
    let itemId = data[3];
    let itemName = data[0];
    let startDate = $("#categoryInventoryByStartDate").val();
    let endDate = $("#categoryInventoryByEndDate").val();

    if (startDate === "" || endDate === "") {
        swal({

            type: "info",
            title: "Missing data",
            text: "Please set start and end date in the filter above, or press 'Use current month' to check for the current month.",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Use current month"
        }).then((result) => {
            if (result.value) {
                let date = new Date();
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                startDate = moment(firstDay).format('YYYY-MM-DD');
                endDate = moment(date).format('YYYY-MM-DD');
                getIndividualItemStocktakesByTime(startDate, endDate, itemId, itemName);
            }
        });
    } else {
        getIndividualItemStocktakesByTime(startDate, endDate, itemId, itemName);
    }

});

function getPdtCatSalesInventoryByTime(startDate) {
    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_category_sales_by_start_date: startDate,
            get_total_category_sales_by_end_date: startDate,
            get_total_category_stocktake_by_date: startDate
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayPdtCatSalesInventoryMsg("There are no sales recorded on this day. Select a past date to check sales/inventory levels.");
            } else {
                displayPdtCatSalesInventoryMsg("Sorted by <i class='fa fa-arrow-circle-up'></i><b>  highest quantity sold</b>. The numbers on <i class='fa fa-level-up'></i><b>  top</b> of the bars show <b>quantity from latest stocktake</b>.");
            }
            initTop10PdtCatSalesInventoryChart(answer);
            initTop100PdtCatSalesInventoryChart(answer);
            initPdtCatSalesInventoryTable(answer);
            initDisplayFilterPdtCatSalesInventoryByDatePeriodMsg(startDate)
        }
    });

}

function getPdtCatSalesInventoryByTime_DEFAULT() {

    var date = new Date();
    console.log(date);
    let startDate = moment(date).format('YYYY-MM-DD');
    console.log(startDate);

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_category_sales_by_start_date: startDate,
            get_total_category_sales_by_end_date: startDate,
            get_total_category_stocktake_by_date: startDate
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayPdtCatSalesInventoryMsg("There are no sales recorded yet for today. Select a past date to check sales/inventory levels.");
            } else {
                displayPdtCatSalesInventoryMsg("Sorted by <i class='fa fa-arrow-circle-up'></i><b>  highest quantity sold</b>. The numbers on <i class='fa fa-level-up'></i><b>  top</b> of the bars show <b>quantity from latest stocktake</b>.");
            }
            initTop10PdtCatSalesInventoryChart(answer);
            initTop100PdtCatSalesInventoryChart(answer);
            initPdtCatSalesInventoryTable(answer);
            initDisplayFilterPdtCatSalesInventoryByDatePeriodMsg(startDate);
        }
    });

}

function getIndividualItemStocktakesByTime(startDate, endDate, itemId, itemName) {

    $.ajax({
        url: "ajax/stocktakes.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_individual_item_stocktakes_start_date: startDate,
            get_individual_item_stocktakes_end_date: endDate,
            get_individual_item_stocktakes_item_id: itemId
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayCategoryInventoryDataMsg("Some data was not available for the category requested. Select a different date range.");
            } else {
                displayCategoryInventoryDataMsg("Displaying results for <b>" + itemName + "</b>");
                replaceCategoryHeaderWithItemHeader("Items");
            }
            initIndividualCategoryStocktakesByTimeChart(answer);
            initDisplayFilterCategoryInventoryByDatePeriodMsg(startDate, endDate);

        }
    });

}

function getIndividualCategoryStocktakesByTime(startDate, endDate, category) {

    $.ajax({
        url: "ajax/stocktakes.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_individual_category_stocktakes_start_date: startDate,
            get_individual_category_stocktakes_end_date: endDate,
            get_individual_category_stocktakes_category: category
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayCategoryInventoryDataMsg("Some data was not available for the category requested. Select a different date range.");
            } else {
                displayCategoryInventoryDataMsg("Displaying results for <b>" + category + "</b>");
            }
            initIndividualCategoryStocktakesByTimeChart(answer);
            initDisplayFilterCategoryInventoryByDatePeriodMsg(startDate, endDate);
        }
    });

    $.ajax({
        url: "ajax/items.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_items_in_category: category
        },
        success: function (answer) {
            initCategoryInventoryItemsByDateTable(answer);
        }
    });

}

function getIndividualCategoryStocktakesByTime_DEFAULT() {

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let category = "AZT-CU";

    startDate = moment(firstDay).format('YYYY-MM-DD');
    endDate = moment(date).format('YYYY-MM-DD');

    $.ajax({
        url: "ajax/stocktakes.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_individual_category_stocktakes_start_date: startDate,
            get_individual_category_stocktakes_end_date: endDate,
            get_individual_category_stocktakes_category: category
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayCategoryInventoryDataMsg("Select a category from above to view inventory level.");
            } else {
                displayCategoryInventoryDataMsg("Displaying results for <b>AZT-CU</b>");
            }
            initIndividualCategoryStocktakesByTimeChart(answer);
            initDisplayFilterCategoryInventoryByDatePeriodMsg(startDate, endDate);
        }
    });

    $.ajax({
        url: "ajax/items.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_items_in_category: category
        },
        success: function (answer) {
            initCategoryInventoryItemsByDateTable(answer);
        }
    });

}

function initIndividualCategoryStocktakesByTimeChart(ajaxResponse) {

    if (window.categoryInventoryItemsByDateChartElement != undefined) {
        window.categoryInventoryItemsByDateChartElement.destroy();
    }

    let labels = [];
    let data = [];
    let dateInventory = {
        x: "",
        y: ""
    };
    let lowestQty;
    let highestQty;
    let latestStocktakeQty;

    for (let i = 0; i < ajaxResponse.length; i++) {
        if (i + 1 == ajaxResponse.length) {
            latestStocktakeQty = ajaxResponse[i]['totalQty'];
        }
        if (i == 0) {
            lowestQty = ajaxResponse[i]['totalQty'];
            highestQty = ajaxResponse[i]['totalQty'];
        } else {
            if (lowestQty > ajaxResponse[i]['totalQty']) {
                lowestQty = ajaxResponse[i]['totalQty'];
            }
            if (highestQty < ajaxResponse[i]['totalQty']) {
                highestQty = ajaxResponse[i]['totalQty'];
            }
        }
        dateInventory = {
            x: "",
            y: ""
        };
        dateInventory.x = Date.parse(ajaxResponse[i]['date_submitted']);
        dateInventory.y = ajaxResponse[i]['totalQty'];
        data.push(dateInventory);
    }

    /* Create color array */
    const dataLength = data.length;
    const colorScale = d3.interpolateRdYlBu;

    const colorRangeInfo = {
        colorStart: 0.7,
        colorEnd: 1,
        useEndAsStart: false,
    };
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    var ctx = document.getElementById("categoryInventoryItemsByDateChart").getContext('2d');

    window.categoryInventoryItemsByDateChartElement = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Inventory Count',
                data: data,
                backgroundColor: COLORS[0],
                hoverBackgroundColor: COLORS[0],
                borderColor: COLORS[0],
                borderWidth: 1,
                pointHitRadius: 75
            }],
        },
        options: {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: lowestQty,
                        suggestedMax: highestQty + 10,
                        maxTicksLimit: 5
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
                }
            },
            title: {
                display: true,
                text: 'Latest stocktake count: ' + Number(latestStocktakeQty).toFixed(0),
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

function initCategoryInventoryItemsByDateTable(ajaxResponse) {
    $("#categoryInventoryItemsByDateTableBody").html("");

    if ($.fn.DataTable.isDataTable('#categoryInventoryItemsByDateTable')) {
        $("#categoryInventoryItemsByDateTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#categoryInventoryItemsByDateTableBody").html("");
        $("#categoryInventoryItemsByDateTableBody").append(
            `
          <tr>
              <td class="text-center" colspan="5">No data available.</td>
          </tr>
          `
        );
    } else {
        $("#categoryInventoryItemsByDateTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#categoryInventoryItemsByDateTableBody").append(
                `
                <tr>
                  <td>` + ajaxResponse[i]['name'] + `</td>
                  <td>` + ajaxResponse[i]['item_number'] + `</td>
                  <td>` + Number(ajaxResponse[i]['unit_price']).toFixed(2) + `</td>
                  <td>` + ajaxResponse[i]['item_id'] + `</td>
                  <td class="text-center"><i class="fa fa-eye"></i></td>
                  </tr>
              `
            );
        }
        if (!$.fn.DataTable.isDataTable('#categoryInventoryItemsByDateTable')) {
            $("#categoryInventoryItemsByDateTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50],
                "order": [1, 'desc'],
                "columnDefs": [{
                        "targets": [3],
                        "visible": false,
                        "searchable": true
                    },
                    {
                        "targets": [4],
                        "searchable": false,
                        "sortable": false
                    }
                ]
            });
        }
    }
}

function initPdtCatSalesInventoryTable(ajaxResponse) {
    $("#pdtCatSalesInventoryByDateTableBody").html("");

    if ($.fn.DataTable.isDataTable('#pdtCatSalesInventoryByDateTable')) {
        $("#pdtCatSalesInventoryByDateTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#pdtCatSalesInventoryByDateTableBody").html("");
        $("#pdtCatSalesInventoryByDateTableBody").append(
            `
          <tr>
              <td class="text-center" colspan="4">No data available.</td>
          </tr>
          `
        );
    } else {
        $("#pdtCatSalesInventoryByDateTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#pdtCatSalesInventoryByDateTableBody").append(
                `
                <tr>
                  <td>` + ajaxResponse[i]['category'] + `</td>
                  <td>` + Number(ajaxResponse[i]['totalQty']).toFixed(0) + `</td>
                  <td>$` + ajaxResponse[i]['totalDiscSales'] + `</td>
                  <td>` + Number(ajaxResponse[i]['stockCount']).toFixed(0) + `</td>
                </tr>
              `
            );
        }
        if (!$.fn.DataTable.isDataTable('#pdtCatSalesInventoryByDateTable')) {
            $("#pdtCatSalesInventoryByDateTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50],
                "order": [1, 'desc']
            });
        }
    }
}

function initTop10PdtCatSalesInventoryChart(pdtCatSalesInventoryData) {

    if (window.top10PdtCatSalesInventoryByDateBarChart != undefined) {
        window.top10PdtCatSalesInventoryByDateBarChart.destroy();
    }

    let labels = [];
    let data = [];
    let dataTotalDiscSales = [];
    let dataLatestStocktakeCount = [];
    let dataLatestStocktakeDate = [];
    let sum_total_sales = 0;

    (pdtCatSalesInventoryData).sort(function (a, b) {
        if (parseFloat(a['totalQty']) > parseFloat(b['totalQty'])) return -1;
        if (parseFloat(a['totalQty']) < parseFloat(b['totalQty'])) return 1;
        return 0;
    });

    for (let i = 0; i < pdtCatSalesInventoryData.length; i++) {
        let limit = 10;
        if (pdtCatSalesInventoryData[i]['totalDiscSales'] == 0) {
            continue;
        }
        if (i < limit) {
            labels.push(pdtCatSalesInventoryData[i]['category']);
            data.push(pdtCatSalesInventoryData[i]['totalQty']);
            dataTotalDiscSales.push(pdtCatSalesInventoryData[i]['totalDiscSales']);
            dataLatestStocktakeCount.push(pdtCatSalesInventoryData[i]['stockCount']);

            latestStocktakeDateTime = Date.parse(pdtCatSalesInventoryData[i]['latestStocktakeDate']);
            latestStocktakeDate = latestStocktakeDateTime.getFullYear() + "-" + (latestStocktakeDateTime.getMonth() + 1) + "-" + latestStocktakeDateTime.getDate();
            dataLatestStocktakeDate.push(latestStocktakeDate);
        }
        sum_total_sales += parseFloat(pdtCatSalesInventoryData[i]['totalQty']);
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

    window.top10PdtCatSalesInventoryByDateBarChart = new Chart(ctx, {
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
                }, {
                    hidden: true,
                    label: 'Store',
                    data: dataTotalDiscSales
                },
                {
                    hidden: true,
                    label: 'Inventory',
                    data: dataLatestStocktakeCount,
                    datalabels: {
                        labels: {
                            title: {
                                color: 'green'
                            }
                        }
                    }
                }, {
                    hidden: true,
                    label: 'Date',
                    data: dataLatestStocktakeDate
                }
            ],
        },
        options: {
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return Number(context.chart.data.datasets[2].data[context.dataIndex]).toFixed(0);
                    }
                }
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
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0,
                        stepSize: 1
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
                        var idx = tooltipItems.index;
                        //return data.labels[idx] + ' €';
                        return "Total sales: $" + data.datasets[1].data[idx];
                    },
                    afterLabel: function (tooltipItems, data) {
                        var idx = tooltipItems.index;
                        return "Inventory on " + data.datasets[3].data[idx] + ": " + data.datasets[2].data[idx];
                    }
                }
            },
            title: {
                display: true,
                text: 'Total product sold quantity: ' + Number(sum_total_sales).toFixed(0),
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

function initTop100PdtCatSalesInventoryChart(pdtCatSalesInventoryData) {

    if (window.top100PdtCatSalesInventoryByDateBarChart != undefined) {
        window.top100PdtCatSalesInventoryByDateBarChart.destroy();
    }

    let labels = [];
    let data = [];
    let dataTotalDiscSales = [];
    let dataLatestStocktakeCount = [];
    let dataLatestStocktakeDate = [];
    let sum_total_sales = 0;

    (pdtCatSalesInventoryData).sort(function (a, b) {
        if (parseFloat(a['totalQty']) > parseFloat(b['totalQty'])) return -1;
        if (parseFloat(a['totalQty']) < parseFloat(b['totalQty'])) return 1;
        return 0;
    });

    for (let i = 0; i < pdtCatSalesInventoryData.length; i++) {
        let limit = 100;
        if (pdtCatSalesInventoryData[i]['totalDiscSales'] == 0) {
            continue;
        }
        if (i < limit) {
            labels.push(pdtCatSalesInventoryData[i]['category']);
            data.push(pdtCatSalesInventoryData[i]['totalQty']);
            dataTotalDiscSales.push(pdtCatSalesInventoryData[i]['totalDiscSales']);
            dataLatestStocktakeCount.push(pdtCatSalesInventoryData[i]['stockCount']);

            latestStocktakeDateTime = Date.parse(pdtCatSalesInventoryData[i]['latestStocktakeDate']);
            latestStocktakeDate = latestStocktakeDateTime.getFullYear() + "-" + (latestStocktakeDateTime.getMonth() + 1) + "-" + latestStocktakeDateTime.getDate();
            dataLatestStocktakeDate.push(latestStocktakeDate);
        }
        sum_total_sales += parseFloat(pdtCatSalesInventoryData[i]['totalQty']);
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

    window.top100PdtCatSalesInventoryByDateBarChart = new Chart(ctx, {
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
                }, {
                    hidden: true,
                    label: 'Store',
                    data: dataTotalDiscSales
                },
                {
                    hidden: true,
                    label: 'Inventory',
                    data: dataLatestStocktakeCount
                }, {
                    hidden: true,
                    label: 'Date',
                    data: dataLatestStocktakeDate
                }
            ],
        },
        options: {
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return Number(context.chart.data.datasets[2].data[context.dataIndex]).toFixed(0);
                    }
                }
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
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0,
                        stepSize: 1
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
                        var idx = tooltipItems.index;
                        //return data.labels[idx] + ' €';
                        return "Total sales: $" + data.datasets[1].data[idx];
                    },
                    afterLabel: function (tooltipItems, data) {
                        var idx = tooltipItems.index;
                        return "Inventory on " + data.datasets[3].data[idx] + ": " + data.datasets[2].data[idx];
                    }
                }
            },
            title: {
                display: true,
                text: 'Total product sold quantity: ' + Number(sum_total_sales).toFixed(0),
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

function initDisplayFilterPdtCatSalesInventoryByDatePeriodMsg(startDate) {
    $("#currentFilterPdtCatSalesInventoryByDatePeriodMsg").html("");
    $("#currentFilterPdtCatSalesInventoryByDatePeriodMsg").append(
        `
      <p class="text-info">Displaying results for <b>` + startDate + `</b></p>
      `
    );
}

function initDisplayFilterCategoryInventoryByDatePeriodMsg(startDate, endDate) {
    $("#currentFilterCategoryInventoryByDatePeriodMsg").html("");
    $("#currentFilterCategoryInventoryByDatePeriodMsg").append(
        `
      <p class="text-info">Displaying results for <b>` + startDate + ` - ` + endDate + `</b></p>
      `
    );
}

function replaceCategoryHeaderWithItemHeader(message) {
    if (message.length > 0) {
        $("#categoryInventoryHeader").html("");
        $("#categoryInventoryHeader").append(
            `
            <h3 class="text-center"><b>` + message + `</b></h3>
            `
        );
        $("#categoryInventoryHeader").prepend(
            `
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <button id="resetCategoryInventoryToDefault" type="button"
                class="btn btn-info" style="margin-top: 10px; margin-bottom: 20px;"><i class="fa fa-refresh"></i>&nbsp;&nbsp;Reset</button>
            </div>
            `
        );
    } else {
        $("#categoryInventoryHeader").html("");
        $("#categoryInventoryHeader").append(
            `
            <h3 class="text-center"><b>Categories</b></h3>
            `
        );
    }
}

function displayCategoryInventoryDataMsg(message) {
    if (message.length > 0) {
        $("#displayCategoryInventoryDataMsg").html("");
        $("#displayCategoryInventoryDataMsg").append(
            `
            <h5 class="text-center text-info">` + message + `
            </h5>
            `
        );
    } else {
        $("#displayCategoryInventoryDataMsg").html("");
    }
}

function displayPdtCatSalesInventoryMsg(message) {
    if (message.length > 0) {
        $("#displayPdtCatSalesInventoryMsg").html("");
        $("#displayPdtCatSalesInventoryMsg").append(
            `
            <h5 class="text-center text-info" style="margin-top: 20px;">` + message + `
            </h5>
            `
        );
    } else {
        $("#displayPdtCatSalesInventoryMsg").html("");
    }
}

function documentTogglePdtCatInventoryFilter() {
    $("#filterPdtCatSalesInventoryByDateButtonUp").hide();
    $("#filterPdtCatSalesInventoryByDateButtonDown").show();

    $("#filterPdtCatSalesInventoryByDate").hide();
}

function documentToggleIndividualCategoryStocktakesFilter() {
    $("#filterCategoryInventoryByDateButtonUp").hide();
    $("#filterCategoryInventoryByDateButtonDown").show();

    $("#filterCategoryInventoryByDate").hide();
}