/* CONFIGURATION */

$(document).ready(function () {
    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#selectStoreOfSalesTarget").hide();

    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();

    $("#selectNewSalesTargetFilterButtonUp").hide();

    $("#filterEmployeeSalesChartsButtonUp").hide();
    $("#filterEmployeeSalesChartsButtonDown").show();
    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
    $("#filterStoreOfSalesTarget").hide();
    $("#divRetrieveSalesPerformanceWithFilters").hide();

    initEmployeeSalesPerformanceOverview();
});

$('#newEmployeeSalesTargetSelection').on('select2:select', function (e) {
    let selectedNames = "";

    selected = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedNames = combineSelectionAsString(selected);

    $("#selectedEmployeeForSalesTarget").html("");
    $('#selectedEmployeeForSalesTarget').append(
        `
        <p style="margin-top: 10px;">Changing sales target for: <b>` + selectedNames + `</b></p>
        `
    );
    $("#selectMonthOfSalesTarget").show();
    $("#selectYearOfSalesTarget").show();
    $("#selectStoreOfSalesTarget").show();

    $("#selectNewSalesTargetFilterButtonUp").show();
    $("#selectNewSalesTargetFilterButtonDown").hide();

    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();
});

$('#newEmployeeSalesTargetSelection').on('select2:unselect', function (e) {

    let selectedNames = "";

    selected = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedNames = combineSelectionAsString(selected);

    $("#selectedEmployeeForSalesTarget").html("");
    if (selected.length === 0) {
        $("#selectMonthOfSalesTarget").hide();
        $("#selectYearOfSalesTarget").hide();
        $("#selectStoreOfSalesTarget").hide();

        $("#updateSalesTarget").hide();
        $("#updateSalesTargetButtonDiv").hide();

        return;
    } else {
        $('#selectedEmployeeForSalesTarget').append(
            `
            <p style="margin-top: 10px;">Changing sales target for: <b>` + selectedNames + `</b></p>
            `
        );
        $("#updateSalesTarget").hide();
        $("#updateSalesTargetButtonDiv").hide();
    }

});

$("#newEmployeeSalesTargetSelection").select2({
    allowClear: true,
    placeholder: "Select an employee",
    closeOnSelect: false
});

$("#selectAllMonthOfSalesTarget").click(function () {
    $('#monthOfSalesTargetList').jqListbox('selectAll');
});

$("#resetMonthOfSalesTargetSelection").click(function () {
    $('#monthOfSalesTargetList').jqListbox('reset');
});

$("#selectAllYearOfSalesTarget").click(function () {
    $('#yearOfSalesTargetList').jqListbox('selectAll');
});

$("#resetYearOfSalesTargetSelection").click(function () {
    $('#yearOfSalesTargetList').jqListbox('reset');
});

$("#selectAllStoreOfSalesTarget").click(function () {
    $('#storeOfSalesTargetList').jqListbox('selectAll');
});

$("#resetStoreOfSalesTargetSelection").click(function () {
    $('#storeOfSalesTargetList').jqListbox('reset');

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            for (let i = 0; i < answer.length; i++) {
                let item = [];
                item['title'] = answer[i]['store_name'];
                item['value'] = answer[i]['store_id'];
                $('#storeOfSalesTargetList').jqListbox('insert', item);
            }
        }
    });

});

$("#selectAllFilterStoreOfSalesTarget").click(function () {
    $('#filterEmployeeSalesPerformanceByStore').jqListbox('selectAll');
});

$("#resetStoreOfSalesFilter").click(function () {
    $('#filterEmployeeSalesPerformanceByStore').jqListbox('reset');

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            for (let i = 0; i < answer.length; i++) {
                let item = [];
                item['title'] = answer[i]['store_name'];
                item['value'] = answer[i]['store_id'];
                $('#filterEmployeeSalesPerformanceByStore').jqListbox('insert', item);
            }
        }
    });

});

$("#retrieveSalesTarget").click(function () {
    let selectedEmployeeIdArray = [];
    let selectedStoreArray = [];
    let selectedMonthArray = [];
    let selectedYearArray = [];

    selectedEmployees = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedStores = $('#storeOfSalesTargetList').jqListbox('getSelectedItems');
    selectedMonths = $('#monthOfSalesTargetList').jqListbox('getSelectedItems');
    selectedYears = $('#yearOfSalesTargetList').jqListbox('getSelectedItems');

    $("#selectNewSalesTargetFilterButtonUp").hide();
    $("#selectNewSalesTargetFilterButtonDown").show();

    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#selectStoreOfSalesTarget").hide();

    for (let i = 0; i < selectedEmployees.length; i++) {
        selectedEmployeeIdArray.push(selectedEmployees[i]['id']);
    }

    for (let i = 0; i < selectedStores.length; i++) {
        selectedStoreArray.push(selectedStores[i]['value']);
    }

    for (let i = 0; i < selectedMonths.length; i++) {
        selectedMonthArray.push(selectedMonths[i]['value']);
    }

    for (let i = 0; i < selectedYears.length; i++) {
        selectedYearArray.push(selectedYears[i]['title']);
    }

    if (selectedStoreArray.length == 0 || selectedMonthArray.length == 0 || selectedYearArray.length == 0) {
        $('#updateSalesTarget').html("");
        $("#updateSalesTarget").show();
        $("#updateSalesTargetButtonDiv").hide();
        $('#updateSalesTarget').append(
            `
            <div class="alert alert-warning alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h4><i class="icon fa fa-warning"></i> Information required!</h4>
            Please select all options above to add a sales target.
            </div>
            `
        );
        return;
    }

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: {
            get_employees_sales_target: selectedEmployeeIdArray,
            get_selected_stores: selectedStoreArray,
            get_selected_months: selectedMonthArray,
            get_selected_years: selectedYearArray
        },
        dataType: "json",
        success: function (answer) {
            $('#updateSalesTarget').html("");
            $('#updateSalesTarget').append(
                `
                <div style="margin-btm: 20px;">
                <label for="currentSalesTarget">Current Sales Target</label>
                <input type="text" class="form-control" id="currentSalesTarget" name="currentSalesTarget" disabled>
                </div>
                <div style="margin-top: 20px; margin-btm: 20px;">
                <label for="newSalesTarget">Set New Sales Target</label>
                <input type="text" class="form-control" id="newSalesTarget" name="newSalesTarget">

                </div>
                `
            );
            $("#updateSalesTarget").show();
            $("#updateSalesTargetButtonDiv").show();
            if (answer != -1 && answer.length != 0) {
                $("#currentSalesTarget").val(answer[0]['sales_target']);
            } else if (answer.length == 0) {
                $("#currentSalesTarget").val("0.00");
            } else {
                $("#currentSalesTarget").val("Mixed");
            }
        }
    });

});

$("#updateSalesTargetButton").click(function () {
    let selectedEmployeeIdArray = [];
    let selectedStoreArray = [];
    let selectedMonthArray = [];
    let selectedYearArray = [];

    selectedEmployees = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedStores = $('#storeOfSalesTargetList').jqListbox('getSelectedItems');
    selectedMonths = $('#monthOfSalesTargetList').jqListbox('getSelectedItems');
    selectedYears = $('#yearOfSalesTargetList').jqListbox('getSelectedItems');


    for (let i = 0; i < selectedEmployees.length; i++) {
        selectedEmployeeIdArray.push(selectedEmployees[i]['id']);
    }

    for (let i = 0; i < selectedStores.length; i++) {
        selectedStoreArray.push(selectedStores[i]['value']);
    }

    for (let i = 0; i < selectedMonths.length; i++) {
        selectedMonthArray.push(selectedMonths[i]['value']);
    }

    for (let i = 0; i < selectedYears.length; i++) {
        selectedYearArray.push(selectedYears[i]['title']);
    }

    newSalesTarget = $('#newSalesTarget').val();

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: {
            post_employees_sales_target: selectedEmployeeIdArray,
            get_selected_stores: selectedStoreArray,
            get_selected_months: selectedMonthArray,
            get_selected_years: selectedYearArray,
            get_new_sales_target: newSalesTarget
        },
        dataType: "json",
        success: function (answer) {

            $('#updateSalesTarget').html("");

            $('#updateSalesTarget').append(
                `
                <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <h4><i class="icon fa fa-check"></i> Update success!</h4>
                Sales target updated.
                </div>
                `
            );

            $('#updateSalesTarget').append(
                `
                <div style="margin-btm: 20px;">
                <label for="currentSalesTarget">Current Sales Target</label>
                <input type="text" class="form-control" id="currentSalesTarget" name="currentSalesTarget" disabled>
                </div>
                <div style="margin-top: 20px; margin-btm: 20px;">
                <label for="newSalesTarget">Set New Sales Target</label>
                <input type="text" class="form-control" id="newSalesTarget" name="newSalesTarget">
                </div>
                `
            );
            if (answer != -1 && answer.length != 0) {
                $("#currentSalesTarget").val(answer[0]['sales_target']);
            } else {
                $("#currentSalesTarget").val("Mixed");
            }
        }
    });
});

$("#selectNewSalesTargetFilterButtonDown").click(function () {
    $("#selectNewSalesTargetFilterButtonDown").hide();
    $("#selectNewSalesTargetFilterButtonUp").show();

    $("#selectStoreOfSalesTarget").show();
    $("#selectMonthOfSalesTarget").show();
    $("#selectYearOfSalesTarget").show();

});

$("#selectNewSalesTargetFilterButtonUp").click(function () {
    $("#selectNewSalesTargetFilterButtonUp").hide();
    $("#selectNewSalesTargetFilterButtonDown").show();

    $("#selectStoreOfSalesTarget").hide();
    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
});


$("#filterEmployeeSalesChartsButtonDown").click(function () {
    $("#filterEmployeeSalesChartsButtonDown").hide();
    $("#filterEmployeeSalesChartsButtonUp").show();

    $("#filterYearOfSalesTarget").show();
    $("#filterMonthOfSalesTarget").show();
    $("#filterStoreOfSalesTarget").show();
    $("#divRetrieveSalesPerformanceWithFilters").show();

    $('#filterEmployeeSalesPerformanceByStore').jqListbox('reset');
    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            for (let i = 0; i < answer.length; i++) {
                let item = [];
                item['title'] = answer[i]['store_name'];
                item['value'] = answer[i]['store_id'];
                $('#filterEmployeeSalesPerformanceByStore').jqListbox('insert', item);
            }
        }
    });
});

$("#filterEmployeeSalesChartsButtonUp").click(function () {
    $("#filterEmployeeSalesChartsButtonUp").hide();
    $("#filterEmployeeSalesChartsButtonDown").show();

    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
    $("#filterStoreOfSalesTarget").hide();
    $("#divRetrieveSalesPerformanceWithFilters").hide();
});

$("#retrieveSalesPerformanceWithFilters").click(function () {
    let selectedMonthArray = [];
    let selectedYearArray = [];
    let selectedStoreArray = [];

    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
    $("#filterStoreOfSalesTarget").hide();
    $("#divRetrieveSalesPerformanceWithFilters").hide();
    $("#filterEmployeeSalesChartsButtonUp").hide();
    $("#filterEmployeeSalesChartsButtonDown").show();

    selectedStores = $('#filterEmployeeSalesPerformanceByStore').jqListbox('getSelectedItems');
    selectedMonths = $('#filterEmployeeSalesPerformanceByMonth').jqListbox('getSelectedItems');
    selectedYears = $('#filterEmployeeSalesPerformanceByYear').jqListbox('getSelectedItems');

    for (let i = 0; i < selectedStores.length; i++) {
        selectedStoreArray.push(selectedStores[i]['value']);
    }

    for (let i = 0; i < selectedMonths.length; i++) {
        selectedMonthArray.push(selectedMonths[i]['value']);
    }

    for (let i = 0; i < selectedYears.length; i++) {
        selectedYearArray.push(selectedYears[i]['title']);
    }

    ajaxGetEmployeeSalesPerformance(selectedStoreArray, selectedMonthArray, selectedYearArray);
});

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

function initEmployeeSalesPerformanceOverview() {

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            let selectedMonthArray = [];
            let selectedYearArray = [];
            let selectedStoreArray = [];
            let currentDate = new Date();

            for (let i = 0; i < answer.length; i++) {
                if (answer[i]['store_id'] === 4 || answer[i]['store_id'] === 10 || answer[i]['store_id'] === 12 || answer[i]['store_id'] === 15 || answer[i]['store_id'] === 16) {
                    selectedStoreArray.push(answer[i]['store_id']);
                }
            }

            selectedMonthArray.push((currentDate.getMonth() + 1).toString());

            selectedYearArray.push(currentDate.getFullYear().toString());

            ajaxGetEmployeeSalesPerformance(selectedStoreArray, selectedMonthArray, selectedYearArray);

        }
    });

}

function ajaxGetEmployeeSalesPerformance(selectedStoreArray, selectedMonthArray, selectedYearArray) {

    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (typeof selectedMonthArray[0] !== 'undefined' && typeof selectedYearArray[0] !== 'undefined') {
        month = selectedMonthArray[0] - 1;
        year = selectedYearArray[0];
    }

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date((new Date(year, month + 1, 1)) - 1);

    startDate = moment(firstDay).format('YYYY-MM-DD');
    endDate = moment(lastDay).format('YYYY-MM-DD');

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: {
            get_all_employees_sales_target: selectedStoreArray,
            get_selected_months: selectedMonthArray,
            get_selected_years: selectedYearArray
        },
        dataType: "json",
        success: function (answer) {

            initSalesCompositionByStore();

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let monthString = "";
            let yearString = "";

            $("#employeeSalesTargetList").html("");

            for (let i = 0; i < selectedMonthArray.length; i++) {
                if (i + 1 === selectedMonthArray.length) {
                    monthString += monthNames[selectedMonthArray[i] - 1];
                } else {
                    monthString += monthNames[selectedMonthArray[i] - 1] + ", ";
                }
            }

            for (let i = 0; i < selectedYearArray.length; i++) {
                if (i + 1 === selectedYearArray.length) {
                    yearString += selectedYearArray[i];
                } else {
                    yearString += selectedYearArray[i] + ", ";
                }
            }

            $("#employeeSalesTargetList").append(
                `
                <h4 class="text-info" style="text-align: center; margin-bottom: 20px;">Showing sales performance for <b>` + monthString + ` ` + yearString + `</b></h4>
                `
            );

            let responseLength = Object.keys(answer).length;
            let checkEmpty = true;
            let filteredResponse = [];

            for (let index = 0; index < responseLength; index++) {
                if (answer[index].length > 0) {
                    checkEmpty = false;
                    filteredResponse.push(answer[index]);
                }
            }

            if (!checkEmpty) {
                for (let i = 0; i < filteredResponse.length; i++) {
                    for (let j = 0; j < filteredResponse[i].length; j++) {
                        (filteredResponse[i]).sort(function (a, b) {
                            var percentageCompletionA = a.current_sales_amount / a.sales_target;
                            var percentageCompletionB = b.current_sales_amount / b.sales_target;
                            if (percentageCompletionA > percentageCompletionB) return -1;
                            if (percentageCompletionA < percentageCompletionB) return 1;
                            return 0;
                        });
                    }
                }

                for (let i = 0; i < filteredResponse.length; i++) {

                    //let storeId = replaceSymbolsAndRemoveSpaces(filteredResponse[i][0].store_id.toString());
                    let storeId = filteredResponse[i][0].store_id;
                    let storeIdElement = "employeeSalesTargetList_" + storeId;

                    $("#employeeSalesTargetList").append(
                        `
                        <div class="" style="margin-top: 10px;">
                            <div class="panel box box-solid">
                                <div class="bg-light-blue-active box-header with-border">
                                    <a class="" style="color: #fff" data-toggle="collapse" data-parent="#accordian" href="#collapse_store_` + storeId + `" aria-expanded="true">
                                    <u>Expand/Collapse</u><h4>` + filteredResponse[i][0].store_name + `</h4></a>
                                </div>
                                
                                <div id="collapse_store_` + storeId + `" class="panel-collapse collapse in" aria-expanded="true" style="">
                                    <div id="` + storeIdElement + `" class="box-body">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    );

                    for (let j = 0; j < filteredResponse[i].length; j++) {

                        salesTargetData = filteredResponse[i][j];
                        salesTargetData['full_name'] = salesTargetData['first_name'] + " " + salesTargetData['last_name'];
                        if (salesTargetData['full_name'].length > 18) {
                            salesTargetData['truncated'] = salesTargetData['full_name'].substring(0,18) + '...';
                        } else {
                            salesTargetData['truncated'] = salesTargetData['full_name']
                        }

                        let containerName = "#" + storeIdElement + "_container" + j;
                        let returnOnInvestment = salesTargetData['current_sales_amount'] / salesTargetData['gross_pay'];
                        if (!isFinite(returnOnInvestment)) {
                            returnOnInvestment = 0;
                        }

                        $("#" + storeIdElement).append(
                            `
                            <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                <div class="box box-widget widget-user-2" style="box-shadow: 0.5px 0.5px 4px 0px #dfdfdf; margin-top: 10px;"> 
                                    <div class="widget-user-header">
                                        <div class="pull-right">
                                            <button id="` + storeIdElement + `_details` + j + `" class="btn btn-default getEmployeeSalesByStoreDetails" data-fullName="` + salesTargetData['full_name'] + `" data-month="` + salesTargetData['month'] + `" data-year="` + salesTargetData['year'] + `" data-storeId="` + salesTargetData['store_id'] + `" data-storeName="` + salesTargetData['store_name'] + `" data-personId="` + salesTargetData['person_id'] + `"><i class="fa fa-search"></i></button>
                                        </div>
                                        <h4 class="">` + salesTargetData['truncated'] + `</h4>

                                        <h6 style="text-align: right; width: 100%; margin-top: 20px;">% of salary: ` + Math.round(returnOnInvestment * 100) + `%</h5>
                                        
                                        <div class="pull-right">
                                            <h5 style="color: #999;">Target: $` + salesTargetData['sales_target'] + `</h5>
                                        </div>
                                        <div id="` + storeIdElement + `_container` + j + `" class="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        );

                        initSalesTargetBarForEmployee(salesTargetData, containerName);


                    }

                }

            } else {
                if (document.getElementById("noSalesTargetOverviewDataLabel") == null) {
                    $("#employeeSalesTargetList").append(
                        `
                        <h4 id="noSalesTargetOverviewDataLabel">No data. Please add a sales target.</h4>
                        `
                    );
                }
            }

        }
    });

}

function initSalesCompositionByStore() {
    $.ajax({
        url: "ajax/sales.ajax.php",
        dataType: "json",
        method: "POST",
        data: {
            get_total_sales_by_start_date: startDate,
            get_total_sales_by_end_date: endDate
        },
        success: function (answer) {
            for (let i = 0; i < answer.length; i++) {
                let storeIdElement = "employeeSalesTargetList_" + answer[i]['store_id'];
                let canvasElement = "salesCompositionByStore_" + answer[i]['store_id'];

                if ($("#" + storeIdElement).length) {
                    $("#" + storeIdElement).prepend(
                        `
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-xs-12" style="margin-top: 10px; margin-bottom: 10px;">
                                <canvas id="` + canvasElement + `" height="300"></canvas>
                            </div>
                        </div>
                        `
                    );
                    initSalesCompositionByStoreChart(answer[i]['sales_composition'], canvasElement);
                }

            }

        }
    });
}

function initSalesCompositionByStoreChart(ajaxResponse, canvasElement) {

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
        labels.push(ajaxResponse[i]['first_name'] + " " + ajaxResponse[i]['last_name']);
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

    var ctx = document.getElementById(canvasElement).getContext('2d');

    var chartElementObject = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales',
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
                    formatter: function(value, context) {
                        return "$" + value;
                    }
                }
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
                        return "Total Sales: $" + data.datasets[0].data[idx];
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
            bar.setText("$" + Number(salesTargetData['current_sales_amount']).toFixed(2));
        }
    });

    bar.animate(percentageCompletion);
}

function combineSelectionAsString(selectedItems) {
    let combinedString = "";

    for (let i = 0; i < selectedItems.length; i++) {
        if (i + 1 === selectedItems.length) {
            combinedString += selectedItems[i]['text'];
            break;
        }
        combinedString += selectedItems[i]['text'] + ", "
    }

    return combinedString;
}

function replaceSymbolsAndRemoveSpaces(str) {
    return str.replace(/[^A-Z0-9]+/ig, "_");
}

/* INIT jqListbox */

$('#filterEmployeeSalesPerformanceByStore').jqListbox({
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    }
});

$('#storeOfSalesTargetList').jqListbox({
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    }
});

$('#monthOfSalesTargetList').jqListbox({
    initialValues: [{
            'title': 'Jan',
            value: '1'
        },
        {
            'title': 'Feb',
            value: '2'
        },
        {
            'title': 'Mar',
            value: '3'
        },
        {
            'title': 'Apr',
            value: '4'
        },
        {
            'title': 'May',
            value: '5'
        },
        {
            'title': 'Jun',
            value: '6'
        },
        {
            'title': 'Jul',
            value: '7'
        },
        {
            'title': 'Aug',
            value: '8'
        },
        {
            'title': 'Sep',
            value: '9'
        },
        {
            'title': 'Oct',
            value: '10'
        },
        {
            'title': 'Nov',
            value: '11'
        },
        {
            'title': 'Dec',
            value: '12'
        }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
});

$('#yearOfSalesTargetList').jqListbox({
    initialValues: [{
            'title': '2019'
        },
        {
            'title': '2020'
        },
        {
            'title': '2021'
        },
        {
            'title': '2022'
        },
        {
            'title': '2023'
        },
        {
            'title': '2024'
        },
        {
            'title': '2025'
        },
        {
            'title': '2026'
        },
        {
            'title': '2027'
        },
        {
            'title': '2028'
        },
        {
            'title': '2029'
        },
        {
            'title': '2030'
        }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
});

$('#filterEmployeeSalesPerformanceByMonth').jqListbox({
    initialValues: [{
            'title': 'Jan',
            value: '1'
        },
        {
            'title': 'Feb',
            value: '2'
        },
        {
            'title': 'Mar',
            value: '3'
        },
        {
            'title': 'Apr',
            value: '4'
        },
        {
            'title': 'May',
            value: '5'
        },
        {
            'title': 'Jun',
            value: '6'
        },
        {
            'title': 'Jul',
            value: '7'
        },
        {
            'title': 'Aug',
            value: '8'
        },
        {
            'title': 'Sep',
            value: '9'
        },
        {
            'title': 'Oct',
            value: '10'
        },
        {
            'title': 'Nov',
            value: '11'
        },
        {
            'title': 'Dec',
            value: '12'
        }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
    multiselect: false
});

$('#filterEmployeeSalesPerformanceByYear').jqListbox({
    initialValues: [{
            'title': '2019'
        },
        {
            'title': '2020'
        },
        {
            'title': '2021'
        },
        {
            'title': '2022'
        },
        {
            'title': '2023'
        },
        {
            'title': '2024'
        },
        {
            'title': '2025'
        },
        {
            'title': '2026'
        },
        {
            'title': '2027'
        },
        {
            'title': '2028'
        },
        {
            'title': '2029'
        },
        {
            'title': '2030'
        }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
    multiselect: false
});

$('#modalAddEmployeeSalesTarget').on('hidden.bs.modal', function () {
    $("#selectedEmployeeForSalesTarget").html("");
    $('#newEmployeeSalesTargetSelection').val(null).trigger('change');

    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#selectStoreOfSalesTarget").hide();

    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();
    $('#monthOfSalesTargetList').jqListbox('reset');
    $('#yearOfSalesTargetList').jqListbox('reset');
});

$('#modalAddEmployeeSalesTarget').on('shown.bs.modal', function () {

    $('#storeOfSalesTargetList').jqListbox('reset');
    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            for (let i = 0; i < answer.length; i++) {
                let item = [];
                item['title'] = answer[i]['store_name'];
                item['value'] = answer[i]['store_id'];
                $('#storeOfSalesTargetList').jqListbox('insert', item);
            }
        }
    });

});

$('#modalViewEmployeeSales').on('shown.bs.modal', function () {

    if ($.fn.DataTable.isDataTable('#employeeItemSalesTable')) {
        $("#employeeItemSalesTable").DataTable()
        .columns.adjust()
        .responsive.recalc();
    }

    if ($.fn.DataTable.isDataTable('#employeeItemKitSalesTable')) {
        $("#employeeItemKitSalesTable").DataTable()
        .columns.adjust()
        .responsive.recalc();
    }

});