/* DATATABLES CONFIGURATION */
var suppliersTable = $('.tableSuppliers').DataTable({
  "ajax": "ajax/datatable-suppliers.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[0, 'asc']],
  "fnStateSave": function (oSettings, oData) {
      localStorage.setItem('suppliersTable', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
      return JSON.parse(localStorage.getItem('suppliersTable'));
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
    { "data": 9 }
  ],
  "columnDefs": [{
    "targets": 0,
    "responsivePriority": 1
  }, {
    "targets": 10,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnEditSupplier' supplierId=" + row[9] + " class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditSupplier'><i class='fa fa-pencil'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 2
  }, {
    "targets": 11,
    "data": null,
    "render": function (data, type, row) {
      return "<button id='btnDeleteSupplier' supplierId=" + row[9] + " class='btn btn-danger btn-sm btnDeleteSupplier' data-toggle='modal' data-target='#modalDeleteSupplier'><i class='fa fa-times'></i></button>";
    },
    "orderable": false,
    "responsivePriority": 3
  }]
});

  /* PASS ATTRIBUTE OF DATATABLES ROW */
  $('.tableSuppliers tbody').on('click', '#btnEditSupplier', function () {
    var supplierId = parseInt($(this).attr('supplierId'));
  
    var formData = new FormData();
    formData.append("person_id", supplierId);
  
    $.ajax({
      url: "ajax/suppliers.ajax.php",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (answer) {
  
        //console.log(answer);
  
        $('#editSupplierId').val(answer['person_id']);
        $('#editCompanyName').val(answer['company_name']);
        $('#editEmail').val(answer['email']);
        $('#editMobileNumber').val(answer['mobile_number']);
        $('#editPhoneNumber').val(answer['phone_number']);
        $('#editAddress').val(answer['address_1']);
        $('#editPostalCode').val(answer['zip']);
        $('#editBankName').val(answer['bank_name']);
        $('#editAccountNumber').val(answer['account_number']);
        $('#editComments').val(answer['comments']);
      }
    })
  });
  
  $('div.dataTables_filter input').focus();
  $('div.dataTables_filter label input').attr('id', 'search');
  
  $(".tableSuppliers tbody").on("click", "button.btnDeleteSupplier", function () {

    var supplier_id = $(this).attr("supplierId");
  
    swal({
  
      title: 'Are you sure you want to delete this supplier?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete'
    }).then(function (result) {
      if (result.value) {
  
        window.location = "index.php?route=supplier-management&supplierIdToDelete=" + supplier_id;
  
      }
    })
  })