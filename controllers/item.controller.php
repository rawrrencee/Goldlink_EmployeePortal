<?php

class ItemController
{

    public static function ctrViewAllItems()
    {
        $response = ItemModel::mdlViewAllItems();

        return $response;
    }

    public static function ctrViewAllCategories() {
        $response = ItemModel::mdlViewAllCategories();

        return $response;
    }

    public static function ctrCreateItem()
    {

        if (isset($_POST["newItemNumber"])) {
            if (preg_match('/^[-0-9A-Za-z@._,\/\- ]+$/', $_POST["newItemNumber"])) {

                $table = 'items';
                $emptyString = "";
                $defaultValue = 0;
                $itemData = array('name' => $_POST["newItemName"],
                    'category' => $_POST["newCategory"],
                    'supplier_id' => $_POST["newSupplierId"],
                    'item_number' => $_POST["newItemNumber"],
                    'description' => $_POST["newDescription"],
                    'cost_price' => $_POST["newCostPrice"],
                    'unit_price' => $_POST["newUnitPrice"],
                    'reorder_level' => $defaultValue,
                    'location' => $emptyString,
                    'allow_alt_description' => $defaultValue,
                    'is_serialized' => $defaultValue,
                    'factory_id' => $_POST["newFactoryId"]);

                //echo "<script type='text/javascript'> alert('".json_encode($itemData)."') </script>";

                $response = ItemModel::mdlCreateNewItem($table, $itemData);
                $new_item_id = (int) $response["item_id"];

                //Debug with JS Alert
                //echo "<script type='text/javascript'> alert('".json_encode($response)."') </script>";
                //echo "<script type='text/javascript'> alert('".json_encode($new_item_id)."') </script>";

                $newStoreSelections = $_POST["newStoreSelections"];
                $newItemQuantities = $_POST["newItemQuantities"];

                $table = 'stores_items';
                $response = true;

                foreach ($newStoreSelections as $i => $store) {
                    if ($newItemQuantities[$i] == "" or is_null($newItemQuantities[$i])) {
                        $newItemQuantities[$i] = 0;
                    }
                    $data = array('item_id' => $new_item_id, 'store_id' => (int) $store, 'quantity' => (int) $newItemQuantities[$i]);

                    $check_record = ItemModel::mdlViewStoreItemStatusByStoreId($table, $data);

                    //echo "<script type='text/javascript'> alert('Record: " . json_encode($check_record) . "') </script>";

                    if (count($check_record) == 0) {
                        $added = ItemModel::mdlAddItemToStore($table, $data);
                        //echo "<script type='text/javascript'> alert('Added: " . json_encode($added) . "') </script>";

                    } else {
                        if ($check_record['active'] === 0) {
                            $data['active'] = 1;
                            $added = ItemModel::mdlUpdateStoreItem($table, $data);
                            //echo "<script type='text/javascript'> alert('Updated quantity: " . json_encode($added) . "') </script>";

                        }
                    }
                    //echo "<script type='text/javascript'> alert('" . json_encode($added) . "') </script>";
                }

                //echo "<script type='text/javascript'> alert('".json_encode($response)."') </script>";

                if ($response) {
                    echo '<script>

                    swal({
                        type: "success",
                        title: "Item added succesfully!",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-management";
                        }

                    });

                    </script>';

                    return;
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An unknown error has occurred.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "item-management";
                            }
                    });
                </script>';
                }
            }
        }
    }

    public static function ctrEditItem()
    {

        if (isset($_POST['editItemId'])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $itemId = (int) $_POST[editItemId];

            // UPDATE ITEM FIRST
            $itemData = array(
                'item_id' => (int) $_POST['editItemId'],
                'item_number' => $_POST['editItemNumber'],
                'factory_id' => $_POST['editFactoryId'],
                'name' => $_POST['editItemName'],
                'category' => $_POST['editCategory'],
                'cost_price' => $_POST['editCostPrice'],
                'unit_price' => $_POST['editUnitPrice'],
                'description' => $_POST['editDescription'],
                'supplier_id' => (int) $_POST['editSupplierId']);

            $table = 'items';
            $response = ItemModel::mdlEditItem($table, $itemData);
            //echo "<script type='text/javascript'> alert('" . json_encode($response) . "') </script>";

            if (!$response) {
                echo '<script>
                swal({

                    type: "error",
                    title: "An error has occurred. An item with the same UPC/EAN/ISBN already exists, please use a different one.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-management";
                        }
                });
                </script>';
                return;
            }

            // UPDATE STORE ITEM INFORMATION
            $updateStoreActive = $_POST['updateStoreActive'];
            $updateStoreSelection = $_POST['updateStoreSelection'];
            $updateStoreQuantity = $_POST['updateStoreQuantity'];

            $table = 'stores_items';
            $response = true;

            foreach ($updateStoreSelection as $i => $store) {
                if ($updateStoreQuantity[$i] == "" or is_null($updateStoreQuantity[$i])) {
                    $updateStoreQuantity[$i] = 0;
                }
                $storeItemData = array(
                    'item_id' => $itemId,
                    'store_id' => (int) $store,
                    'quantity' => (int) $updateStoreQuantity[$i],
                    'active' => (int) $updateStoreActive[$i]);

                //echo "<script type='text/javascript'> alert('" . json_encode($storeItemData) . "') </script>";

                $response = ItemModel::mdlUpdateStoreItem($table, $storeItemData);
                //echo "<script type='text/javascript'> alert('" . json_encode($response) . "') </script>";
            }

            // ADD STORES+QTY IF NOT ALREADY EXISTING (ELSE FAIL)
            $editStoreSelections = $_POST["editStoreSelections"];
            $editItemQuantities = $_POST["editItemQuantities"];

            $table = 'stores_items';
            $response = true;

            foreach ($editStoreSelections as $i => $store) {
                if ($editItemQuantities[$i] == "" or is_null($editItemQuantities[$i])) {
                    $editItemQuantities[$i] = 0;
                }
                $data = array('item_id' => $itemId, 'store_id' => (int) $store, 'quantity' => (int) $editItemQuantities[$i]);
                $check_record = ItemModel::mdlViewStoreItemStatusByStoreId($table, $data);

                //echo "<script type='text/javascript'> alert('CHECK RECORD: " . json_encode($check_record) . "') </script>";

                if (count($check_record) == 0) {
                    $added = ItemModel::mdlAddItemToStore($table, $data);
                    //echo "<script type='text/javascript'> alert('Added: " . json_encode($added) . "') </script>";
                } else {
                    if ($check_record['active'] == 0) {
                        $data['active'] = 1;
                        $added = ItemModel::mdlUpdateStoreItem($table, $data);
                        //echo "<script type='text/javascript'> alert('Updated: " . json_encode($added) . "') </script>";
                    }
                }
                if (!$added) {
                    $response = false;
                }
            }

            if ($response) {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item updated succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-management";
                    }

                });

                </script>';

                return;
            } else {
                echo '<script>
                swal({

                    type: "error",
                    title: "An error has occurred. A record for an added store already exists, please modify the quantity instead.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-management";
                        }
                });
            </script>';
            }

            return;
        }
    }

    public static function ctrViewItemByItemId($value)
    {
        $table = 'items';
        $response = ItemModel::mdlViewItemByItemId($table, $value);

        return $response;
    }

    public static function ctrViewStoresWithItem($value)
    {
        $table = 'stores_items';
        $response = ItemModel::mdlViewStoresWithItem($table, $value);

        return $response;
    }

    public static function ctrViewItemWithStoreData($value)
    {
        $table = 'items';
        $response = ItemModel::mdlViewItemWithStoreData($table, $value);

        return $response;
    }

}
