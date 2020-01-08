//DATATABLES ALL SALARY VOUCHERS (FT)
/* DATATABLES CONFIGURATION */
var allSalaryVouchersTable = $('.tableAllSalaryVouchers').DataTable({
  "ajax": "ajax/datatable-salary-voucher-management.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[10, 'desc']],
  "bStateSave": true,
  "fnStateSave": function (oSettings, oData) {
      localStorage.setItem('allSalaryVouchersTable', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
      return JSON.parse(localStorage.getItem('allSalaryVouchersTable'));
  },
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
    { "data": 27 },
    { "data": 28 },
    { "data": 29 }
  ],
  "columnDefs": [{
    "targets": [0, 2, 4],
    "responsivePriority": 1
  }, {
    "targets": 30,
    "data": null,
    "render": function (data, type, row) {
      return `
      <button type='button' style='margin-bottom: 10px;' id='btnEditSalaryVoucher' title='Edit' voucherId=` + row[0] + ` personId=` + row[6] + ` class='btn btn-info btn-sm btnEditSalaryVoucher' data-toggle='modal' data-target='#modalEditSalaryVoucher'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;
      <button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[6] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>
      `;
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

//Reset DataTable search values
$('#redrawAllSalaryVouchersTable').click(function () {
  allSalaryVouchersTable.search('').columns().search('').draw();
});

//Filter Salary Vouchers (FT) DataTable by Status
$('#dataTablesFilterSVByStatus').on('change', function () {
  allSalaryVouchersTable.column(8).search(this.value).draw();
});

//Generate PDF upon click
$(".tableAllSalaryVouchers tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
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
      $('#newIsPartTime').val(answer['is_part_time']);
      $('#newYearOfVoucher').val(answer['year_of_voucher']);
      $('#newYearOfVoucher').select2().trigger('change');
      $('#newMonthOfVoucher').val(answer['month_of_voucher']);
      $('#newMonthOfVoucher').select2().trigger('change');
      $('#newMethodOfPayment').val(answer['method_of_payment']);
      $('#newMethodOfPayment').select2().trigger('change');
      $('#newPayToPersonName').val(answer['pay_to_name']);
      $('#newDesignation').val(answer['designation']);
      $('#newNRIC').val(answer['nric']);
      $('#newDateOfBirth').val(answer['date_of_birth']);
      $('#currentPersonDOB').val(answer['date_of_birth']);
      $('#newBankName').val(answer['bank_name']);
      $('#newBankAccount').val(answer['bank_acct']);
      $('#newGrossPay').val(answer['gross_pay']);
      $('#newTotalDeductions').val(answer['total_deductions']);
      $('#newLevyAmount').val(answer['levy_amount']);
      $('#newSDLAmount').val(answer['sdl_amount']);
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

      $('#newMethodOfPayment').select2({
        placeholder: "Select method of payment"
      });

      var get_employees_payroll = new FormData();
      get_employees_payroll.append('get_employees_payroll', answer['person_id']);

      $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: get_employees_payroll,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          $('#newRaceValue').val(answer[0]['race']);
        }
      });

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
                } else if (answer[i]['title'] == "CDAC" || answer[i]['title'] == "MBMF" || answer[i]['title'] == "SINDA" || answer[i]['title'] == "ECF" || answer[i]['title'] == "N/A") {
                  $('#newCSMTitle').val(answer[i]['title']);
                  $('#newCSMAmount').val(answer[i]['amount']);
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