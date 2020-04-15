$(document).ready(function () {
    getHighestStoreSales_DEFAULT();
});

function getHighestStoreSales_DEFAULT() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), 2, 1);

    thisStartDate = moment(firstDay).format('YYYY-MM-DD');
    thisEndDate = moment(date).format('YYYY-MM-DD');

    prevStartDate = moment(thisStartDate).subtract(1, 'months').format('YYYY-MM-DD');
    prevEndDate = moment(prevStartDate).endOf('month').format('YYYY-MM-DD');

    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            highest_store_sales_this_start_date: thisStartDate,
            highest_store_sales_this_end_date: thisEndDate,
            highest_store_sales_prev_start_date: prevStartDate,
            highest_store_sales_prev_end_date: prevEndDate
        },
        success: function (answer) {
            console.log(answer);

            let textClass = "text-danger";
            let thisMonthSalesDifferenceIcon = `<i class="fa fa-arrow-up"></i>`;

            if (answer['bestStore']['total_sales'] < answer['prevBestStore']['total_sales']) {
                textClass = "text-danger";
                thisMonthSalesDifferenceIcon = `<i class="fa fa-arrow-down text-danger"></i>`;
            } else {
                textClass = "text-success";
                thisMonthSalesDifferenceIcon = `<i class="fa fa-arrow-up text-success"></i>`;
            }

            // SET THIS MONTH'S STORE DATA
            $('#thisMonthHighestStoreData').html("");
            $('#thisMonthHighestStoreData').append(`
                <h3 class="` + textClass + `" style=" margin-top: 20px;">` + answer['bestStore']['store_code'] + `</h3>
                <h4 class="` + textClass + `" style="width: 100%;">$` + answer['bestStore']['total_sales'] + `&nbsp;` + thisMonthSalesDifferenceIcon + `</h4>
            `);

            //SET LAST MONTH'S STORE DATA
            $('#prevMonthHighestStoreData').html("");
            $('#prevMonthHighestStoreData').append(`
                <h4 class="text-muted" style=" margin-top: 20px;">` + answer['prevBestStore']['store_code'] + `</h4>
                <h5 class="text-muted" style="width: 100%;">$` + answer['prevBestStore']['total_sales'] + `&nbsp;<i class="fa fa-circle-o"></i></h5>
            `);

            //SET THIS MONTH'S BEST SELLING ITEM
            $('#thisMonthHighestStoreBestSellingItem').html("");
            $('#thisMonthHighestStoreBestSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Best selling item at ` + answer['bestStore']['store_code'] + `</b></h5>
                <h6>` + answer['bestItem']['name'] + `</h6>
            `);

            //SET THIS MONTH'S WORST SELLING ITEM
            $('#thisMonthHighestStoreWorstSellingItem').html("");
            $('#thisMonthHighestStoreWorstSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Worst selling item at ` + answer['bestStore']['store_code'] + `</b></h5>
                <h6>` + answer['worstItem']['name'] + `</h6>
            `);
        }
    });
}