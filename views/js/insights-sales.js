$(document).ready(function () {
    getTotalSalesByTime_DEFAULT();
    getTotalItemSalesByTime_DEFAULT();
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

function getTotalItemSalesByTime_DEFAULT() {
    var date = new Date();
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
            initTotalItemSalesByStoreTable(answer);
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
            initTotalItemKitSalesByStoreChart(answer);
            initTotalItemKitSalesByStoreTable(answer);
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
            initTotalItemSalesByStoreTable(answer);
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
            initTotalItemKitSalesByStoreChart(answer);
            initTotalItemKitSalesByStoreTable(answer);
            initDisplayFilterTotalSalesByProductDateMsg(startDate, endDate);
        }
    });
}

function getTotalSalesByTime_DEFAULT() {
    var date = new Date();
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
            initTotalSalesByStoreChart(answer);
            initDisplayFilterTotalSalesByStoreDateMsg(startDate, endDate);
        }
    });
}

function initTotalItemSalesByStoreTable(ajaxResponse) {
    if ($.fn.DataTable.isDataTable('#totalItemSalesByDateTable')) {
        $("#totalItemSalesByDateTable").DataTable().destroy();
        $("#totalItemSalesByDateTableBody").html("");
    }
    if (ajaxResponse.length === 0) {
        $("#totalItemSalesByDateTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="5">No data available.</td>
            </tr>
            `
        );
    } else {
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalItemSalesByDateTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['name'] + `</td>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td>` + ajaxResponse[i]['unit_price'] + `</td>
                    <td>` + ajaxResponse[i]['totalQty'] + `</td>
                    <td>` + ajaxResponse[i]['totalDiscSales'] + `</td>
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

function initTotalItemKitSalesByStoreTable(ajaxResponse) {
    if ($.fn.DataTable.isDataTable('#totalItemKitSalesByDateTable')) {
        $("#totalItemKitSalesByDateTable").DataTable().destroy();
        $("#totalItemKitSalesByDateTableBody").html("");
    }

    if (ajaxResponse.length === 0) {
        $("#totalItemKitSalesByDateTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="5">No data available.</td>
            </tr>
            `
        );
    } else {
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#totalItemKitSalesByDateTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['name'] + `</td>
                    <td>` + ajaxResponse[i]['category'] + `</td>
                    <td>` + ajaxResponse[i]['unit_price'] + `</td>
                    <td>` + ajaxResponse[i]['totalQty'] + `</td>
                    <td>` + ajaxResponse[i]['totalDiscSales'] + `</td>
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
        labels.push(ajaxResponse[i]['store_name']);
        data.push(ajaxResponse[i]['total_sales']);
        sum_total_sales += parseFloat(ajaxResponse[i]['total_sales']);
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
    const colorScale = d3.interpolateRdYlBu;

    const colorRangeInfo = {
        colorStart: 0.7,
        colorEnd: 1,
        useEndAsStart: false,
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

function initTotalItemKitSalesByStoreChart(ajaxResponse) {

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
    const colorScale = d3.interpolateRdYlBu;

    const colorRangeInfo = {
        colorStart: 0.7,
        colorEnd: 1,
        useEndAsStart: false,
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