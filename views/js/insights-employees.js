/* CONFIGURATION */

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

$("#retrieveSalesTarget").click(function () {
    let selectedEmployeeIdArray = [];
    let selectedMonthArray = [];
    let selectedYearArray = [];

    selectedEmployees = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedMonths = $('#monthOfSalesTargetList').jqListbox('getSelectedItems');
    selectedYears = $('#yearOfSalesTargetList').jqListbox('getSelectedItems');

    console.log(selectedEmployees);
    console.log(selectedMonths);
    console.log(selectedYears);

    for (let i = 0; i < selectedEmployees.length; i++) {
        selectedEmployeeIdArray.push(selectedEmployees[i]['id']);
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
        data: { get_employees_sales_target: selectedEmployeeIdArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray },
        dataType: "json",
        success: function (answer) {
            console.log(answer);
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
            } else {
                $("#currentSalesTarget").val("Mixed");
            }
        }
    })
});

$("#updateSalesTargetButton").click(function () {
    let selectedEmployeeIdArray = [];
    let selectedMonthArray = [];
    let selectedYearArray = [];

    selectedEmployees = $('#newEmployeeSalesTargetSelection').select2('data');
    selectedMonths = $('#monthOfSalesTargetList').jqListbox('getSelectedItems');
    selectedYears = $('#yearOfSalesTargetList').jqListbox('getSelectedItems');

    for (let i = 0; i < selectedEmployees.length; i++) {
        selectedEmployeeIdArray.push(selectedEmployees[i]['id']);
    }

    for (let i = 0; i < selectedMonths.length; i++) {
        selectedMonthArray.push(selectedMonths[i]['value']);
    }

    for (let i = 0; i < selectedYears.length; i++) {
        selectedYearArray.push(selectedYears[i]['title']);
    }
    console.log(selectedEmployeeIdArray);
    console.log(selectedMonthArray);
    console.log(selectedYearArray);

    newSalesTarget = $('#newSalesTarget').val();

    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: { post_employees_sales_target: selectedEmployeeIdArray, get_selected_months: selectedMonthArray, get_selected_years: selectedYearArray, get_new_sales_target: newSalesTarget},
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
            if (answer != -1 && answer.length != 0) {
                $("#currentSalesTarget").val(answer[0]['sales_target']);
            } else {
                $("#currentSalesTarget").val("Mixed");
            }
        }
    })
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

$('#modalAddEmployeeSalesTarget').on('hidden.bs.modal', function () {
    $("#selectedEmployeeForSalesTarget").html("");
    $('#newEmployeeSalesTargetSelection').val(null).trigger('change');
    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();
    $('#monthOfSalesTargetList').jqListbox('reset');
    $('#yearOfSalesTargetList').jqListbox('reset');
})

$(document).ready(function () {
    $("#selectMonthOfSalesTarget").hide();
    $("#selectYearOfSalesTarget").hide();
    $("#updateSalesTarget").hide();
    $("#updateSalesTargetButtonDiv").hide();
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