/* DATATABLES CONFIGURATION */
var itemKitsTable = $('.tableItemKits').DataTable({
    "ajax": "ajax/datatable-item-kits.ssp.php",
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
        { "data": 8 }
    ],
    "columnDefs": [{
        "targets": 9,
        "data": null,
        "render": function (data, type, row) {
            return "<button id='btnEditItemKit' storeId=" + row[7] + " itemKitId=" + row[8] + " class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditItemKit'><i class='fa fa-pencil'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 1
    }]
});

$('.tableItemKits thead th').each(function (index, element) {
    var title = $(this).text();
    if (index != 9) {
        $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
    }
});

itemKitsTable.columns().every(function () {
    var itemKitsTable = this;
    $('input', this.header()).on('keyup change', function () {
        if (itemKitsTable.search() !== this.value) {
            itemKitsTable.search(this.value).draw();
        }
    });

    $('input', this.header()).on('click', function (e) {
        e.stopPropagation();
    });
});

/* ADD ITEM KIT MODAL AND ADD ITEM DATATABLES CONFIGURATION */
var addItemToItemKitsTable = $('.tableAddItemsToItemKit').DataTable({
    "ajax": "ajax/datatable-item-kits-add-items.ssp.php",
    "pageLength": 5,
    "lengthMenu": [[5, 10, 20], [5, 10, 20]],
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
        { "data": 5 }
    ],
    "columnDefs": [{
        "targets": 6,
        "data": null,
        "render": function (data, type, row) {
            return "<button type='button' id='btnAddItemToItemKit' itemName='" + row[0] + "' itemNumber=" + row[1] + " itemCategory=" + row[2] + " itemUnitPrice=" + row[3] + " itemId=" + row[5] + " class='btn btn-success btn-sm btnAddItemToItemKit'><i class='fa fa-plus'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 1
    }]
});

$('.tableAddItemsToItemKit thead th').each(function (index, element) {
    var title = $(this).text();
    if (index != 6) {
        $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
    }
});

addItemToItemKitsTable.columns().every(function () {
    var addItemToItemKitsTable = this;
    $('input', this.header()).on('keyup change', function () {
        if (addItemToItemKitsTable.search() !== this.value) {
            addItemToItemKitsTable.search(this.value).draw();
        }
    });

    $('input', this.header()).on('click', function (e) {
        e.stopPropagation();
    });
});

$(".tableAddItemsToItemKit tbody").on("click", "button.btnAddItemToItemKit", function () {

    var itemName = $(this).attr("itemName");
    var itemCategory = $(this).attr("itemCategory");
    var itemUnitPrice = parseFloat($(this).attr("itemUnitPrice"));
    var itemId = $(this).attr("itemId");
    var sameItemAdded = false;

    recalculateUnitPrice("new");

    //ITERATE THROUGH THE FORM TO FIND ANY ITEM ALREADY ADDED, INCREMENT BY 1 IF ADDED
    $(".newItemKitForm").find('input.itemId').each(function (index, element) {
        var currentItemId = $(element).val();
        if (currentItemId == itemId) {
            sameItemAdded = true;
            var currentQuantity = parseInt($(this).siblings().children(".itemQuantity").val());
            $(this).siblings().children(".itemQuantity").val(currentQuantity + 1);

            var currrentUnitPrice = parseFloat($("#newUnitPrice").val());
            $("#newUnitPrice").val(Number(currrentUnitPrice + itemUnitPrice).toFixed(2));
        }
    })

    //IF ITEM IS NOT YET ADDED, IF UNIT PRICE IS NOT SET, SET THE UNIT PRICE, ELSE INCREMENT BY AMOUNT
    if (!sameItemAdded) {
        if ($("#newUnitPrice").val() == "") {
            $("#newUnitPrice").val(itemUnitPrice);
        } else {
            var currrentUnitPrice = parseFloat($("#newUnitPrice").val());
            $("#newUnitPrice").val(Number(currrentUnitPrice + itemUnitPrice).toFixed(2));
        }
    }

    //IF EMPTY ITEM LIST TEXT HAS NOT BEEN REMOVED, REMOVE IT
    if (document.getElementById("emptyItemKitListText") != null) {
        document.getElementById("emptyItemKitListText").remove();
        if (document.getElementById("labelsForItemKitList") == null) {
            $("#appendDynamicItemList").append(
                `
        <div id="labelsForItemKitList">
        <div class="col-md-6 hidden-sm hidden-xs">
        <label>Item Name</label>
        </div>
        <div class="col-md-3 hidden-sm hidden-xs">
        <label>Price</label>
        </div>
        <div class="col-md-3 hidden-sm hidden-xs">
        <label>Quantity</label>
        </div>
        </div>
        `
            )
        }
    }

    //ONLY APPEND A NEW ITEM TO THE LIST IF IT HAS NOT BEEN ADDED
    if (!sameItemAdded) {
        $("#appendDynamicItemList").append(
            ` 
        <div class="form-row">

        <input type="hidden" class="itemId" name="newItemKitItemIds[]" value="` + itemId + `">
        <div class="visible-xs col-xs-12 visible-sm col-sm-12">
            <div class="visible-xs col-xs-12 visible-sm col-sm-12 ">
                <label>Item Name</label>
            </div>
        </div>
        <div class="form-group col-md-6 col-sm-12 col-xs-12">
            <input readonly class="form-control itemName" type="text" value="` + itemName + `">
        </div>
        <div class="visible-xs col-xs-12 visible-sm col-sm-12">
            <div class="visible-xs col-xs-4 visible-sm col-sm-4">
                <label>Price</label>
            </div>
            <div class="visible-xs col-xs-4 visible-sm col-sm-4">
                <label>Quantity</label>
            </div>
        </div>
        <div class="form-group col-md-3 col-sm-4 col-xs-4">
            <input readonly class="form-control itemUnitPrice" type="text" value="` + itemUnitPrice + `">
        </div>
        <div class="form-group col-md-2 col-sm-4 col-xs-4">
            <input class="form-control itemQuantity" type="number" value="1" name="newItemKitItemQuantities[]">
        </div>
        <div class="form-group col-md-1 col-sm-4 col-xs-4">
        <button type="button" id="removeItem" class="btn btn-block btn-danger removeItem"><i class="fa fa-minus"></i></button>
        </div>
        <div class="col-md-12 hidden-sm hidden-xs">
            <p></p>
        </div>

        </div>
        `)
    }

    swal({
        type: "success",
        title: "'" + itemName + "' added to Item Kit",
        text: "Total Item Price: $" + $("#newUnitPrice").val(),
        showConfirmButton: true,
        confirmButtonText: "Close",
        timer: 1500
    })

});

//REMOVE ITEM FROM ITEM KIT LIST
$(".newItemKitForm").on("click", "button.removeItem", function () {
    /*
    var currrentUnitPrice = parseFloat($("#newUnitPrice").val());
    var itemUnitPrice = parseFloat($(this).parent().siblings().children(".itemUnitPrice").val());

    if ($("#newUnitPrice").val() != "" || $("#newUnitPrice").val() != 0) {
        var itemQuantity = parseInt($(this).parent().siblings().children(".itemQuantity").val());
        var calculatedUnitPrice = currrentUnitPrice - itemUnitPrice * itemQuantity;
        $("#newUnitPrice").val(Number(calculatedUnitPrice).toFixed(2));
    }
    */

    $(this).parent().parent().remove();

    recalculateUnitPrice("new");

    if (document.getElementById("removeItem") == null) {

        if (document.getElementById("labelsForItemKitList") != null) {
            document.getElementById("labelsForItemKitList").remove();
        }

        $("#appendDynamicItemList").append(
            `
        <span id="emptyItemKitListText" >List is empty. Please add a product.</span>
        `
        )
    }
})

//CHANGE QUANTITY OF INDIVIDUAL ITEM ON ITEM KIT LIST
$(".newItemKitForm").on("change", "input.itemQuantity", function () {
    var currrentTotalPrice = 0;

    $(".newItemKitForm").find('input.itemQuantity').each(function (index, element) {
        var quantity = parseInt($(element).val());
        var itemUnitPrice = parseFloat($(this).parent().siblings().children(".itemUnitPrice").val());
        var totalPerItemPrice = itemUnitPrice * quantity;
        currrentTotalPrice = currrentTotalPrice + totalPerItemPrice;
    })

    $("#newUnitPrice").val(Number(currrentTotalPrice).toFixed(2));
})

/* EDIT ITEM KIT MODAL AND EDIT ITEM DATATABLES CONFIGURATION */
var editItemsInItemKitTable = $('.tableEditItemsInItemKit').DataTable({
    "ajax": "ajax/datatable-item-kits-add-items.ssp.php",
    "pageLength": 5,
    "lengthMenu": [[5, 10, 20], [5, 10, 20]],
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
        { "data": 5 }
    ],
    "columnDefs": [{
        "targets": 6,
        "data": null,
        "render": function (data, type, row) {
            return "<button type='button' id='btnAddItemToEditItemKit' itemName='" + row[0] + "' itemNumber=" + row[1] + " itemCategory=" + row[2] + " itemUnitPrice=" + row[3] + " itemId=" + row[5] + " class='btn btn-success btn-sm btnAddItemToEditItemKit'><i class='fa fa-plus'></i></button>";
        },
        "orderable": false,
        "responsivePriority": 1
    }]
});


$('.tableEditItemsInItemKit thead th').each(function (index, element) {
    var title = $(this).text();
    if (index != 6) {
        $(this).append('<input type="text" class="col-search-input" style="width: 100%;" placeholder="Search ' + title + '" />');
    }
});

editItemsInItemKitTable.columns().every(function () {
    var editItemsInItemKitTable = this;
    $('input', this.header()).on('keyup change', function () {
        if (editItemsInItemKitTable.search() !== this.value) {
            editItemsInItemKitTable.search(this.value).draw();
        }
    });

    $('input', this.header()).on('click', function (e) {
        e.stopPropagation();
    });
});

$(".tableEditItemsInItemKit tbody").on("click", "button.btnAddItemToEditItemKit", function () {

    var itemName = $(this).attr("itemName");
    var itemCategory = $(this).attr("itemCategory");
    var itemUnitPrice = parseFloat($(this).attr("itemUnitPrice"));
    var itemId = $(this).attr("itemId");
    var sameItemAdded = false;

    recalculateUnitPrice("edit");

    //ITERATE THROUGH THE FORM TO FIND ANY ITEM ALREADY ADDED, INCREMENT BY 1 IF ADDED
    $(".editItemKitForm").find('input.itemId').each(function (index, element) {
        var currentItemId = $(element).val();
        if (currentItemId == itemId) {
            sameItemAdded = true;
            var currentQuantity = parseInt($(this).siblings().children(".itemQuantity").val());
            $(this).siblings().children(".itemQuantity").val(currentQuantity + 1);

            var currrentUnitPrice = parseFloat($("#editUnitPrice").val());
            $("#editUnitPrice").val(Number(currrentUnitPrice + itemUnitPrice).toFixed(2));
        }
    })

    //IF ITEM IS NOT YET ADDED, IF UNIT PRICE IS NOT SET, SET THE UNIT PRICE, ELSE INCREMENT BY AMOUNT
    if (!sameItemAdded) {
        if ($("#editUnitPrice").val() == "") {
            $("#editUnitPrice").val(itemUnitPrice);
        } else {
            var currrentUnitPrice = parseFloat($("#editUnitPrice").val());
            $("#editUnitPrice").val(Number(currrentUnitPrice + itemUnitPrice).toFixed(2));
        }
    }

    //IF EMPTY ITEM LIST TEXT HAS NOT BEEN REMOVED, REMOVE IT
    if (document.getElementById("emptyEditItemKitListText") != null) {
        document.getElementById("emptyEditItemKitListText").remove();
        if (document.getElementById("labelsForEditItemKitList") == null) {
            $("#appendDynamicEditItemKitList").append(
                `
                <div id="labelsForEditItemKitList">
                <div class="col-md-6 hidden-sm hidden-xs">
                <label>Item Name</label>
                </div>
                <div class="col-md-3 hidden-sm hidden-xs">
                <label>Price</label>
                </div>
                <div class="col-md-3 hidden-sm hidden-xs">
                <label>Quantity</label>
                </div>
                </div>
                `
            )
        }
    }

    //ONLY APPEND A NEW ITEM TO THE LIST IF IT HAS NOT BEEN ADDED
    if (!sameItemAdded) {
        $("#appendDynamicEditItemKitList").append(
            `
        <div class="form-row">

        <input type="hidden" class="itemId" name="editItemKitItemIds[]" value="` + itemId + `">
        <div class="visible-xs col-xs-12 visible-sm col-sm-12">
            <div class="visible-xs col-xs-12 visible-sm col-sm-12 ">
                <label>Item Name</label>
            </div>
        </div>
        <div class="form-group col-md-6 col-sm-12 col-xs-12">
            <input readonly class="form-control itemName" type="text" value="` + itemName + `">
        </div>
        <div class="visible-xs col-xs-12 visible-sm col-sm-12">
            <div class="visible-xs col-xs-4 visible-sm col-sm-4">
                <label>Price</label>
            </div>
            <div class="visible-xs col-xs-4 visible-sm col-sm-4">
                <label>Quantity</label>
            </div>
        </div>
        <div class="form-group col-md-3 col-sm-4 col-xs-4">
            <input readonly class="form-control itemUnitPrice" type="text" value="` + itemUnitPrice + `">
        </div>
        <div class="form-group col-md-2 col-sm-4 col-xs-4">
            <input class="form-control itemQuantity" type="number" value="1" name="editItemKitItemQuantities[]">
        </div>
        <div class="form-group col-md-1 col-sm-4 col-xs-4">
        <button type="button" id="removeEditItemKitItem" class="btn btn-block btn-danger removeEditItemKitItem"><i class="fa fa-minus"></i></button>
        </div>
        <div class="col-md-12 hidden-sm hidden-xs">
            <p></p>
        </div>

        </div>
        `)
    }

    swal({
        type: "success",
        title: "'" + itemName + "' added to Item Kit",
        text: "Total Item Price: $" + $("#editUnitPrice").val(),
        showConfirmButton: true,
        confirmButtonText: "Close",
        timer: 1500
    })

});

//REMOVE ITEM FROM ITEM KIT LIST
$(".editItemKitForm").on("click", "button.removeEditItemKitItem", function () {
    /*
    var currrentUnitPrice = parseFloat($("#editUnitPrice").val());
    var itemUnitPrice = parseFloat($(this).parent().siblings().children(".itemUnitPrice").val());

    if ($("#editUnitPrice").val() != "" || $("#editUnitPrice").val() != 0) {
        var itemQuantity = parseInt($(this).parent().siblings().children(".itemQuantity").val());
        var calculatedUnitPrice = currrentUnitPrice - itemUnitPrice * itemQuantity;
        $("#editUnitPrice").val(Number(calculatedUnitPrice).toFixed(2));
    }
    */

    $(this).parent().parent().remove();

    recalculateUnitPrice("edit");

    if (document.getElementById("removeEditItemKitItem") == null) {

        if (document.getElementById("removeEditItemKitItem") != null) {
            document.getElementById("labelsForEditItemKitList").remove();
        }

        $("#appendDynamicEditItemKitList").append(
            `
        <span id="emptyEditItemKitListText" >List is empty. Please add a product.</span>
        `
        )
    }
})

//CHANGE QUANTITY OF INDIVIDUAL ITEM ON ITEM KIT LIST
$(".editItemKitForm").on("change", "input.itemQuantity", function () {
    var currrentTotalPrice = 0;

    $(".editItemKitForm").find('input.itemQuantity').each(function (index, element) {
        var quantity = parseInt($(element).val());
        var itemUnitPrice = parseFloat($(this).parent().siblings().children(".itemUnitPrice").val());
        var totalPerItemPrice = itemUnitPrice * quantity;
        currrentTotalPrice = currrentTotalPrice + totalPerItemPrice;
    })

    $("#editUnitPrice").val(Number(currrentTotalPrice).toFixed(2));
})

/* PASS ATTRIBUTE OF DATATABLES ROW */
$('.tableItemKits tbody').on('click', '#btnEditItemKit', function () {
    var itemKitId = parseInt($(this).attr('itemKitId'));

    var formData = new FormData();
    formData.append("getItemKitItems", itemKitId);

    $.ajax({
        url: "ajax/item-kits.ajax.php",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {

            //console.log(answer);
            $("#appendCurrentEditItemKitList").append(
                `
                <div class='col-md-1 hidden-sm hidden-xs'>
                    <label>Active</label>
                </div>
                <div class="col-md-7 hidden-sm hidden-xs">
                    <label>Item Name</label>
                </div>
                <div class="col-md-2 hidden-sm hidden-xs">
                    <label>Price</label>
                </div>
                <div class="col-md-2 hidden-sm hidden-xs">
                    <label>Quantity</label>
                </div>
            `);

            for (var i = 0; i < answer.length; i++) {
                $("#appendCurrentEditItemKitList").append(
                    `
                    <div class="form-row">
    
                    <input type="hidden" class="itemId" name="updateItemKitItemIds[]" value="` + answer[i].item_id + `">
                    <div class='col-md-1 col-sm-1 col-xs-1'>
                        <input type='hidden' name='updateItemActive[` + i + `]' value='0' />
                        <input type='checkbox' class='minimal' name='updateItemActive[`+ i + `]' value='1' checked/>
                    </div>
                    <div class='visible-xs col-xs-10 visible-sm col-sm-10'>
                        <p>Active</p>
                    </div>
                    <div class="visible-xs col-xs-11 visible-sm col-sm-11">
                        <label>Item Name</label>
                    </div>
                    <div class="form-group col-md-7 col-sm-12 col-xs-12">
                        <input readonly class="form-control itemName" type="text" value="` + answer[i].name + `">
                    </div>
                    <div class="visible-xs col-xs-12 visible-sm col-sm-12">
                        <label>Price</label>
                    </div>
                    <div class="form-group col-md-2 col-sm-12 col-xs-12">
                        <input readonly class="form-control itemUnitPrice" type="text" value="` + answer[i].unit_price + `">
                    </div>
                    <div class="visible-xs col-xs-12 visible-sm col-sm-12">
                        <label>Quantity</label>
                    </div>
                    <div class="form-group col-md-2 col-sm-12 col-xs-12">
                        <input class="form-control itemQuantity" type="number" value="` + answer[i].quantity + `" name="updateItemKitItemQuantities[]">
                    </div>
                    <div class="col-md-12 hidden-sm hidden-xs">
                        <p></p>
                    </div>
    
                    </div>
                    `)
            }

            var getItemKitDetails = new FormData();
            getItemKitDetails.append('getItemKitDetails', itemKitId);

            $.ajax({
                url: "ajax/item-kits.ajax.php",
                method: "POST",
                data: getItemKitDetails,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {

                    $('#editItemKitId').val(answer['item_kit_id']);
                    $('#currentItemKitNumber').val(answer['item_kit_number']);
                    $('#editItemKitNumber').val(answer['item_kit_number']);
                    $('#editItemKitName').val(answer['name']);
                    $('#editCategory').val(answer['category']);
                    $('#editCategory').select2().trigger('change');
                    $('#editItemKitDescription').val(answer['description']);
                    $('#editCostPrice').val(answer['cost_price']);
                    $('#editUnitPrice').val(answer['unit_price']);

                }
            })

            var getItemKitStores = new FormData();
            getItemKitStores.append('getItemKitStores', itemKitId);

            $.ajax({
                url: "ajax/item-kits.ajax.php",
                method: "POST",
                data: getItemKitStores,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (answer) {

                    //console.log(answer);

                    /* TODO: ATTEMPTED TO SHOW INVENTORY PER STORE BUT FAILED DUE TO RESTRICTIONS ON AJAX SIDE
                    var storeId = answer[i].store_id;
                    var getStoreItemDetails = new FormData();
                    getStoreItemDetails.append('storeId', storeId);
                    getStoreItemDetails.append('itemKitId', itemKitId);

                    $.ajax({
                        url: "ajax/item-kits.ajax.php",
                        method: "POST",
                        data: getStoreItemDetails,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (answer) {
                            $("#appendItemKitStoreData").append(`
                            <div>Hi</div>
                            `);
                        }
                    })
                    */

                    for (var i = 0; i < answer.length; i++) {
                        //console.log(answer[i].store_name);
                        //console.log(answer[i].quantity);

                        if (answer[i].store_id == 1 || answer[i].store_id == 2) {
                            $("#appendItemKitStoreData").append(`
                            <div class='form-row col-xs-12'>
                            <div class='col-md-1 col-xs-2'>
                                <input type='checkbox' class='minimal' name='updateStoreActive[`+ i + `]' checked disabled/>
                                <input type='hidden' name='updateStoreActive[` + i + `]' value='1' />
                            </div>
                            <div class='col-md-8 col-xs-10'>
                                <select disabled name='updateStoreId[`+ i + `]' class='form-control'>
                                    <option selected value='` + answer[i].store_id + `'>` + answer[i].store_name + `</option>
                                </select>
                                <input type='hidden' name='updateStoreSelection[` + i + `]' value='` + answer[i].store_id + `' />
                            </div>
                            <div class='visible-xs visible-sm col-sm-12 col-xs-12'>
                            <p></p>
                            </div>
                            <div class='col-md-3 col-xs-12'>
                                <button type='button' id='btnItemKitStockCheck' class='btn btn-sm btn-primary btn-block' data-index='`+ i + `' data-storeId='` + answer[i].store_id + `' data-itemKitId='` + itemKitId + `'><i class='fa fa-search'></i>&nbsp;&nbsp;Stock Check</button>
                            </div>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                            <p></p>
                            </div>
                            <div id='appendStoreInventory`+ i + `' class='col-md-12 col-md-12 col-xs-12'></div>
                            </div>
                            `);

                        } else {
                            $("#appendItemKitStoreData").append(`
                            <div class='form-row col-xs-12'>
                            <div class='col-md-1 col-xs-2'>
                                <input type='hidden' name='updateStoreActive[` + i + `]' value='0' />
                                <input type='checkbox' class='minimal' name='updateStoreActive[`+ i + `]' value='1' checked/>
                            </div>
                            <div class='col-md-8 col-xs-10'>
                                <select disabled name='updateStoreId[`+ i + `]' class='form-control'>
                                    <option selected value='` + answer[i].store_id + `'>` + answer[i].store_name + `</option>
                                </select>
                                <input type='hidden' name='updateStoreSelection[` + i + `]' value='` + answer[i].store_id + `' />
                            </div>
                            <div class='visible-xs visible-sm col-sm-12 col-xs-12'>
                            <p></p>
                            </div>
                            <div class='col-md-3 col-xs-12'>
                                <button type='button' id='btnItemKitStockCheck' class='btn btn-sm btn-primary btn-block' data-index='`+ i + `' data-storeId='` + answer[i].store_id + `' data-itemKitId='` + itemKitId + `'><i class='fa fa-search'></i>&nbsp;&nbsp;Stock Check</button>
                            </div>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                            <p></p>
                            </div>
                            <div id='appendStoreInventory`+ i + `' class='col-md-12 col-md-12 col-xs-12'></div>
                            </div>`);
                        }
                    }

                    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue'
                    })
                }
            })


            $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            })

        }
    })
});

$('#modalEditItemKit').on('click', '#btnItemKitStockCheck', function () {
    var storeId = parseInt($(this).attr('data-storeId'));
    var itemKitId = parseInt($(this).attr('data-itemKitId'));
    var index = parseInt($(this).attr('data-index'));


    $.ajax({
        url: "ajax/item-kits.ajax.php",
        method: "POST",
        data: { storeId: storeId, itemKitId: itemKitId },
        cache: false,
        dataType: "json",
        success: function (answer) {

            $("#appendStoreInventory" + index).html("");

            //console.log(answer);

            for (var i = 0; i < answer.length; i++) {

                $("#appendStoreInventory" + index).append(`
                <div class='col-md-12 col-sm-12 col-xs-12'>
                    <div class='col-md-10 col-sm-12 col-xs-12'>
                        <label for="inventoryName` + index + `">Item Name</label>
                        <input disabled id="inventoryName` + index + `" class="form-control" type="text" value="` + answer[i].name + `">
                    </div>
                    <div class='col-md-2 col-sm-12 col-xs-12'>
                        <label for="inventoryQuantity` + index + `">Quantity</label>
                        <input disabled id="inventoryQuantity` + index + `" class="form-control" type="text" value="` + answer[i].quantity + `">
                    </div>
                </div>
                <div class='col-md-12 col-sm-12 col-xs-12'>
                    <p></p>
                </div>
            `);

            }

            $("#appendStoreInventory" + index).append(`
                <div class='col-md-12 col-sm-12 col-xs-12'>
                    <p style="margin-bottom: 30px;"></p>
                </div>
            `);
        }
    });

});

/* SET FOCUS ON SEARCH BAR OF DATATABLES */
$('div.dataTables_filter input').focus();
$('div.dataTables_filter label input').attr('id', 'search');

/* Filter Item Kits DataTable by Store */
$('#dataTablesFilterItemKitsByStore').on('change', function () {
    itemKitsTable.column(0).search(this.value).draw();
});

/* REPEATER PLUGIN */
$("#newItemKitRepeater").createRepeater();
$("#modalEditItemKitRepeater").createRepeater();

/* RESET APPENDED ELEMENTS ON HIDE EDIT ITEM MODAL */
$('#modalEditItemKit').on('hidden.bs.modal', function () {
    $("#appendDynamicEditItemKitList").html("");
    $("#appendCurrentEditItemKitList").html("");
    $("#appendItemKitStoreData").html("");
})

/* RECALCULATE DATATABLE ON MODAL SHOWN */
$('#modalAddItemKit').on('shown.bs.modal', function () {
    $('.tableAddItemsToItemKit').DataTable()
        .columns.adjust()
        .responsive.recalc();
})

$('#modalEditItemKit').on('shown.bs.modal', function () {
    $('.tableEditItemsInItemKit').DataTable()
        .columns.adjust()
        .responsive.recalc();
})

function recalculateUnitPrice(type) {
    var formName = "";
    var unitPriceName = "";

    if (type == "new") {
        formName = ".newItemKitForm";
        unitPriceName = "#newUnitPrice";
    } else {
        formName = ".editItemKitForm";
        unitPriceName = "#editUnitPrice";
    }

    var currrentTotalPrice = 0;

    $(formName).find('input.itemQuantity').each(function (index, element) {
        var quantity = parseInt($(element).val());
        var itemUnitPrice = parseFloat($(this).parent().siblings().children(".itemUnitPrice").val());
        var totalPerItemPrice = itemUnitPrice * quantity;
        currrentTotalPrice = currrentTotalPrice + totalPerItemPrice;
    })

    $(unitPriceName).val(Number(currrentTotalPrice).toFixed(2));
}