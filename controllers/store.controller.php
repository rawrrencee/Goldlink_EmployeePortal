<?php

class StoreController{

    public static function ctrViewAllStores($item, $value) {
        $table="stores";
        $response = StoreModel::mdlViewAllStores($table, $item, $value);

        return $response;
    }

    //SPECIAL FUNCTION TO RETURN STORE CODES NOT IN USE
    //FOR CUSTOMER-ARCHIVES PAGE ONLY
    public static function ctrViewAllStoreCodes(){
        $response = StoreModel::mdlViewAllStoreCodes();
        return $response;
    }

    public static function ctrViewAllowedStores($person_id) {
        $table = 'stores_employees';
        $response = StoreModel::mdlViewAllowedStores($table, $person_id);

        return $response;
    }

    public static function ctrViewStoreByStoreId($store_id) {
        $table = 'stores';
        $response = StoreModel::mdlViewStoreByStoreId($table, $store_id);

        return $response;
    }

    public static function ctrSwitchStore(){
        $storeToSwitch = $_POST['switchStore'];

        $response = self::ctrViewStoreByStoreId($storeToSwitch);
        
        $_SESSION['store_name'] = $response["store_name"];
        $_SESSION['store_id'] = $response["store_id"];

        return;
    }
}