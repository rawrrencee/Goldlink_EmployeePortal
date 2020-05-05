<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/supplier.controller.php";
require_once "../models/supplier.model.php";

class AjaxSuppliers
{
    public $supplierId;

    public function getSupplierDetails()
    {

        $value = $this->supplierId;

        $answer = SupplierController::ctrViewSupplierByPersonId($value);

        echo json_encode($answer);

    }

}

if (isset($_POST['person_id'])) {

    $getSupplierDetails = new AjaxSuppliers();
    $getSupplierDetails -> supplierId = $_POST['person_id'];
    $getSupplierDetails -> getSupplierDetails();

}