//DATATABLES DRAFT SALARY VOUCHERS
/* DATATABLES CONFIGURATION */
var salaryVoucherDraftsTable = $('.tableSalaryVoucherDrafts').DataTable({
  "ajax": "ajax/datatable-salary-voucher-drafts.ssp.php",
  "pageLength": 5,
  "lengthMenu": [[5, 10, 20], [5, 10, 20]],
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[3, 'desc']],
  "columns": [
    { "data": 0 },
    { "data": 1 },
    { "data": 2 },
    { "data": 3 },
    { "data": 4 },
    { "data": 5 },
    { "data": 6 },
    { "data": 7 },
    { "data": 8 },
    { "data": 9 },
    { "data": 10 },
    { "data": 11 },
    { "data": 12 },
    { "data": 13 },
    { "data": 14 },
    { "data": 15 },
    { "data": 16 },
    { "data": 17 },
    { "data": 18 },
    { "data": 19 },
    { "data": 20 },
    { "data": 21 },
    { "data": 22 },
    { "data": 23 },
    { "data": 24 },
    { "data": 25 }
  ],
  "columnDefs": [{
    "targets": [0, 1],
    "responsivePriority": 1
  }, {
    "targets": 26,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnLoadSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-warning btn-sm btnLoadSalaryVoucherDraft'><i class='fa fa-download'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 27,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnDeleteSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-danger btn-sm btnDeleteSalaryVoucherDraft'><i class='fa fa-times'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }]
});

$('.tableSalaryVoucherDrafts thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 26 && index != 27) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

salaryVoucherDraftsTable.columns().every(function () {
  var salaryVoucherDraftsTable = this;
  $('input', this.header()).on('keyup change', function () {
    if (salaryVoucherDraftsTable.search() !== this.value) {
      salaryVoucherDraftsTable.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

$(".tableSalaryVoucherDrafts tbody").on("click", "button.btnDeleteSalaryVoucherDraft", function () {

  var voucher_id = $(this).attr("voucherId");

  swal({

    title: 'Are you sure you want to delete the draft?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Delete'
  }).then(function (result) {
    if (result.value) {

      window.location = "index.php?route=employee-salary-voucher-submit&voucherIdToDelete=" + voucher_id;

    }
  })
})


//DATATABLES MY SALARY VOUCHERS
/* DATATABLES CONFIGURATION */
var mySalaryVouchersTable = $('.tableMySalaryVouchers').DataTable({
  "ajax": "ajax/datatable-salary-voucher-my.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[3, 'desc']],
  "columns": [
    { "data": 0 },
    { "data": 1 },
    { "data": 2 },
    { "data": 3 },
    { "data": 4 },
    { "data": 5 },
    { "data": 6 },
    { "data": 7 },
    { "data": 8 },
    { "data": 9 },
    { "data": 10 },
    { "data": 11 },
    { "data": 12 },
    { "data": 13 },
    { "data": 14 },
    { "data": 15 },
    { "data": 16 },
    { "data": 17 },
    { "data": 18 },
    { "data": 19 },
    { "data": 20 },
    { "data": 21 },
    { "data": 22 },
    { "data": 23 },
    { "data": 24 },
    { "data": 25 }
  ],
  "columnDefs": [{
    "targets": [0, 1, 7],
    "responsivePriority": 1
  }, {
    "targets": 26,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnViewSalaryVoucher' voucherId=" + row[0] + " class='btn btn-warning btn-sm btnViewSalaryVoucher' data-toggle='modal' data-target='#modalViewMySalaryVoucher'><i class='fa fa-eye'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 27,
    "data": null,
    "render": function (data, type, row) {
      return `<button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>`;
    },
    "orderable": false,
    "responsivePriority": 2
  }]
});


$('.tableMySalaryVouchers thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 26 && index != 27) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

mySalaryVouchersTable.columns().every(function () {
  var mySalaryVouchersTable = this;
  $('input', this.header()).on('keyup change', function () {
    if (mySalaryVouchersTable.search() !== this.value) {
      mySalaryVouchersTable.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});


//DATATABLES SALARY VOUCHER MANAGEMENT
/* DATATABLES CONFIGURATION */
var allSalaryVouchersTable = $('.tableAllSalaryVouchers').DataTable({
  "ajax": "ajax/datatable-salary-voucher-management.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[9, 'desc']],
  "columns": [
    { "data": 0 },
    { "data": 1 },
    { "data": 2 },
    { "data": 3 },
    { "data": 4 },
    { "data": 5 },
    { "data": 6 },
    { "data": 7 },
    { "data": 8 },
    { "data": 9 },
    { "data": 10 },
    { "data": 11 },
    { "data": 12 },
    { "data": 13 },
    { "data": 14 },
    { "data": 15 },
    { "data": 16 },
    { "data": 17 },
    { "data": 18 },
    { "data": 19 },
    { "data": 20 },
    { "data": 21 },
    { "data": 22 },
    { "data": 23 },
    { "data": 24 },
    { "data": 25 },
    { "data": 26 },
    { "data": 27 }
  ],
  "columnDefs": [{
    "targets": [0, 1, 3],
    "responsivePriority": 1
  }, {
    "targets": 28,
    "data": null,
    "render": function (data, type, row) {
      if (row[7] == "Pending") {
        return `
      <button type='button' style='margin-bottom: 10px;' id='btnEditSalaryVoucher' title='Edit' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-warning btn-sm btnEditSalaryVoucher' data-toggle='modal' data-target='#modalEditSalaryVoucher'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnApproveSalaryVoucher' title='Approve' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-success btn-sm btnApproveSalaryVoucher'><i class='fa fa-check'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnRejectSalaryVoucher' title='Reject' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-danger btn-sm btnRejectSalaryVoucher'><i class='fa fa-times'></i></button>&nbsp;&nbsp;
      <button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>
      `;
      } else if (row[7] == "Approved") {
        return `
      <button type='button' style='margin-bottom: 10px;' id='btnEditSalaryVoucher' title='Edit' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-warning btn-sm btnEditSalaryVoucher' data-toggle='modal' data-target='#modalEditSalaryVoucher'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnPendingSalaryVoucher' title='Pending' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-info btn-sm btnPendingSalaryVoucher'><i class='fa fa-hourglass'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnRejectSalaryVoucher' title='Reject' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-danger btn-sm btnRejectSalaryVoucher'><i class='fa fa-times'></i></button>&nbsp;&nbsp;
      <button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>
      `;
      } else {
        return `
      <button type='button' style='margin-bottom: 10px;' id='btnEditSalaryVoucher' title='Edit' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-warning btn-sm btnEditSalaryVoucher' data-toggle='modal' data-target='#modalEditSalaryVoucher'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnPendingSalaryVoucher' title='Pending' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-info btn-sm btnPendingSalaryVoucher'><i class='fa fa-hourglass'></i></button>&nbsp;&nbsp;
      <button type='submit' style='margin-bottom: 10px;' id='btnApproveSalaryVoucher' title='Approve' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-success btn-sm btnApproveSalaryVoucher'><i class='fa fa-check'></i></button>&nbsp;&nbsp;
      <button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>
      `;
      }
    },
    "orderable": false,
    "responsivePriority": 1
  }]
});

$('.tableAllSalaryVouchers thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 28 && index != 29 && index != 30) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

allSalaryVouchersTable.columns().every(function () {
  var allSalaryVouchersTable = this;
  $('input', this.header()).on('keyup change', function () {
    if (allSalaryVouchersTable.search() !== this.value) {
      allSalaryVouchersTable.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

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
        <button type="button" id="addSalaryListing" class="btn btn-block btn-danger removeSalaryListing"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
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

$('#newMonthOfVoucher').select2({
  placeholder: "Select month"
});

$('.newSalesInformation').on('select2:select', function (e) {
  recalculatePersonalSales();
});

//SWITCH TO TAB UPON UNFILLED REQUIRED
//BUTTONS STUFF HERE
$('.postButton').click(function () {
  $(':required:invalid', '#salaryVoucherForm').each(function () {
    var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');

    $('.nav a[href="#' + id + '"]').tab('show');
  });
});

$(".tableAllSalaryVouchers tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

$(".tableMySalaryVouchers tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
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


//APPEND DRAFT TO SALARY VOUCHER FORM UPON LOAD
$(".tableSalaryVoucherDrafts tbody").on("click", "button.btnLoadSalaryVoucherDraft", function () {
  var voucher_id = $(this).attr("voucherId");

  var getSalaryVoucherById = new FormData();
  getSalaryVoucherById.append('getSalaryVoucherById', voucher_id);

  var getSalaryRecordsByVoucherId = new FormData();
  getSalaryRecordsByVoucherId.append('getSalaryRecordsByVoucherId', voucher_id);

  var getDeductionRecordsByVoucherId = new FormData();
  getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', voucher_id);

  var getOtherRecordsByVoucherId = new FormData();
  getOtherRecordsByVoucherId.append('getOtherRecordsByVoucherId', voucher_id);

  var getDailySalesFigureByVoucherId = new FormData();
  getDailySalesFigureByVoucherId.append('getDailySalesFigureByVoucherId', voucher_id);

  var getAttendanceRecordsByVoucherId = new FormData();
  getAttendanceRecordsByVoucherId.append('getAttendanceRecordsByVoucherId', voucher_id);

  $.ajax({
    url: "ajax/payroll.ajax.php",
    method: "POST",
    data: getSalaryVoucherById,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (answer) {
      $('#currentVoucherId').val(answer['voucher_id']);
      $('#currentCreatedOn').val(answer['created_on']);
      $('#newIsDraft').val(answer['is_draft']);
      $('#newYearOfVoucher').val(answer['year_of_voucher']);
      $('#newMonthOfVoucher').val(answer['month_of_voucher']);
      $('#newMonthOfVoucher').select2().trigger('change');
      $('#newPayToPersonName').val(answer['pay_to_name']);
      $('#newDesignation').val(answer['designation']);
      $('#newNRIC').val(answer['nric']);
      $('#newDateOfBirth').val(answer['date_of_birth']);
      $('#newBankName').val(answer['bank_name']);
      $('#newBankAccount').val(answer['bank_acct']);
      $('#newGrossPay').val(answer['gross_pay']);
      $('#newTotalDeductions').val(answer['total_deductions']);
      $('#newTotalOthers').val(answer['total_others']);
      $('#newFinalAmount').val(answer['final_amount']);
      if (answer['is_sg_pr'] == 1) {
        $('#newIsSGPR').iCheck('check');
      } else {
        $('#newIsSGPR').iCheck('uncheck');
      }
      $('#newCPFEmployee').val(answer['cpf_employee']);
      $('#newCPFEmployer').val(answer['cpf_employer']);
      $('#newBoutique').val(answer['boutique']);
      $('#newBoutiqueSales').val(answer['boutique_sales']);
      $('#newPersonalSales').val(answer['personal_sales']);
      $('#newNumDaysZeroSales').val(answer['num_days_zero_sales']);
      $('#newNumReportsSubmitted').val(answer['num_reports_submitted']);

      $("#appendSalaryListing").html("");
      $("#appendDeductionListing").html("");
      $("#appendOthersListing").html("");

      $.ajax({
        url: "ajax/payroll.ajax.php",
        method: "POST",
        data: getSalaryRecordsByVoucherId,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          for (var i = 0; i < answer.length; i++) {
            if (answer[i]['title'] == "Basic Pay") {
              $('#newSalaryBasicPayAmount').val(answer[i]['amount']);
              $('#newSalaryBasicPayRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Attendance") {
              $('#newSalaryAttendanceAmount').val(answer[i]['amount']);
              $('#newSalaryAttendanceRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Productivity") {
              $('#newSalaryProductivityAmount').val(answer[i]['amount']);
              $('#newSalaryProductivityRemarks').val(answer[i]['remarks']);
            } else {
              $("#appendSalaryListing").append(
                `
                <div class="form-row">
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryTitle">Title</label>
                    <input required type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryAmount">Amount</label>
                    <input type="number" class="form-control grossPay" id="updateSalaryAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="salaryAmount[]">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryRemarks">Remarks</label>
                    <input type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                  </div>
                </div>
                `)
            }
          }

          recalculateGrossPay();

          $.ajax({
            url: "ajax/payroll.ajax.php",
            method: "POST",
            data: getDeductionRecordsByVoucherId,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (answer) {
              for (var i = 0; i < answer.length; i++) {
                if (answer[i]['title'] == "CPF-EE") {
                  $('#newCPFEmployee').val(answer[i]['amount']);
                } else {
                  $("#appendDeductionListing").append(
                    `
                    <div class="form-row">
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionTitle">Title</label>
                        <input required type="text" class="form-control" id="updateDeductionTitle" name="deductionTitle[]" value="` + answer[i]['title'] + `">
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionAmount">Amount</label>
                        <input type="number" class="form-control totalDeductions" id="updateDeductionAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="deductionAmount[]">
                      </div>
                    </div>
                    `)
                }
              }

              recalculateTotalDeductions();

              $.ajax({
                url: "ajax/payroll.ajax.php",
                method: "POST",
                data: getOtherRecordsByVoucherId,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                  for (var i = 0; i < answer.length; i++) {
                    $("#appendOthersListing").append(
                      `
                        <div class="form-row">
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherTitle">Title</label>
                            <input required type="text" class="form-control" id="updateOtherTitle" name="othersTitle[]" value="` + answer[i]['title'] + `">
                          </div>
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherAmount">Amount</label>
                            <input type="number" class="form-control totalOthers" id="updateOtherAmount" step="0.01" value="` + answer[i]['amount'] + `" name="othersAmount[]">
                          </div>
                        </div>
                      `)
                  }

                  recalculateTotalOthers();

                  $.ajax({
                    url: "ajax/payroll.ajax.php",
                    method: "POST",
                    data: getDailySalesFigureByVoucherId,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (answer) {
                      for (var i = 0; i < answer.length; i++) {
                        if (answer[i]['sales_information'] != "Sick Leave" && answer[i]['sales_information'] != "Annual Leave" && answer[i]['sales_information'] != "Unpaid Leave" && answer[i]['sales_information'] != "OFF" && answer[i]['sales_information'] != "PH/RO" && answer[i]['sales_information'] != "N/A") {
                          $('#newSalesInformation' + (i + 1)).append(`<option value="` + answer[i]['sales_information'] + `">` + answer[i]['sales_information'] + `</option>`);
                        }
                        $('#newSalesInformation' + (i + 1)).val(answer[i]['sales_information']);
                        $('#newSalesInformation' + (i + 1)).select2().trigger('change');

                      }

                      $('.newSalesInformation').select2({
                        placeholder: "Select or type a number",
                        tags: true
                      });

                      $.ajax({
                        url: "ajax/payroll.ajax.php",
                        method: "POST",
                        data: getAttendanceRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (answer) {
                          $('#newOffDays').val(answer['off_days']);
                          $('#newLateDays').val(answer['late_days']);
                          $('#newLeaveMCDays').val(answer['leave_mc_days']);
                          $('#newTotalWorkingDays').val(answer['total_working_days']);
                          $('#newLeaveEntitled').val(answer['leave_entitled']);
                          $('#newLeaveTaken').val(answer['leave_taken']);
                          $('#newLeaveRemaining').val(answer['leave_remaining']);
                        }
                      })

                      recalculatePersonalSales();

                    }
                  })
                }
              })
            }
          })
        }
      })

      recalculateTotalDeductions();

    }
  })
});

//VIEW MY SALARY VOUCHER MODAL
$(".tableMySalaryVouchers tbody").on("click", "button.btnViewSalaryVoucher", function () {
  var voucher_id = $(this).attr("voucherId");

  var getSalaryVoucherById = new FormData();
  getSalaryVoucherById.append('getSalaryVoucherById', voucher_id);

  var getSalaryRecordsByVoucherId = new FormData();
  getSalaryRecordsByVoucherId.append('getSalaryRecordsByVoucherId', voucher_id);

  var getDeductionRecordsByVoucherId = new FormData();
  getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', voucher_id);

  var getOtherRecordsByVoucherId = new FormData();
  getOtherRecordsByVoucherId.append('getOtherRecordsByVoucherId', voucher_id);

  var getDailySalesFigureByVoucherId = new FormData();
  getDailySalesFigureByVoucherId.append('getDailySalesFigureByVoucherId', voucher_id);

  var getAttendanceRecordsByVoucherId = new FormData();
  getAttendanceRecordsByVoucherId.append('getAttendanceRecordsByVoucherId', voucher_id);

  $.ajax({
    url: "ajax/payroll.ajax.php",
    method: "POST",
    data: getSalaryVoucherById,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (answer) {
      $('#currentVoucherId').val(answer['voucher_id']);
      $('#currentCreatedOn').val(answer['created_on']);
      $('#viewIsDraft').val(answer['is_draft']);
      $('#viewYearOfVoucher').val(answer['year_of_voucher']);
      $('#viewMonthOfVoucher').val(answer['month_of_voucher']);
      $('#viewMonthOfVoucher').select2().trigger('change');
      $('#viewMethodOfPayment').val(answer['method_of_payment']);
      $('#viewMethodOfPayment').select2().trigger('change');
      $('#viewPayToPersonName').val(answer['pay_to_name']);
      $('#viewDesignation').val(answer['designation']);
      $('#viewNRIC').val(answer['nric']);
      $('#viewDateOfBirth').val(answer['date_of_birth']);
      $('#viewBankName').val(answer['bank_name']);
      $('#viewBankAccount').val(answer['bank_acct']);
      $('#viewGrossPay').val(answer['gross_pay']);
      $('#viewTotalDeductions').val(answer['total_deductions']);
      $('#viewLevyAmount').val(answer['levy_amount']);
      $('#viewTotalOthers').val(answer['total_others']);
      $('#viewFinalAmount').val(answer['final_amount']);
      if (answer['is_sg_pr'] == 1) {
        $('#viewIsSGPR').iCheck('check');
      } else {
        $('#viewIsSGPR').iCheck('uncheck');
      }
      $('#viewCPFEmployee').val(answer['cpf_employee']);
      $('#viewCPFEmployer').val(answer['cpf_employer']);
      $('#viewBoutique').val(answer['boutique']);
      $('#viewBoutiqueSales').val(answer['boutique_sales']);
      $('#viewPersonalSales').val(answer['personal_sales']);
      $('#viewNumDaysZeroSales').val(answer['num_days_zero_sales']);
      $('#viewNumReportsSubmitted').val(answer['num_reports_submitted']);
      $('#status').val(answer['status']);
      $('#updatedBy').val(answer['updated_by']);

      $.ajax({
        url: "ajax/payroll.ajax.php",
        method: "POST",
        data: getSalaryRecordsByVoucherId,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          for (var i = 0; i < answer.length; i++) {
            if (answer[i]['title'] == "Basic Pay") {
              $('#viewSalaryBasicPayAmount').val(answer[i]['amount']);
              $('#viewSalaryBasicPayRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Attendance") {
              $('#viewSalaryAttendanceAmount').val(answer[i]['amount']);
              $('#viewSalaryAttendanceRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Productivity") {
              $('#viewSalaryProductivityAmount').val(answer[i]['amount']);
              $('#viewSalaryProductivityRemarks').val(answer[i]['remarks']);
            } else {
              $("#appendSalaryListing").append(
                `
                <div class="form-row">
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryTitle">Title</label>
                    <input readonly type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryAmount">Amount</label>
                    <input readonly type="number" class="form-control grossPay" id="updateSalaryAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="salaryAmount[]">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryRemarks">Remarks</label>
                    <input readonly type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                  </div>
                </div>
                `)
            }
          }

          $.ajax({
            url: "ajax/payroll.ajax.php",
            method: "POST",
            data: getDeductionRecordsByVoucherId,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (answer) {
              for (var i = 0; i < answer.length; i++) {
                if (answer[i]['title'] == "CPF-EE") {
                  $('#viewCPFEmployee').val(answer[i]['amount']);
                } else {
                  $("#appendDeductionListing").append(
                    `
                    <div class="form-row">
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionTitle">Title</label>
                        <input readonly type="text" class="form-control" id="updateDeductionTitle" name="deductionTitle[]" value="` + answer[i]['title'] + `">
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionAmount">Amount</label>
                        <input readonly type="number" class="form-control grossPay" id="updateDeductionAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="deductionAmount[]">
                      </div>
                    </div>
                    `)
                }
              }

              $.ajax({
                url: "ajax/payroll.ajax.php",
                method: "POST",
                data: getOtherRecordsByVoucherId,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                  for (var i = 0; i < answer.length; i++) {
                    $("#appendOthersListing").append(
                      `
                        <div class="form-row">
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherTitle">Title</label>
                            <input readonly type="text" class="form-control" id="updateOtherTitle" name="othersTitle[]" value="` + answer[i]['title'] + `">
                          </div>
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherAmount">Amount</label>
                            <input readonly type="number" class="form-control grossPay" id="updateOtherAmount" step="0.01" value="` + answer[i]['amount'] + `" name="othersAmount[]">
                          </div>
                        </div>
                      `)
                  }

                  $.ajax({
                    url: "ajax/payroll.ajax.php",
                    method: "POST",
                    data: getDailySalesFigureByVoucherId,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (answer) {
                      for (var i = 0; i < answer.length; i++) {
                        if (answer[i]['sales_information'] != "Sick Leave" && answer[i]['sales_information'] != "Annual Leave" && answer[i]['sales_information'] != "Unpaid Leave" && answer[i]['sales_information'] != "OFF" && answer[i]['sales_information'] != "PH/RO" && answer[i]['sales_information'] != "N/A") {
                          $('#viewSalesInformation' + (i + 1)).append(`<option value="` + answer[i]['sales_information'] + `">` + answer[i]['sales_information'] + `</option>`);
                        }
                        $('#viewSalesInformation' + (i + 1)).val(answer[i]['sales_information']);
                        $('#viewSalesInformation' + (i + 1)).select2().trigger('change');

                      }

                      $('.viewSalesInformation').select2({
                        placeholder: "Select or type a number",
                        tags: true
                      });

                      $.ajax({
                        url: "ajax/payroll.ajax.php",
                        method: "POST",
                        data: getAttendanceRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (answer) {
                          $('#viewOffDays').val(answer['off_days']);
                          $('#viewLateDays').val(answer['late_days']);
                          $('#viewLeaveMCDays').val(answer['leave_mc_days']);
                          $('#viewTotalWorkingDays').val(answer['total_working_days']);
                          $('#viewLeaveEntitled').val(answer['leave_entitled']);
                          $('#viewLeaveTaken').val(answer['leave_taken']);
                          $('#viewLeaveRemaining').val(answer['leave_remaining']);
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});


//VIEW ALL SALARY VOUCHER MODAL
$(".tableAllSalaryVouchers tbody").on("click", "button.btnEditSalaryVoucher", function () {
  var voucher_id = $(this).attr("voucherId");

  var getSalaryVoucherById = new FormData();
  getSalaryVoucherById.append('getSalaryVoucherById', voucher_id);

  var getSalaryRecordsByVoucherId = new FormData();
  getSalaryRecordsByVoucherId.append('getSalaryRecordsByVoucherId', voucher_id);

  var getDeductionRecordsByVoucherId = new FormData();
  getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', voucher_id);

  var getOtherRecordsByVoucherId = new FormData();
  getOtherRecordsByVoucherId.append('getOtherRecordsByVoucherId', voucher_id);

  var getDailySalesFigureByVoucherId = new FormData();
  getDailySalesFigureByVoucherId.append('getDailySalesFigureByVoucherId', voucher_id);

  var getAttendanceRecordsByVoucherId = new FormData();
  getAttendanceRecordsByVoucherId.append('getAttendanceRecordsByVoucherId', voucher_id);

  $.ajax({
    url: "ajax/payroll.ajax.php",
    method: "POST",
    data: getSalaryVoucherById,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (answer) {
      $('#currentVoucherId').val(answer['voucher_id']);
      $('#currentPersonId').val(answer['person_id']);
      $('#status').val(answer['status']);
      $('#updatedBy').val(answer['updated_by']);

      $('#currentCreatedOn').val(answer['created_on']);
      $('#newIsDraft').val(answer['is_draft']);
      $('#newYearOfVoucher').val(answer['year_of_voucher']);
      $('#newMonthOfVoucher').val(answer['month_of_voucher']);
      $('#newMonthOfVoucher').select2().trigger('change');
      $('#newMethodOfPayment').val(answer['method_of_payment']);
      $('#newMethodOfPayment').select2().trigger('change');
      $('#newPayToPersonName').val(answer['pay_to_name']);
      $('#newDesignation').val(answer['designation']);
      $('#newNRIC').val(answer['nric']);
      $('#newDateOfBirth').val(answer['date_of_birth']);
      $('#newBankName').val(answer['bank_name']);
      $('#newBankAccount').val(answer['bank_acct']);
      $('#newGrossPay').val(answer['gross_pay']);
      $('#newTotalDeductions').val(answer['total_deductions']);
      $('#newLevyAmount').val(answer['levy_amount']);
      $('#newTotalOthers').val(answer['total_others']);
      $('#newFinalAmount').val(answer['final_amount']);
      if (answer['is_sg_pr'] == 1) {
        $('#newIsSGPR').iCheck('check');
      } else {
        $('#newIsSGPR').iCheck('uncheck');
      }
      $('#newCPFEmployee').val(answer['cpf_employee']);
      $('#newCPFEmployer').val(answer['cpf_employer']);
      $('#newBoutique').val(answer['boutique']);
      $('#newBoutiqueSales').val(answer['boutique_sales']);
      $('#newPersonalSales').val(answer['personal_sales']);
      $('#newNumDaysZeroSales').val(answer['num_days_zero_sales']);
      $('#newNumReportsSubmitted').val(answer['num_reports_submitted']);

      $.ajax({
        url: "ajax/payroll.ajax.php",
        method: "POST",
        data: getSalaryRecordsByVoucherId,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          for (var i = 0; i < answer.length; i++) {
            if (answer[i]['title'] == "Basic Pay") {
              $('#newSalaryBasicPayAmount').val(answer[i]['amount']);
              $('#newSalaryBasicPayRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Attendance") {
              $('#newSalaryAttendanceAmount').val(answer[i]['amount']);
              $('#newSalaryAttendanceRemarks').val(answer[i]['remarks']);
            } else if (answer[i]['title'] == "Productivity") {
              $('#newSalaryProductivityAmount').val(answer[i]['amount']);
              $('#newSalaryProductivityRemarks').val(answer[i]['remarks']);
            } else {
              $("#appendSalaryListing").append(
                `
                <div class="form-row">
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryTitle">Title</label>
                    <input type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryAmount">Amount</label>
                    <input type="number" class="form-control grossPay" id="updateSalaryAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="salaryAmount[]">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryRemarks">Remarks</label>
                    <input type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                  </div>
                </div>
                `)
            }
          }

          recalculateGrossPay();

          $.ajax({
            url: "ajax/payroll.ajax.php",
            method: "POST",
            data: getDeductionRecordsByVoucherId,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (answer) {
              for (var i = 0; i < answer.length; i++) {
                if (answer[i]['title'] == "CPF-EE") {
                  $('#newCPFEmployee').val(answer[i]['amount']);
                } else {
                  $("#appendDeductionListing").append(
                    `
                    <div class="form-row">
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionTitle">Title</label>
                        <input type="text" class="form-control" id="updateDeductionTitle" name="deductionTitle[]" value="` + answer[i]['title'] + `">
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label for="updateDeductionAmount">Amount</label>
                        <input type="number" class="form-control totalDeductions" id="updateDeductionAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="deductionAmount[]">
                      </div>
                    </div>
                    `)
                }
              }

              recalculateTotalDeductions();

              $.ajax({
                url: "ajax/payroll.ajax.php",
                method: "POST",
                data: getOtherRecordsByVoucherId,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                  for (var i = 0; i < answer.length; i++) {
                    $("#appendOthersListing").append(
                      `
                        <div class="form-row">
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherTitle">Title</label>
                            <input type="text" class="form-control" id="updateOtherTitle" name="othersTitle[]" value="` + answer[i]['title'] + `">
                          </div>
                          <div class="form-group col-md-6 col-sm-12 col-xs-12">
                            <label for="updateOtherAmount">Amount</label>
                            <input type="number" class="form-control totalOthers" id="updateOtherAmount" step="0.01" value="` + answer[i]['amount'] + `" name="othersAmount[]">
                          </div>
                        </div>
                      `)
                  }

                  recalculateTotalOthers();

                  $.ajax({
                    url: "ajax/payroll.ajax.php",
                    method: "POST",
                    data: getDailySalesFigureByVoucherId,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (answer) {
                      for (var i = 0; i < answer.length; i++) {
                        if (answer[i]['sales_information'] != "Sick Leave" && answer[i]['sales_information'] != "Annual Leave" && answer[i]['sales_information'] != "Unpaid Leave" && answer[i]['sales_information'] != "OFF" && answer[i]['sales_information'] != "PH/RO" && answer[i]['sales_information'] != "N/A") {
                          $('#newSalesInformation' + (i + 1)).append(`<option value="` + answer[i]['sales_information'] + `">` + answer[i]['sales_information'] + `</option>`);
                        }
                        $('#newSalesInformation' + (i + 1)).val(answer[i]['sales_information']);
                        $('#newSalesInformation' + (i + 1)).select2().trigger('change');

                      }

                      $('.newSalesInformation').select2({
                        placeholder: "Select or type a number",
                        tags: true
                      });

                      $.ajax({
                        url: "ajax/payroll.ajax.php",
                        method: "POST",
                        data: getAttendanceRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (answer) {
                          $('#newOffDays').val(answer['off_days']);
                          $('#newLateDays').val(answer['late_days']);
                          $('#newLeaveMCDays').val(answer['leave_mc_days']);
                          $('#newTotalWorkingDays').val(answer['total_working_days']);
                          $('#newLeaveEntitled').val(answer['leave_entitled']);
                          $('#newLeaveTaken').val(answer['leave_taken']);
                          $('#newLeaveRemaining').val(answer['leave_remaining']);
                        }
                      })

                      recalculatePersonalSales();
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
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

//FUNCTIONS
function recalculateGrossPay() {
  var currentGrossPay = 0;

  $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentGrossPay = currentGrossPay + amount;
  })

  $("#newGrossPay").val(Number(currentGrossPay).toFixed(2));
  calculateFinalAmount();
}


function recalculateTotalDeductions() {
  var currentTotalDeductions = 0;

  $("#salaryVoucherForm").find('input.totalDeductions').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentTotalDeductions = currentTotalDeductions + amount;
  })

  $("#newTotalDeductions").val(Number(currentTotalDeductions).toFixed(2));
  calculateFinalAmount();
}

function recalculateTotalOthers() {
  var currentTotalOthers = 0;

  $("#salaryVoucherForm").find('input.totalOthers').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentTotalOthers = currentTotalOthers + amount;
  })

  $("#newTotalOthers").val(Number(currentTotalOthers).toFixed(2));
  calculateFinalAmount();
}

function recalculatePersonalSales() {
  var currentPersonalSales = 0;

  $("#salaryVoucherForm").find('.newSalesInformation').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {
      var amount = 0.00;
    } else {
      var amount = parseFloat($(element).val());
    }
    currentPersonalSales = currentPersonalSales + amount;
  })

  $("#newPersonalSales").val(Number(currentPersonalSales).toFixed(2));
}

function calculateFinalAmount() {
  currentFinalAmount = 0;

  currentGrossPay = parseFloat($("#newGrossPay").val());
  currentTotalDeductions = parseFloat($("#newTotalDeductions").val());
  currentTotalOthers = parseFloat($("#newTotalOthers").val());

  currentFinalAmount = currentGrossPay - currentTotalDeductions + currentTotalOthers;
  $("#newFinalAmount").val(Number(currentFinalAmount).toFixed(2));
}

function setCPF() {
  currentGrossPay = parseFloat(document.getElementById("newGrossPay").value);
  CPF_employee = 0.00;
  CPF_employer = 0.00;
  amount = 0.00;

  if (currentGrossPay >= 750) {
    $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
      if (index == 0) {
        if ($(element).val() >= 6000) {
          CPF_employee = 1200.00;
          CPF_employer = 2220.00;
        } else {
          CPF_employee = parseFloat($(element).val()) * 0.20;
          CPF_employer = parseFloat($(element).val()) * 0.37;
        }
      } else {
        amount = amount + parseFloat($(element).val());
      }
    })
    CPF_employee = Math.floor(CPF_employee + amount * 0.20);
    CPF_employer = Math.round(CPF_employer + amount * 0.37) - CPF_employee;
  } else if (currentGrossPay > 500 && currentGrossPay < 750) {
    CPF_employee = Math.floor(0.6 * (currentGrossPay - 500.00));
    CPF_employer = Math.round(0.17 * currentGrossPay + 0.6 * (currentGrossPay - 500.00)) - CPF_employee;
  } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
    CPF_employee = 0.00;    
    CPF_employer = Math.round(0.17 * currentGrossPay);
  } else if (currentGrossPay <= 50) {
    CPF_employee = 0.00;
    CPF_employer = 0.00;
  }


  $("#newCPFEmployee").val(Number(CPF_employee).toFixed(2));
  $("#newCPFEmployer").val(Number(CPF_employer).toFixed(2));
}