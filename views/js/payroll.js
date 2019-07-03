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
      return "<button id='btnEditSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-warning btn-sm'><i class='fa fa-download'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 27,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnDeleteSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-danger btn-sm'><i class='fa fa-times'></i></button>";
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
    "targets": [0, 1],
    "responsivePriority": 1
  }, {
    "targets": 26,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnViewSalaryVoucher' voucherId=" + row[0] + " class='btn btn-warning btn-sm'><i class='fa fa-eye'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }]
});

$('.tableMySalaryVouchers thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 26) {
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
$('.postButton').click(function () {
  $(':required:invalid', '#salaryVoucherForm').each(function () {
     var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');

     $('.nav a[href="#' + id + '"]').tab('show');
  });
});

$('#saveDraftVoucher').click(function () {
  $("#newIsDraft").val(1);
});

$('#submitVoucher').click(function () {
  $("#newIsDraft").val(0);
});

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
  CPF_employee = currentGrossPay * 0.2;
  CPF_employer = currentGrossPay * 0.17;
  $("#newCPFEmployee").val(Number(CPF_employee).toFixed(2));
  $("#newCPFEmployer").val(Number(CPF_employer).toFixed(2));
}