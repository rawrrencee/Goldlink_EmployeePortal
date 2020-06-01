<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/item-kit.controller.php";
require_once "../models/item-kit.model.php";

class AjaxItemKits
{
    public $itemKitId;

    public $storeId;
    public $itemKitNumber;

    public function getItemKitDetails() {

        $value = $this->itemKitId;

        $answer = ItemKitController::ctrViewItemKitByItemKitId($value);

        echo json_encode($answer);

    }

    public function getItemKitStores()
    {

        $value = $this->itemKitId;

        $answer = ItemKitController::ctrRetrieveDuplicateItemKitsByItemKitId($value);

        echo json_encode($answer);

    }

    public function getItemKitItems(){
        
        $value = $this->itemKitId;

        $answer = ItemKitController::ctrRetrieveItemKitItemsByItemKitId($value);

        echo json_encode($answer);
    }

    public function getStoreItemDetails(){
        $storeId = $this->storeId;
        $itemKitId = $this->itemKitId;

        $answer = ItemKitController::ctrRetrieveStoreItemDetails($storeId, $itemKitId);

        echo json_encode($answer);
    }

    public function checkItemKitImageExists() {

        $value = $this->itemKitNumber;
        $routeImg = "../uploads/item-kits/" . $value . "/item-kit.jpg";

        if (file_exists($routeImg)) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }

    }

}

if (isset($_POST['getItemKitStores'])) {

    $getItemKitStores = new AjaxItemKits();
    $getItemKitStores -> itemKitId = $_POST['getItemKitStores'];
    $getItemKitStores -> getItemKitStores();

}

if (isset($_POST['getItemKitItems'])) {

    $getItemKitItems = new AjaxItemKits();
    $getItemKitItems -> itemKitId = $_POST['getItemKitItems'];
    $getItemKitItems -> getItemKitItems();

}


if (isset($_POST['getItemKitDetails'])) {

    $getItemKitDetails = new AjaxItemKits();
    $getItemKitDetails -> itemKitId = $_POST['getItemKitDetails'];
    $getItemKitDetails -> getItemKitDetails();

}

if (isset($_POST['storeId'])) {

    $getStoreItemDetails = new AjaxItemKits();
    $getStoreItemDetails -> storeId = json_decode($_POST['storeId']);
    $getStoreItemDetails -> itemKitId = json_decode($_POST['itemKitId']);
    $getStoreItemDetails -> getStoreItemDetails();

}

if (isset($_POST['checkItemKitImageExists'])) {

    $checkItemKitImageExists = new AjaxItemKits();
    $checkItemKitImageExists -> itemKitNumber = $_POST['checkItemKitImageExists'];
    $checkItemKitImageExists -> checkItemKitImageExists();

}