/* DATATABLES CONFIGURATION */
var employeesTable = $('.tableEmployees').DataTable({
  "ajax": "ajax/datatable-employees.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[1, 'asc']],
  "fnStateSave": function (oSettings, oData) {
    localStorage.setItem('employeesTable', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
    return JSON.parse(localStorage.getItem('employeesTable'));
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
    { "data": 21 }
  ],
  "columnDefs": [{
    "targets": 0,
    "responsivePriority": 1
  }, {
    "targets": 22,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnEditEmployee' employeeId=" + row[21] + " class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditEmployee'><i class='fa fa-pencil'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 23,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnUploadEmployeeDocuments' employeeId=" + row[21] + " class='btn btn-primary btn-sm'><i class='fa fa-upload'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }, {
    "targets": 24,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnDeleteEmployee' employeeId=" + row[21] + " class='btn btn-danger btn-sm btnDeleteEmployee' data-toggle='modal' data-target='#modalDeleteEmployee'><i class='fa fa-times'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }]
});

var employeesTeamTable = $('.tableEmployeesTeamSelection').DataTable({
  "ajax": "ajax/datatable-employees.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "pageLength": 5,
  "lengthMenu": [[5, 10, 20], [5, 10, 20]],
  "order": [[1, 'asc']],
  "columns": [
    { "data": 0 },
    { "data": 1 },
    { "data": 2 },
    { "data": 21 }
  ],
  "columnDefs": [{
    "targets": 0,
    "responsivePriority": 1
  }, {
    "targets": 4,
    "data": null,
    "render": function (data, type, row) {
      return "<button type='button' id='btnAddEmployeeToTeam' employeeId=" + row[21] + " firstName='" + row[0] + "' lastName='" + row[1] + "' class='btn btn-success btn-sm'><i class='fa fa-plus'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }]
});

var editEmployeesTeamTable = $('.tableEditEmployeesTeamSelection').DataTable({
  "ajax": "ajax/datatable-employees.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "pageLength": 5,
  "lengthMenu": [[5, 10, 20], [5, 10, 20]],
  "order": [[1, 'asc']],
  "columns": [
    { "data": 0 },
    { "data": 1 },
    { "data": 2 },
    { "data": 21 }
  ],
  "columnDefs": [{
    "targets": 0,
    "responsivePriority": 1
  }, {
    "targets": 4,
    "data": null,
    "render": function (data, type, row) {
      return "<button type='button' id='btnAddEmployeeToTeam' employeeId=" + row[21] + " firstName='" + row[0] + "' lastName='" + row[1] + "' class='btn btn-success btn-sm'><i class='fa fa-plus'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }]
});

$('.tableEmployees tbody').on('click', '#btnUploadEmployeeDocuments', function () {
  window.open("index.php?route=employee-upload-files&employeeId=" + parseInt($(this).attr('employeeId')));
});

$(".tableEmployees tbody").on("click", "button.btnDeleteEmployee", function () {

  var person_id = $(this).attr("employeeId");

  swal({

    title: 'Are you sure you want to delete this employee?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Delete'
  }).then(function (result) {
    if (result.value) {

      window.location = "index.php?route=employee-management&personIdToDelete=" + person_id;

    }
  })
})

$('.tableEmployees thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 22 && index != 23 && index != 24) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

$('.tableEmployeesTeamSelection tbody').on('click', '#btnAddEmployeeToTeam', function () {
  var firstName = $(this).attr("firstName");
  var lastName = $(this).attr("lastName");
  var employeeId = $(this).attr("employeeId");
  var sameEmployeeAdded = false;

  $("#addEmployeeForm").find('input.employeeId').each(function (index, element) {
    var currentEmployeeId = $(element).val();
    if (currentEmployeeId == employeeId) {
      sameEmployeeAdded = true;

      swal({
        type: "error",
        title: "Employee already added",
        showConfirmButton: true,
        confirmButtonText: "Close",
        timer: 1500
      })
    }
  })

  //IF EMPTY EMPLOYEE LIST TEXT HAS NOT BEEN REMOVED, REMOVE IT
  if (document.getElementById("emptyEmployeeTeamListText") != null) {
    document.getElementById("emptyEmployeeTeamListText").remove();
    if (document.getElementById("labelsForEmployeeTeamList") == null) {
      $("#appendDynamicEmployeeTeamList").append(
        `
              <div id="labelsForEmployeeTeamList">
              <div class="col-md-6 hidden-sm hidden-xs">
                <label>Employee Name</label>
              </div>
              </div>
              `
      )
    }
  }

  //ONLY APPEND A NEW EMPLOYEE TO THE LIST IF IT HAS NOT BEEN ADDED
  if (!sameEmployeeAdded) {
    $("#appendDynamicEmployeeTeamList").append(
      ` 
      <div class="form-row">

      <input type="hidden" class="employeeId" name="newEmployeeTeamIds[]" value="` + employeeId + `">
      <div class="visible-xs col-xs-12 visible-sm col-sm-12">
          <div class="visible-xs col-xs-12 visible-sm col-sm-12 ">
              <label>Employee Name</label>
          </div>
      </div>
      <div class="form-group col-md-11 col-sm-12 col-xs-12">
          <input readonly class="form-control employeeName" type="text" value="` + firstName + " " + lastName + `">
      </div>
      <div class="form-group col-md-1 col-sm-4 col-xs-4">
      <button type="button" id="removeEmployeeFromTeam" class="btn btn-block btn-danger removeEmployeeFromTeam"><i class="fa fa-minus"></i></button>
      </div>
      <div class="col-md-12 hidden-sm hidden-xs">
          <p></p>
      </div>

      </div>
      `)
  }
});

$('.tableEditEmployeesTeamSelection tbody').on('click', '#btnAddEmployeeToTeam', function () {
  var firstName = $(this).attr("firstName");
  var lastName = $(this).attr("lastName");
  var employeeId = $(this).attr("employeeId");
  var sameEmployeeAdded = false;

  $("#editEmployeeForm").find('input.employeeId').each(function (index, element) {
    var currentEmployeeId = $(element).val();
    if (currentEmployeeId == employeeId) {
      sameEmployeeAdded = true;

      swal({
        type: "error",
        title: "Employee already added",
        showConfirmButton: true,
        confirmButtonText: "Close",
        timer: 1500
      })
    }
  })

  //IF EMPTY EMPLOYEE LIST TEXT HAS NOT BEEN REMOVED, REMOVE IT
  if (document.getElementById("emptyEditEmployeeTeamListText") != null) {
    document.getElementById("emptyEditEmployeeTeamListText").remove();
    if (document.getElementById("labelsForEditEmployeeTeamList") == null) {
      $("#appendDynamicEditEmployeeTeamList").append(
        `
            <div id="labelsForEditEmployeeTeamList">
            <div class="col-md-6 hidden-sm hidden-xs">
              <label>Employee Name</label>
            </div>
            </div>
            `
      )
    }
  }

  //ONLY APPEND A NEW EMPLOYEE TO THE LIST IF IT HAS NOT BEEN ADDED
  if (!sameEmployeeAdded) {
    $("#appendDynamicEditEmployeeTeamList").append(
      ` 
    <div class="form-row">

    <input type="hidden" class="employeeId" name="editEmployeeTeamIds[]" value="` + employeeId + `">
    <div class="visible-xs col-xs-12 visible-sm col-sm-12">
        <div class="visible-xs col-xs-12 visible-sm col-sm-12 ">
            <label>Employee Name</label>
        </div>
    </div>
    <div class="form-group col-md-11 col-sm-12 col-xs-12">
        <input readonly class="form-control employeeName" type="text" value="` + firstName + " " + lastName + `">
    </div>
    <div class="form-group col-md-1 col-sm-4 col-xs-4">
    <button type="button" id="removeEmployeeFromTeam" class="btn btn-block btn-danger removeEmployeeFromTeam"><i class="fa fa-minus"></i></button>
    </div>
    <div class="col-md-12 hidden-sm hidden-xs">
        <p></p>
    </div>

    </div>
    `)
  }
});

$("#addEmployeeForm").on("click", "button.removeEmployeeFromTeam", function () {
  $(this).parent().parent().remove();

  if (document.getElementById("removeEmployeeFromTeam") == null) {

    if (document.getElementById("labelsForEmployeeTeamList") != null) {
      document.getElementById("labelsForEmployeeTeamList").remove();
    }

    $("#appendDynamicEmployeeTeamList").append(
      `
    <span id="emptyEmployeeTeamListText" >List is empty. Please add an employee.</span>
    `
    )
  }
})

$("#editEmployeeForm").on("click", "button.removeEmployeeFromTeam", function () {
  $(this).parent().parent().remove();

  if (document.getElementById("removeEmployeeFromTeam") == null) {

    if (document.getElementById("labelsForEditEmployeeTeamList") != null) {
      document.getElementById("labelsForEditEmployeeTeamList").remove();
    }

    $("#appendDynamicEditEmployeeTeamList").append(
      `
    <span id="emptyEditEmployeeTeamListText" >List is empty. Please add an employee.</span>
    `
    )
  }
})

$('#redrawEmployeesTable').click(function () {
  employeesTable.search('').columns().search('').draw();
});

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalEditEmployee').on('hidden.bs.modal', function () {
  $("#appendDynamicStoreData").html("");
  $("#appendDynamicEditEmployeeTeamList").html("");
  $("#appendCurrentEditEmployeeTeamList").html("");
})

$('.tableEmployees tbody').on('click', '#btnEditEmployee', function () {
  var employeeId = parseInt($(this).attr('employeeId'));

  var formData = new FormData();
  formData.append("person_id", employeeId);

  $.ajax({
    url: "ajax/employees.ajax.php",
    method: "POST",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (answer) {
      $('#editEmployeeId').val(answer['person_id']);
      $('#personIdToUpload').val(answer['person_id']);
      $('#editFirstName').val(answer['first_name']);
      $('#editLastName').val(answer['last_name']);
      $('#editChineseName').val(answer['chinese_name']);
      $('#editDateOfBirth').val(answer['date_of_birth']);
      $('#editGender').val(answer['gender']);
      $('#editNationality').val(answer['nationality']);
      $('#editDesignation').val(answer['designation']);
      $('#editEmail').val(answer['email']);
      $('#editMobileNumber').val(answer['mobile_number']);
      $('#editPhoneNumber').val(answer['phone_number']);
      $('#editAddress').val(answer['address_1']);
      $('#editPostalCode').val(answer['zip']);
      $('#editDutyLocation').val(answer['duty_location']);
      $('#editBankName').val(answer['bank_name']);
      $('#editBankAccNum').val(answer['bank_acct']);
      $('#editCommencementDate').val(answer['commencement']);
      $('#editLeftDate').val(answer['left_date']);
      $('#editComments').val(answer['comments']);
      $('#editEmergencyName').val(answer['emergency_name']);
      $('#editEmergencyRelationship').val(answer['emergency_relation']);
      $('#editEmergencyAddress').val(answer['emergency_address']);
      $('#editEmergencyContact').val(answer['emergency_contact']);
      $('#editUsername').val(answer['username']);

      var formData = new FormData();
      formData.append("get_allowed_modules", employeeId);

      $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
          $('#editEmployeeManagement').iCheck('uncheck');
          $('#editEmployeeUploadFiles').iCheck('uncheck');
          $('#editSalaryVoucherMgt').iCheck('uncheck');
          $('#editSalaryVoucherMgtPT').iCheck('uncheck');
          $('#editViewOwnSalaryVoucher').iCheck('uncheck');
          $('#editViewOwnSalaryVoucherPT').iCheck('uncheck');
          $('#editDownloadOwnSalaryVoucher').iCheck('uncheck');
          $('#editSubmitOwnSalaryVoucher').iCheck('uncheck');
          $('#editSubmitOwnSalaryVoucherPT').iCheck('uncheck');
          $('#editSalaryVoucherAnalysis').iCheck('uncheck');
          $('#editCustomerManagement').iCheck('uncheck');
          $('#editCustomerArchives').iCheck('uncheck');
          $('#editCustomerAnalytics').iCheck('uncheck');

          for (var i = 0; i < answer.length; i++) {
            if (answer[i]['module_title'] == "employee-management" && answer[i]['active'] == 1) {
              $('#editEmployeeManagement').iCheck('check');
            } else if (answer[i]['module_title'] == "employee-upload-files" && answer[i]['active'] == 1) {
              $('#editEmployeeUploadFiles').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-management" && answer[i]['active'] == 1) {
              $('#editSalaryVoucherMgt').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-management-pt" && answer[i]['active'] == 1) {
              $('#editSalaryVoucherMgtPT').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-my" && answer[i]['active'] == 1) {
              $('#editViewOwnSalaryVoucher').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-my-pt" && answer[i]['active'] == 1) {
              $('#editViewOwnSalaryVoucherPT').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-download" && answer[i]['active'] == 1) {
              $('#editDownloadOwnSalaryVoucher').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-team" && answer[i]['active'] == 1) {
              $('#editViewTeamSalaryVoucher').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-team-pt" && answer[i]['active'] == 1) {
              $('#editViewTeamSalaryVoucherPT').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-submit" && answer[i]['active'] == 1) {
              $('#editSubmitOwnSalaryVoucher').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-submit-pt" && answer[i]['active'] == 1) {
              $('#editSubmitOwnSalaryVoucherPT').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-analysis" && answer[i]['active'] == 1) {
              $('#editSalaryVoucherAnalysis').iCheck('check');
            }
            else if (answer[i]['module_title'] == "employee-salary-voucher-analysis-yearly" && answer[i]['active'] == 1) {
              $('#editSalaryVoucherAnalysisYearly').iCheck('check');
            }
            else if (answer[i]['module_title'] == "customer-management" && answer[i]['active'] == 1) {
              $('#editCustomerManagement').iCheck('check');
            }
            else if (answer[i]['module_title'] == "customer-archives" && answer[i]['active'] == 1) {
              $('#editCustomerArchives').iCheck('check');
            }
            else if (answer[i]['module_title'] == "customer-analytics" && answer[i]['active'] == 1) {
              $('#editCustomerAnalytics').iCheck('check');
            }
            else if (answer[i]['module_title'] == "supplier-management" && answer[i]['active'] == 1) {
              $('#editSupplierManagement').iCheck('check');
            }
          }

          var formData = new FormData();
          formData.append("get_employees_payroll", employeeId);

          $.ajax({
            url: "ajax/employees.ajax.php",
            method: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (answer) {
              if (answer.length != 0) {
                $('#editCompanySelection').val(answer[0]['company_name']);
                $('#editCompanySelection').select2().trigger('change');
                $('#editLevyAmount').val(answer[0]['levy_amount']);
                $('#editRace').val(answer[0]['race']);
                $('#editRace').select2().trigger('change');
              }

              $('#editRace').select2({
                placeholder: "Select your race",
                tags: true
              });

              var formData = new FormData();
              formData.append("get_employees_stores", employeeId);

              $.ajax({
                url: "ajax/employees.ajax.php",
                method: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                  //console.log(answer);
                  for (var i = 0; i < answer.length; i++) {
                    //console.log(answer[i].store_name);
                    //console.log(answer[i].quantity);
                    $("#appendDynamicStoreData").append(`
                        <div class='form-row col-xs-12'>
                        <div class='col-md-1 col-xs-2'>
                            <input type='hidden' name='updateStoreActive[` + i + `]' value='0' />
                            <input type='checkbox' class='minimal' name='updateStoreActive[`+ i + `]' value='1' checked/>
                        </div>
                        <div class='col-md-7 col-xs-10'>
                            <select disabled name='updateStoreId[`+ i + `]' class='form-control'>
                                <option selected value='` + answer[i].store_id + `'>` + answer[i].store_name.replace(/\'/g, '&apos;') + `</option>
                            </select>
                            <input type='hidden' name='updateStoreSelection[` + i + `]' value='` + answer[i].store_id + `' />
                        </div>
                        <div class='visible-xs-block visible-sm-inline-block col-sm-12 col-xs-12'>
                        <p></p>
                        </div>
                        <div class='col-md-12 col-xs-12'>
                        <p></p>
                        </div>
                        </div>`);
                  }

                  $('#editCompanySelection').select2({
                    placeholder: "Select a Company"
                  });

                }
              })

              var formData = new FormData();
              formData.append("get_employees_team", employeeId);

              $.ajax({
                url: "ajax/employees.ajax.php",
                method: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                  console.log(answer);

                  $("#appendCurrentEditEmployeeTeamList").append(
                    `
                    <div class='col-md-1 hidden-sm hidden-xs'>
                        <label>Active</label>
                    </div>
                    <div class="col-md-11 hidden-sm hidden-xs">
                        <label>Employee Name</label>
                    </div>
                  `);

                  for (var i = 0; i < answer.length; i++) {
                    $("#appendCurrentEditEmployeeTeamList").append(
                      `
                        <div class="form-row">
        
                        <input type="hidden" class="memberId" name="updateEmployeeTeamIds[]" value="` + answer[i].member_id + `">
                        <div class='col-md-1 col-sm-1 col-xs-1'>
                            <input type='hidden' name='updateMemberActive[` + i + `]' value='0' />
                            <input type='checkbox' class='minimal' name='updateMemberActive[`+ i + `]' value='1' checked/>
                        </div>
                        <div class='visible-xs col-xs-10 visible-sm col-sm-10'>
                            <p>Active</p>
                        </div>
                        <div class="visible-xs col-xs-11 visible-sm col-sm-11">
                            <label>Employee Name</label>
                        </div>
                        <div class="form-group col-md-8 col-sm-12 col-xs-12">
                            <input readonly class="form-control employeeName" type="text" value="` + answer[i].first_name + ` ` + answer[i].last_name + `">
                        </div>
                        <div class="col-md-12 hidden-sm hidden-xs">
                            <p></p>
                        </div>
        
                        </div>
                        `)

                    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                      checkboxClass: 'icheckbox_minimal-blue',
                      radioClass: 'iradio_minimal-blue'
                    })
                  }
                }
              })
            }
          })
        }
      })
    }
  })
});

employeesTable.columns().every(function () {
  var employeesTable = this;
  $('input', this.header()).on('keyup change', function () {
    if (employeesTable.search() !== this.value) {
      employeesTable.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

$('#modalAddEmployee').on('hidden.bs.modal', function () {
  $(".preview").attr("src", "views/img/users/default/anonymous.png");
  $(".newProfilePhoto").val("");
})

$('#modalEditEmployee').on('hidden.bs.modal', function () {
  $(".preview").attr("src", "views/img/users/default/anonymous.png");
  $(".editProfilePhoto").val("");
})

$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');

$('#newCompanySelection').select2({
  placeholder: "Select a Company"
});

$('#editCompanySelection').select2({
  placeholder: "Select a Company"
});

$('#newRace').select2({
  placeholder: "Select your race",
  tags: true
});

$('#editRace').select2({
  placeholder: "Select your race",
  tags: true
});


$('#editPasswordSelection').on('ifUnchecked', function (event) {
  $("#editPassword").prop("readonly", true);
});

$('#editPasswordSelection').on('ifChecked', function (event) {
  $("#editPassword").prop("readonly", false);
  $('.editPasswordSelection').val("1");
});

$("#newStoreEmployeeRepeater").createRepeater();
$("#editStoreEmployeeRepeater").createRepeater();

//SWITCH TO TAB UPON UNFILLED REQUIRED
//BUTTONS STUFF HERE
$('.editEmployeeButton').click(function () {
  $(':required:invalid', '#editEmployeeForm').each(function () {
    var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');

    $('.nav a[href="#' + id + '"]').tab('show');
  });
});

//SWITCH TO TAB UPON UNFILLED REQUIRED
//BUTTONS STUFF HERE
$('.addEmployeeButton').click(function () {
  $(':required:invalid', '#addEmployeeForm').each(function () {
    var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');

    $('.nav a[href="#' + id + '"]').tab('show');
  });
});

$('.datepicker').datepicker({
  format: "dd-mm-yyyy",
  autoclose: true,
  disableTouchKeyboard: true,
  Readonly: true
}).attr("readonly", "readonly");
