/* DATATABLES CONFIGURATION */
var customerArchivesTable = $('.tableCustomerArchives').DataTable({
    "ajax": "ajax/datatable-customer-archives.ssp.php",
    "serverSide": true,
    "processing": true,
    "autoWidth": false,
    "order": [[5, 'desc']],
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
        { "data": 23 }
    ],
    "columnDefs": [{
        "targets": 0,
        "responsivePriority": 1
    }, {
        "targets": 24,
        "data": null,
        "render": function (data, type, row) {
            return "<button id='btnEditCustomer' customerId=" + row[23] + " class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditCustomer'><i class='fa fa-pencil'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 2
    }, {
        "targets": 25,
        "data": null,
        "render": function (data, type, row) {
            return "<button id='btnDeleteCustomer' customerId=" + row[23] + " class='btn btn-danger btn-sm btnDeleteCustomer'><i class='fa fa-times'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 3
    }]
});

$('.tableCustomerArchives thead th').each(function (index, element) {
    var title = $(this).text();
    if (index != 24 && index != 25) {
        $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
    }
});

$(".tableCustomerArchives tbody").on("click", "button.btnDeleteCustomer", function () {

    var customer_id = $(this).attr("customerId");
  
    swal({
  
      title: 'Are you sure you want to delete this customer?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete'
    }).then(function (result) {
      if (result.value) {
  
        window.location = "index.php?route=customer-archives&archiveCustomerIdToDelete=" + customer_id;
  
      }
    })
  })

//Filter Customers DataTable by Store
$('#dataTablesFilterCustomerArchivesByStore').on('change', function () {
    customerArchivesTable.column(0).search(this.value).draw();
});

$('.tableCustomerArchives tbody').on('click', '#btnEditCustomer', function () {
    var customerId = parseInt($(this).attr('customerId'));

    var formData = new FormData();
    formData.append("person_id", customerId);

    $.ajax({
        url: "ajax/customers.ajax.php",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {

            //console.log(answer);
            $('#editCustomerId').val(answer['person_id']);
            $('#editTitle').val(answer['title']);
            $('#editFirstName').val(answer['first_name']);
            $('#editLastName').val(answer['last_name']);
            $('#editChineseName').val(answer['chinese_name']);
            $('#editCustomerNRIC').val(answer['nric']);
            $('#editDateOfBirth').val(answer['date_of_birth']);
            $('#editGender').val(answer['gender']);
            $('#editNationality').val(answer['nationality']);
            $('#editDesignation').val(answer['designation']);
            $('#editEmail').val(answer['email']);
            $('#editMobileNumber').val(answer['mobile_number']);
            $('#editPhoneNumber').val(answer['phone_number']);
            $('#editAddress').val(answer['address_1']);
            $('#editPostalCode').val(answer['zip']);
            $('#editComments').val(answer['comments']);
            $('#editCompanyName').val(answer['company_name']);
            $('#editPreferredContact').val(answer['preferred_contact']);
            $('#editDiscount').val(answer['discount']);
            $('#editStoreSelection').val(answer['store']);
            $('#editCreateDate').val(answer['create_date']);
            $('#editModifyDate').val(answer['modify_date']);
            $('#editModifiedBy').val(answer['modify_by']);
        }
    })
});

customerArchivesTable.columns().every(function () {
    var customerArchivesTable = this;
    $('input', this.header()).on('keyup change', function () {
        if (customerArchivesTable.search() !== this.value) {
            customerArchivesTable.search(this.value).draw();
        }
    });

    $('input', this.header()).on('click', function (e) {
        e.stopPropagation();
    });
});

$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');