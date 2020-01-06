<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/item.controller.php";
require_once "../models/item.model.php";

class AjaxItems
{
    public $itemId;

    public function getItemDetails()
    {

        $value = $this->itemId;

        $answer = ItemController::ctrViewItemByItemId($value);

        echo json_encode($answer);

    }

    public function getStoresWithItem()
    {

        $value = $this->itemId;

        $answer = ItemController::ctrViewItemWithStoreData($value);

        echo json_encode($answer);

    }

}

if (isset($_POST['item_id'])) {

    $getItemDetails = new AjaxItems();
    $getItemDetails -> itemId = $_POST['item_id'];
    $getItemDetails -> getItemDetails();

}

if (isset($_POST['getStoresWithItem_item_id'])) {

    $getStoresWithItem = new AjaxItems();
    $getStoresWithItem -> itemId = $_POST['getStoresWithItem_item_id'];
    $getStoresWithItem -> getStoresWithItem();

}