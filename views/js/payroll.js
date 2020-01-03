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

//DATATABLES DRAFT SALARY VOUCHERS PT
/* DATATABLES CONFIGURATION */
var salaryVoucherDraftsTablePT = $('.tableSalaryVoucherDraftsPT').DataTable({
  "ajax": "ajax/datatable-salary-voucher-drafts-pt.ssp.php",
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
      return "<button id='btnLoadSalaryVoucherDraftPT' voucherId=" + row[0] + " class='btn btn-warning btn-sm btnLoadSalaryVoucherDraftPT'><i class='fa fa-download'></i></button>";
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

$('.tableSalaryVoucherDraftsPT thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 27 && index != 28) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

salaryVoucherDraftsTablePT.columns().every(function () {
  var salaryVoucherDraftsTablePT = this;
  $('input', this.header()).on('keyup change', function () {
    if (salaryVoucherDraftsTablePT.search() !== this.value) {
      salaryVoucherDraftsTablePT.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

$(".tableSalaryVoucherDraftsPT tbody").on("click", "button.btnDeleteSalaryVoucherDraft", function () {

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

      window.location = "index.php?route=employee-salary-voucher-submit-pt&voucherIdToDelete=" + voucher_id;

    }
  })
})


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
    "targets": [0, 1, 7],
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

$('#redrawMySalaryVouchersTable').click(function () {
  mySalaryVouchersTable.search('').columns().search('').draw();
});

//Filter My Salary Vouchers (FT) DataTable by Status
$('#mySalaryVouchersTableFilterSVByStatus').on('change', function () {
  mySalaryVouchersTable.column(7).search(this.value).draw();
});

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

$('#redrawMySalaryVouchersTablePT').click(function () {
  mySalaryVouchersTablePT.search('').columns().search('').draw();
});

//Filter My Salary Vouchers (PT) DataTable by Status
$('#mySalaryVouchersTablePTFilterSVByStatus').on('change', function () {
  mySalaryVouchersTablePT.column(7).search(this.value).draw();
});

//DATATABLES SALARY VOUCHER MANAGEMENT
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

$('#redrawAllSalaryVouchersTable').click(function () {
  allSalaryVouchersTable.search('').columns().search('').draw();
});

//Filter Salary Vouchers (FT) DataTable by Status
$('#dataTablesFilterSVByStatus').on('change', function () {
  allSalaryVouchersTable.column(8).search(this.value).draw();
});

//DATATABLES SALARY VOUCHER MANAGEMENT
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

$('#redrawAllSalaryVouchersTablePT').click(function () {
  allSalaryVouchersTablePT.search('').columns().search('').draw();
});

//Filter Salary Vouchers (PT) DataTable by Status
$('#dataTablesFilterSVByStatus_PT').on('change', function () {
  allSalaryVouchersTablePT.column(8).search(this.value).draw();
});

//DATATABLES TEAM SALARY VOUCHER MANAGEMENT
/* DATATABLES CONFIGURATION */
var teamSalaryVouchersTable = $('.tableTeamSalaryVouchers').DataTable({
  "ajax": "ajax/datatable-salary-voucher-team.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[10, 'desc']],
  "bStateSave": true,
  "fnStateSave": function (oSettings, oData) {
      localStorage.setItem('teamSalaryVouchersTable', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
      return JSON.parse(localStorage.getItem('teamSalaryVouchersTable'));
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

$('.tableTeamSalaryVouchers thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 28 && index != 29 && index != 30) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

teamSalaryVouchersTable.columns().every(function () {
  var teamSalaryVouchersTable = this;
  $('input', this.header()).on('keyup change', function () {
    if (teamSalaryVouchersTable.search() !== this.value) {
      teamSalaryVouchersTable.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

$('#redrawTeamSalaryVouchersTable').click(function () {
  teamSalaryVouchersTable.search('').columns().search('').draw();
});

//Filter Team Salary Vouchers (FT) DataTable by Status
$('#dataTablesFilterSVByStatus').on('change', function () {
  teamSalaryVouchersTable.column(8).search(this.value).draw();
});

//DATATABLES TEAM SALARY VOUCHER MANAGEMENT (PT)
/* DATATABLES CONFIGURATION */
var teamSalaryVouchersTablePT = $('.tableTeamSalaryVouchersPT').DataTable({
  "ajax": "ajax/datatable-salary-voucher-team-pt.ssp.php",
  "serverSide": true,
  "processing": true,
  "autoWidth": false,
  "order": [[10, 'desc']],
  "bStateSave": true,
  "fnStateSave": function (oSettings, oData) {
      localStorage.setItem('teamSalaryVouchersTablePT', JSON.stringify(oData));
  },
  "fnStateLoad": function (oSettings) {
      return JSON.parse(localStorage.getItem('teamSalaryVouchersTablePT'));
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

$('.tableTeamSalaryVouchersPT thead th').each(function (index, element) {
  var title = $(this).text();
  if (index != 0 && index != 28 && index != 29 && index != 30) {
    $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
  }
});

teamSalaryVouchersTablePT.columns().every(function () {
  var teamSalaryVouchersTablePT = this;
  $('input', this.header()).on('keyup change', function () {
    if (teamSalaryVouchersTablePT.search() !== this.value) {
      teamSalaryVouchersTablePT.search(this.value).draw();
    }
  });

  $('input', this.header()).on('click', function (e) {
    e.stopPropagation();
  });
});

$('#redrawTeamSalaryVouchersTablePT').click(function () {
  teamSalaryVouchersTablePT.search('').columns().search('').draw();
});

//Filter Salary Vouchers (PT) DataTable by Status
$('#dataTablesFilterSVByStatus_PT').on('change', function () {
  teamSalaryVouchersTablePT.column(8).search(this.value).draw();
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
        <button type="button" id="removeSalaryListing" class="btn btn-block btn-danger removeSalaryListing"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
      </div>
    </div>
    `)

});

//APPEND SALARY LISTING (PT)
$("#salaryVoucherForm").on("click", "button.addSalaryListingPT", function () {

  $("#appendSalaryListingPT").append(
    `
    <div class="form-row">
      <div class="form-group col-md-3 col-sm-12 col-xs-12">
        <label for="newSalaryTitle">Title</label>
        <input type="text" class="form-control" id="newSalaryTitle" name="salaryTitle[]" value="">
      </div>
      <div class="form-group col-md-2 col-sm-6 col-xs-6">
        <label for="newSalaryRate">Rate</label>
        <input type="number" class="form-control ratePT" id="newSalaryRate" min="0.00" step="0.01" value="0.00" name="salaryRate[]">
      </div>
      <div class="form-group col-md-2 col-sm-6 col-xs-6">
        <label for="newSalaryUnit">Unit</label>
        <input type="number" class="form-control unitPT" id="newSalaryUnit" min="0.00" step="0.01" value="0.00" name="salaryUnit[]">
      </div>
      <div class="form-group col-md-2 col-sm-12 col-xs-12">
        <label for="newSalarySubtotal">Subtotal</label>
        <input readonly type="number" class="form-control subTotalPT grossPay" id="newSalarySubtotal" min="0.00" step="0.01" value="0.00" name="salarySubtotal[]">
      </div>
      <div class="form-group col-md-3 col-sm-12 col-xs-12">
        <label for="newSalaryRemarks">Remarks</label>
        <input type="text" class="form-control" id="newSalaryRemarks" name="salaryRemarks[]">
      </div>
      <div class="form-group col-md-12 col-sm-12 col-xs-12" style="padding-top: 23px;">
      <button type="button" id="removeSalaryListingPT" class="btn btn btn-danger removeSalaryListingPT"><i class="fa fa-minus"></i>&nbsp;&nbsp;Remove</button>
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

//REMOVE SALARY LISTING
$("#salaryVoucherForm").on("click", "button.removeSalaryListing", function () {

  $(this).parent().parent().remove();
  recalculateGrossPay();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  recalculateTotalDeductions();
});

//REMOVE SALARY LISTING
$("#salaryVoucherForm").on("click", "button.removeSalaryListingPT", function () {

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
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
  }
  recalculateTotalDeductions();
})

//CHANGE SALARY LISTING AMOUNT (PT)
$("#salaryVoucherForm").on("change", "input.ratePT", function () {
  calculateSubtotalPT();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
  }
  recalculateTotalDeductions();
})

$("#salaryVoucherForm").on("change", "input.unitPT", function () {
  calculateSubtotalPT();
  if (document.getElementById("newIsSGPR").checked) {
    setCPF();
  }
  if (document.getElementById("newCSMSelection").checked) {
    calculateCSM();
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

$('#newCSMSelection').on('ifUnchecked', function (event) {
  $('#newCSMTitle').val("N/A");
  $('#newCSMAmount').val("0.00");
  recalculateTotalDeductions();
});

$('#newCSMSelection').on('ifChecked', function (event) {
  calculateCSM();
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
$('#newMethodOfPayment').select2({
  placeholder: "Select method of payment"
});

$('.newSalesInformation').select2({
  placeholder: "Select or type a number",
  tags: true
});

$('.newDailyHoursWorked').select2({
  placeholder: "Select or type a number",
  tags: true
});

$('#newMonthOfVoucher').select2({
  placeholder: "Select month"
});

$('#newMonthOfVoucher').on('select2:select', function (e) {
  autofillAttendance();
});

$('#newYearOfVoucher').select2({
  placeholder: "Select year"
});

$('#newYearOfVoucher').on('select2:select', function (e) {
  autofillAttendance();
});


$('.newSalesInformation').on('select2:select', function (e) {
  recalculatePersonalSales();
  autofillAttendance();
});

$('.newDailyHoursWorked').on('select2:select', function (e) {
  recalculateDailyHoursWorked();
});

//SWITCH TO TAB UPON UNFILLED REQUIRED
//BUTTONS STUFF HERE
$('.postButton').click(function () {
  $(':required:invalid', '#salaryVoucherForm').each(function () {
    var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');
    $('.nav a[href="#' + id + '"]').tab('show');
  });
});

$(".tableAllSalaryVouchers tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

$(".tableAllSalaryVouchersPT tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

$(".tableMySalaryVouchers tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

$(".tableMySalaryVouchersPT tbody").on("click", "button.btnGeneratePDF", function () {
  var voucher_id = $(this).attr("voucherId");
  window.open("views/plugins/fpdf/index.php?voucherId=" + voucher_id);
});

$('#saveDraftVoucher').click(function () {
  $("#newIsDraft").val(1);
});

$('#submitVoucher').click(function (event) {
  $("#newIsDraft").val(0);
});

$('#submitPendingVoucher').click(function () {
  $("#updateVoucherStatus").val("Pending");
});

$('#submitApprovedVoucher').click(function () {
  $('#updateVoucherStatus').val("Approved");
});

$('#submitRejectedVoucher').click(function () {
  $("#updateVoucherStatus").val("Rejected");
});

$('#resetVoucher').click(function (event) {
  $("#appendSalaryListing").html("");
  $("#appendSalaryListingPT").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
});

$("#updateVoucherStatusForm").on('click', '#btnApproveSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $('#voucherStatusToUpdate').val("Approved");
});

$("#updateVoucherStatusForm").on('click', '#btnRejectSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $("#voucherStatusToUpdate").val("Rejected");
});

$("#updateVoucherStatusForm").on('click', '#btnPendingSalaryVoucher', function () {
  var voucher_id = $(this).attr("voucherId");
  $("#voucherIdToUpdate").val(voucher_id);
  $("#voucherStatusToUpdate").val("Pending");
});

//ON SUBMIT CREATE SALARY VOUCHER ASK FOR CONFIRMATION
$('#salaryVoucherForm').on('submit', function (e) {
  e.preventDefault();
  if ($("#newIsDraft").val() == 0 && $('#voucherStatusToUpdate').length == 0) {
    swal({
      type: "warning",
      title: "Confirm submit? No changes can be made after submission.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Confirm"
    }).then(function (result) {
      if (result.value) {
        $('#salaryVoucherForm').off('submit').submit();
      }
    });
  } else {
    $('#salaryVoucherForm').off('submit').submit();
  }

});

//NEXT AND PREVIOUS BUTTONS FOR TABS
$('.btnNext').click(function () {
  $('.nav-tabs > .active').next('li').find('a').trigger('click');
  if ($('.nav-tabs > .active').next('li').find('a').length == 0) {
    $('.btnNext').hide();
  }
  if ($('.nav-tabs > .active').prev('li').find('a').length == 1) {
    $('.btnPrevious').show();
  }
});

$('.btnPrevious').click(function () {
  $('.nav-tabs > .active').prev('li').find('a').trigger('click');
  if ($('.nav-tabs > .active').next('li').find('a').length == 1) {
    $('.btnNext').show();
  }
  if ($('.nav-tabs > .active').prev('li').find('a').length == 0) {
    $('.btnPrevious').hide();
  }
});

//HIDE PREVIOUS TAB BUTTON ON DOCUMENT LOAD
$(document).ready(function () {
  if ($('.nav-tabs > .active').prev('li').find('a').length == 0) {
    $('.btnPrevious').hide();
  }
});


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


//APPEND DRAFT (PT) TO SALARY VOUCHER FORM UPON LOAD
$(".tableSalaryVoucherDraftsPT tbody").on("click", "button.btnLoadSalaryVoucherDraftPT", function () {
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
      $('#newIsDraft').val(answer['is_draft']);
      $('#newIsPartTime').val(answer['is_part_time']);
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
      $('#newTotalHoursWorked').val(answer['total_hours_worked']);

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

      swal({
        type: "success",
        title: "Draft loaded succesfully.",
        showConfirmButton: true,
        confirmButtonText: "Close"
      })

    }
  })
});

//VIEW MY SALARY VOUCHER MODAL
$(".tableMySalaryVouchers tbody").on("click", "button.btnViewSalaryVoucher", function () {
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
      $('#viewIsDraft').val(answer['is_draft']);
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
              $('#viewSalaryBasicPayAmount').val(answer[i]['amount']);
              $('#viewSalaryBasicPayRemarks').val(answer[i]['remarks']);
            } else if (i == 1 && answer[i]['title'] == "Attendance") {
              $('#viewSalaryAttendanceAmount').val(answer[i]['amount']);
              $('#viewSalaryAttendanceRemarks').val(answer[i]['remarks']);
            } else if (i == 2 && answer[i]['title'] == "Productivity") {
              $('#viewSalaryProductivityAmount').val(answer[i]['amount']);
              $('#viewSalaryProductivityRemarks').val(answer[i]['remarks']);
            } else {
              $("#appendSalaryListing").append(
                `
                <div class="form-row">
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryTitle">Title</label>
                    <input readonly type="text" class="form-control" id="updateSalaryTitle" name="salaryTitle[]" value="` + answer[i]['title'] + `">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryAmount">Amount</label>
                    <input readonly type="number" class="form-control grossPay" id="updateSalaryAmount" min="0.00" step="0.01" value="` + answer[i]['amount'] + `" name="salaryAmount[]">
                  </div>
                  <div class="form-group col-md-4 col-sm-12 col-xs-12">
                    <label for="updateSalaryRemarks">Remarks</label>
                    <input readonly type="text" class="form-control" id="updateSalaryRemarks" name="salaryRemarks[]" value="` + answer[i]['remarks'] + `">
                  </div>
                </div>
                `)
            }
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

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalViewMySalaryVoucher').on('hidden.bs.modal', function () {
  $("#appendSalaryListing").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
})

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalEditSalaryVoucher').on('hidden.bs.modal', function () {
  $("#appendSalaryListing").html("");
  $("#appendDeductionListing").html("");
  $("#appendOthersListing").html("");
})

//SET FOCUS TO ANY ELEMENT TO FIX THE CLOSING MODAL ESC KEYUP ISSUE
$('#modalEditSalaryVoucher').on('shown.bs.modal', function () {
  $('#newMonthOfVoucher').focus();
})
$('#modalEditSalaryVoucherPT').on('shown.bs.modal', function () {
  $('#newMonthOfVoucher').focus();
})

//FUNCTIONS
function calculateSubtotalPT() {
  $("#salaryVoucherForm").find('input.ratePT').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var rate = 0.00;
      $(element).val(0.00);
      var subTotal = 0.00;
      $("#salaryVoucherForm").find('input.subTotalPT').eq(index).val(Number(subTotal).toFixed(2));
    } else {
      var rate = parseFloat($(element).val());
      var unit = parseFloat($('input.unitPT').eq(index).val());
      var subTotal = rate * unit;
      $("#salaryVoucherForm").find('input.subTotalPT').eq(index).val(Number(subTotal).toFixed(2));
    }
  })
  recalculateGrossPay();
  calculateFinalAmount();
}

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

  calculateSDL(currentGrossPay);

  $("#newGrossPay").val(Number(currentGrossPay).toFixed(2));
  calculateFinalAmount();
}

//CDAC, SINDA, MBMF, ECF
function calculateCSM() {
  var currentGrossPay = parseFloat(document.getElementById("newGrossPay").value);
  var race = document.getElementById('newRaceValue').value;
  if (race == "Chinese") {
    calculateCDACCSM(currentGrossPay);
    $('#newCSMTitle').val("CDAC");
  } else if (race == "Malay") {
    $('#newCSMTitle').val("MBMF");
    calculateMBMFCSM(currentGrossPay);
  } else if (race == "Indian") {
    $('#newCSMTitle').val("SINDA");
    calculateSindaCSM(currentGrossPay);
  } else if (race == "Eurasian") {
    $('#newCSMTitle').val("ECF");
    calculateECFCSM(currentGrossPay);
  }
}

function calculateCDACCSM(currentGrossPay) {
  if (currentGrossPay <= 2000) {
    $("#newCSMAmount").val(Number(0.50).toFixed(2));
  } else if (currentGrossPay > 2000 && currentGrossPay <= 3500) {
    $("#newCSMAmount").val(Number(1.00).toFixed(2));
  } else if (currentGrossPay > 3500 && currentGrossPay <= 5000) {
    $("#newCSMAmount").val(Number(1.50).toFixed(2));
  } else if (currentGrossPay > 5000 && currentGrossPay <= 7500) {
    $("#newCSMAmount").val(Number(2.00).toFixed(2));
  } else if (currentGrossPay > 7500) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  }
}

function calculateMBMFCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 2000) {
    $("#newCSMAmount").val(Number(4.50).toFixed(2));
  } else if (currentGrossPay > 2000 && currentGrossPay <= 3000) {
    $("#newCSMAmount").val(Number(6.50).toFixed(2));
  } else if (currentGrossPay > 3000 && currentGrossPay <= 4000) {
    $("#newCSMAmount").val(Number(15.00).toFixed(2));
  } else if (currentGrossPay > 4000 && currentGrossPay <= 6000) {
    $("#newCSMAmount").val(Number(19.50).toFixed(2));
  } else if (currentGrossPay > 6000 && currentGrossPay <= 8000) {
    $("#newCSMAmount").val(Number(22.00).toFixed(2));
  } else if (currentGrossPay > 8000 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(24.00).toFixed(2));
  } else if (currentGrossPay > 10000) {
    $("#newCSMAmount").val(Number(26.00).toFixed(2));
  }
}

function calculateSindaCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(1.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 1500) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  } else if (currentGrossPay > 1500 && currentGrossPay <= 2500) {
    $("#newCSMAmount").val(Number(5.00).toFixed(2));
  } else if (currentGrossPay > 2500 && currentGrossPay <= 4500) {
    $("#newCSMAmount").val(Number(7.00).toFixed(2));
  } else if (currentGrossPay > 4500 && currentGrossPay <= 7500) {
    $("#newCSMAmount").val(Number(9.00).toFixed(2));
  } else if (currentGrossPay > 7500 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(12.00).toFixed(2));
  } else if (currentGrossPay > 10000 && currentGrossPay <= 15000) {
    $("#newCSMAmount").val(Number(18.00).toFixed(2));
  } else if (currentGrossPay > 15000) {
    $("#newCSMAmount").val(Number(30.00).toFixed(2));
  }
}

function calculateECFCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(2.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 1500) {
    $("#newCSMAmount").val(Number(4.00).toFixed(2));
  } else if (currentGrossPay > 1500 && currentGrossPay <= 2500) {
    $("#newCSMAmount").val(Number(6.00).toFixed(2));
  } else if (currentGrossPay > 2500 && currentGrossPay <= 4000) {
    $("#newCSMAmount").val(Number(9.00).toFixed(2));
  } else if (currentGrossPay > 4500 && currentGrossPay <= 7000) {
    $("#newCSMAmount").val(Number(12.00).toFixed(2));
  } else if (currentGrossPay > 7000 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(16.00).toFixed(2));
  } else if (currentGrossPay > 10000) {
    $("#newCSMAmount").val(Number(20.00).toFixed(2));
  }
}

function calculateSDL(currentGrossPay) {
  var SDLamount = 0.00;
  if (currentGrossPay <= 800) {
    SDLamount = 2.00;
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  } else if (currentGrossPay > 800 && currentGrossPay < 4500) {
    SDLamount = currentGrossPay * (0.25 / 100);
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  } else {
    SDLamount = 11.25;
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  }
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

function autofillAttendance() {
  var offDays = "";
  var PHRODays = "";
  var numPHRODays = 0;
  var numOffDays = 0;
  var leaveMCDays = "";
  var sickLeaveDays = "";
  var numSickLeaveDays = 0;
  var annualLeaveDays = "";
  var numAnnualLeaveDays = 0;
  var unpaidLeaveDays = "";
  var numUnpaidLeaveDays = 0;
  var numWorkingDays = 0;

  var total = $("#salaryVoucherForm").find('.newSalesInformation').length;

  $("#salaryVoucherForm").find('.newSalesInformation').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {

      if ($(element).val() == "Sick Leave") {
        if (numSickLeaveDays == 0) {
          sickLeaveDays = "Sick Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          sickLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numSickLeaveDays++;
      } else if ($(element).val() == "Annual Leave") {
        if (numAnnualLeaveDays == 0) {
          annualLeaveDays = "Annual Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          annualLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numAnnualLeaveDays++;
      } else if ($(element).val() == "Unpaid Leave") {
        if (numUnpaidLeaveDays == 0) {
          unpaidLeaveDays = "Unpaid Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          unpaidLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numUnpaidLeaveDays++;
      } else if ($(element).val() == "OFF") {
        if (numOffDays == 0) {
          offDays = "Off Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          offDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numOffDays++;
      } else if ($(element).val() == "PH/RO") {
        if (numPHRODays == 0) {
          PHRODays = "PH/RO Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          PHRODays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numPHRODays++;
      }

      //LAST ONE
      if (index === total - 1) {
        sickLeaveDays = sickLeaveDays.substr(0, sickLeaveDays.length - 2);
        if (sickLeaveDays != "") {
          sickLeaveDays += " (" + numSickLeaveDays + " DAYS)";
        } else {
          sickLeaveDays = "Sick Leave: (0 DAYS)"
        }
        annualLeaveDays = annualLeaveDays.substr(0, annualLeaveDays.length - 2);
        if (annualLeaveDays != "") {
          annualLeaveDays += " (" + numAnnualLeaveDays + " DAYS)";
        } else {
          annualLeaveDays = "Annual Leave: (0 DAYS)"
        }
        unpaidLeaveDays = unpaidLeaveDays.substr(0, unpaidLeaveDays.length - 2);
        if (unpaidLeaveDays != "") {
          unpaidLeaveDays += " (" + numUnpaidLeaveDays + " DAYS)";
        } else {
          unpaidLeaveDays = "Unpaid Leave: (0 DAYS)"
        }
        offDays = offDays.substr(0, offDays.length - 2);
        if (offDays != "") {
          offDays += " (" + numOffDays + " DAYS)";
        } else {
          offDays = "Off Days: (0 DAYS)"
        }
        PHRODays = PHRODays.substr(0, PHRODays.length - 2);
        if (PHRODays != "") {
          PHRODays += " (" + numPHRODays + " DAYS)";
        } else {
          PHRODays = "PH/RO Days: (0 DAYS)"
        }

        $("#newLeaveMCDays").val(sickLeaveDays + "\n" + annualLeaveDays + "\n" + unpaidLeaveDays);
        $("#newOffDays").val(offDays + "\n" + PHRODays);

        return;
      }
    } else {
      if ($(element).val() == "Sick Leave") {
        if (numSickLeaveDays == 0) {
          sickLeaveDays = "Sick Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          sickLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numSickLeaveDays++;
      } else if ($(element).val() == "Annual Leave") {
        if (numAnnualLeaveDays == 0) {
          annualLeaveDays = "Annual Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          annualLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numAnnualLeaveDays++;
      } else if ($(element).val() == "Unpaid Leave") {
        if (numUnpaidLeaveDays == 0) {
          unpaidLeaveDays = "Unpaid Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          unpaidLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numUnpaidLeaveDays++;
      } else if ($(element).val() == "OFF") {
        if (numOffDays == 0) {
          offDays = "Off Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          offDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numOffDays++;
      } else if ($(element).val() == "PH/RO") {
        if (numPHRODays == 0) {
          PHRODays = "PH/RO Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          PHRODays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numPHRODays++;
      }

      //LAST ONE
      if (index === total - 1) {
        sickLeaveDays = sickLeaveDays.substr(0, sickLeaveDays.length - 2);
        if (sickLeaveDays != "") {
          sickLeaveDays += " (" + numSickLeaveDays + " DAYS)";
        } else {
          sickLeaveDays = "Sick Leave: (0 DAYS)"
        }
        annualLeaveDays = annualLeaveDays.substr(0, annualLeaveDays.length - 2);
        if (annualLeaveDays != "") {
          annualLeaveDays += " (" + numAnnualLeaveDays + " DAYS)";
        } else {
          annualLeaveDays = "Annual Leave: (0 DAYS)"
        }
        unpaidLeaveDays = unpaidLeaveDays.substr(0, unpaidLeaveDays.length - 2);
        if (unpaidLeaveDays != "") {
          unpaidLeaveDays += " (" + numUnpaidLeaveDays + " DAYS)";
        } else {
          unpaidLeaveDays = "Unpaid Leave: (0 DAYS)"
        }
        offDays = offDays.substr(0, offDays.length - 2);
        if (offDays != "") {
          offDays += " (" + numOffDays + " DAYS)";
        } else {
          offDays = "Off Days: (0 DAYS)"
        }
        PHRODays = PHRODays.substr(0, PHRODays.length - 2);
        if (PHRODays != "") {
          PHRODays += " (" + numPHRODays + " DAYS)";
        } else {
          PHRODays = "PH/RO Days: (0 DAYS)"
        }

        $("#newLeaveMCDays").val(sickLeaveDays + "\n" + annualLeaveDays + "\n" + unpaidLeaveDays);
        $("#newOffDays").val(offDays + "\n" + PHRODays);
      }
      numWorkingDays++;
      $("#newTotalWorkingDays").val(numWorkingDays);
    }
  })
}

function recalculateDailyHoursWorked() {
  var currentDailyHoursWorked = 0;

  $("#salaryVoucherForm").find('.newDailyHoursWorked').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {
      var amount = 0.00;
    } else {
      var amount = parseFloat($(element).val());
    }
    currentDailyHoursWorked = currentDailyHoursWorked + amount;
  })

  $("#newTotalHoursWorked").val(Number(currentDailyHoursWorked).toFixed(2));
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
  var currentGrossPay = parseFloat(document.getElementById("newGrossPay").value);
  var currentAge = calculate_age(Date.parse(document.getElementById("currentPersonDOB").value));

  var CPF_employee = 0.00;
  var CPF_employer = 0.00;
  var amount = 0.00;
  var totalPercentage = 0;


  if (currentAge <= 55) {
    employerPercentage = 0.17;
    employeePercentage = 0.20;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 1200.00;
            CPF_employer = 2220.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.6 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.6 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge > 55 && currentAge <= 60) {
    employerPercentage = 0.13;
    employeePercentage = 0.13;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 780.00;
            CPF_employer = 1560.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.39 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.39 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge > 60 && currentAge <= 65) {
    employerPercentage = 0.09;
    employeePercentage = 0.075;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 450.00;
            CPF_employer = 990.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.225 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.225 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge > 65) {
    employerPercentage = 0.075;
    employeePercentage = 0.05;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 780.00;
            CPF_employer = 1560.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.15 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.15 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }
  } else {
    employerPercentage = 0.17;
    employeePercentage = 0.20;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 1200.00;
            CPF_employer = 2220.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.6 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.6 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }
  }

  $("#newCPFEmployee").val(Number(CPF_employee).toFixed(2));
  $("#newCPFEmployer").val(Number(CPF_employer).toFixed(2));
}

function calculate_age(dob) {
  var diff_ms = Date.now() - dob;
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}