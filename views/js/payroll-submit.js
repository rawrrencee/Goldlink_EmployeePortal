//APPEND SALARY LISTING
$("#salaryVoucherForm").on("click", "button.addSalaryListing", function () {

  $("#appendSalaryListing").append(
    `
    <div class="form-row">
      <div class="form-group col-md-4 col-sm-12 col-xs-12">
        <label for="appendSalaryTitle">Title</label>
        <input required type="text" class="form-control" id="appendSalaryTitle" name="salaryTitle[]">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12">
        <label for="appendSalaryAmount">Amount</label>
        <input type="number" class="form-control grossPay" id="appendSalaryAmount" min="0.00" step="0.01" value="0.00" name="salaryAmount[]">
      </div>
      <div class="form-group col-md-4 col-sm-12 col-xs-12">
        <label for="appendSalaryRemarks">Remarks</label>
        <input type="text" class="form-control" id="appendSalaryRemarks" name="salaryRemarks[]">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12" style="padding-top: 23px;">
        <button type="button" id="removeSalaryListing" class="btn btn-block btn-danger removeSalaryListing"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
      </div>
    </div>
    `)

});

//APPEND SALARY LISTING (PT)
$("#salaryVoucherForm").on("click", "button.addSalaryListingPT", function () {

  $("#appendSalaryListingPT").append(
    `
    <div class="form-row">
      <div class="form-group col-md-3 col-sm-12 col-xs-12">
        <label for="newSalaryTitle">Title</label>
        <input type="text" class="form-control" id="newSalaryTitle" name="salaryTitle[]" value="">
      </div>
      <div class="form-group col-md-2 col-sm-6 col-xs-6">
        <label for="newSalaryRate">Rate</label>
        <input type="number" class="form-control ratePT" id="newSalaryRate" min="0.00" step="0.01" value="0.00" name="salaryRate[]">
      </div>
      <div class="form-group col-md-2 col-sm-6 col-xs-6">
        <label for="newSalaryUnit">Unit</label>
        <input type="number" class="form-control unitPT" id="newSalaryUnit" min="0.00" step="0.01" value="0.00" name="salaryUnit[]">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12">
        <label for="newSalarySubtotal">Subtotal</label>
        <input readonly type="number" class="form-control subTotalPT grossPay" id="newSalarySubtotal" min="0.00" step="0.01" value="0.00" name="salarySubtotal[]">
      </div>
      <div class="form-group col-md-3 col-sm-12 col-xs-12">
        <label for="newSalaryRemarks">Remarks</label>
        <input type="text" class="form-control" id="newSalaryRemarks" name="salaryRemarks[]">
      </div>
      <div class="form-group col-md-12 col-sm-12 col-xs-12" style="padding-top: 23px;">
      <button type="button" id="removeSalaryListingPT" class="btn btn btn-danger removeSalaryListingPT"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
      </div>
    </div>
    `)

});

//APPEND DEDUCTION LISTING
$("#salaryVoucherForm").on("click", "button.addDeductionListing", function () {

  $("#appendDeductionListing").append(
    `
    <div class="form-row">
      <div class="form-group col-md-5 col-sm-12 col-xs-12">
        <label for="appendDeductionTitle">Title</label>
        <input required type="text" class="form-control" id="appendDeductionTitle" name="deductionTitle[]">
      </div>
      <div class="form-group col-md-5 col-sm-12 col-xs-12">
        <label for="appendDeductionAmount">Amount</label>
        <input type="number" class="form-control totalDeductions" id="appendDeductionAmount" min="0.00" step="0.01" value="0.00" name="deductionAmount[]" oninput="validity.valid||(value='');">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12" style="padding-top: 23px;">
        <button type="button" id="addDeductionListing" class="btn btn-block btn-danger removeDeductionListing"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
      </div>
    </div>
    `)

});

//APPEND OTHERS LISTING
$("#salaryVoucherForm").on("click", "button.addOthersListing", function () {

  $("#appendOthersListing").append(
    `
    <div class="form-row">
      <div class="form-group col-md-5 col-sm-12 col-xs-12">
        <label for="appendOthersTitle">Title</label>
        <input required type="text" class="form-control" id="appendOthersTitle" name="othersTitle[]">
      </div>
      <div class="form-group col-md-5 col-sm-12 col-xs-12">
        <label for="appendOthersAmount">Amount</label>
        <input type="number" class="form-control totalOthers" id="appendOthersAmount" step="0.01" value="0.00" name="othersAmount[]">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12" style="padding-top: 23px;">
        <button type="button" id="addOthersListing" class="btn btn-block btn-danger removeOthersListing"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
      </div>
    </div>
    `)

});

//REMOVE SALARY LISTING
$("#salaryVoucherForm").on("click", "button.removeSalaryListing", function () {

  $(this).parent().parent().remove();
  recalculateGrossPay();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  recalculateTotalDeductions();
});

//REMOVE SALARY LISTING
$("#salaryVoucherForm").on("click", "button.removeSalaryListingPT", function () {

  $(this).parent().parent().remove();
  recalculateGrossPay();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  recalculateTotalDeductions();
});

//REMOVE DEDUCTION LISTING
$("#salaryVoucherForm").on("click", "button.removeDeductionListing", function () {

  $(this).parent().parent().remove();
  recalculateTotalDeductions();

});

//REMOVE OTHERS LISTING
$("#salaryVoucherForm").on("click", "button.removeOthersListing", function () {

  $(this).parent().parent().remove();
  recalculateTotalOthers();

});

//CHANGE SALARY LISTING AMOUNT
$("#salaryVoucherForm").on("change", "input.grossPay", function () {
  recalculateGrossPay();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
  }
  recalculateTotalDeductions();
})

//CHANGE SALARY LISTING AMOUNT (PT)
$("#salaryVoucherForm").on("change", "input.ratePT", function () {
  calculateSubtotalPT();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
  }
  recalculateTotalDeductions();
})

$("#salaryVoucherForm").on("change", "input.unitPT", function () {
  calculateSubtotalPT();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
  }
  recalculateTotalDeductions();
})

//CHANGE DEDUCTION LISTING AMOUNT
$('#newIsSGPR').on('ifUnchecked', function (event) {
  CPF_employee = 0.00;
  CPF_employer = 0.00;
  $("#newCPFEmployee").val(Number(CPF_employee).toFixed(2));
  $("#newCPFEmployer").val(Number(CPF_employer).toFixed(2));
  recalculateTotalDeductions();
});

$('#newIsSGPR').on('ifChecked', function (event) {
  setCPF();
  recalculateTotalDeductions();
});

$('#newCSMSelection').on('ifUnchecked', function (event) {
  $('#newCSMTitle').val("N/A");
  $('#newCSMAmount').val("0.00");
  recalculateTotalDeductions();
});

$('#newCSMSelection').on('ifChecked', function (event) {
  calculateCSM();
  recalculateTotalDeductions();
});

$("#salaryVoucherForm").on("change", "input.totalDeductions", function () {
  recalculateTotalDeductions();
})

//CHANGE OTHERS LISTING AMOUNT
$("#salaryVoucherForm").on("change", "input.totalOthers", function () {
  recalculateTotalOthers();
})

/* SELECT2 */
$('#newMethodOfPayment').select2({
  placeholder: "Select method of payment"
});

$('.newSalesInformation').select2({
  placeholder: "Select or type a number",
  tags: true
});

$('.newDailyHoursWorked').select2({
  placeholder: "Select or type a number",
  tags: true
});

$('#newMonthOfVoucher').select2({
  placeholder: "Select month"
});

$('#newMonthOfVoucher').on('select2:select', function (e) {
  autofillAttendance();
});

$('#newYearOfVoucher').select2({
  placeholder: "Select year"
});

$('#newYearOfVoucher').on('select2:select', function (e) {
  autofillAttendance();
});


$('.newSalesInformation').on('select2:select', function (e) {
  recalculatePersonalSales();
  autofillAttendance();
});

$('.newDailyHoursWorked').on('select2:select', function (e) {
  recalculateDailyHoursWorked();
});

//SWITCH TO TAB UPON UNFILLED REQUIRED
//BUTTONS STUFF HERE
$('.postButton').click(function () {
  $(':required:invalid', '#salaryVoucherForm').each(function () {
    var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');
    $('.nav a[href="#' + id + '"]').tab('show');
  });
});

$('#saveDraftVoucher').click(function () {
  $("#newIsDraft").val(1);
});

$('#submitVoucher').click(function (event) {
  $("#newIsDraft").val(0);
});

$('#submitPendingVoucher').click(function () {
  $("#updateVoucherStatus").val("Pending");
});

$('#submitApprovedVoucher').click(function () {
  $('#updateVoucherStatus').val("Approved");
});

$('#submitRejectedVoucher').click(function () {
  $("#updateVoucherStatus").val("Rejected");
});

$('#resetVoucher').click(function (event) {
  $("#appendSalaryListing").html("");
  $("#appendSalaryListingPT").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
});

$("#updateVoucherStatusForm").on('click', '#btnApproveSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $('#voucherStatusToUpdate').val("Approved");
});

$("#updateVoucherStatusForm").on('click', '#btnRejectSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $("#voucherStatusToUpdate").val("Rejected");
});

$("#updateVoucherStatusForm").on('click', '#btnPendingSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $("#voucherStatusToUpdate").val("Pending");
});

//ON SUBMIT CREATE SALARY VOUCHER ASK FOR CONFIRMATION
$('#salaryVoucherForm').on('submit', function (e) {
  e.preventDefault();
  if ($("#newIsDraft").val() == 0 && $('#voucherStatusToUpdate').length == 0) {
    swal({
      type: "warning",
      title: "Confirm submit? No changes can be made after submission.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Confirm"
    }).then(function (result) {
      if (result.value) {
        $('#salaryVoucherForm').off('submit').submit();
      }
    });
  } else {
    $('#salaryVoucherForm').off('submit').submit();
  }

});

//NEXT AND PREVIOUS BUTTONS FOR TABS
$('.btnNext').click(function () {
  $('.nav-tabs > .active').next('li').find('a').trigger('click');
  if ($('.nav-tabs > .active').next('li').find('a').length == 0) {
    $('.btnNext').hide();
  }
  if ($('.nav-tabs > .active').prev('li').find('a').length == 1) {
    $('.btnPrevious').show();
  }
});

$('.btnPrevious').click(function () {
  $('.nav-tabs > .active').prev('li').find('a').trigger('click');
  if ($('.nav-tabs > .active').next('li').find('a').length == 1) {
    $('.btnNext').show();
  }
  if ($('.nav-tabs > .active').prev('li').find('a').length == 0) {
    $('.btnPrevious').hide();
  }
});

//HIDE PREVIOUS TAB BUTTON ON DOCUMENT LOAD
$(document).ready(function () {
  if ($('.nav-tabs > .active').prev('li').find('a').length == 0) {
    $('.btnPrevious').hide();
  }
});

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalViewMySalaryVoucher').on('hidden.bs.modal', function () {
  $("#appendSalaryListing").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
})

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalEditSalaryVoucher').on('hidden.bs.modal', function () {
  $("#appendSalaryListing").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
})

//SET FOCUS TO ANY ELEMENT TO FIX THE CLOSING MODAL ESC KEYUP ISSUE
$('#modalEditSalaryVoucher').on('shown.bs.modal', function () {
  $('#newMonthOfVoucher').focus();
})
$('#modalEditSalaryVoucherPT').on('shown.bs.modal', function () {
  $('#newMonthOfVoucher').focus();
})