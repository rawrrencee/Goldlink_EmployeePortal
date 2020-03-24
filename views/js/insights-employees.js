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
        data: { get_all_stores: 0 },
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
        data: { get_all_stores: 0 },
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
        data: { get_employees_sales_target: selectedEmployeeIdArray, get_selected_stores: selectedStoreArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray },
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
    })

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
        data: { post_employees_sales_target: selectedEmployeeIdArray, get_selected_stores: selectedStoreArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray, get_new_sales_target: newSalesTarget },
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
        data: { get_all_stores: 0 },
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

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: { get_all_employees_sales_target: selectedStoreArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray },
        dataType: "json",
        success: function (answer) {

            console.log(answer);

            $("#employeeSalesTargetList").html("");

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

                    let cleanStoreName = replaceSymbolsAndRemoveSpaces(filteredResponse[i][0].store_name);
                    let storeName = "employeeSalesTargetList_" + cleanStoreName;

                    $("#employeeSalesTargetList").append(
                        `
                        <div class="" style="margin-top: 10px;">
                            <div class="panel box box-solid">
                                <div class="bg-light-blue-active box-header with-border">
                                    <h4 class="">
                                        <a class="" style="color: #fff" data-toggle="collapse" data-parent="#accordian" href="#collapse`+ cleanStoreName +`" aria-expanded="true">
                                        ` + filteredResponse[i][0].store_name + `</a>
                                    </h4>

                                </div>
                                
                                <div id="collapse`+ cleanStoreName +`" class="panel-collapse collapse in" aria-expanded="true" style="">
                                    <div id="` + storeName + `" class="box-body">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    );

                    for (let j = 0; j < filteredResponse[i].length; j++) {

                        salesTargetData = filteredResponse[i][j];
                        salesTargetData['full_name'] = salesTargetData['first_name'] + " " + salesTargetData['last_name'];
                        let containerName = "#" + storeName + "_container" + j;

                        $("#" + storeName).append(
                            `
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="box box-widget widget-user-2" style="box-shadow: 0.5px 0.5px 4px 0px #dfdfdf; margin-top: 10px;"> 
                                    <div class="widget-user-header">
                                        <h4 class="">` + salesTargetData['full_name'] + `</h4>
                                        <h5 class="">` + salesTargetData['designation'] + `</h5>
                                        <h6 style="text-align: right; width: 100%;">ROI: 10%</h5>
                                        
                                        <div class="pull-right">
                                            <h5 style="color: #999;">Target: $` + salesTargetData['sales_target'] + `</h5>
                                        </div>
                                        <div id="` + storeName + `_container` + j + `" class="">
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
});

function initEmployeeSalesPerformanceOverview() {

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: { get_all_stores: 0 },
        dataType: "json",
        success: function (answer) {
            let selectedMonthArray = [];
            let selectedYearArray = [];
            let selectedStoreArray = [];
            let currentDate = new Date();

            for (let i = 0; i < answer.length; i++) {
                selectedStoreArray.push(answer[i]['store_id']);
            }
            
            selectedMonthArray.push((currentDate.getMonth() + 1).toString());
        
            selectedYearArray.push(currentDate.getFullYear().toString());
        
            $.ajax({
                url: "ajax/employees.ajax.php",
                method: "POST",
                data: { get_all_employees_sales_target: selectedStoreArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray },
                dataType: "json",
                success: function (answer) {

                    console.log(answer);

                    $("#employeeSalesTargetList").html("");
    
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
        
                            let cleanStoreName = replaceSymbolsAndRemoveSpaces(filteredResponse[i][0].store_name);
                            let storeName = "employeeSalesTargetList_" + cleanStoreName;
        
                            $("#employeeSalesTargetList").append(
                                `
                                <div class="" style="margin-top: 10px;">
                                    <div class="panel box box-solid">
                                        <div class="bg-light-blue-active box-header with-border">
                                            <h4 class="">
                                                <a class="" style="color: #fff" data-toggle="collapse" data-parent="#accordian" href="#collapse`+ cleanStoreName +`" aria-expanded="true">
                                                ` + filteredResponse[i][0].store_name + `</a>
                                            </h4>
    
                                        </div>
                                        
                                        <div id="collapse`+ cleanStoreName +`" class="panel-collapse collapse in" aria-expanded="true" style="">
                                            <div id="` + storeName + `" class="box-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `
                            );
        
                            for (let j = 0; j < filteredResponse[i].length; j++) {
        
                                salesTargetData = filteredResponse[i][j];
                                salesTargetData['full_name'] = salesTargetData['first_name'] + " " + salesTargetData['last_name'];
                                let containerName = "#" + storeName + "_container" + j;
        
                                $("#" + storeName).append(
                                    `
                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                        <div class="box box-widget widget-user-2" style="box-shadow: 0.5px 0.5px 4px 0px #dfdfdf; margin-top: 10px;"> 
                                            <div class="widget-user-header">
                                                <h4 class="">` + salesTargetData['full_name'] + `</h4>
                                                <h5 class="">` + salesTargetData['designation'] + `</h5>
                                                <h6 style="text-align: right; width: 100%;">ROI: 10%</h5>
                                                
                                                <div class="pull-right">
                                                    <h5 style="color: #999;">Target: $` + salesTargetData['sales_target'] + `</h5>
                                                </div>
                                                <div id="` + storeName + `_container` + j + `" class="">
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
    });

}

function initSalesTargetBarForEmployee(salesTargetData, containerName) {

    let percentageCompletion = salesTargetData['current_sales_amount']/salesTargetData['sales_target'];
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
        svgStyle: { width: '100%', height: '100%', padding: '10px' },
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
            bar.setText("$" + salesTargetData['current_sales_amount']);
        }
    });

    bar.animate(percentageCompletion);
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
    initialValues: [
        { 'title': 'Jan', value: '1' },
        { 'title': 'Feb', value: '2' },
        { 'title': 'Mar', value: '3' },
        { 'title': 'Apr', value: '4' },
        { 'title': 'May', value: '5' },
        { 'title': 'Jun', value: '6' },
        { 'title': 'Jul', value: '7' },
        { 'title': 'Aug', value: '8' },
        { 'title': 'Sep', value: '9' },
        { 'title': 'Oct', value: '10' },
        { 'title': 'Nov', value: '11' },
        { 'title': 'Dec', value: '12' }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
});

$('#yearOfSalesTargetList').jqListbox({
    initialValues: [
        { 'title': '2019' },
        { 'title': '2020' },
        { 'title': '2021' },
        { 'title': '2022' },
        { 'title': '2023' },
        { 'title': '2024' },
        { 'title': '2025' },
        { 'title': '2026' },
        { 'title': '2027' },
        { 'title': '2028' },
        { 'title': '2029' },
        { 'title': '2030' }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
});

$('#filterEmployeeSalesPerformanceByMonth').jqListbox({
    initialValues: [
        { 'title': 'Jan', value: '1' },
        { 'title': 'Feb', value: '2' },
        { 'title': 'Mar', value: '3' },
        { 'title': 'Apr', value: '4' },
        { 'title': 'May', value: '5' },
        { 'title': 'Jun', value: '6' },
        { 'title': 'Jul', value: '7' },
        { 'title': 'Aug', value: '8' },
        { 'title': 'Sep', value: '9' },
        { 'title': 'Oct', value: '10' },
        { 'title': 'Nov', value: '11' },
        { 'title': 'Dec', value: '12' }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
});

$('#filterEmployeeSalesPerformanceByYear').jqListbox({
    initialValues: [
        { 'title': '2019' },
        { 'title': '2020' },
        { 'title': '2021' },
        { 'title': '2022' },
        { 'title': '2023' },
        { 'title': '2024' },
        { 'title': '2025' },
        { 'title': '2026' },
        { 'title': '2027' },
        { 'title': '2028' },
        { 'title': '2029' },
        { 'title': '2030' }
    ],
    itemRenderer: function (item) {
        return '<li>' + item.title + '</li>';
    },
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
        data: { get_all_stores: 0 },
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