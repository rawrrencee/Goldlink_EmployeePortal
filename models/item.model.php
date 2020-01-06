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

    public static function mdlViewAllCategories() {
        $stmt = Connection::connect()->prepare("SELECT DISTINCT category FROM items WHERE deleted = :deleted ORDER BY category ASC");

        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCreateNewItem($table, $itemData)
    {
        $stmt = Connection::connect()->prepare("INSERT INTO $table(name, category, supplier_id, item_number, description, cost_price, unit_price, reorder_level, location, allow_alt_description, is_serialized, deleted, factory_id) VALUES (:name, :category, :supplier_id, :item_number, :description, :cost_price, :unit_price, :reorder_level, :location, :allow_alt_description, :is_serialized, :deleted, :factory_id)");

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

        if ($stmt->execute()) {
            $newItemIdStmt = Connection::connect()->prepare("SELECT item_id FROM $table WHERE item_number = :item_number AND name = :name ORDER BY item_id DESC");
            $newItemIdStmt->bindParam(":item_number", $itemData["item_number"], PDO::PARAM_STR);
            $newItemIdStmt->bindParam(":name", $itemData["name"], PDO::PARAM_STR);
            $newItemIdStmt->execute();

            $results = $newItemIdStmt->fetch(PDO::FETCH_ASSOC);

            return $results;
        } else {
            $error = print_r($stmt->errorInfo(), true);
            return error;
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlAddItemToStore($table, $data)
    {
        $checkStmt = Connection::connect()->prepare("SELECT * FROM $table WHERE store_id = :store_id AND item_id = :item_id");

        $checkStmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
        $checkStmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);

        $checkStmt->execute();
        $results = count($checkStmt->fetchAll(PDO::FETCH_ASSOC));

        $active = 1; // active by default

        if ($results == 0) {
            $insertStmt = Connection::connect()->prepare("INSERT INTO $table(store_id, item_id, quantity, active) VALUES (:store_id, :item_id, :quantity, :active)");
            // Item not created before
            $insertStmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
            $insertStmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);
            $insertStmt->bindParam(":quantity", $data["quantity"], PDO::PARAM_INT);
            $insertStmt->bindParam(":active", $active, PDO::PARAM_INT);

            if ($insertStmt->execute()) {
                $addedStoreItem = self::mdlViewStoreItemStatusByStoreId($table, $data);
                return $addedStoreItem;
            } else {
                return false;
            }
        } else {
            return false;
        }
        $checkStmt->close();
        $checkStmt = null;
        $insertStmt->close();
        $insertStmt = null;
    }

    public static function mdlViewItemByItemId($table, $value) {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_id = :item_id");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewStoresWithItem($table, $value){
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_id = :item_id");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewStoreItemStatusByStoreId($table, $data){
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_id = :item_id AND store_id = :store_id");
        $stmt->bindParam(":item_id", $data["item_id"], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $data["store_id"], PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemWithStoreData($table, $value){
        $stmt = Connection::connect()->prepare("SELECT stores_items.store_id, stores_items.item_id, stores_items.quantity, stores_items.active, stores.store_name FROM $table JOIN stores_items ON $table.item_id = stores_items.item_id JOIN stores ON stores_items.store_id = stores.store_id WHERE $table.item_id = :item_id AND stores_items.active = :active ORDER BY stores.store_id ASC");
        $stmt->bindParam(":item_id", $value, PDO::PARAM_INT);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlEditItem($table, $itemData){
        $stmt = Connection::connect()->prepare("UPDATE $table SET item_number = :item_number, factory_id = :factory_id, name = :name, category = :category, cost_price = :cost_price, unit_price = :unit_price, description = :description, supplier_id = :supplier_id WHERE item_id = :item_id");

        //CHECK IF ITEM_NUMBER ALREADY EXISTS 
        $checkStmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_number = :item_number");
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

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        return false;

        $stmt->close();
        $stmt = null;
    }

    public static function mdlUpdateStoreItem($table, $storeItemData) {
        $stmt = Connection::connect()->prepare("UPDATE $table SET quantity = :quantity, active = :active WHERE item_id = :item_id AND store_id = :store_id");

        $stmt->bindParam(":item_id", $storeItemData['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $storeItemData['store_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $storeItemData['quantity'], PDO::PARAM_INT);
        $stmt->bindParam(":active", $storeItemData['active'], PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;
    }
}
