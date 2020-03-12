//DATATABLES ALL SALARY VOUCHERS (PT)
/* DATATABLES CONFIGURATION */
var allSalaryVouchersTablePT = $('.tableAllSalaryVouchersPT').DataTable({
  "ajax": "ajax/datatable-salary-voucher-management-pt.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[10, 'desc']],
  "bStateSave": true,
  "fnStateSave": function (oSettings, oData) {
      localStorage.setItem('allSalaryVouchersTablePT', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
      return JSON.parse(localStorage.getItem('allSalaryVouchersTablePT'));
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
    "targets": [0, 2, 3],
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

$('.tableAllSalaryVouchersPT thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 28 && index != 29 && index != 30) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

allSalaryVouchersTablePT.columns().every(function () {
  var allSalaryVouchersTablePT = this;
  $('input', this.header()).on('keyup change', function () {
    if (allSalaryVouchersTablePT.search() !== this.value) {
      allSalaryVouchersTablePT.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

//Reset DataTable Search Values
$('#redrawAllSalaryVouchersTablePT').click(function () {
  allSalaryVouchersTablePT.search('').columns().search('').draw();
});

//Filter Salary Vouchers (PT) DataTable by Status
$('#dataTablesFilterSVByStatus_PT').on('change', function () {
  allSalaryVouchersTablePT.column(8).search(this.value).draw();
});

//Generate PDF upon click
$(".tableAllSalaryVouchersPT tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

//VIEW ALL SALARY VOUCHER (PT) MODAL
$(".tableAllSalaryVouchersPT tbody").on("click", "button.btnEditSalaryVoucher", function () {
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
      $('#newTotalHoursWorked').val(answer['total_hours_worked']);

      $("#appendSalaryListingPT_first").html("");
      $("#appendSalaryListingPT").html("");
      $("#appendDeductionListing").html("");
      $("#appendOthersListing").html("");

      $('#newMethodOfPayment').select2({
        placeholder: "Select method of payment"
      });

      var get_employees_detail = new FormData();
      get_employees_detail.append('get_employees_detail', answer['person_id']);

      $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: get_employees_detail,
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
                  <input type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                </div>
                <div class="form-group col-md-2 col-sm-6 col-xs-6">
                  <label for="updateSalaryRate">Rate</label>
                  <input type="number" class="form-control ratePT" id="updateSalaryRate" min="0.00" step="0.01" value="` + answer[i]['rate'] + `" name="salaryRate[]">
                </div>
                <div class="form-group col-md-2 col-sm-6 col-xs-6">
                  <label for="updateSalaryUnit">Unit</label>
                  <input type="number" class="form-control unitPT" id="updateSalaryUnit" min="0.00" step="0.01" value="` + answer[i]['unit'] + `" name="salaryUnit[]">
                </div>
                <div class="form-group col-md-2 col-sm-12 col-xs-12">
                  <label for="updateSalarySubtotal">Subtotal</label>
                  <input readonly type="number" class="form-control subTotalPT grossPay" id="updateSalarySubtotal" min="0.00" step="0.01" value="` + answer[i]['subtotal'] + `" name="salarySubtotal[]">
                </div>
                <div class="form-group col-md-3 col-sm-12 col-xs-12">
                  <label for="updateSalaryRemarks">Remarks</label>
                  <input type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                </div>
              </div>
                `)
          }

          calculateSubtotalPT();

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

                          $('.newDailyHoursWorked').select2({
                            placeholder: "Select or type a number",
                            tags: true
                          });

                          recalculateDailyHoursWorked();

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

      recalculateTotalDeductions();

    }
  })
});