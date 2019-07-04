/* DATATABLES NON SERVER-SIDE PROCESSING
$('.tableEmployees').DataTable({
  "ajax": "ajax/datatable-employees.ajax.php",
  "deferRender": true,
  "retrieve": true,
  "processing": true,
  "autoWidth": false,
  "order": [[2, 'asc']],
  "columnDefs": [
    { "responsivePriority": 1, "targets": 22},
    { "orderable": false, "targets": [0, 22, 23] }
  ]
});
*/

/* DATATABLES CONFIGURATION */
var employeesTable = $('.tableEmployees').DataTable({
  "ajax": "ajax/datatable-employees.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[1, 'asc']],
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
  },{
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
      return "<button id='btnDeleteEmployee' employeeId=" + row[21] + " class='btn btn-danger btn-sm' data-toggle='modal' data-target='#modalDeleteEmployee'><i class='fa fa-times'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }]
});

$('.tableEmployees thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 22 && index != 23) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

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

      console.log(answer);
      $('#editEmployeeId').val(answer['person_id']);
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


$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');


$('#editPasswordSelection').on('ifUnchecked', function(event){
  $("#editPassword").prop("readonly",true);
});

$('#editPasswordSelection').on('ifChecked', function(event){
  $("#editPassword").prop("readonly",false);
});

$('.datepicker').datepicker({
  format: "dd/mm/yyyy",
  autoclose: true,
  disableTouchKeyboard: true,
  Readonly: true
}).attr("readonly", "readonly");