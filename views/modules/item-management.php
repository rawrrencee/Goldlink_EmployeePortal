<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            View Items
            <small>Item Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Item Management</li>
        </ol>
    </section>

    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <div class="col-md-2 col-xs-12">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddItem">
                        Add Item
                    </button>
                </div>
                <div class="col-md-10 col-xs-12">
                    <div class="box-tools pull-right">
                        <span>Filter by store:</span>
                        <select id="dataTablesFilterItemsByStore" class="select2">
                        <option></option>
                        <?php
                            $item = null;
                            $value = null;

                            $stores = StoreController::ctrViewAllStores($item, $value);

                            foreach($stores as $key => $value) {
                                echo '<option value ="'.$value["store_name"].'">'.$value["store_name"].'</option>';
                            }
                        ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="box-body">
                <div class="col-md-12" style="overflow-y: auto;">
                    <table class="table table-hover table-bordered table-striped dt-responsive tableItems" width="100%">
                        <thead>
                            <tr>
                                <!--<th style="width: 10px;">#</th>-->
                                <th>Store</th>
                                <th>Item Name</th>
                                <th>UPC/EAN/ISBN</th>
                                <th>Category</th>
                                <th class="never">Cost Price</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th class="none">Vendor Code</th>
                                <th class="none">Supplier</th>
                                <th class="never">Item ID</th>
                                <th class="never">Supplier ID</th>
                                <th class="never">Store ID</th>
                                <th style="width: 40px;">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </section>
</div>

<div id="modalAddItem" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add New Item</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Picture</p>
                        </div>
                        <div class="form-row">
                            <div class="col-md-2">
                                <img class="thumbnail preview" src="views/img/items/default/anonymous.png"
                                    width="100px">
                            </div>
                            <div class="col-md-10" style="padding-bottom: 30px;">
                                <input type="file" class="newItemImage" name="newItemImage">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newItemNumber">UPC/EAN/ISBN&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newItemNumber" name="newItemNumber"
                                    placeholder="UPC/EAN/ISBN" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newFactoryId">Vendor Code</label>
                                <input type="text" class="form-control" id="newFactoryId" name="newFactoryId"
                                    placeholder="Vendor Code">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newItemName">Item Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newItemName" name="newItemName"
                                    placeholder="Item Name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newDescription">Description</label>
                                <input type="text" class="form-control" id="newDescription" name="newDescription"
                                    placeholder="Description">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCategory">Category&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control select2" style="width: 100%;" id="newCategory"
                                    name="newCategory" required>
                                    <?php

                                        $categories = ItemController::ctrViewAllCategories();

                                        foreach($categories as $key => $value) {
                                            echo '<option value ="'.$value["category"].'">'.$value["category"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newSupplierId">Supplier&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control select2" style="width: 100%;" id="newSupplierId"
                                    name="newSupplierId" required>
                                    <?php
                                        $item = null;
                                        $value = null;

                                        $suppliers = SupplierController::ctrViewAllSuppliers($item, $value);

                                        foreach($suppliers as $key => $value) {
                                            echo '<option value ="'.$value["person_id"].'">'.$value["company_name"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCostPrice">Cost Price</label>
                                <input type="number" class="form-control" id="newCostPrice" min="0" value="0" name="newCostPrice"
                                    step="0.01" placeholder="Cost Price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newUnitPrice">Unit Price&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="number" class="form-control" id="newUnitPrice" min="0" value="0" name="newUnitPrice"
                                    step="0.01" placeholder="Unit Price" required>
                            </div>
                        </div>


                        <div class="col-md-12">
                            <p style="font-size: 2em;">Default Stores</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <div class="col-md-8 col-xs-8">
                                    <?php
                                        $lost_and_found_store_id = 1;

                                        $lost_and_found_store_details = StoreController::ctrViewStoreByStoreId($lost_and_found_store_id);

                                        echo '<select disabled class="form-control"><option selected value="'.$lost_and_found_store_details['store_id'].'">'.$lost_and_found_store_details['store_name'].' </option></select>';

                                        echo '<input type="hidden" name="newStoreSelections[0]" value="'.$lost_and_found_store_id.'"/>';
                                    ?>
                                </div>
                                <div class="col-md-4 col-xs-4">
                                    <?php
                                        echo '<input type="number" name="newItemQuantities[0]" class="form-control" value="0" />';
                                    ?>
                                </div>
                            </div>
                            <div class='col-md-12 col-xs-12'>
                                <p></p>
                            </div>
                            <div class="form-group col-md-12 col-xs-12">
                                <div class="col-md-8 col-xs-8">
                                    <?php
                                        $warehouse_store_id = 2;
                                            
                                        $warehouse_store_details = StoreController::ctrViewStoreByStoreId($warehouse_store_id);

                                        echo '<select disabled class="form-control"><option selected value="'.$warehouse_store_details['store_id'].'">'.$warehouse_store_details['store_name'].' </option></select>';

                                        echo '<input type="hidden" name="newStoreSelections[1]" value="'.$warehouse_store_id.'"/>';
                                    ?>
                                </div>
                                <div class="col-md-4 col-xs-4">
                                    <?php
                                        echo '<input type="number" name="newItemQuantities[1]" class="form-control" value="0" />';
                                    ?>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="newItemRepeater">
                                <div class="form-group col-md-12">
                                    <div class="repeater-heading col-xs-12" align="center">
                                        <button type="button" style="margin-top: 24px;"
                                            class="btn btn-success repeater-add-btn"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add
                                            Store</button>
                                    </div>
                                </div>

                                <div class="clearfix"></div>

                                <div class="items" data-group="stores_items">
                                    <div class="item-content">
                                        <div class="form-group">
                                            <div class="col-md-8 col-xs-6">
                                                <label for="newStoreSelections">Store&nbsp;&nbsp;<small
                                                        style="color:red;">*Required</small></label>
                                                <select class="form-control" style="width: 100%;" data-skip-name="true"
                                                    data-name="newStoreSelections[]" required>
                                                    <?php
                                                        $item = null;
                                                        $value = null;

                                                        $stores = StoreController::ctrViewAllStores($item, $value);

                                                        foreach($stores as $key => $value) {
                                                        echo '<option value ="'.$value["store_id"].'">'.$value["store_name"].'</option>';
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                            <div class="col-md-2 col-xs-3">
                                                <label for="newItemQuantities">Quantity</label>
                                                <input type="number" class="form-control" id="newItemQuantities"
                                                    data-skip-name="true" data-name="newItemQuantities[]">
                                            </div>
                                            <div class="col-md-2 col-xs-3" align="right" style="margin-top: 24px;">
                                                <button id="remove-btn" class="btn btn-block btn-danger"
                                                    onclick="$(this).parents('.items').remove()"><i
                                                        class="fa fa-minus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>

            <?php
                $createItem = new ItemController();
                $createItem->ctrCreateItem();
            ?>
            </form>

        </div>
    </div>
</div>



<div id="modalEditItem" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Edit Item</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form id="editItemForm" role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Picture</p>
                        </div>
                        <div class="form-row">
                            <div class="col-md-2">
                                <img class="thumbnail preview" src="views/img/items/default/anonymous.png"
                                    width="100px">
                            </div>
                            <div class="col-md-10" style="padding-bottom: 30px;">
                                <input type="file" class="editItemImage" name="editItemImage">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Information</p>
                            <input type="hidden" id="editItemId" name="editItemId" value="" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editItemNumber">UPC/EAN/ISBN&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="editItemNumber" name="editItemNumber"
                                    placeholder="UPC/EAN/ISBN" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editFactoryId">Vendor Code</label>
                                <input type="text" class="form-control" id="editFactoryId" name="editFactoryId"
                                    placeholder="Vendor Code">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editItemName">Item Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="editItemName" name="editItemName"
                                    placeholder="Item Name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editDescription">Description</label>
                                <input type="text" class="form-control" id="editDescription" name="editDescription"
                                    placeholder="Description">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editCategory">Category&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control select2" style="width: 100%;" id="editCategory"
                                    name="editCategory" required>
                                    <?php

                                        $categories = ItemController::ctrViewAllCategories();

                                        foreach($categories as $key => $value) {
                                            echo '<option value ="'.$value["category"].'">'.$value["category"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editSupplierId">Supplier&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control select2" style="width: 100%;" id="editSupplierId"
                                    name="editSupplierId" required>
                                    <?php
                                        $item = null;
                                        $value = null;

                                        $suppliers = SupplierController::ctrViewAllSuppliers($item, $value);

                                        foreach($suppliers as $key => $value) {
                                            echo '<option value ="'.$value["person_id"].'">'.$value["company_name"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editCostPrice">Cost Price</label>
                                <input type="number" class="form-control" id="editCostPrice" min="0"
                                    name="editCostPrice" step="0.01" placeholder="Cost Price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editUnitPrice">Unit Price&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="number" class="form-control" id="editUnitPrice" min="0"
                                    name="editUnitPrice" step="0.01" placeholder="Unit Price" required>
                            </div>

                        </div>


                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <p style="font-size: 2em;">Stores</p>
                            </div>
                            <div class="form-group">
                                <div id="appendDynamicStoreData">
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="modalEditItemRepeater">
                                <div class="form-group col-md-12">
                                    <div class="repeater-heading col-md-12 col-xs-12" align="center">
                                        <button type="button" style="margin-top: 24px;"
                                            class="btn btn-success repeater-add-btn"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add
                                            Store</button>
                                    </div>
                                </div>

                                <div class="clearfix"></div>

                                <div class="items" data-group="stores_items">
                                    <div class="item-content">
                                        <div class="form-group">
                                            <div class="col-md-8 col-xs-6">
                                                <label for="editStoreSelections">Store&nbsp;&nbsp;<small
                                                        style="color:red;">*Required</small></label>
                                                <select class="form-control" style="width: 100%;" data-skip-name="true"
                                                    data-name="editStoreSelections[]" required>
                                                    <?php
                                                        $item = null;
                                                        $value = null;

                                                        $stores = StoreController::ctrViewAllStores($item, $value);

                                                        foreach($stores as $key => $value) {
                                                        echo '<option value ="'.$value["store_id"].'">'.$value["store_name"].'</option>';
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                            <div class="col-md-2 col-xs-3">
                                                <label for="editItemQuantities">Quantity</label>
                                                <input type="number" class="form-control" id="editItemQuantities"
                                                    data-skip-name="true" data-name="editItemQuantities[]">
                                            </div>
                                            <div class="col-md-2 col-xs-3" align="right" style="margin-top: 24px;">
                                                <button id="remove-btn" class="btn btn-block btn-danger"
                                                    onclick="$(this).parents('.items').remove()"><i
                                                        class="fa fa-minus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>

            <?php
                $editItem = new ItemController();
                $editItem->ctrEditItem();
            ?>
            </form>

        </div>
    </div>
</div>

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/items.js"></script>