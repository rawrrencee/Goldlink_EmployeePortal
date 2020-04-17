$(document).ready(function () {
    getTotalSalesByTime_DEFAULT();
    getTotalItemSalesByTime_DEFAULT();
    getTotalCategorySalesByTime_DEFAULT();
    documentToggleSalesByProductFilter();
    documentToggleSalesByStoreFilter();
});

$("#totalSalesByStoreStartDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#totalSalesByStoreEndDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#totalProductSalesByStartDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#totalProductSalesByEndDate").datepicker({
    orientation: "bottom",
    autoclose: true,
    format: "yyyy-mm-dd"
});

$("#filterTotalSalesByDateButtonDown").click(function () {
    $("#filterTotalSalesByDateButtonDown").hide();
    $("#filterTotalSalesByDateButtonUp").show();

    $("#filterTotalSalesByStoreByDate").show();
});

$("#filterTotalSalesByDateButtonUp").click(function () {
    $("#filterTotalSalesByDateButtonUp").hide();
    $("#filterTotalSalesByDateButtonDown").show();

    $("#filterTotalSalesByStoreByDate").hide();
});

$("#filterTotalProductSalesByDateButtonDown").click(function () {
    $("#filterTotalProductSalesByDateButtonDown").hide();
    $("#filterTotalProductSalesByDateButtonUp").show();

    $("#filterTotalProductSalesByDate").show();
});

$("#filterTotalProductSalesByDateButtonUp").click(function () {
    $("#filterTotalProductSalesByDateButtonUp").hide();
    $("#filterTotalProductSalesByDateButtonDown").show();

    $("#filterTotalProductSalesByDate").hide();
});

$("#totalSalesByStoreFilterApply").click(function () {
    let startDate = $("#totalSalesByStoreStartDate").val();
    let endDate = $("#totalSalesByStoreEndDate").val();

    $("#filterTotalSalesByStoreByDateMsg").html("");
    if (startDate === "" || endDate === "") {
        $("#filterTotalSalesByStoreByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start/End Date cannot be empty.
            </p>
            `
        );

        return;
    }

    let startDate_Date = Date.parse(startDate);
    let endDate_Date = Date.parse(endDate);

    if (startDate_Date > endDate_Date) {
        $("#filterTotalSalesByStoreByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start Date cannot be before End Date.
            </p>
            `
        );

        return;
    }

    getTotalSalesByTime(startDate, endDate);
    documentToggleSalesByStoreFilter();
});

$("#totalProductSalesByDateFilterApply").click(function () {
    let startDate = $("#totalProductSalesByStartDate").val();
    let endDate = $("#totalProductSalesByEndDate").val();

    $("#filterTotalProductSalesByDateMsg").html("");
    if (startDate === "" || endDate === "") {
        $("#filterTotalProductSalesByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start/End Date cannot be empty.
            </p>
            `
        );

        return;
    }

    let startDate_Date = Date.parse(startDate);
    let endDate_Date = Date.parse(endDate);

    if (startDate_Date > endDate_Date) {
        $("#filterTotalProductSalesByDateMsg").append(
            `
            <p class="text-red text-center" style="margin-top: 10px;">
                Start Date cannot be before End Date.
            </p>
            `
        );

        return;
    }

    getTotalItemSalesByTime(startDate, endDate);
    documentToggleSalesByProductFilter();
});

function documentToggleSalesByProductFilter() {
    $("#filterTotalProductSalesByDateButtonUp").hide();
    $("#filterTotalProductSalesByDateButtonDown").show();

    $("#filterTotalProductSalesByDate").hide();
}

function documentToggleSalesByStoreFilter() {
    $("#filterTotalSalesByDateButtonUp").hide();
    $("#filterTotalSalesByDateButtonDown").show();

    $("#filterTotalSalesByStoreByDate").hide();
}

function getCurrentMonthTotalSales() {
    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_for_current_month: 0
        },
        success: function (answer) {
            console.log(answer);
        }
    });
}

function getTotalCategorySalesByTime_DEFAULT() {
    var date = new Date(2020, 0, 27);
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
            initTotalCategorySalesByStoreTable(answer);
            initTotalCategorySalesByStoreChart(answer);
        }
    });
}

function getTotalItemSalesByTime_DEFAULT() {
    var date = new Date(2020, 0, 27);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    startDate = moment(firstDay).format('YYYY-MM-DD');
    endDate = moment(date).format('YYYY-MM-DD');

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_item_sales_by_start_date: startDate,
            get_total_item_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalItemSalesByStoreChart(answer);
            initTotalItemSalesByDateTable(answer);
        }
    });

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_item_kit_sales_by_start_date: startDate,
            get_total_item_kit_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalItemKitSalesByDateChart(answer);
            initTotalItemKitSalesByDateTable(answer);
            initDisplayFilterTotalSalesByProductDateMsg(startDate, endDate);
        }
    });
}

function getTotalItemSalesByTime(startDate, endDate) {

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_item_sales_by_start_date: startDate,
            get_total_item_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalItemSalesByStoreChart(answer);
            initTotalItemSalesByDateTable(answer);
        }
    });

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_item_kit_sales_by_start_date: startDate,
            get_total_item_kit_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalItemKitSalesByDateChart(answer);
            initTotalItemKitSalesByDateTable(answer);
            initDisplayFilterTotalSalesByProductDateMsg(startDate, endDate);
        }
    });

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_category_sales_by_start_date: startDate,
            get_total_category_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalCategorySalesByStoreTable(answer);
            initTotalCategorySalesByStoreChart(answer);
        }
    });
}

function getTotalSalesByTime_DEFAULT() {
    var date = new Date(2020, 0, 27);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    startDate = moment(firstDay).format('YYYY-MM-DD');
    endDate = moment(date).format('YYYY-MM-DD');

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_by_start_date: startDate,
            get_total_sales_by_end_date: endDate
        },
        success: function (answer) {
            initTotalSalesByStoreChart(answer);
            initDisplayFilterTotalSalesByStoreDateMsg(startDate, endDate);
        }
    });
}

function getTotalSalesByTime(startDate, endDate) {
    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_by_start_date: startDate,
            get_total_sales_by_end_date: endDate
        },
        success: function (answer) {
            let initEmptyTable = [];
            if (answer.length === 0) {
                displayTotalSalesByStoreDataMsg("Some data was not available for the store requested.");
            } else {
                displayTotalSalesByStoreDataMsg("Displaying results for <b>all stores</b>");
            }
            initTotalSalesByStoreChart(answer);
            initTotalSalesByStoreAndDateTable(initEmptyTable);
            initDisplayFilterTotalSalesByStoreDateMsg(startDate, endDate);
        }
    });
}

function initTotalCategorySalesByStoreTable(ajaxResponse) {
    $("#totalCategorySalesByDateTableBody").html("");

    if ($.fn.DataTable.isDataTable('#totalCategorySalesByDateTable')) {
        $("#totalCategorySalesByDateTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#totalCategorySalesByDateTableBody").html("");
        $("#totalCategorySalesByDateTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="3">No data available.</td>
            </tr>
            `
        );
    } else {
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalCategorySalesByDateTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalQty'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalDiscSales'] + `</td>
                </tr>
                `
            );
        }
        if (!$.fn.DataTable.isDataTable('#totalCategorySalesByDateTable')) {
            $("#totalCategorySalesByDateTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [2, 'desc']
            });
        }
    }

}

function initTotalItemSalesByDateTable(ajaxResponse) {
    $("#totalItemSalesByDateTableBody").html("");

    if ($.fn.DataTable.isDataTable('#totalItemSalesByDateTable')) {
        $("#totalItemSalesByDateTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#totalItemSalesByDateTableBody").html("");
        $("#totalItemSalesByDateTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="6">No data available.</td>
            </tr>
            `
        );
    } else {
        $("#totalItemSalesByDateTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalItemSalesByDateTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['name'] + `</td>
                    <td>` + ajaxResponse[i]['item_number'] + `</td>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['unit_price'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalQty'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalDiscSales'] + `</td>
                </tr>
                `
            );
        }
        if (!$.fn.DataTable.isDataTable('#totalItemSalesByDateTable')) {
            $("#totalItemSalesByDateTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [4, 'desc']
            });
        }
    }

}

function initTotalItemKitSalesByDateTable(ajaxResponse) {
    $("#totalItemKitSalesByDateTableBody").html("");

    if ($.fn.DataTable.isDataTable('#totalItemKitSalesByDateTable')) {
        $("#totalItemKitSalesByDateTable").DataTable().destroy();
    }

    if (ajaxResponse.length === 0) {
        $("#totalItemKitSalesByDateTableBody").html("");
        $("#totalItemKitSalesByDateTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="6">No data available.</td>
            </tr>
            `
        );
    } else {
        $("#totalItemKitSalesByDateTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalItemKitSalesByDateTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['name'] + `</td>
                    <td>` + ajaxResponse[i]['item_kit_number'] + `</td>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['unit_price'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalQty'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalDiscSales'] + `</td>
                </tr>
                `
            );
        }
        if (!$.fn.DataTable.isDataTable('#totalItemKitSalesByDateTable')) {
            $("#totalItemKitSalesByDateTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [4, 'desc']
            });
        }
    }

}

function initTotalSalesByStoreAndDateTable(ajaxResponse) {
    console.log(ajaxResponse);
    $("#totalSalesByStoreTableBody").html("");

    if ($.fn.DataTable.isDataTable('#totalSalesByStoreTable')) {
        $("#totalSalesByStoreTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#totalSalesByStoreTableBody").html("");
        $("#totalSalesByStoreTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="6">Select a store on the chart to view items sold.</td>
            </tr>
            `
        );
    } else {
        $("#totalSalesByStoreTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalSalesByStoreTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['name'] + `</td>
                    <td>` + ajaxResponse[i]['item_number'] + `</td>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['unit_price'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalQty'] + `</td>
                    <td style="text-align: right;">` + ajaxResponse[i]['totalDiscSales'] + `</td>
                </tr>
                `
            );
        }
        if (!$.fn.DataTable.isDataTable('#totalSalesByStoreTable')) {
            $("#totalSalesByStoreTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [4, 'desc']
            });
        }
    }

}


function totalSalesByStoreBarOnClick(event, array){
    if (array[0] == undefined) {
        return;
    }
    let storeCode = array[0]._chart.config.data.labels[array[0]._index];

    let startDate = $("#totalSalesByStoreStartDate").val();
    let endDate = $("#totalSalesByStoreEndDate").val();

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
                let date = new Date(2020, 0, 27);
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                startDate = moment(firstDay).format('YYYY-MM-DD');
                endDate = moment(date).format('YYYY-MM-DD');
                getTotalSalesByStore(startDate, endDate, storeCode);
            }
        });
    } else {
        getTotalSalesByStore(startDate, endDate, storeCode);
    }


}

function getTotalSalesByStore(startDate, endDate, storeCode) {
    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_item_sales_by_storecode_start_date: startDate,
            get_total_item_sales_by_storecode_end_date: endDate,
            get_total_item_sales_by_storecode: storeCode
        },
        success: function (answer) {
            if (answer.length === 0) {
                displayTotalSalesByStoreDataMsg("Some data was not available for the store requested.");
            } else {
                displayTotalSalesByStoreDataMsg("Displaying results for <b>" + storeCode + "</b>");
            }
            initTotalSalesByStoreAndDateTable(answer);
        }
    });
}

function initTotalSalesByStoreChart(ajaxResponse) {

    if (window.totalSalesByStoreBarChart != undefined) {
        window.totalSalesByStoreBarChart.destroy();
    }

    let labels = [];
    let data = [];
    let sum_total_sales = 0;

    (ajaxResponse).sort(function (a, b) {
        if (parseFloat(a['total_sales']) > parseFloat(b['total_sales'])) return -1;
        if (parseFloat(a['total_sales']) < parseFloat(b['total_sales'])) return 1;
        return 0;
    });

    for (let i = 0; i < ajaxResponse.length; i++) {
        if (ajaxResponse[i]['total_sales'] == 0) {
            continue;
        }
        labels.push(ajaxResponse[i]['store_code']);
        data.push(ajaxResponse[i]['total_sales']);
        sum_total_sales += parseFloat(ajaxResponse[i]['total_sales']);
    }

    /* Create color array */
    const dataLength = data.length;
    const colorScale = d3.interpolatePurples;

    const colorRangeInfo = {
        colorStart: 0.2,
        colorEnd: 0.8,
        useEndAsStart: false
    };
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    var ctx = document.getElementById('totalSalesByStoreBar').getContext('2d');

    window.totalSalesByStoreBarChart = new Chart(ctx, {
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
            onClick: totalSalesByStoreBarOnClick,
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return "$" + value;
                    }
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
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

function initTotalCategorySalesByStoreChart(ajaxResponse) {

    if (window.totalCategorySalesByDateBarChart != undefined) {
        window.totalCategorySalesByDateBarChart.destroy();
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
        if (ajaxResponse[i]['totalDiscSales'] == 0) {
            continue;
        }
        if (i < 10) {
            labels.push(ajaxResponse[i]['category']);
            data.push(ajaxResponse[i]['totalDiscSales']);
        }
        sum_total_sales += parseFloat(ajaxResponse[i]['totalDiscSales']);
    }

    /* Create color array */
    const dataLength = data.length;
    const colorScale = d3.interpolateReds;

    const colorRangeInfo = {
        colorStart: 0.2,
        colorEnd: 0.6,
        useEndAsStart: false
    };
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    var ctx = document.getElementById('totalCategorySalesByDateBar').getContext('2d');

    window.totalCategorySalesByDateBarChart = new Chart(ctx, {
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
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return "$" + value;
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

function initTotalItemSalesByStoreChart(ajaxResponse) {

    if (window.totalItemSalesByDateBarChart != undefined) {
        window.totalItemSalesByDateBarChart.destroy();
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
        if (ajaxResponse[i]['totalDiscSales'] == 0) {
            continue;
        }
        if (i < 10) {
            labels.push(ajaxResponse[i]['name']);
            data.push(ajaxResponse[i]['totalDiscSales']);
        }
        sum_total_sales += parseFloat(ajaxResponse[i]['totalDiscSales']);
    }

    /* Create color array */
    const dataLength = data.length;
    const colorScale = d3.interpolateBlues;

    const colorRangeInfo = {
        colorStart: 0.2,
        colorEnd: 0.8,
        useEndAsStart: false
    };
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    var ctx = document.getElementById('totalItemSalesByDateBar').getContext('2d');

    window.totalItemSalesByDateBarChart = new Chart(ctx, {
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
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return "$" + value;
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

function initTotalItemKitSalesByDateChart(ajaxResponse) {

    if (window.totalItemKitSalesByDateBarChart != undefined) {
        window.totalItemKitSalesByDateBarChart.destroy();
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
        if (ajaxResponse[i]['totalDiscSales'] == 0) {
            continue;
        }
        if (i < 10) {
            labels.push(ajaxResponse[i]['name']);
            data.push(ajaxResponse[i]['totalDiscSales']);
        }
        sum_total_sales += parseFloat(ajaxResponse[i]['totalDiscSales']);
    }

    /* Create color array */
    const dataLength = data.length;
    const colorScale = d3.interpolateRdYlGn;

    const colorRangeInfo = {
        colorStart: 0.6,
        colorEnd: 0.8,
        useEndAsStart: false
    };
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    var ctx = document.getElementById('totalItemKitSalesByDateBar').getContext('2d');

    window.totalItemKitSalesByDateBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Sales: $',
                data: data,
                backgroundColor: COLORS,
                hoverBackgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
            }],
        },
        options: {
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return "$" + value;
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

function initDisplayFilterTotalSalesByProductDateMsg(startDate, endDate) {
    $("#currentFilterTotalSalesByProductDatePeriodMsg").html("");
    $("#currentFilterTotalSalesByProductDatePeriodMsg").append(
        `
        <p class="text-info">Displaying results for <b>` + startDate + ` - ` + endDate + `</b></p>
        `
    );
}

function initDisplayFilterTotalSalesByStoreDateMsg(startDate, endDate) {
    $("#currentFilterTotalSalesByStoreDatePeriodMsg").html("");
    $("#currentFilterTotalSalesByStoreDatePeriodMsg").append(
        `
        <p class="text-info">Displaying results for <b>` + startDate + ` - ` + endDate + `</b></p>
        `
    );
}

function displayTotalSalesByStoreDataMsg(message) {
    if (message.length > 0) {
        $("#displayTotalSalesByStoreDataMsg").html("");
        $("#displayTotalSalesByStoreDataMsg").append(
            `
            <h5 class="text-center text-info" style="margin-top: 20px;">` + message + `
            </h5>
            `
        );
    } else {
        $("#displayTotalSalesByStoreDataMsg").html("");
    }
}