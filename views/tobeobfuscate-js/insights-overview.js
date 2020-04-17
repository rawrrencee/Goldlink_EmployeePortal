$(document).ready(function () {
    getStoreSalesOverview_DEFAULT();
});

function getStoreSalesOverview_DEFAULT() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    //DEVELOPMENT DEMO
    date = new Date(2020, 0, 27);
    firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

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

            let textClass = "text-danger";
            let thisMonthBestStoreDifferenceIcon = `<i class="fa fa-arrow-up"></i>`;
            let thisMonthWorstStoreDifferenceIcon = `<i class="fa fa-arrow-up"></i>`;

            if (parseFloat(answer['bestStore']['total_sales']) < parseFloat(answer['prevBestStore']['total_sales'])) {
                textClass = "text-danger";
                thisMonthBestStoreDifferenceIcon = `<i class="fa fa-arrow-down text-danger"></i>`;
            } else {
                textClass = "text-success";
                thisMonthBestStoreDifferenceIcon = `<i class="fa fa-arrow-up text-success"></i>`;
            }

            if (answer['thisMonthData'].length === 0) {

                answer['bestStore']['store_code'] = "N.A.";
                answer['bestStore']['total_sales'] = "N.A.";
                answer['bestStoreBestItem']['name'] = "N.A.";
                answer['bestStoreWorstItem']['name'] = "N.A.";

                answer['worstStore']['store_code'] = "N.A.";
                answer['worstStore']['total_sales'] = "N.A.";
                answer['worstStoreBestItem']['name'] = "N.A.";
                answer['worstStoreWorstItem']['name'] = "N.A.";
                textClass = "text-muted";
                thisMonthBestStoreDifferenceIcon = `<i class="fa fa-circle-o"></i>`;
                thisMonthWorstStoreDifferenceIcon = `<i class="fa fa-circle-o"></i>`;

            }

            if (answer['prevMonthData'].length === 0) {

                answer['prevMonthData']['store_code'] = "N.A.";
                answer['prevMonthData']['total_sales'] = "N.A.";


            }

            if (answer['prevBestStore'].length === 0) {

                answer['prevBestStore']['store_code'] = "N.A.";
                answer['prevBestStore']['total_sales'] = "N.A.";

            }

            if (answer['prevWorstStore'].length === 0) {

                answer['prevWorstStore']['store_code'] = "N.A.";
                answer['prevWorstStore']['total_sales'] = "N.A.";

            }

            if (answer['worstStoreBestItem'].length === 0) {

                answer['worstStoreBestItem']['name'] = "N.A.";
                
            }

            if (answer['worstStoreWorstItem'].length === 0) {

                answer['worstStoreWorstItem']['name'] = "N.A.";
                
            }

            // SET THIS MONTH'S BEST STORE DATA
            $('#thisMonthHighestStoreData').html("");
            $('#thisMonthHighestStoreData').append(`
                <h3 class="` + textClass + `" style=" margin-top: 20px;">` + answer['bestStore']['store_code'] + `</h3>
                <h4 class="` + textClass + `" style="width: 100%;">$` + answer['bestStore']['total_sales'] + `&nbsp;` + thisMonthBestStoreDifferenceIcon + `</h4>
            `);

            //SET LAST MONTH'S BEST STORE DATA
            $('#prevMonthHighestStoreData').html("");
            $('#prevMonthHighestStoreData').append(`
                <h4 class="text-muted" style=" margin-top: 20px;">` + answer['prevBestStore']['store_code'] + `</h4>
                <h5 class="text-muted" style="width: 100%;">$` + answer['prevBestStore']['total_sales'] + `&nbsp;<i class="fa fa-circle-o"></i></h5>
            `);

            //SET THIS MONTH'S BEST STORE BEST SELLING ITEM
            $('#thisMonthHighestStoreBestSellingItem').html("");
            $('#thisMonthHighestStoreBestSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Best selling item at ` + answer['bestStore']['store_code'] + `</b></h5>
                <h6>` + answer['bestStoreBestItem']['name'] + `</h6>
            `);

            //SET THIS MONTH'S BEST STORE WORST SELLING ITEM
            $('#thisMonthHighestStoreWorstSellingItem').html("");
            $('#thisMonthHighestStoreWorstSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Worst selling item at ` + answer['bestStore']['store_code'] + `</b></h5>
                <h6>` + answer['bestStoreWorstItem']['name'] + `</h6>
            `);

            if (answer['worstStore']['total_sales'] != "N.A." && answer['worstStore']['total_sales'] < answer['prevWorstStore']['total_sales']) {
                textClass = "text-danger";
                thisMonthWorstStoreDifferenceIcon = `<i class="fa fa-arrow-down text-danger"></i>`;
            } else if (answer['worstStore']['total_sales'] != "N.A.") {
                textClass = "text-success";
                thisMonthWorstStoreDifferenceIcon = `<i class="fa fa-arrow-up text-success"></i>`;
            }

            // SET THIS MONTH'S WORST STORE DATA
            $('#thisMonthWorstStoreData').html("");
            $('#thisMonthWorstStoreData').append(`
                <h3 class="` + textClass + `" style=" margin-top: 20px;">` + answer['worstStore']['store_code'] + `</h3>
                <h4 class="` + textClass + `" style="width: 100%;">$` + answer['worstStore']['total_sales'] + `&nbsp;` + thisMonthWorstStoreDifferenceIcon + `</h4>
            `);

            //SET LAST MONTH'S WORST STORE DATA
            $('#prevMonthWorstStoreData').html("");
            $('#prevMonthWorstStoreData').append(`
                <h4 class="text-muted" style=" margin-top: 20px;">` + answer['prevWorstStore']['store_code'] + `</h4>
                <h5 class="text-muted" style="width: 100%;">$` + answer['prevWorstStore']['total_sales'] + `&nbsp;<i class="fa fa-circle-o"></i></h5>
            `);

            //SET THIS MONTH'S WORST STORE BEST SELLING ITEM
            $('#thisMonthWorstStoreBestSellingItem').html("");
            $('#thisMonthWorstStoreBestSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Best selling item at ` + answer['worstStore']['store_code'] + `</b></h5>
                <h6>` + answer['worstStoreBestItem']['name'] + `</h6>
            `);

            //SET THIS MONTH'S WORST STORE WORST SELLING ITEM
            $('#thisMonthWorstStoreWorstSellingItem').html("");
            $('#thisMonthWorstStoreWorstSellingItem').append(`
                <h5><b><i class="fa fa-tag"></i>&nbsp;Worst selling item at ` + answer['worstStore']['store_code'] + `</b></h5>
                <h6>` + answer['worstStoreWorstItem']['name'] + `</h6>
            `);

            //SET THIS MONTH'S HIGHEST SALE VALUE ITEM
            $("#overallHighestSaleValueItem").html("");
            $("#overallHighestSaleValueItem").append(`
                <h5 style="margin-top: 20px;">` + answer['bestOverallItemByValue']['name'] + `
                </h5>
                <h5 style="margin-bottom: 20px;">$` + answer['bestOverallItemByValue']['totalDiscSales'] + `</h5>
            `);

            //SET THIS MONTH'S LOWEST SALE VALUE ITEM
            $("#overallLowestSaleValueItem").html("");
            $("#overallLowestSaleValueItem").append(`
                <h5 style="margin-top: 20px;">` + answer['worstOverallItemByValue']['name'] + `
                </h5>
                <h5 style="margin-bottom: 20px;">$` + answer['worstOverallItemByValue']['totalDiscSales'] + `</h5>
            `);

            //SET THIS MONTH'S HIGHEST SALE QUANTITY ITEM
            $("#overallHighestQuantityItem").html("");
            $("#overallHighestQuantityItem").append(`
                <h5 style="margin-top: 20px;">` + answer['bestOverallItemByQuantity']['name'] + `
                </h5>
                <h5 style="margin-bottom: 20px;">` + answer['bestOverallItemByQuantity']['totalQty'] + ` piece(s)</h5>
            `);

            //SET THIS MONTH'S LOWEST SALE QUANTITY ITEM
            $("#overallLowestQuantityItem").html("");
            $("#overallLowestQuantityItem").append(`
                <h5 style="margin-top: 20px;">` + answer['worstOverallItemByQuantity']['name'] + `
                </h5>
                <h5 style="margin-bottom: 20px;">` + answer['worstOverallItemByQuantity']['totalQty'] + ` piece(s)</h5>
            `);

        }
    });
}