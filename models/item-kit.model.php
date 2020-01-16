<?php

require_once "connection.php";

class ItemKitModel
{

    public static function mdlViewItemKitByItemKitId($table, $value) {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_kit_id = :item_kit_id");
        $stmt->bindParam(":item_kit_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemKitByItemKitNumber($table, $value) {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_kit_number = :item_kit_number AND deleted = :deleted");
        $stmt->bindParam(":item_kit_number", $value, PDO::PARAM_STR);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllCategories() {
        $stmt = Connection::connect()->prepare("(SELECT items.category FROM items WHERE deleted = 0) UNION (SELECT item_kits.category FROM item_kits WHERE deleted = 0) ORDER BY category ASC");

        //$deleted = 0;
        //$stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllItemKitsByItemKitNumber($table, $item_kit_number) {
        $stmt = Connection::connect()->prepare("SELECT $table.item_kit_id, $table.item_kit_number, $table.name, $table.description, $table.category, $table.cost_price, $table.unit_price, $table.store_id, $table.deleted, stores.store_name FROM $table JOIN stores ON $table.store_id = stores.store_id WHERE item_kit_number = :item_kit_number AND deleted = :deleted");
        $stmt->bindParam(":item_kit_number", $item_kit_number, PDO::PARAM_STR);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewItemKitItemsByItemKitId($table, $item_kit_id){
        $stmt = Connection::connect()->prepare("SELECT items.item_id, items.name, items.unit_price, $table.quantity, $table.item_kit_id, $table.quantity FROM $table JOIN items ON items.item_id = $table.item_id WHERE $table.item_kit_id = :item_kit_id");
        $stmt->bindParam(":item_kit_id", $item_kit_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveStoreItemsByItemKitId($store_id, $item_kit_id) {
        $stmt = Connection::connect()->prepare("SELECT items.item_id, items.name, items.item_number, stores_items.quantity, items.unit_price FROM stores_items JOIN items ON stores_items.item_id = items.item_id WHERE stores_items.store_id = :store_id AND stores_items.item_id = ANY (SELECT item_kit_items.item_id FROM item_kit_items WHERE item_kit_items.item_kit_id = :item_kit_id)");
        $stmt->bindParam(":store_id", $store_id, PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_id", $item_kit_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveItemKitItemRecord($table, $itemKitItemData) {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE item_kit_id = :item_kit_id AND item_id = :item_id");
        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
        
    }

    public static function mdlRetrieveItemKitByStoreId($itemKitData) {
        $stmt = Connection::connect()->prepare("SELECT * FROM item_kits WHERE item_kit_number = :item_kit_number AND store_id = :store_id");
        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRetrieveUndeletedItemKitByStoreId($itemKitData) {
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

    public static function mdlCreateItemKit($itemKitData, $newStoreSelections, $newItemKitItemIds, $newItemKitItemQuantities) {
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

    public function mdlCreateItemKitItems($conn, $itemKitItems) {
        $stmt = $conn->prepare("INSERT INTO item_kit_items(item_kit_id, item_id, quantity) VALUES (:item_kit_id, :item_id, :quantity)");

        $stmt->bindParam(":item_kit_id", $itemKitItems['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItems['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $itemKitItems['quantity'], PDO::PARAM_STR);

        $stmt->execute();
    }

    public static function mdlUpdateItemKit($table, $itemKitData){
        $stmt = Connection::connect()->prepare("UPDATE $table SET item_kit_number = :item_kit_number, name = :name, description = :description, category = :category, cost_price = :cost_price, unit_price = :unit_price WHERE item_kit_id = :item_kit_id");

        $stmt->bindParam(":item_kit_id", $itemKitData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_number", $itemKitData['item_kit_number'], PDO::PARAM_STR);
        $stmt->bindParam(":name", $itemKitData['name'], PDO::PARAM_STR);
        $stmt->bindParam(":description", $itemKitData['description'], PDO::PARAM_STR);
        $stmt->bindParam(":category", $itemKitData['category'], PDO::PARAM_STR);
        $stmt->bindParam(":cost_price", $itemKitData['cost_price'], PDO::PARAM_STR);
        $stmt->bindParam(":unit_price", $itemKitData['unit_price'], PDO::PARAM_STR);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlDeleteItemKit($table, $itemKitData) {
        $stmt = Connection::connect()->prepare("UPDATE $table SET deleted = :deleted WHERE item_kit_id = :item_kit_id AND store_id = :store_id");

        $deleted = 1;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->bindParam(":item_kit_id", $itemKitData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $itemKitData['store_id'], PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlRestoreDeletedItemKit($table, $itemKitData){
        $stmt = Connection::connect()->prepare("UPDATE $table SET name = :name, description = :description, category = :category, cost_price = :cost_price, unit_price = :unit_price, deleted = :deleted WHERE item_kit_id = :item_kit_id AND item_kit_number = :item_kit_number AND store_id = :store_id");

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

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlDeleteItemKitItem($table, $itemKitItemData) {
        $stmt = Connection::connect()->prepare("DELETE FROM item_kit_items WHERE item_kit_id = :item_kit_id AND item_id = :item_id ");

        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);

        if ($stmt->execute()){
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;

    }

    public static function mdlUpdateItemKitItem($table, $itemKitItemData){
        $stmt = Connection::connect()->prepare("UPDATE $table SET quantity = :quantity WHERE item_kit_id = :item_kit_id AND item_id = :item_id");

        $stmt->bindParam(":item_kit_id", $itemKitItemData['item_kit_id'], PDO::PARAM_INT);
        $stmt->bindParam(":item_id", $itemKitItemData['item_id'], PDO::PARAM_INT);
        $stmt->bindParam(":quantity", $itemKitItemData['quantity'], PDO::PARAM_STR);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $stmt = null;
    }
}
