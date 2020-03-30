<?php

require_once "connection.php";

class ItemModel
{

    public static function mdlViewAllItems()
    {
        //Merge `items` and `stores_items` table
        //Presents items arranged by store
        $stmt = Connection::connect()->prepare("SELECT items.name,items.category,items.supplier_id,items.item_number,items.unit_price,stores_items.quantity,items.item_id,stores.store_name,items.factory_id FROM items JOIN stores_items ON items.item_id = stores_items.item_id JOIN stores ON stores_items.store_id = stores.store_id WHERE stores_items.active = ? AND items.deleted = ? ORDER BY stores_items.store_id");
        $stmt->execute([1, 0]);

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllCategories()
    {
        $stmt = Connection::connect()->prepare("SELECT DISTINCT category FROM items WHERE deleted = :deleted ORDER BY category ASC");

        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCreateNewItem($itemData, $newStoreSelections, $newItemQuantities)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {

            $conn->beginTransaction();
            $stmt = $conn->prepare("INSERT INTO items(name, category, supplier_id, item_number, description, cost_price, unit_price, reorder_level, location, allow_alt_description, is_serialized, deleted, factory_id) VALUES (:name, :category, :supplier_id, :item_number, :description, :cost_price, :unit_price, :reorder_level, :location, :allow_alt_description, :is_serialized, :deleted, :factory_id)");

            $stmt->bindParam(":name", $itemData["name"], PDO::PARAM_STR);
            $stmt->bindParam(":category", $itemData["category"], PDO::PARAM_STR);
            $stmt->bindParam(":supplier_id", $itemData["supplier_id"], PDO::PARAM_INT);
            $stmt->bindParam(":item_number", $itemData["item_number"], PDO::PARAM_STR);
            $stmt->bindParam(":description", $itemData["description"], PDO::PARAM_STR);
            $stmt->bindParam(":cost_price", $itemData["cost_price"], PDO::PARAM_STR);
            $stmt->bindParam(":unit_price", $itemData["unit_price"], PDO::PARAM_STR);
            $stmt->bindParam(":reorder_level", $itemData["reorder_level"], PDO::PARAM_STR);
            $stmt->bindParam(":location", $itemData["location"], PDO::PARAM_STR);
            $stmt->bindParam(":allow_alt_description", $itemData["allow_alt_description"], PDO::PARAM_INT);
            $stmt->bindParam(":is_serialized", $itemData["is_serialized"], PDO::PARAM_INT);
            $deleted = 0; // set default to not deleted
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":factory_id", $itemData["factory_id"], PDO::PARAM_STR);

            $stmt->execute();

            $newItemIdStmt = $conn->prepare("SELECT item_id FROM items WHERE item_number = :item_number AND name = :name ORDER BY item_id DESC");
            $newItemIdStmt->bindParam(":item_number", $itemData["item_number"], PDO::PARAM_STR);
            $newItemIdStmt->bindParam(":name", $itemData["name"], PDO::PARAM_STR);
            $newItemIdStmt->execute();

            $results = $newItemIdStmt->fetch(PDO::FETCH_ASSOC);
            $new_item_id = $results['item_id'];

            foreach ($newStoreSelections as $i => $store) {
                if ($newItemQuantities[$i] == "" or is_null($newItemQuantities[$i])) {
                    $newItemQuantities[$i] = 0;
                }
                $data = array('item_id' => $new_item_id, 'store_id' => (int) $store, 'quantity' => (int) $newItemQuantities[$i]);

                $stmt = $conn->prepare("SELECT * FROM stores_items WHERE item_id = :item_id AND store_id = :store_id");
                $stmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);
                $stmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
                $stmt->execute();

                $check_record = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (count($check_record) == 0) {
                    $added = self::mdlAddItemToStore($conn, $data);

                } else {
                    if ($check_record['active'] === 0) {
                        $data['active'] = 1;
                        $added = self::mdlUpdateStoreItem($conn, $data);
                    }
                }
            }

            $conn->commit();

            return $new_item_id;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }

        return false;
    }

    public static function mdlAddItemToStore($conn, $data)
    {
        $checkStmt = $conn->prepare("SELECT * FROM stores_items WHERE store_id = :store_id AND item_id = :item_id");

        $checkStmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
        $checkStmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);

        $checkStmt->execute();
        $results = count($checkStmt->fetchAll(PDO::FETCH_ASSOC));

        $active = 1; // active by default

        if ($results == 0) {
            $insertStmt = $conn->prepare("INSERT INTO stores_items(store_id, item_id, quantity, active) VALUES (:store_id, :item_id, :quantity, :active)");
            // Item not created before
            $insertStmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
            $insertStmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);
            $insertStmt->bindParam(":quantity", $data["quantity"], PDO::PARAM_INT);
            $insertStmt->bindParam(":active", $active, PDO::PARAM_INT);

            if ($insertStmt->execute()) {
                $addedStoreItem = self::mdlViewStoreItemStatusByStoreId($data);
                return $addedStoreItem;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function mdlViewItemByItemId($table, $value)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_id = :item_id");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemsInCategory($category) {
        
        $stmt = Connection::connect()->prepare("SELECT * FROM items WHERE category = :category");
        
        $stmt->bindParam(":category", $category, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public static function mdlViewItemByItemNumber($value)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("SELECT * FROM items WHERE item_number = :item_number");

        $stmt->bindParam(":item_number", $value, PDO::PARAM_STR);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewStoresWithItem($table, $value)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_id = :item_id");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewStoreItemStatusByStoreId($data)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM stores_items WHERE item_id = :item_id AND store_id = :store_id");
        $stmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewItemWithStoreData($table, $value)
    {
        $stmt = Connection::connect()->prepare("SELECT stores_items.store_id, stores_items.item_id, stores_items.quantity, stores_items.active, stores.store_name FROM $table JOIN stores_items ON $table.item_id = stores_items.item_id JOIN stores ON stores_items.store_id = stores.store_id WHERE $table.item_id = :item_id AND stores_items.active = :active ORDER BY stores.store_id ASC");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlEditItem($itemData, $updateStoreActive, $updateStoreSelection, $updateStoreQuantity, $editStoreSelections, $editItemQuantities)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("UPDATE items SET item_number = :item_number, factory_id = :factory_id, name = :name, category = :category, cost_price = :cost_price, unit_price = :unit_price, description = :description, supplier_id = :supplier_id WHERE item_id = :item_id");

            //CHECK IF ITEM_NUMBER ALREADY EXISTS
            $checkStmt = $conn->prepare("SELECT * FROM items WHERE item_number = :item_number");
            $checkStmt->bindParam(":item_number", $itemData['item_number'], PDO::PARAM_STR);
            $checkStmt->execute();
            $response = $checkStmt->fetchAll(PDO::FETCH_ASSOC);

            if (count($response) == 1) {
                //ALREADY EXISTS ITEM WITH SAME UPC/EAN/ISBN (item_number)
                //IF ITEM IS NOT THE SAME, RETURN FALSE
                if ($response[0]['item_id'] != $itemData['item_id']) {
                    return false;
                }
            }

            if (count($response) > 1) {
                return false;
            }

            $stmt->bindParam(":item_id", $itemData['item_id'], PDO::PARAM_INT);

            $stmt->bindParam(":item_number", $itemData['item_number'], PDO::PARAM_STR);
            $stmt->bindParam(":factory_id", $itemData['factory_id'], PDO::PARAM_STR);
            $stmt->bindParam(":name", $itemData['name'], PDO::PARAM_STR);
            $stmt->bindParam(":category", $itemData['category'], PDO::PARAM_STR);
            $stmt->bindParam(":cost_price", $itemData['cost_price'], PDO::PARAM_STR);
            $stmt->bindParam(":unit_price", $itemData['unit_price'], PDO::PARAM_STR);
            $stmt->bindParam(":description", $itemData['description'], PDO::PARAM_STR);
            $stmt->bindParam(":supplier_id", $itemData['supplier_id'], PDO::PARAM_INT);

            $stmt->execute();
            
            // UPDATE STORE ITEM INFORMATION
            foreach ($updateStoreSelection as $i => $store) {
                if ($updateStoreQuantity[$i] == "" or is_null($updateStoreQuantity[$i])) {
                    $updateStoreQuantity[$i] = 0;
                }
                $storeItemData = array(
                    'item_id' => $itemData['item_id'],
                    'store_id' => (int) $store,
                    'quantity' => (int) $updateStoreQuantity[$i],
                    'active' => (int) $updateStoreActive[$i]);

                $response = self::mdlUpdateStoreItem($conn, $storeItemData);
            }

            // ADD STORES+QTY IF NOT ALREADY EXISTING (ELSE FAIL)
            foreach ($editStoreSelections as $i => $store) {
                if ($editItemQuantities[$i] == "" or is_null($editItemQuantities[$i])) {
                    $editItemQuantities[$i] = 0;
                }
                $data = array('item_id' => $itemData['item_id'], 'store_id' => (int) $store, 'quantity' => (int) $editItemQuantities[$i]);
                $check_record = self::mdlViewStoreItemStatusByStoreId($data);

                if (count($check_record) == 0) {
                    $added = self::mdlAddItemToStore($conn, $data);
                } else {
                    if ($check_record['active'] == 0) {
                        $data['active'] = 1;
                        $added = self::mdlUpdateStoreItem($conn, $data);
                    }
                }
                if (!$added) {
                    $response = false;
                }
            }

            $conn->commit();

            return true;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }

        return false;
    }

    public static function mdlUpdateStoreItem($conn, $storeItemData)
    {
        $stmt = $conn->prepare("UPDATE stores_items SET quantity = :quantity, active = :active WHERE item_id = :item_id AND store_id = :store_id");

        $stmt->bindParam(":item_id", $storeItemData['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $storeItemData['store_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $storeItemData['quantity'], PDO::PARAM_INT);
        $stmt->bindParam(":active", $storeItemData['active'], PDO::PARAM_INT);

        $stmt->execute();
    }
}
