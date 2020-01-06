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
    { "data": 25 },
    { "data": 26 }
  ],
  "columnDefs": [{
    "targets": [0, 1],
    "responsivePriority": 1
  }, {
    "targets": 27,
    "data": null,
    "render": function (data, type, row) {
      if (row[26] == 1) {
        return "<button id='btnLoadSalaryVoucherDraftPT' voucherId=" + row[0] + " class='btn btn-warning btn-sm btnLoadSalaryVoucherDraftPT'><i class='fa fa-download'></i></button>";
      } else {
        return "<button id='btnLoadSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-warning btn-sm btnLoadSalaryVoucherDraft'><i class='fa fa-download'></i></button>";
      }
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 28,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnDeleteSalaryVoucherDraft' voucherId=" + row[0] + " class='btn btn-danger btn-sm btnDeleteSalaryVoucherDraft'><i class='fa fa-times'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }]
});

//ADD SEARCH BAR TO COLUMNS
$('.tableSalaryVoucherDrafts thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 27 && index != 28) {
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

//DELETE SALARY VOUCHER DRAFT
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
      $('#newYearOfVoucher').select2().trigger('change');
      $('#newMonthOfVoucher').val(answer['month_of_voucher']);
      $('#newMonthOfVoucher').select2().trigger('change');
      $('#newPayToPersonName').val(answer['pay_to_name']);
      $('#newDesignation').val(answer['designation']);
      $('#newNRIC').val(answer['nric']);
      $('#newDateOfBirth').val(answer['date_of_birth']);
      $('#newBankName').val(answer['bank_name']);
      $('#newBankAccount').val(answer['bank_acct']);
      $('#newGrossPay').val(answer['gross_pay']);
      $('#newLevyAmount').val(answer['levy_amount']);
      $('#newSDLAmount').val(answer['sdl_amount']);
      $('#newTotalDeductions').val(answer['total_deductions']);
      $('#newTotalOthers').val(answer['total_others']);
      $('#newFinalAmount').val(answer['final_amount']);
      if (answer['is_sg_pr'] == 1) {
        $('#newIsSGPR').iCheck('check');
      } else {
        $('#newIsSGPR').iCheck('uncheck');
      }
      if (answer['is_csm'] == 1) {
        $('#newCSMSelection').iCheck('check');
      } else {
        $('#newCSMSelection').iCheck('uncheck');
      }
      $('#newCPFEmployee').val(answer['cpf_employee']);
      $('#newCPFEmployer').val(answer['cpf_employer']);
      $('#newBoutique').val(answer['boutique']);
      $('#newBoutiqueSales').val(answer['boutique_sales']);
      $('#newPersonalSales').val(answer['personal_sales']);
      $('#newNumDaysZeroSales').val(answer['num_days_zero_sales']);
      $('#newNumReportsSubmitted').val(answer['num_reports_submitted']);
      $('#newCompanyName').val(answer['company_name']);

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
            if (i == 0 && answer[i]['title'] == "Basic Pay") {
              $('#newSalaryBasicPayAmount').val(answer[i]['amount']);
              $('#newSalaryBasicPayRemarks').val(answer[i]['remarks']);
            } else if (i == 1 && answer[i]['title'] == "Attendance") {
              $('#newSalaryAttendanceAmount').val(answer[i]['amount']);
              $('#newSalaryAttendanceRemarks').val(answer[i]['remarks']);
            } else if (i == 2 && answer[i]['title'] == "Productivity") {
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
                } else if (answer[i]['title'] == "CDAC" || answer[i]['title'] == "MBMF" || answer[i]['title'] == "SINDA" || answer[i]['title'] == "ECF" || answer[i]['title'] == "N/A") {
                  $('#newCSMTitle').val(answer[i]['title']);
                  $('#newCSMAmount').val(answer[i]['amount']);
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

      swal({
        type: "success",
        title: "Draft loaded succesfully.",
        showConfirmButton: true,
        confirmButtonText: "Close"
      })

    }
  })
});