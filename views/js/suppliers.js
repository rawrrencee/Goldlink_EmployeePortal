$('.tableSuppliers').DataTable({
    "ajax": "ajax/datatable-suppliers.ajax.php",
    "deferRender": true,
    "retrieve": true,
    "processing": true,
    "autoWidth": false,
    "order": [[1, 'asc']],
    "columnDefs": [
      { "orderable": false, "targets": [0, 10, 11] },
      { "responsivePriority": 1, "targets": [10] }
    ]
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
  