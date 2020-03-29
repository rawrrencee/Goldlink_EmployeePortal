<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/sales.controller.php";
require_once "../models/sales.model.php";

class AjaxSales
{
    public $salesId;
    public $startDate;
    public $endDate;

    public function getTotalSalesForCurrentMonth()
    {

        $answer = SalesController::ctrViewTotalSalesForCurrentMonth();

        echo json_encode($answer);
    }

    public function getTotalSalesByTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;

        $answer = SalesController::ctrViewTotalSalesForAllStoresByTime($startDate, $endDate);

        echo json_encode($answer);
    }

}

if (isset($_POST['get_total_sales_for_current_month'])) {

    $getTotalSalesForCurrentMonth = new AjaxSales();
    $getTotalSalesForCurrentMonth -> getTotalSalesForCurrentMonth();

}

if (isset($_POST['get_total_sales_by_start_date']) && isset($_POST['get_total_sales_by_end_date'])) {

    $getTotalSalesByTime = new AjaxSales();
    $getTotalSalesByTime -> startDate = $_POST['get_total_sales_by_start_date'];
    $getTotalSalesByTime -> endDate = $_POST['get_total_sales_by_end_date'];

    $getTotalSalesByTime -> getTotalSalesByTime();
}