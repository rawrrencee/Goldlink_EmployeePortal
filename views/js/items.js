/* DATATABLES CONFIGURATION */
var itemsTable = $('.tableItems').DataTable({
    "ajax": "ajax/datatable-items.ssp.php",
    "serverSide": true,
    "processing": true,
    "autoWidth": false,
    "order": [[0, 'asc']],
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
        { "data": 11 }
    ],
    "columnDefs": [{
        "targets": 12,
        "data": null,
        "render": function (data, type, row) {
            return "<button id='btnEditItem' storeId=" + row[11] + " itemId=" + row[9] + " class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditItem'><i class='fa fa-pencil'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 1
    }]
});

$('.tableItems thead th').each(function (index, element) {
    var title = $(this).text();
    if (index != 12) {
        $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
    }
});

itemsTable.columns().every(function () {
    var itemsTable = this;
    $('input', this.header()).on('keyup change', function () {
        if (itemsTable.search() !== this.value) {
            itemsTable.search(this.value).draw();
        }
    });

    $('input', this.header()).on('click', function (e) {
        e.stopPropagation();
    });
});


$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');

//Filter Items DataTable by Store
$('#dataTablesFilterItemsByStore').on('change', function () {
    itemsTable.column(0).search(this.value).draw();
});

/* PASS ATTRIBUTE OF DATATABLES ROW */
$('.tableItems tbody').on('click', '#btnEditItem', function () {
    var itemId = parseInt($(this).attr('itemId'));
    var storeId = parseInt($(this).attr('storeId'));

    var formData = new FormData();
    formData.append("item_id", itemId);

    var checkItemImageExists = new FormData();
    checkItemImageExists.append("checkItemImageExists", itemId);
    routeImg = "uploads/items/" + itemId + "/item.jpg";

    $.ajax({
        url: "ajax/items.ajax.php",
        method: "POST",
        data: checkItemImageExists,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {
            if (answer) {
                $(".preview").attr("src", routeImg);
            } else {
                $(".preview").attr("src", "views/img/items/default/anonymous.png");
            }
        }
    });

    $.ajax({
        url: "ajax/items.ajax.php",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {

            //console.log(answer);

            $('#editItemId').val(answer['item_id']);
            $('#editItemNumber').val(answer['item_number']);
            $('#editFactoryId').val(answer['factory_id']);
            $('#editItemName').val(answer['name']);
            $('#editCategory').val(answer['category']);
            $('#editCategory').select2().trigger('change');
            $('#editCostPrice').val(answer['cost_price']);
            $('#editUnitPrice').val(answer['unit_price']);
            $('#editDescription').val(answer['description']);
            $('#editSupplierId').val(answer['supplier_id']);
            $('#editSupplierId').select2().trigger('change');

            var storesWithItemData = new FormData();
            storesWithItemData.append('getStoresWithItem_item_id', itemId);

            $.ajax({
                url: "ajax/items.ajax.php",
                method: "POST",
                data: storesWithItemData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {
                    //console.log(answer);
                    for (var i = 0; i < answer.length; i++) {
                        //console.log(answer[i].store_name);
                        //console.log(answer[i].quantity);

                        if (answer[i].store_id == 1 || answer[i].store_id == 2) {
                            $("#appendDynamicStoreData").append(`
                            <div class='form-row col-xs-12'>
                            <div class='col-md-1 col-xs-2'>
                                <input type='checkbox' class='minimal' name='updateStoreActive[`+ i + `]' checked disabled/>
                                <input type='hidden' name='updateStoreActive[` + i + `]' value='1' />
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
                            <div class='visible-xs-block visible-sm-inline-block col-sm-6 col-xs-6 '>
                            <p style='text-align: right;'>Quantity</p>
                            </div>
                            <div class='col-md-4 col-sm-6 col-xs-6'>
                                <input type='number' name='updateStoreQuantity[`+ i + `]' class='form-control' value='` + answer[i].quantity + `'/>
                            </div>
                            <div class='col-md-12 col-xs-12'>
                            <p></p>
                            </div>
                            </div>`);
                        } else {
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
                            <div class='visible-xs-block visible-sm-inline-block col-sm-6 col-xs-6 '>
                            <p style='text-align: right;'>Quantity</p>
                            </div>
                            <div class='col-md-4 col-sm-6 col-xs-6'>
                                <input type='number' name='updateStoreQuantity[`+ i + `]' class='form-control' value='` + answer[i].quantity + `'/>
                            </div>
                            <div class='col-md-12 col-xs-12'>
                            <p></p>
                            </div>
                            </div>`);
                        }
                    }

                    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue'
                    })


                }
            })

        }
    })
});

/* REPEATER PLUGIN */
$("#newItemRepeater").createRepeater();
$("#modalEditItemRepeater").createRepeater();

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalEditItem').on('hidden.bs.modal', function () {
    $("#appendDynamicStoreData").html("");
})

/* DATEPICKER PLUGIN */
$('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    disableTouchKeyboard: true,
    Readonly: true
}).attr("readonly", "readonly");

/* SELECT2 */
$('#newCategory').select2({
    placeholder: "Select an existing or type a new category",
    tags: true
});
$('#editCategory').select2({
    placeholder: "Select an existing or type a new category",
    tags: true
});

$.fn.modal.Constructor.prototype.enforceFocus = function () { };

$(".newItemImage").change(function () {
    var image = this.files[0];

    if (image["type"] != "image/jpeg" && image["type"] != "image/png" && image["type"] != "image/jpg") {
        $(".newItemImage").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Image has to be JPEG or PNG!",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });
    } else if (image["size"] > 10000000) {

        $(".newItemImage").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Please upload an image lesser than 10Mb.",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });

    } else {

        var imgData = new FileReader;
        imgData.readAsDataURL(image);

        $(imgData).on("load", function (event) {

            var routeImg = event.target.result;

            $(".preview").attr("src", routeImg);

        });

    }
})

$(".editItemImage").change(function () {
    var image = this.files[0];

    if (image["type"] != "image/jpeg" && image["type"] != "image/png" && image["type"] != "image/jpg") {
        $(".editItemImage").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Image has to be JPEG or PNG!",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });
    } else if (image["size"] > 10000000) {

        $(".editItemImage").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Please upload an image lesser than 10Mb.",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });

    } else {

        var imgData = new FileReader;
        imgData.readAsDataURL(image);

        $(imgData).on("load", function (event) {

            var routeImg = event.target.result;

            $(".preview").attr("src", routeImg);

        });

    }
})