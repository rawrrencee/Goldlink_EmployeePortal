/* CONFIGURATION */
$(document).ready(function () {
    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#selectStoreOfSalesTarget").hide();

    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();

    $("#filterByDateButtonUp").hide();
    $("#filterByDateButtonDown").show();
    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
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

$("#retrieveSalesTarget").click(function () {
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

$("#filterByDateButtonDown").click(function () {
    $("#filterByDateButtonDown").hide();
    $("#filterByDateButtonUp").show();

    $("#filterYearOfSalesTarget").show();
    $("#filterMonthOfSalesTarget").show();
});

$("#filterByDateButtonUp").click(function () {
    $("#filterByDateButtonUp").hide();
    $("#filterByDateButtonDown").show();

    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
});

$("#retrieveSalesPerformanceWithFilters").click(function () {
    let selectedMonthArray = [];
    let selectedYearArray = [];

    $("#filterYearOfSalesTarget").hide();
    $("#filterMonthOfSalesTarget").hide();
    $("#filterByDateButtonUp").hide();
    $("#filterByDateButtonDown").show();

    selectedMonths = $('#filterEmployeeSalesPerformanceByMonth').jqListbox('getSelectedItems');
    selectedYears = $('#filterEmployeeSalesPerformanceByYear').jqListbox('getSelectedItems');

    for (let i = 0; i < selectedMonths.length; i++) {
        selectedMonthArray.push(selectedMonths[i]['value']);
    }

    for (let i = 0; i < selectedYears.length; i++) {
        selectedYearArray.push(selectedYears[i]['title']);
    }

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: { get_all_employees_sales_target: selectedMonthArray, get_selected_years: selectedYearArray },
        dataType: "json",
        success: function (answer) {
            //console.log(answer);
        }
    });

});

/* INIT jqListbox */

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

function initSalesTargetBars() {
    let containerName = '#container';
    for (let i = 0; i < 100; i++) {
        if (i % 2 == 0) {
            containerName = '#container';
        } else {
            containerName = '#container2';
        }
        var bar = new ProgressBar.Line(containerName, {
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            color: '#0275d8',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: { width: '100%', height: '100%', padding: '10px' },
            text: {
                style: {
                    // Text color.
                    // Default: same as stroke color (options.color)
                    color: '#999',
                    right: '0',
                    top: '30px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            }
        });

        bar.animate(i / 100);
    }
}