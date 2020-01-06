<?php

class ItemKitController
{

    public static function ctrViewItemKitByItemKitId($value)
    {

        $table = 'item_kits';
        $response = ItemKitModel::mdlViewItemKitByItemKitId($table, $value);

        return $response;
    }

    public static function ctrViewAllCategories()
    {
        $response = ItemKitModel::mdlViewAllCategories();

        return $response;
    }

    public static function ctrViewAllItemKitsByItemKitNumber($array)
    {

        $table = 'item_kits';
        $item_kit_number = $array['item_kit_number'];
        $response = ItemKitModel::mdlViewAllItemKitsByItemKitNumber($table, $item_kit_number);

        return $response;
    }

    public static function ctrRetrieveDuplicateItemKitsByItemKitId($value)
    {
        $array = self::ctrViewItemKitByItemKitId($value);
        $response = self::ctrViewAllItemKitsByItemKitNumber($array);

        return $response;
    }

    public static function ctrRetrieveItemKitItemsByItemKitId($value)
    {

        $table = 'item_kit_items';
        $response = ItemKitModel::mdlViewItemKitItemsByItemKitId($table, $value);

        return $response;
    }

    public static function ctrRetrieveStoreItemDetails($store_id, $item_kit_id)
    {

        $response = ItemKitModel::mdlRetrieveStoreItemsByItemKitId($store_id, $item_kit_id);

        return $response;
    }

    public static function ctrCreateItemKit()
    {
        if (isset($_POST["newItemKitNumber"])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $itemKitData = array(
                'item_kit_number' => $_POST['newItemKitNumber'],
                'name' => $_POST['newItemKitName'],
                'description' => $_POST['newItemKitDescription'],
                'category' => $_POST['newCategory'],
                'cost_price' => $_POST['newCostPrice'],
                'unit_price' => $_POST['newUnitPrice'],
            );
            $persistStatus = false;
            $issuesFaced = false;

            $newStoreSelections = $_POST['newStoreSelections'];
            $newItemKitItemIds = $_POST['newItemKitItemIds'];
            $newItemKitItemQuantities = $_POST['newItemKitItemQuantities'];

            foreach ($newStoreSelections as $i => $store) {
                $table = 'item_kits';
                $persistStatus = false;

                $itemKitData['store_id'] = (int) $store;

                //CHECK IF ANY ITEM KIT EXISTS WITH THE PROVIDED ITEM KIT NUMBER
                $check_item_number_exists = ItemKitModel::mdlRetrieveItemKitByStoreId($table, $itemKitData);

                echo "<script type='text/javascript'> alert('check_item_number_exists: " . json_encode(count($check_item_number_exists)) . "') </script>";

                if (count($check_item_number_exists) > 0) {
                    $persistStatus = false;
                    break;
                }

                $check_record = ItemKitModel::mdlRetrieveUndeletedItemKitByStoreId($table, $itemKitData);

                echo "<script type='text/javascript'> alert('check_record: " . json_encode(count($check_record)) . "') </script>";

                if (count($check_record) > 0) {
                    $persistStatus = false;
                    $issuesFaced = true;

                    continue;
                }

                $response = ItemKitModel::mdlCreateItemKit($table, $itemKitData);

                $new_item_kit_id = $response['item_kit_id'];
                $table = 'item_kit_items';

                $persistStatus = true;

                foreach ($newItemKitItemIds as $k => $item) {
                    $persistStatus = false;

                    $itemKitItems = array(
                        'item_kit_id' => $new_item_kit_id,
                        'item_id' => (int) $item,
                        'quantity' => (int) $newItemKitItemQuantities[$k],
                    );

                    $created = ItemKitModel::mdlCreateItemKitItems($table, $itemKitItems);

                    $persistStatus = $created;
                }
            }

            echo "<script type='text/javascript'> alert('persistStatus:" . json_encode($persistStatus) . ", issuesFaced: " . json_encode($issuesFaced) . "') </script>";

            if ($persistStatus && !$issuesFaced) {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item Kit added succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-kit-management";
                    }

                });

                </script>';

                return;
            } else if ($persistStatus && $issuesFaced) {
                echo '<script>

                swal({
                    type: "info",
                    title: "Item Kit added. NOTE: Duplicate stores selected during creation were ignored.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-kit-management";
                    }

                });

                </script>';
                return;
            } else {
                echo '<script>
                swal({

                    type: "error",
                    title: "There was an issue creating the item kit due to an already used UPC/EAN/ISBN. Please check the records before adding again.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-kit-management";
                        }
                });
                </script>';
                return;
            }

        }
    }

    public static function ctrEditItemKit()
    {
        if (isset($_POST['editItemKitId'])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            //SET DETAILS OF CURRENT ITEM KIT (BEFORE EDIT)
            $currentItemKitNumber = $_POST['currentItemKitNumber'];
            $item_kit_id = $_POST['editItemKitId'];

            //SET DETAILS OF ITEMS ALREADY AVAILABLE IN ITEM KIT
            $updateItemKitItemIds = $_POST['updateItemKitItemIds'];
            $updateItemActive = $_POST['updateItemActive'];
            $updateItemKitItemQuantities = $_POST['updateItemKitItemQuantities'];

            //SET DETAILS OF ITEMS TO BE ADDED TO ITEM KIT
            $editItemKitItemIds = $_POST['editItemKitItemIds'];
            $editItemKitItemQuantities = $_POST['editItemKitItemQuantities'];

            //SET DETAILS OF STORES THAT ALREADY HAVE THE ITEM KIT
            $updateStoreActive = $_POST['updateStoreActive'];
            $updateStoreSelection = $_POST['updateStoreSelection'];

            //SET DETAILS OF STORES TO ADD THE ITEM KIT TO
            $editStoreSelections = $_POST['editStoreSelections'];

            //OVERALL STATUS
            $persistStatus = false;

            //echo "<script type='text/javascript'> alert('" . json_encode($editItemKitItemIds) . "') </script>";

            //1. FIND ALL ITEM KITS WITH THE SAME ITEM KIT NUMBER & NOT DELETED
            $table = 'item_kits';
            $sameItemKits = ItemKitModel::mdlViewAllItemKitsByItemKitNumber($table, $currentItemKitNumber);

            foreach ($sameItemKits as $i => $itemKit) {
                //ITERATE THROUGH ALL ITEM KITS WITH THE SAME ITEM KIT NUMBER
                $table = 'item_kits';
                $itemKitData = array(
                    'item_kit_number' => $_POST['editItemKitNumber'],
                    'name' => $_POST['editItemKitName'],
                    'description' => $_POST['editItemKitDescription'],
                    'category' => $_POST['editCategory'],
                    'cost_price' => $_POST['editCostPrice'],
                    'unit_price' => $_POST['editUnitPrice'],
                );

                //SET ITEM KIT ID TO BE UPDATED
                $itemKitIdToUpdate = $itemKit['item_kit_id'];
                $itemKitStoreId = $itemKit['store_id'];

                $itemKitData['item_kit_id'] = $itemKitIdToUpdate;

                $response = ItemKitModel::mdlUpdateItemKit($table, $itemKitData);

                //2. ITERATE THROUGH CURRENT ITEM KIT'S ITEMS AND UPDATE THEM
                $table = 'item_kit_items';
                foreach ($updateItemKitItemIds as $j => $itemKitItemId) {

                    $itemKitItemData = array(
                        'item_kit_id' => $itemKitIdToUpdate,
                        'item_id' => $itemKitItemId,
                        'quantity' => $updateItemKitItemQuantities[$j],
                    );

                    //IF ITEM HAS BEEN UNCHECKED, DELETE IT FROM THE ITEM KIT
                    //ELSE UPDATE THE ITEM's QUANTITY BASED ON ITS ITEM KIT ID & ITEM ID
                    if ($updateItemActive[$j] == 0) {

                        $response = ItemKitModel::mdlDeleteItemKitItem($table, $itemKitItemData);
                        $persistStatus = $response;

                    } else {

                        $response = ItemKitModel::mdlUpdateItemKitItem($table, $itemKitItemData);
                        $persistStatus = $response;

                    }
                }

                //3. ITERATE THROUGH NEWLY ADDED ITEMS (NOT EXISTING IN CURRENT ITEM KIT)
                //IGNORE IF NOT SET
                if ($editItemKitItemIds != null) {

                    $table = 'item_kit_items';

                    foreach ($editItemKitItemIds as $k => $itemKitItemId) {

                        $itemKitItemData = array(
                            'item_kit_id' => $itemKitIdToUpdate,
                            'item_id' => $itemKitItemId,
                            'quantity' => $editItemKitItemQuantities[$k],
                        );

                        //CHECK IF EXISTING RECORD EXISTS (I.E. RETURNS > 0 ROWS)
                        //IF SAME ITEM WAS ADDED, SIMPLY UPDATE THE QUANTITY WITH THE NEW VALUE
                        $check_record = ItemKitModel::mdlRetrieveItemKitItemRecord($table, $itemKitItemData);

                        if (count($check_record) == 0) {
                            $response = ItemKitModel::mdlCreateItemKitItems($table, $itemKitItemData);

                            $persistStatus = $response;
                        } else {
                            $response = ItemKitModel::mdlUpdateItemKitItem($table, $itemKitItemData);

                            $persistStatus = $response;
                        }
                    }
                }

                //4. ITERATE THROUGH THE STORES THAT ALREADY HAVE THE ITEM KIT
                //THE ONLY MODIFICATION IS TO UNCHECK IT, SO WE SET THOSE THAT HAVE BEEN UNCHECKED WITH DELETED = 0.
                //IGNORE IF NOT UNCHECKED.
                foreach ($updateStoreSelection as $x => $storeId) {
                    $table = 'item_kits';
                    //IF THE ITEM WAS UNCHECKED, SET IT TO BE DELETED
                    if ($updateStoreActive[$x] == 0 && $storeId == $itemKitStoreId) {
                        $itemKitData = array(
                            'deleted' => 1,
                            'item_kit_id' => $itemKitIdToUpdate,
                            'store_id' => $storeId,
                        );
                        $response = ItemKitModel::mdlDeleteItemKit($table, $itemKitData);
                        $persistStatus = $response;
                    }
                }
            }

            //5. ITERATE THROUGH THE NEW STORES SET TO HAVE THE ITEM KIT
            if ($editStoreSelections != null) {
                foreach ($editStoreSelections as $y => $storeId) {
                    $table = 'item_kits';
                    $existingRecords = false;
                    $existingOldRecords = false;

                    //SET 'NEW' ITEM KIT DATA
                    $itemKitData = array(
                        'item_kit_number' => $_POST['editItemKitNumber'],
                        'name' => $_POST['editItemKitName'],
                        'description' => $_POST['editItemKitDescription'],
                        'category' => $_POST['editCategory'],
                        'cost_price' => $_POST['editCostPrice'],
                        'unit_price' => $_POST['editUnitPrice'],
                        'store_id' => $storeId,
                    );

                    //CHECK USING ITEM KIT NUMBER AND STORE ID
                    //IF THERE ARE >0 ROWS FETCHED, MEANS WE NEED TO UPDATE THIS ITEM KIT TO THE STORE
                    //INSTEAD OF CREATING A NEW ITEM KIT
                    $check_record = ItemKitModel::mdlRetrieveItemKitByStoreId($table, $itemKitData);

                    if (count($check_record) > 0) {
                        $existingRecords = true;
                    }

                    //ONLY CHECK OLD ITEM KIT IF THIS ITEM KIT NUMBER DIFFERS FROM THE NEW ONE
                    //WE ARE RELYING ON ITEM NUMBER FOR SALES SO THIS IS NECESSARY TO PREVENT DUPLICATE ENTRIES
                    if ($_POST['editItemKitNumber'] != $currentItemKitNumber) {
                        $oldItemKitData = array(
                            'item_kit_number' => $currentItemKitNumber,
                            'name' => $_POST['editItemKitName'],
                            'description' => $_POST['editItemKitDescription'],
                            'category' => $_POST['editCategory'],
                            'cost_price' => $_POST['editCostPrice'],
                            'unit_price' => $_POST['editUnitPrice'],
                            'store_id' => $storeId,
                        );

                        $check_old_records = ItemKitModel::mdlRetrieveItemKitByStoreId($table, $oldItemKitData);
                        if (count($check_old_records) > 0) {
                            $existingOldRecords = true;
                        }
                    }

                    //IF NO EXISTING RECORDS EXIST, WE WILL CREATE A NEW ITEM KIT FOR THE STORE
                    if (!$existingRecords && !$existingOldRecords) {

                        $response = ItemKitModel::mdlCreateItemKit($table, $itemKitData);

                        $new_item_kit_id = $response['item_kit_id'];

                        $table = 'item_kit_items';

                        //ITERATE THROUGH THE ITEMS OF OUR PREVIOUS ITEM KIT AND ADD THEM TO THIS NEW ITEM KIT
                        foreach ($updateItemKitItemIds as $z => $item) {
                            $persistStatus = false;

                            $itemKitItems = array(
                                'item_kit_id' => $new_item_kit_id,
                                'item_id' => (int) $item,
                                'quantity' => (int) $updateItemKitItemQuantities[$z],
                            );

                            $created = ItemKitModel::mdlCreateItemKitItems($table, $itemKitItems);
                            $persistStatus = $created;
                        }

                        //ITERATE THROUGH THE NEW ITEMS OF OUR PREVIOUS ITEM KIT AND ADD THEM TO THIS NEW ITEM KIT
                        //IGNORE IF NO NEW ITEMS WERE ADDED
                        if ($editItemKitItemIds != null) {
                            foreach ($editItemKitItemIds as $q => $item) {
                                $persistStatus = false;

                                $itemKitItems = array(
                                    'item_kit_id' => $new_item_kit_id,
                                    'item_id' => (int) $item,
                                    'quantity' => (int) $editItemKitItemQuantities[$q],
                                );

                                $created = ItemKitModel::mdlCreateItemKitItems($table, $itemKitItems);
                                $persistStatus = $created;
                            }
                        }
                    } else {
                        //EXISTING RECORDS WERE FOUND, WE NEED TO RETRIEVE THESE RECORDS AND UPDATE THEM
                        //IF EXISTING RECORDS WERE OLD RECORDS, WE NEED TO RESTORE THEM WITH DELETED = 0
                        //AND UPDATE THEM WITH THE NEW ITEM KIT DATA
                        //ELSE, WE SIMPLY NEED TO RESTORE THE RECORD WITH DELETED = 0 AND UPDATE IT
                        $table = 'item_kits';

                        if ($existingOldRecords) {
                            $itemKitData = array(
                                'item_kit_number' => $currentItemKitNumber,
                                'name' => $_POST['editItemKitName'],
                                'description' => $_POST['editItemKitDescription'],
                                'category' => $_POST['editCategory'],
                                'cost_price' => $_POST['editCostPrice'],
                                'unit_price' => $_POST['editUnitPrice'],
                                'store_id' => $storeId,
                            );

                            $check_old_records = ItemKitModel::mdlRetrieveItemKitByStoreId($table, $itemKitData);

                            //WE WILL ONLY TAKE ONE RECORD TO UPDATE IF THERE IS ALREADY A RECORD
                            if (count($check_old_records) > 0) {
                                $old_item_kit_id = $check_old_records[0]['item_kit_id'];
                                $itemKitData['item_kit_id'] = $old_item_kit_id;
                            }

                            $response = ItemKitModel::mdlRestoreDeletedItemKit($table, $itemKitData);

                            $newItemKitData = array(
                                'item_kit_id' => $old_item_kit_id,
                                'item_kit_number' => $_POST['editItemKitNumber'],
                                'name' => $_POST['editItemKitName'],
                                'description' => $_POST['editItemKitDescription'],
                                'category' => $_POST['editCategory'],
                                'cost_price' => $_POST['editCostPrice'],
                                'unit_price' => $_POST['editUnitPrice'],
                                'store_id' => $storeId,
                            );

                            $response = ItemKitModel::mdlUpdateItemKit($table, $newItemKitData);

                            $persistStatus = $response;
                        } else {
                            $itemKitData = array(
                                'item_kit_number' => $_POST['editItemKitNumber'],
                                'name' => $_POST['editItemKitName'],
                                'description' => $_POST['editItemKitDescription'],
                                'category' => $_POST['editCategory'],
                                'cost_price' => $_POST['editCostPrice'],
                                'unit_price' => $_POST['editUnitPrice'],
                                'store_id' => $storeId,
                            );

                            $check_records = ItemKitModel::mdlRetrieveItemKitByStoreId($table, $itemKitData);

                            //WE WILL ONLY TAKE ONE RECORD TO UPDATE IF THERE IS ALREADY A RECORD
                            if (count($check_records) > 0) {
                                $old_item_kit_id = $check_records[0]['item_kit_id'];
                                $itemKitData['item_kit_id'] = $old_item_kit_id;
                            }

                            $response = ItemKitModel::mdlRestoreDeletedItemKit($table, $itemKitData);

                            $persistStatus = $response;
                        }
                    }
                }
            }

            if ($persistStatus) {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item Kit edited succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-kit-management";
                    }

                });

                </script>';

                return;
            } else {
                echo '<script>
                swal({

                    type: "error",
                    title: "An unknown error has occurred. Please contact your system administrator.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-kit-management";
                        }
                });
            </script>';
            }
        }
    }
}
