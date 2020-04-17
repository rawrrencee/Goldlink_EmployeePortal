/*=============================================
SIDEBAR MENU
=============================================*/

$('.sidebar-menu').tree();

/*=============================================
DATA TABLE
=============================================*/

$('.datatables').DataTable();
$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');

//Date range picker
$('#reservation').daterangepicker()
//Date range picker with time picker
$('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
//Date range as a button
$('#daterange-btn').daterangepicker(
    {
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    },
    function (start, end) {
        $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
)

/*=============================================
iCheck
=============================================*/

//iCheck for checkbox and radio inputs
$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue'
})

$('input').on('ifChecked', function (event) {
    $(this).closest("input").attr('checked', true);
});
$('input').on('ifUnchecked', function (event) {
    $(this).closest("input").attr('checked', false);
});

/*=============================================
SELECT2
=============================================*/

$('.select2').select2();

/*=============================================
AJAX LOADING GIF
=============================================*/

$(document).ajaxStart(function () {
    $("#loading").show();
});

$(document).ajaxStop(function () {
    $("#loading").hide();
});

$(document).ready(function () {
    $("#loading").hide();
});