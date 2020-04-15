<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/store.controller.php";
require_once "../models/store.model.php";

class AjaxStores
{
    public $storeId;

    public function getAllStores()
    {

        $answer = StoreController::ctrViewAllStores($item, $value);
        
        $reorderedList = [];
        $delayedPush = [];
        foreach($answer as $store) {
            if ($store['store_id'] === 3 || $store['store_id'] === 6 || $store['store_id'] === 7 || $store['store_id'] === 8 || $store['store_id'] === 9) {
                array_push($delayedPush, $store);
            } else {
                array_push($reorderedList, $store);
            }
        }
        foreach ($delayedPush as $store) {
            array_push($reorderedList, $store);
        }

        echo json_encode($reorderedList);

    }


}

if (isset($_POST['get_all_stores'])) {

    $getAllStores = new AjaxStores();
    $getAllStores -> storeId = $_POST['get_all_stores'];
    $getAllStores -> getAllStores();
}