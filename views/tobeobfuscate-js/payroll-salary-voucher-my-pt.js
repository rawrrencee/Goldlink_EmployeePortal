//DATATABLES MY SALARY VOUCHERS (PT)
/* DATATABLES CONFIGURATION */
var mySalaryVouchersTablePT = $('.tableMySalaryVouchersPT').DataTable({
  "ajax": "ajax/datatable-salary-voucher-my-pt.ssp.php",
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
    "targets": [0, 2, 4],
    "responsivePriority": 1
  }, {
    "targets": 26,
    "data": null,
    "render": function (data, type, row) {
      return `<button id='btnViewSalaryVoucher' style='margin-bottom: 10px;' voucherId=` + row[0] + ` class='btn btn-warning btn-sm btnViewSalaryVoucher' data-toggle='modal' data-target='#modalViewMySalaryVoucher'><i class='fa fa-eye'></i></button>
      <button type='button' style='margin-bottom: 10px;' id='btnGeneratePDF' title='Download PDF' voucherId=` + row[0] + ` personId=` + row[5] + ` class='btn btn-default btn-sm btnGeneratePDF'><i class='fa fa-download'></i></button>`;
    },
    "orderable": false,
    "responsivePriority": 2
  }]
});


$('.tableMySalaryVouchersPT thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 26) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

mySalaryVouchersTablePT.columns().every(function () {
  var mySalaryVouchersTablePT = this;
  $('input', this.header()).on('keyup change', function () {
    if (mySalaryVouchersTablePT.search() !== this.value) {
      mySalaryVouchersTablePT.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

//Reset DataTable search values
$('#redrawMySalaryVouchersTablePT').click(function () {
  mySalaryVouchersTablePT.search('').columns().search('').draw();
});

//Filter My Salary Vouchers (PT) DataTable by Status
$('#mySalaryVouchersTablePTFilterSVByStatus').on('change', function () {
  mySalaryVouchersTablePT.column(7).search(this.value).draw();
});

//Generate PDF upon click
$(".tableMySalaryVouchersPT tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

//VIEW MY SALARY VOUCHER MODAL (PT)
$(".tableMySalaryVouchersPT tbody").on("click", "button.btnViewSalaryVoucher", function () {
  var voucher_id = $(this).attr("voucherId");

  var getSalaryVoucherById = new FormData();
  getSalaryVoucherById.append('getSalaryVoucherById', voucher_id);

  var getSalaryRecordsPTByVoucherId = new FormData();
  getSalaryRecordsPTByVoucherId.append('getSalaryRecordsPTByVoucherId', voucher_id);

  var getDeductionRecordsByVoucherId = new FormData();
  getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', voucher_id);

  var getOtherRecordsByVoucherId = new FormData();
  getOtherRecordsByVoucherId.append('getOtherRecordsByVoucherId', voucher_id);

  var getDailySalesFigureByVoucherId = new FormData();
  getDailySalesFigureByVoucherId.append('getDailySalesFigureByVoucherId', voucher_id);

  var getDailyWorkingHoursByVoucherId = new FormData();
  getDailyWorkingHoursByVoucherId.append('getDailyWorkingHoursByVoucherId', voucher_id);

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
      $('#viewIsPartTime').val(answer['is_part_time']);
      $('#viewYearOfVoucher').val(answer['year_of_voucher']);
      $('#viewYearOfVoucher').select2().trigger('change');
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
      $('#viewSDLAmount').val(answer['sdl_amount']);
      $('#viewTotalOthers').val(answer['total_others']);
      $('#viewFinalAmount').val(answer['final_amount']);
      if (answer['is_sg_pr'] == 1) {
        $('#viewIsSGPR').iCheck('check');
      } else {
        $('#viewIsSGPR').iCheck('uncheck');
      }
      if (answer['is_csm'] == 1) {
        $('#viewCSMSelection').iCheck('check');
      } else {
        $('#viewCSMSelection').iCheck('uncheck');
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
      $('#viewCompanyName').val(answer['company_name']);
      $('#viewTotalHoursWorked').val(answer['total_hours_worked']);

      $("#appendSalaryListingPT_first").html("");
      $("#appendSalaryListingPT").html("");
      $("#appendDeductionListing").html("");
      $("#appendOthersListing").html("");

      $.ajax({
        url: "ajax/payroll.ajax.php",
        method: "POST",
        data: getSalaryRecordsPTByVoucherId,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          for (var i = 0; i < answer.length; i++) {
            $("#appendSalaryListingPT").append(
              `
                    <div class="form-row">
                    <div class="form-group col-md-3 col-sm-12 col-xs-12">
                      <label for="updateSalaryTitle">Title</label>
                      <input readonly type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                    </div>
                    <div class="form-group col-md-2 col-sm-6 col-xs-6">
                      <label for="updateSalaryRate">Rate</label>
                      <input readonly type="number" class="form-control ratePT" id="updateSalaryRate" min="0.00" step="0.01" value="` + answer[i]['rate'] + `" name="salaryRate[]">
                    </div>
                    <div class="form-group col-md-2 col-sm-6 col-xs-6">
                      <label for="updateSalaryUnit">Unit</label>
                      <input readonly type="number" class="form-control unitPT" id="updateSalaryUnit" min="0.00" step="0.01" value="` + answer[i]['unit'] + `" name="salaryUnit[]">
                    </div>
                    <div class="form-group col-md-2 col-sm-12 col-xs-12">
                      <label for="updateSalarySubtotal">Subtotal</label>
                      <input readonly type="number" class="form-control subTotalPT grossPay" id="updateSalarySubtotal" min="0.00" step="0.01" value="` + answer[i]['subtotal'] + `" name="salarySubtotal[]">
                    </div>
                    <div class="form-group col-md-3 col-sm-12 col-xs-12">
                      <label for="updateSalaryRemarks">Remarks</label>
                      <input readonly type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                    </div>
                  </div>
                    `)
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
                } else if (answer[i]['title'] == "CDAC" || answer[i]['title'] == "MBMF" || answer[i]['title'] == "SINDA" || answer[i]['title'] == "ECF" || answer[i]['title'] == "N/A") {
                  $('#viewCSMTitle').val(answer[i]['title']);
                  $('#viewCSMAmount').val(answer[i]['amount']);
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

                      $.ajax({
                        url: "ajax/payroll.ajax.php",
                        method: "POST",
                        data: getDailyWorkingHoursByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (answer) {
                          for (var i = 0; i < answer.length; i++) {
                            if (answer[i]['hours'] != "Sick Leave" && answer[i]['hours'] != "Annual Leave" && answer[i]['hours'] != "Unpaid Leave" && answer[i]['hours'] != "OFF" && answer[i]['hours'] != "PH/RO" && answer[i]['hours'] != "N/A") {
                              $('#newDailyHoursWorked' + (i + 1)).append(`<option value="` + answer[i]['hours'] + `">` + answer[i]['hours'] + `</option>`);
                            }
                            $('#newDailyHoursWorked' + (i + 1)).val(answer[i]['hours']);
                            $('#newDailyHoursWorked' + (i + 1)).select2().trigger('change');

                          }
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