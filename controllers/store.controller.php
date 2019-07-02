<?php

class StoreController{

    public static function ctrViewAllStores($item, $value) {
        $table="stores";
        $response = StoreModel::mdlViewAllStores($table, $item, $value);

        return $response;
    }

    public static function ctrViewStoreByStoreId($store_id) {
        $table = 'stores';
        $response = StoreModel::mdlViewStoreByStoreId($table, $store_id);

        return $response;
    }
}