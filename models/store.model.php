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
            $stmt = Connection::connect()->prepare("SELECT * FROM $table ORDER BY store_id ASC");

            $stmt->execute();

            return $stmt->fetchAll();
        }

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