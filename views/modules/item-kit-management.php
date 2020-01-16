<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            View Item Kits
            <small>Item Kits Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Item Kit Management</li>
        </ol>
    </section>

    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <div class="col-md-2 col-xs-12">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddItemKit">
                        Add Item Kit
                    </button>
                </div>
                <div class="col-md-10 col-xs-12">
                    <div class="box-tools pull-right">
                        <span>Filter by store:</span>
                        <select id="dataTablesFilterItemKitsByStore" class="select2">
                            <?php
                                $item = null;
                                $value = null;

                                $stores = StoreController::ctrViewAllStores($item, $value);

                                foreach ($stores as $key => $value) {
                                    echo '<option value ="' . $value["store_name"] . '">' . $value["store_name"] . '</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="box-body">
                <div class="col-md-12" style="overflow-y: auto;">
                    <table class="table table-hover table-bordered table-striped dt-responsive tableItemKits"
                        width="100%">
                        <thead>
                            <tr>
                                <th>Store</th>
                                <th>UPC/EAN/ISBN</th>
                                <th>Item Kit Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Unit Price</th>
                                <th class="never">Cost Price</th>
                                <th class="never">Store ID</th>
                                <th class="never">Item Kit ID</th>
                                <th style="width: 40px;">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="box-footer">
                Footer
            </div>
        </div>

    </section>
</div>


<div id="modalAddItemKit" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add New Item Kit</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form class="newItemKitForm" role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Kit Picture</p>
                        </div>
                        <div class="form-row">
                            <div class="col-md-2">
                                <img class="thumbnail preview" src="views/img/items/default/anonymous.png"
                                    width="100px">
                            </div>
                            <div class="col-md-10" style="padding-bottom: 30px;">
                                <input type="file" class="newItemKitImage" name="newItemKitImage">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Available Items</p>
                        </div>
                        <div class="form-row col-md-12">
                            <table
                                class="table table-hover table-bordered table-striped dt-responsive tableAddItemsToItemKit"
                                width="100%">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>UPC/EAN/ISBN</th>
                                        <th>Category</th>
                                        <th>Unit Price</th>
                                        <th class="never">Cost Price</th>
                                        <th class="never">Item ID</th>
                                        <th style="width: 40px;">Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Item Kit</p>
                        </div>
                        <div class="form-row col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 50px;">
                            <div id="appendDynamicItemList">
                                <span id="emptyItemKitListText">List is empty. Please add a product.</span>
                            </div>
                        </div>
                        <div class="form-row visible-xs visible-sm">
                            <p style="font-size: 2em;">Item Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newItemKitNumber">UPC/EAN/ISBN&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newItemKitNumber" name="newItemKitNumber"
                                    placeholder="UPC/EAN/ISBN" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newItemKitName">Item Kit Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newItemKitName" name="newItemKitName"
                                    placeholder="Item Kit Name" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCategory">Category&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control select2" style="width: 100%;" id="newCategory"
                                    name="newCategory" required>
                                    <?php

                                        $categories = ItemKitController::ctrViewAllCategories();

                                        foreach ($categories as $key => $value) {
                                        echo '<option value ="' . $value["category"] . '">' . $value["category"] . '</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newItemKitDescription">Description</label>
                                <input type="text" class="form-control" id="newItemKitDescription"
                                    name="newItemKitDescription" placeholder="Description">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCostPrice">Cost Price</label>
                                <input type="number" class="form-control" id="newCostPrice" min="0.00"
                                    name="newCostPrice" step="0.01" value="0.00" placeholder="Cost Price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newUnitPrice">Unit Price&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="number" class="form-control" id="newUnitPrice" min="0.00"
                                    name="newUnitPrice" step="0.01" value="0.00" placeholder="Unit Price" required>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Stores</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <div class="col-md-6 col-xs-6">
                                    <?php
                                        $lost_and_found_store_id = 1;

                                        $lost_and_found_store_details = StoreController::ctrViewStoreByStoreId($lost_and_found_store_id);

                                        echo '<select disabled class="form-control"><option selected value="' . $lost_and_found_store_details['store_id'] . '">' . $lost_and_found_store_details['store_name'] . ' </option></select>';

                                        echo '<input type="hidden" name="newStoreSelections[0]" value="' . $lost_and_found_store_id . '"/>';
                                    ?>
                                </div>
                                <div class="col-md-6 col-xs-6">
                                    <?php
                                        $warehouse_store_id = 2;

                                        $warehouse_store_details = StoreController::ctrViewStoreByStoreId($warehouse_store_id);

                                        echo '<select disabled class="form-control"><option selected value="' . $warehouse_store_details['store_id'] . '">' . $warehouse_store_details['store_name'] . ' </option></select>';

                                        echo '<input type="hidden" name="newStoreSelections[1]" value="' . $warehouse_store_id . '"/>';
                                    ?>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="newItemKitRepeater">
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
                                            <div class="col-md-10 col-xs-9">
                                                <label for="newStoreSelections">Store&nbsp;&nbsp;<small
                                                        style="color:red;">*Required</small></label>
                                                <select class="form-control storeSelect2" style="width: 100%;"
                                                    data-skip-name="true" data-name="newStoreSelections[]" required>
                                                    <?php
                                                        $item = null;
                                                        $value = null;

                                                        $stores = StoreController::ctrViewAllStores($item, $value);

                                                        foreach ($stores as $key => $value) {
                                                            echo '<option value ="' . $value["store_id"] . '">' . $value["store_name"] . '</option>';
                                                        }
                                                    ?>
                                                </select>
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
                $createItemKit = new ItemKitController();
                $createItemKit->ctrCreateItemKit();
                ?>
            </form>

        </div>
    </div>
</div>

<div id="modalEditItemKit" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Edit Item Kit</h4>
            </div>

            <ul class="nav nav-tabs" id="tabContent">
                <li class="active"><a href="#editItemKitTab" data-toggle="tab">Item Kit</a></li>
                <li><a href="#editStoresTab" data-toggle="tab">Stores</a></li>
                <li><a href="#editItemKitPictureTab" data-toggle="tab">Item Kit Picture</a></li>
            </ul>

            <form class="editItemKitForm" role="form" method="POST" enctype="multipart/form-data">
            <div class="tab-content">
                <div class="tab-pane active" id="editItemKitTab">
                    <div class="modal-body">
                        <div class="box-body">
                            
                            <input type="hidden" id="editItemKitId" name="editItemKitId" value="" />
                            <input type="hidden" id="currentItemKitNumber" name="currentItemKitNumber" value="" />
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Available Items</p>
                                </div>
                                <div class="form-row col-md-12">
                                    <table
                                        class="table table-hover table-bordered table-striped dt-responsive tableEditItemsInItemKit"
                                        width="100%">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>UPC/EAN/ISBN</th>
                                                <th>Category</th>
                                                <th>Unit Price</th>
                                                <th class="never">Cost Price</th>
                                                <th class="never">Item ID</th>
                                                <th style="width: 40px;">Add</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <br>
                                </div>
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Add Items</p>
                                </div>
                                <div class="form-row col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 50px;">
                                    <div id="appendDynamicEditItemKitList">
                                    </div>
                                    <span id="emptyEditItemKitListText">List is empty. Please add a product.</span>
                                </div>
                                <div class="col-md-12 col-xs-12 col-sm-12">
                                    <p style="font-size: 2em;">Current Items in Kit</p>
                                </div>
                                <div class="form-row col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 50px;">
                                    <div id="appendCurrentEditItemKitList"></div>
                                </div>
                                <div class="form-row visible-xs visible-sm">
                                    <p style="font-size: 2em;">Item Information</p>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editItemKitNumber">UPC/EAN/ISBN&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="text" class="form-control" id="editItemKitNumber"
                                            name="editItemKitNumber" placeholder="UPC/EAN/ISBN" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editItemKitName">Item Kit Name&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="text" class="form-control" id="editItemKitName"
                                            name="editItemKitName" placeholder="Item Kit Name" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editCategory">Category&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <select class="form-control select2" style="width: 100%;" id="editCategory"
                                            name="editCategory" required>
                                            <?php

                                        $categories = ItemKitController::ctrViewAllCategories();

                                        foreach ($categories as $key => $value) {
                                        echo '<option value ="' . $value["category"] . '">' . $value["category"] . '</option>';
                                        }
                                    ?>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editItemKitDescription">Description</label>
                                        <input type="text" class="form-control" id="editItemKitDescription"
                                            name="editItemKitDescription" placeholder="Description">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editCostPrice">Cost Price</label>
                                        <input type="number" class="form-control" id="editCostPrice" min="0.00"
                                            name="editCostPrice" step="0.01" value="0.00" placeholder="Cost Price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editUnitPrice">Unit Price&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="number" class="form-control" id="editUnitPrice" min="0.00"
                                            name="editUnitPrice" step="0.01" value="0.00" placeholder="Unit Price"
                                            required>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </div>


                <div class="tab-pane" id="editStoresTab">
                    <div class="modal-body">
                        <div class="box-body">
                            <div class="col-md-12">
                                <p style="font-size: 2em;">Stores</p>
                            </div>

                            <div class="form-group">
                                <div id="appendItemKitStoreData">
                                </div>
                            </div>

                            <div class="form-row">
                                <div id="modalEditItemKitRepeater">
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
                                                <div class="col-md-10 col-xs-9">
                                                    <label for="editStoreSelections">Store&nbsp;&nbsp;<small
                                                            style="color:red;">*Required</small></label>
                                                    <select class="form-control storeSelect2" style="width: 100%;"
                                                        data-skip-name="true" data-name="editStoreSelections[]"
                                                        required>
                                                        <?php
                                                        $item = null;
                                                        $value = null;

                                                        $stores = StoreController::ctrViewAllStores($item, $value);

                                                        foreach ($stores as $key => $value) {
                                                            echo '<option value ="' . $value["store_id"] . '">' . $value["store_name"] . '</option>';
                                                        }
                                                    ?>
                                                    </select>
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
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </div>

                <div class="tab-pane" id="editItemKitPictureTab">
                    <div class="modal-body">
                        <div class="box-body">
                            <div class="col-md-12">
                                <p style="font-size: 2em;">Item Kit Picture</p>
                            </div>
                            <div class="form-row">
                                <div class="col-md-2">
                                    <img id="editItemKitImagePreview" class="thumbnail preview" src="views/img/items/default/anonymous.png"
                                        width="100px">
                                </div>
                                <div class="col-md-10" style="padding-bottom: 30px;">
                                    <input type="file" class="editItemKitImage" name="editItemKitImage">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </div>

                <?php
                    $editItemKit = new ItemKitController();
                    $editItemKit->ctrEditItemKit();
                ?>
            </div>
            </form>
        </div>
    </div>
</div>