<?php

require_once "connection.php";

class ItemKitModel
{

    public static function mdlViewItemKitByItemKitId($table, $value)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_kit_id = :item_kit_id");
        $stmt->bindParam(":item_kit_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemKitByItemKitNumber($table, $value)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_kit_number = :item_kit_number AND deleted = :deleted");
        $stmt->bindParam(":item_kit_number", $value, PDO::PARAM_STR);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllCategories()
    {
        $stmt = Connection::connect()->prepare("(SELECT items.category FROM items WHERE deleted = 0) UNION (SELECT item_kits.category FROM item_kits WHERE deleted = 0) ORDER BY category ASC");

        //$deleted = 0;
        //$stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllItemKitsByItemKitNumber($item_kit_number)
    {
        $stmt = Connection::connect()->prepare("SELECT item_kits.item_kit_id, item_kits.item_kit_number, item_kits.name, item_kits.description, item_kits.category, item_kits.cost_price, item_kits.unit_price, item_kits.store_id, item_kits.deleted, stores.store_name FROM item_kits JOIN stores ON item_kits.store_id = stores.store_id WHERE item_kit_number = :item_kit_number AND deleted = :deleted");
        $stmt->bindParam(":item_kit_number", $item_kit_number, PDO::PARAM_STR);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemKitItemsByItemKitId($table, $item_kit_id)
    {
        $stmt = Connection::connect()->prepare("SELECT items.item_id, items.name, items.unit_price, $table.quantity, $table.item_kit_id, $table.quantity FROM $table JOIN items ON items.item_id = $table.item_id WHERE $table.item_kit_id = :item_kit_id");
        $stmt->bindParam(":item_kit_id", $item_kit_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveStoreItemsByItemKitId($store_id, $item_kit_id)
    {
        $stmt = Connection::connect()->prepare("SELECT items.item_id, items.name, items.item_number, stores_items.quantity, items.unit_price FROM stores_items JOIN items ON stores_items.item_id = items.item_id WHERE stores_items.store_id = :store_id AND stores_items.item_id = ANY (SELECT item_kit_items.item_id FROM item_kit_items WHERE item_kit_items.item_kit_id = :item_kit_id)");
        $stmt->bindParam(":store_id", $store_id, PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_id", $item_kit_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveItemKitItemRecord($conn, $itemKitItemData)
    {
        $stmt = $conn->prepare("SELECT * FROM item_kit_items WHERE item_kit_id = :item_kit_id AND item_id = :item_id");
        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlRetrieveItemKitByStoreId($itemKitData)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveUndeletedItemKitByStoreId($itemKitData)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id AND deleted = :deleted");
        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCreateItemKit($itemKitData, $newStoreSelections, $newItemKitItemIds, $newItemKitItemQuantities)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            foreach ($newStoreSelections as $i => $store) {
                $itemKitData['store_id'] = (int) $store;
                $check_record = self::mdlRetrieveUndeletedItemKitByStoreId($itemKitData);

                if (count($check_record) > 0) {
                    $persistStatus = false;
                    $issuesFaced = true;

                    continue;
                }

                $stmt = $conn->prepare("INSERT INTO item_kits(item_kit_number, name, description, category, unit_price, cost_price, store_id, deleted) VALUES (:item_kit_number, :name, :description, :category, :unit_price, :cost_price, :store_id, :deleted)");
                $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
                $stmt->bindParam(":name", $itemKitData['name'], PDO::PARAM_STR);
                $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
                $stmt->bindParam(":description", $itemKitData['description'], PDO::PARAM_STR);
                $stmt->bindParam(":category", $itemKitData['category'], PDO::PARAM_STR);
                $stmt->bindParam(":unit_price", $itemKitData['unit_price'], PDO::PARAM_STR);
                $stmt->bindParam(":cost_price", $itemKitData['cost_price'], PDO::PARAM_STR);
                $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);
                $deleted = 0;
                $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
                $stmt->execute();

                $newItemKitIdStmt = $conn->prepare("SELECT item_kit_id FROM item_kits WHERE item_kit_number = :item_kit_number AND name = :name ORDER BY item_kit_id DESC");
                $newItemKitIdStmt->bindParam(":item_kit_number", $itemKitData["item_kit_number"], PDO::PARAM_STR);
                $newItemKitIdStmt->bindParam(":name", $itemKitData["name"], PDO::PARAM_STR);
                $newItemKitIdStmt->execute();

                $results = $newItemKitIdStmt->fetch(PDO::FETCH_ASSOC);

                $new_item_kit_id = $results['item_kit_id'];

                foreach ($newItemKitItemIds as $k => $item) {

                    $itemKitItems = array(
                        'item_kit_id' => $new_item_kit_id,
                        'item_id' => (int) $item,
                        'quantity' => (int) $newItemKitItemQuantities[$k],
                    );

                    $created = self::mdlCreateItemKitItems($conn, $itemKitItems);
                }
            }

            $conn->commit();

            return true;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public function mdlCreateItemKitItems($conn, $itemKitItems)
    {
        $stmt = $conn->prepare("INSERT INTO item_kit_items(item_kit_id, item_id, quantity) VALUES (:item_kit_id, :item_id, :quantity)");

        $stmt->bindParam(":item_kit_id", $itemKitItems['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItems['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $itemKitItems['quantity'], PDO::PARAM_STR);

        $stmt->execute();
    }

    public static function mdlUpdateItemKit($currentItemKitNumber, $updateItemKitItemIds, $updateItemActive, $updateItemKitItemQuantities, $editItemKitItemIds, $editItemKitItemQuantities, $updateStoreActive, $updateStoreSelection, $editStoreSelections, $editItemKitData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            //1. FIND ALL ITEM KITS WITH THE SAME ITEM KIT NUMBER & NOT DELETED
            $stmt = $conn->prepare("SELECT item_kits.item_kit_id, item_kits.item_kit_number, item_kits.name, item_kits.description, item_kits.category, item_kits.cost_price, item_kits.unit_price, item_kits.store_id, item_kits.deleted, stores.store_name FROM item_kits JOIN stores ON item_kits.store_id = stores.store_id WHERE item_kit_number = :item_kit_number AND deleted = :deleted");
            $stmt->bindParam(":item_kit_number", $currentItemKitNumber, PDO::PARAM_STR);
            $deleted = 0;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

            $stmt->execute();
            $sameItemKits = $stmt->fetchAll();

            foreach ($sameItemKits as $i => $itemKit) {
                //ITERATE THROUGH ALL ITEM KITS WITH THE SAME ITEM KIT NUMBER
                $table = 'item_kits';
                $itemKitData = array(
                    'item_kit_number' => $editItemKitData['item_kit_number'],
                    'name' => $editItemKitData['name'],
                    'description' => $editItemKitData['description'],
                    'category' => $editItemKitData['category'],
                    'cost_price' => $editItemKitData['cost_price'],
                    'unit_price' => $editItemKitData['unit_price'],
                );

                //SET ITEM KIT ID TO BE UPDATED
                $itemKitIdToUpdate = $itemKit['item_kit_id'];
                $itemKitStoreId = $itemKit['store_id'];

                $itemKitData['item_kit_id'] = $itemKitIdToUpdate;
                $itemKitData['store_id'] = $itemKitStoreId;

                //SET ITEM KIT ID TO BE UPDATED
                $stmt = $conn->prepare("UPDATE item_kits SET item_kit_number = :item_kit_number, name = :name, description = :description, category = :category, cost_price = :cost_price, unit_price = :unit_price WHERE item_kit_id = :item_kit_id");

                $stmt->bindParam(":item_kit_id", $itemKitData['item_kit_id'], PDO::PARAM_INT);
                $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
                $stmt->bindParam(":name", $itemKitData['name'], PDO::PARAM_STR);
                $stmt->bindParam(":description", $itemKitData['description'], PDO::PARAM_STR);
                $stmt->bindParam(":category", $itemKitData['category'], PDO::PARAM_STR);
                $stmt->bindParam(":cost_price", $itemKitData['cost_price'], PDO::PARAM_STR);
                $stmt->bindParam(":unit_price", $itemKitData['unit_price'], PDO::PARAM_STR);

                $stmt->execute();

                //2. ITERATE THROUGH CURRENT ITEM KIT'S ITEMS AND UPDATE THEM
                foreach ($updateItemKitItemIds as $j => $itemKitItemId) {

                    $itemKitItemData = array(
                        'item_kit_id' => $itemKitIdToUpdate,
                        'item_id' => $itemKitItemId,
                        'quantity' => $updateItemKitItemQuantities[$j],
                    );

                    //IF ITEM HAS BEEN UNCHECKED, DELETE IT FROM THE ITEM KIT
                    //ELSE UPDATE THE ITEM's QUANTITY BASED ON ITS ITEM KIT ID & ITEM ID
                    if ($updateItemActive[$j] == 0) {

                        $response = self::mdlDeleteItemKitItem($conn, $itemKitItemData);

                    } else {

                        $response = self::mdlUpdateItemKitItem($conn, $itemKitItemData);

                    }
                }

                //3. ITERATE THROUGH NEWLY ADDED ITEMS (NOT EXISTING IN CURRENT ITEM KIT)
                //IGNORE IF NOT SET
                if ($editItemKitItemIds != null) {

                    foreach ($editItemKitItemIds as $k => $itemKitItemId) {

                        $itemKitItemData = array(
                            'item_kit_id' => $itemKitData['item_kit_id'],
                            'item_id' => $itemKitItemId,
                            'quantity' => $editItemKitItemQuantities[$k],
                        );

                        //CHECK IF EXISTING RECORD EXISTS (I.E. RETURNS > 0 ROWS)
                        //IF SAME ITEM WAS ADDED, SIMPLY UPDATE THE QUANTITY WITH THE NEW VALUE
                        $check_record = self::mdlRetrieveItemKitItemRecord($conn, $itemKitItemData);

                        if (count($check_record) == 0) {
                            $response = self::mdlCreateItemKitItems($conn, $itemKitItemData);

                        } else {
                            $response = self::mdlUpdateItemKitItem($conn, $itemKitItemData);

                        }
                    }
                }

                //4. ITERATE THROUGH THE STORES THAT ALREADY HAVE THE ITEM KIT
                //THE ONLY MODIFICATION IS TO UNCHECK IT, SO WE SET THOSE THAT HAVE BEEN UNCHECKED WITH DELETED = 0.
                //IGNORE IF NOT UNCHECKED.
                foreach ($updateStoreSelection as $x => $storeId) {
                    //IF THE ITEM WAS UNCHECKED, SET IT TO BE DELETED
                    if ($updateStoreActive[$x] == 0 && $storeId == $itemKitData['store_id']) {
                        $itemKitData = array(
                            'deleted' => 1,
                            'item_kit_id' => $itemKitData['item_kit_id'],
                            'store_id' => $storeId,
                        );
                        $response = self::mdlDeleteItemKit($conn, $itemKitData);
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
                        'item_kit_number' => $editItemKitData['item_kit_number'],
                        'name' => $editItemKitData['name'],
                        'description' => $editItemKitData['description'],
                        'category' => $editItemKitData['category'],
                        'cost_price' => $editItemKitData['cost_price'],
                        'unit_price' => $editItemKitData['unit_price'],
                        'store_id' => $storeId,
                    );

                    //CHECK USING ITEM KIT NUMBER AND STORE ID
                    //IF THERE ARE >0 ROWS FETCHED, MEANS WE NEED TO UPDATE THIS ITEM KIT TO THE STORE
                    //INSTEAD OF CREATING A NEW ITEM KIT
                    $stmt = $conn->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
                    $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
                    $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

                    $stmt->execute();
                    $check_record = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    if (count($check_record) > 0) {
                        $existingRecords = true;
                    }

                    //ONLY CHECK OLD ITEM KIT IF THIS ITEM KIT NUMBER DIFFERS FROM THE NEW ONE
                    //WE ARE RELYING ON ITEM NUMBER FOR SALES SO THIS IS NECESSARY TO PREVENT DUPLICATE ENTRIES
                    if ($editItemKitData['item_kit_number'] != $currentItemKitNumber) {
                        $oldItemKitData = array(
                            'item_kit_number' => $currentItemKitNumber,
                            'name' => $editItemKitData['name'],
                            'description' => $editItemKitData['description'],
                            'category' => $editItemKitData['category'],
                            'cost_price' => $editItemKitData['cost_price'],
                            'unit_price' => $editItemKitData['unit_price'],
                            'store_id' => $storeId,
                        );

                        $stmt = $conn->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
                        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
                        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

                        $stmt->execute();
                        $check_old_records = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        if (count($check_old_records) > 0) {
                            $existingOldRecords = true;
                        }
                    }

                    //IF NO EXISTING RECORDS EXIST, WE WILL CREATE A NEW ITEM KIT FOR THE STORE
                    if (!$existingRecords && !$existingOldRecords) {

                        $stmt = $conn->prepare("INSERT INTO item_kits(item_kit_number, name, description, category, unit_price, cost_price, store_id, deleted) VALUES (:item_kit_number, :name, :description, :category, :unit_price, :cost_price, :store_id, :deleted)");
                        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
                        $stmt->bindParam(":name", $itemKitData['name'], PDO::PARAM_STR);
                        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
                        $stmt->bindParam(":description", $itemKitData['description'], PDO::PARAM_STR);
                        $stmt->bindParam(":category", $itemKitData['category'], PDO::PARAM_STR);
                        $stmt->bindParam(":unit_price", $itemKitData['unit_price'], PDO::PARAM_STR);
                        $stmt->bindParam(":cost_price", $itemKitData['cost_price'], PDO::PARAM_STR);
                        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);
                        $deleted = 0;
                        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
                        $stmt->execute();

                        $newItemKitIdStmt = $conn->prepare("SELECT item_kit_id FROM item_kits WHERE item_kit_number = :item_kit_number AND name = :name ORDER BY item_kit_id DESC");
                        $newItemKitIdStmt->bindParam(":item_kit_number", $itemKitData["item_kit_number"], PDO::PARAM_STR);
                        $newItemKitIdStmt->bindParam(":name", $itemKitData["name"], PDO::PARAM_STR);
                        $newItemKitIdStmt->execute();

                        $response = $newItemKitIdStmt->fetch(PDO::FETCH_ASSOC);

                        $new_item_kit_id = $response['item_kit_id'];

                        //ITERATE THROUGH THE ITEMS OF OUR PREVIOUS ITEM KIT AND ADD THEM TO THIS NEW ITEM KIT
                        foreach ($updateItemKitItemIds as $z => $item) {

                            $itemKitItems = array(
                                'item_kit_id' => $new_item_kit_id,
                                'item_id' => (int) $item,
                                'quantity' => (int) $updateItemKitItemQuantities[$z],
                            );

                            $created = self::mdlCreateItemKitItems($conn, $itemKitItems);
                        }

                        //ITERATE THROUGH THE NEW ITEMS OF OUR PREVIOUS ITEM KIT AND ADD THEM TO THIS NEW ITEM KIT
                        //IGNORE IF NO NEW ITEMS WERE ADDED
                        if ($editItemKitItemIds != null) {
                            foreach ($editItemKitItemIds as $q => $item) {

                                $itemKitItems = array(
                                    'item_kit_id' => $new_item_kit_id,
                                    'item_id' => (int) $item,
                                    'quantity' => (int) $editItemKitItemQuantities[$q],
                                );

                                $created = self::mdlCreateItemKitItems($conn, $itemKitItems);
                            }
                        }
                    } else {
                        //EXISTING RECORDS WERE FOUND, WE NEED TO RETRIEVE THESE RECORDS AND UPDATE THEM
                        //IF EXISTING RECORDS WERE OLD RECORDS, WE NEED TO RESTORE THEM WITH DELETED = 0
                        //AND UPDATE THEM WITH THE NEW ITEM KIT DATA
                        //ELSE, WE SIMPLY NEED TO RESTORE THE RECORD WITH DELETED = 0 AND UPDATE IT

                        if ($existingOldRecords) {
                            $itemKitData = array(
                                'item_kit_number' => $currentItemKitNumber,
                                'name' => $editItemKitData['name'],
                                'description' => $editItemKitData['description'],
                                'category' => $editItemKitData['category'],
                                'cost_price' => $editItemKitData['cost_price'],
                                'unit_price' => $editItemKitData['unit_price'],
                                'store_id' => $storeId,
                            );

                            $stmt = $conn->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
                            $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
                            $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

                            $stmt->execute();
                            $check_old_records = $stmt->fetchAll(PDO::FETCH_ASSOC);

                            //WE WILL ONLY TAKE ONE RECORD TO UPDATE IF THERE IS ALREADY A RECORD
                            if (count($check_old_records) > 0) {
                                $old_item_kit_id = $check_old_records[0]['item_kit_id'];
                                $itemKitData['item_kit_id'] = $old_item_kit_id;
                            }

                            $response = self::mdlRestoreDeletedItemKit($conn, $itemKitData);

                            $newItemKitData = array(
                                'item_kit_id' => $old_item_kit_id,
                                'item_kit_number' => $editItemKitData['item_kit_number'],
                                'name' => $editItemKitData['name'],
                                'description' => $editItemKitData['description'],
                                'category' => $editItemKitData['category'],
                                'cost_price' => $editItemKitData['cost_price'],
                                'unit_price' => $editItemKitData['unit_price'],
                                'store_id' => $storeId,
                            );

                            //SET ITEM KIT ID TO BE UPDATED
                            $stmt = $conn->prepare("UPDATE item_kits SET item_kit_number = :item_kit_number, name = :name, description = :description, category = :category, cost_price = :cost_price, unit_price = :unit_price WHERE item_kit_id = :item_kit_id");

                            $stmt->bindParam(":item_kit_number", $newItemKitData['item_kit_number'], PDO::PARAM_STR);
                            $stmt->bindParam(":name", $newItemKitData['name'], PDO::PARAM_STR);
                            $stmt->bindParam(":description", $newItemKitData['description'], PDO::PARAM_STR);
                            $stmt->bindParam(":category", $newItemKitData['category'], PDO::PARAM_STR);
                            $stmt->bindParam(":cost_price", $newItemKitData['cost_price'], PDO::PARAM_STR);
                            $stmt->bindParam(":unit_price", $newItemKitData['unit_price'], PDO::PARAM_STR);

                            $stmt->execute();

                        } else {
                            $itemKitData = array(
                                'item_kit_number' => $editItemKitData['item_kit_number'],
                                'name' => $editItemKitData['name'],
                                'description' => $editItemKitData['description'],
                                'category' => $editItemKitData['category'],
                                'cost_price' => $editItemKitData['cost_price'],
                                'unit_price' => $editItemKitData['unit_price'],
                                'store_id' => $storeId,
                            );

                            $stmt = $conn->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
                            $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
                            $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

                            $stmt->execute();
                            $check_records = $stmt->fetchAll(PDO::FETCH_ASSOC);

                            //WE WILL ONLY TAKE ONE RECORD TO UPDATE IF THERE IS ALREADY A RECORD
                            if (count($check_records) > 0) {
                                $old_item_kit_id = $check_records[0]['item_kit_id'];
                                $itemKitData['item_kit_id'] = $old_item_kit_id;
                            }

                            $response = ItemKitModel::mdlRestoreDeletedItemKit($conn, $itemKitData);
                        }
                    }
                }
            }

            $conn->commit();

            return true;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public static function mdlDeleteItemKit($conn, $itemKitData)
    {
        $stmt = $conn->prepare("UPDATE item_kits SET deleted = :deleted WHERE item_kit_id = :item_kit_id AND store_id = :store_id");

        $deleted = 1;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_id", $itemKitData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlRestoreDeletedItemKit($conn, $itemKitData)
    {
        $stmt = $conn->prepare("UPDATE item_kits SET name = :name, description = :description, category = :category, cost_price = :cost_price, unit_price = :unit_price, deleted = :deleted WHERE item_kit_id = :item_kit_id AND item_kit_number = :item_kit_number AND store_id = :store_id");

        $stmt->bindParam(":item_kit_id", $itemKitData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
        $stmt->bindParam(":name", $itemKitData['name'], PDO::PARAM_STR);
        $stmt->bindParam(":description", $itemKitData['description'], PDO::PARAM_STR);
        $stmt->bindParam(":category", $itemKitData['category'], PDO::PARAM_STR);
        $stmt->bindParam(":cost_price", $itemKitData['cost_price'], PDO::PARAM_STR);
        $stmt->bindParam(":unit_price", $itemKitData['unit_price'], PDO::PARAM_STR);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlDeleteItemKitItem($conn, $itemKitItemData)
    {
        $stmt = $conn->prepare("DELETE FROM item_kit_items WHERE item_kit_id = :item_kit_id AND item_id = :item_id ");

        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlUpdateItemKitItem($conn, $itemKitItemData)
    {
        $stmt = $conn->prepare("UPDATE item_kit_items SET quantity = :quantity WHERE item_kit_id = :item_kit_id AND item_id = :item_id");

        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $itemKitItemData['quantity'], PDO::PARAM_STR);

        $stmt->execute();
    }
}
