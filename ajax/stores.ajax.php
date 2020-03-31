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

        echo json_encode($answer);

    }


}

if (isset($_POST['get_all_stores'])) {

    $getAllStores = new AjaxStores();
    $getAllStores -> storeId = $_POST['get_all_stores'];
    $getAllStores -> getAllStores();
}