$(document).ready(function () {
    loadSalesTarget();
});

function loadSalesTarget() {

    if (typeof currentPersonId === 'undefined') {
        return;
    }

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            let selectedEmployeeIdArray = [];
            let selectedMonthArray = [];
            let selectedYearArray = [];
            let selectedStoreArray = [];

            let currentDate = new Date();

            for (let i = 0; i < answer.length; i++) {
                selectedStoreArray.push(answer[i]['store_id']);
            }

            selectedEmployeeIdArray.push(currentPersonId.toString());

            selectedMonthArray.push((currentDate.getMonth() + 1).toString());

            selectedYearArray.push(currentDate.getFullYear().toString());

            getIndividualEmployeeSalesTarget(selectedEmployeeIdArray, selectedStoreArray, selectedMonthArray, selectedYearArray);

        }
    });


}

function getIndividualEmployeeSalesTarget(selectedEmployeeIdArray, selectedStoreArray, selectedMonthArray, selectedYearArray) {
    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: {
            get_all_employee_store_targets: selectedEmployeeIdArray,
            get_selected_stores: selectedStoreArray,
            get_selected_months: selectedMonthArray,
            get_selected_years: selectedYearArray
        },
        dataType: "json",
        success: function (answer) {

            if (answer.length == 0) {
                $("#homePageMySalesTargets").append(
                    `
                    <h4 class="text-info text-center">You have no sales target for this month.</h4>
                    `
                );
            }

            for (let i = 0; i < answer.length; i++) {

                let storeId = answer[i][0].store_id;
                let storeIdElement = "employeeSalesTargetList_" + storeId;

                salesTargetData = answer[i][0];
                salesTargetData['current_sales_amount'] = parseFloat(answer[i].current_sales_amount);
                salesTargetData['full_name'] = salesTargetData['first_name'] + " " + salesTargetData['last_name'];

                let containerName = "#" + storeIdElement + "_container" + i;

                $("#homePageMySalesTargets").append(
                    `
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="box box-widget widget-user-2" style="box-shadow: 1px 1px 4px 0px #dfdfdf; margin-top: 10px;"> 
                                <div class="widget-user-header">
                                    <div class="pull-right">
                                        <button id="` + storeIdElement + `_details` + i + `" class="btn btn-default getEmployeeSalesByStoreDetails" data-fullName="` + salesTargetData['full_name'] + `" data-month="` + salesTargetData['month'] + `" data-year="` + salesTargetData['year'] + `" data-storeId="` + salesTargetData['store_id'] + `" data-storeName="` + salesTargetData['store_name'] + `" data-personId="` + salesTargetData['person_id'] + `"><i class="fa fa-search"></i></button>
                                    </div>
                                    <h4 class="">` + salesTargetData['store_name'] + `</h4>
                                    
                                    <div class="pull-right">
                                        <h5 style="color: #999;">Target: $` + salesTargetData['sales_target'] + `</h5>
                                    </div>
                                    <div id="` + storeIdElement + `_container` + i + `" class="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                );

                initSalesTargetBarForEmployee(salesTargetData, containerName);


            }
        }
    });
}

function initSalesTargetBarForEmployee(salesTargetData, containerName) {

    let percentageCompletion = salesTargetData['current_sales_amount'] / salesTargetData['sales_target'];
    let textAlign = "left";
    let color = "#f0ad4e";
    let percentageCompletionStr = "";
    if (percentageCompletion >= 1) {
        percentageCompletion = 1;
        textAlign = "right";
        color = "#5cb85c";
        percentageCompletionStr = "0%";
    } else if (percentageCompletion === 0) {
        textAlign = "left";
        percentageCompletionStr = "0%";
    } else {
        if (percentageCompletion > 0.7) {
            textAlign = "right";
            percentageCompletionStr = "0%";
        } else {
            percentageCompletionStr = percentageCompletion * 100 - 5 + "%";
        }
    }
    if (percentageCompletion < 0.5) {
        color = "#d9534f";
    }

    var bar = new ProgressBar.Line(containerName, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: color,
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {
            width: '100%',
            height: '100%',
            padding: '10px'
        },
        text: {
            style: {
                // Text color.
                // Default: same as stroke color (options.color)
                textAlign: textAlign,
                color: '#999',
                width: '100%',
                right: '0',
                top: '30px',
                padding: 0,
                marginLeft: percentageCompletionStr,
                transform: null
            },
            autoStyleContainer: false
        },
        step: (state, bar) => {
            bar.setText("$" +  Number(salesTargetData['current_sales_amount']).toFixed(2));
        }
    });

    bar.animate(percentageCompletion);
}

$(document).on("click", ".getEmployeeSalesByStoreDetails", function(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentEmployee_month = this.getAttribute('data-month');
    let currentEmployee_year = this.getAttribute('data-year');
    let currentEmployee_storeId = this.getAttribute('data-storeId');
    let currentEmployee_personId = this.getAttribute('data-personId');
    let currentEmployee_fullName = this.getAttribute('data-fullName');
    let currentEmployee_storeName = this.getAttribute('data-storeName');

    $("#modalViewEmployeeSales").modal('show');

    $.ajax({
        url: "ajax/sales.ajax.php",
        method: "POST",
        data: {
            getEmployeeItemSales_month: currentEmployee_month,
            getEmployeeItemSales_year: currentEmployee_year,
            getEmployeeItemSales_storeId: currentEmployee_storeId,
            getEmployeeItemSales_personId: currentEmployee_personId
        },
        dataType: "json",
        success: function (answer) {
            initEmployeeItemSalesTable(answer);
        }
    });

    $.ajax({
        url: "ajax/sales.ajax.php",
        method: "POST",
        data: {
            getEmployeeItemKitSales_month: currentEmployee_month,
            getEmployeeItemKitSales_year: currentEmployee_year,
            getEmployeeItemKitSales_storeId: currentEmployee_storeId,
            getEmployeeItemKitSales_personId: currentEmployee_personId
        },
        dataType: "json",
        success: function (answer) {
            initEmployeeItemKitSalesTable(answer);
        }
    });

    let message = "Displaying sales for <b>" + currentEmployee_fullName + "</b> for <b>" + monthNames[parseInt(currentEmployee_month) - 1] + " "+ currentEmployee_year + "</b> at <b>" + currentEmployee_storeName + "</b>";

    displayEmployeeSalesModalDataMsg(message);
});

function initEmployeeItemSalesTable(ajaxResponse) {
    $("#employeeItemSalesTableBody").html("");

    if ($.fn.DataTable.isDataTable('#employeeItemSalesTable')) {
        $("#employeeItemSalesTable").DataTable().destroy();
    }
    if (ajaxResponse.length === 0) {
        $("#employeeItemSalesTableBody").html("");
        $("#employeeItemSalesTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="7">No data available.</td>
            </tr>
            `
        );
    } else {
        $("#employeeItemSalesTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#employeeItemSalesTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['sale_time'] + `</td>
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
        if (!$.fn.DataTable.isDataTable('#employeeItemSalesTable')) {
            $("#employeeItemSalesTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [0, 'asc'],
                "columnDefs": [
                    { responsivePriority: 10002, targets: 2 },
                    { responsivePriority: 10001, targets: 3 }
                ],
                "rowGroup": {
                    dataSrc: function (row) {
                        return moment(row[0]).format("DD MMMM YYYY, dddd");
                    }
                }
            });
        }
    }

}

function displayEmployeeSalesModalDataMsg(message) {
    if (message.length > 0) {
        $("#displayEmployeeSalesModalDataMsg").html("");
        $("#displayEmployeeSalesModalDataMsg").append(
            `
            <h5 class="text-center text-info" style="margin-top: 20px;">` + message + `
            </h5>
            `
        );
    } else {
        $("#displayEmployeeSalesModalDataMsg").html("");
    }
}

function initEmployeeItemKitSalesTable(ajaxResponse) {
    $("#employeeItemKitSalesTableBody").html("");

    if ($.fn.DataTable.isDataTable('#employeeItemKitSalesTable')) {
        $("#employeeItemKitSalesTable").DataTable().destroy();
    }

    if (ajaxResponse.length === 0) {
        $("#employeeItemKitSalesTableBody").html("");
        $("#employeeItemKitSalesTableBody").append(
            `
            <tr>
                <td class="text-center" colspan="7">No data available.</td>
            </tr>
            `
        );
    } else {
        $("#employeeItemKitSalesTableBody").html("");
        for (let i = 0; i < ajaxResponse.length; i++) {
            $("#employeeItemKitSalesTableBody").append(
                `
                <tr>
                    <td>` + ajaxResponse[i]['sale_time'] + `</td>
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
        if (!$.fn.DataTable.isDataTable('#employeeItemKitSalesTable')) {
            $("#employeeItemKitSalesTable").DataTable({
                "lengthMenu": [5, 10, 15, 20, 50, 100],
                "order": [0, 'asc'],
                "columnDefs": [
                    { responsivePriority: 10002, targets: 2 },
                    { responsivePriority: 10001, targets: 3 }
                ],
                "rowGroup": {
                    dataSrc: function (row) {
                        return moment(row[0]).format("DD MMMM YYYY, dddd");
                    }
                }
            });
        }

    }

}