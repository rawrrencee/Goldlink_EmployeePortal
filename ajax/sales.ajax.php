<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/sales.controller.php";
require_once "../models/sales.model.php";

class AjaxSales
{
    public $salesId;

    public function getSales()
    {

        $answer = SalesController::ctrViewAllSales();

        echo json_encode($answer);
    }

}

if (isset($_POST['get_sales'])) {

    $getSales = new AjaxSales();
    $getSales -> getSales();

}