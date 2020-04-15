<?php

require_once "connection.php";

class StoreModel
{
    public static function mdlViewAllStores($table, $item, $value)
    {
        if ($item != null) {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE $item = :$item");
            $stmt->bindParam(":" . $item, $value, PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetch();
        } else {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table ORDER BY store_id DESC");

            $stmt->execute();

            return $stmt->fetchAll();
        }

        $stmt->close();
        $stmt = null;
    }

    //USED FOR CUSTOMER ARCHIVES
    //RETRIEVES STORES NO LONGER USED
    public static function mdlViewAllStoreCodes(){
        $stmt = Connection::connect()->prepare("SELECT DISTINCT store FROM customers JOIN stores ON customers.store NOT IN (SELECT store_code FROM stores) AND deleted = :deleted");

        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewAllowedStores($table, $value) {
        $stmt = Connection::connect()->prepare("SELECT stores.store_id, stores.store_name FROM $table JOIN stores ON $table.store_id = stores.store_id WHERE $table.person_id = :person_id ORDER BY stores.store_name ASC");
        $stmt->bindParam(":person_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewStoreByStoreId($table, $value) {
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE store_id = :store_id");
        $stmt->bindParam(":store_id", $value, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }
}