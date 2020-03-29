$(document).ready(function () {
    getCurrentMonthTotalSales();
    getTotalSalesByTime_DEFAULT();
});

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

function getTotalSalesByTime_DEFAULT() {
    startDate = '2020-03-01';
    endDate = '2020-03-29';

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_by_start_date: startDate,
            get_total_sales_by_end_date: endDate
        },
        success: function (answer) {

            let labels = [];
            let data = [];
            let sum_total_sales = 0;

            console.log(answer);
            (answer).sort(function(a, b){
                if (parseFloat(a['total_sales']) > parseFloat(b['total_sales'])) return -1;
                if (parseFloat(a['total_sales']) < parseFloat(b['total_sales'])) return 1;
                return 0;
            });

            for (let i = 0; i < answer.length; i++) {
                if (answer[i]['total_sales'] == 0) {
                    continue;
                }
                labels.push(answer[i]['store_name']);
                data.push(answer[i]['total_sales']);
                sum_total_sales += parseFloat(answer[i]['total_sales']);
            }

            /* Create color array */
            const dataLength = data.length;
            const colorScale = d3.interpolateRdYlBu;

            const colorRangeInfo = {
                colorStart: 0.2,
                colorEnd: 1,
                useEndAsStart: false,
            };
            var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

            var ctx = document.getElementById('totalSalesByStorePie').getContext('2d');
            var myChart = new Chart(ctx, {
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
                    title: {
                      display: true,
                      text: 'Total sales (month to date): $' + Number(sum_total_sales).toFixed(2),
                      position: 'top',
                      fontSize: 14
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    }
                },
            });

        }
    });
}

function getTotalSalesByTime() {
    startDate = '2020-03-01';
    endDate = '2020-03-14';

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_by_start_date: startDate,
            get_total_sales_by_end_date: endDate
        },
        success: function (answer) {
            console.log(answer);
        }
    });
}