<?php

session_start();
require_once "../controllers/item.controller.php";
require_once "../models/item.model.php";

$term = trim(strip_tags($_GET['term']));
$row_set = array();
$itemController = new ItemController();

$data = $itemController->ctrViewItemByItemId($term);
$row['label']=htmlentities(stripslashes($data['name']));
$row['value']=htmlentities(stripslashes($data['item_number']));
$row['extra']=htmlentities(stripslashes($data['item_number']));

$row_set[] = $row;

echo json_encode($row_set);

?>