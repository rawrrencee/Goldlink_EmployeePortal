<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/sales.controller.php";
require_once "../controllers/stocktakes.controller.php";
require_once "../models/sales.model.php";
require_once "../models/stocktakes.model.php";

class AjaxSales
{
    public $salesId;
    public $startDate;
    public $endDate;
    public $stocktakeDate;

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

    public function getPdtCatSalesInventoryByTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;
        $stocktakeDate = $this->stocktakeDate;

        $answer = SalesController::ctrViewPdtCatSalesInventoryByTime($startDate, $endDate, $stocktakeDate);
        $latestStocktakeDate = StocktakesController::ctrViewLatestStocktakeDate($stocktakeDate);
        
        $latestStocktakeQty = StocktakesController::ctrViewAllCategoryStocktakesByDate($latestStocktakeDate);

        for ($index = 0; $index < count($answer); $index++) {
            for ($j = 0; $j < count($latestStocktakeQty); $j++) {
                $key = array_search($answer[$index]['category'], $latestStocktakeQty[$j]);
                if ($key != false) {
                    $answer[$index]['stockCount'] = $latestStocktakeQty[$j]['stockCount'];
                    $answer[$index]['latestStocktakeDate'] = $latestStocktakeDate;
                    break;
                } else {
                    $answer[$index]['stockCount'] = 0;
                    $answer[$index]['latestStocktakeDate'] = $latestStocktakeDate;
                }
            }
        }

        echo json_encode($answer);
    }

    public function getTotalCategorySalesByTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;

        $answer = SalesController::ctrViewTotalCategorySalesByTime($startDate, $endDate);

        echo json_encode($answer);
    }

    public function getTotalItemSalesByTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;

        $answer = SalesController::ctrViewTotalItemSalesByTime($startDate, $endDate);

        echo json_encode($answer);
    }

    public function getTotalItemKitSalesByTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;

        $answer = SalesController::ctrViewTotalItemKitSalesByTime($startDate, $endDate);

        echo json_encode($answer);
    }

    public function getTotalItemSalesByStoreCodeAndTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;
        $storeCode = $this->storeCode;

        $answer = SalesController::ctrViewTotalItemSalesByStoreCodeAndTime($startDate, $endDate, $storeCode);

        echo json_encode($answer);
    }

    public function getTotalItemKitSalesByStoreCodeAndTime() {

        $startDate = $this->startDate;
        $endDate = $this->endDate;
        $storeCode = $this->storeCode;

        $answer = SalesController::ctrViewTotalItemKitSalesByStoreCodeAndTime($startDate, $endDate, $storeCode);

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

if (isset($_POST['get_total_category_sales_by_start_date']) && isset($_POST['get_total_category_sales_by_end_date']) && !isset($_POST['get_total_category_stocktake_by_date'])) {

    $getTotalCategorySalesByTime = new AjaxSales();
    $getTotalCategorySalesByTime -> startDate = $_POST['get_total_category_sales_by_start_date'];
    $getTotalCategorySalesByTime -> endDate = $_POST['get_total_category_sales_by_end_date'];

    $getTotalCategorySalesByTime -> getTotalCategorySalesByTime();
}

if (isset($_POST['get_total_category_sales_by_start_date']) && isset($_POST['get_total_category_sales_by_end_date']) && isset($_POST['get_total_category_stocktake_by_date'])) {

    $getPdtCatSalesInventoryByTime = new AjaxSales();
    $getPdtCatSalesInventoryByTime -> startDate = $_POST['get_total_category_sales_by_start_date'];
    $getPdtCatSalesInventoryByTime -> endDate = $_POST['get_total_category_sales_by_end_date'];
    $getPdtCatSalesInventoryByTime -> stocktakeDate = $_POST['get_total_category_stocktake_by_date'];

    $getPdtCatSalesInventoryByTime -> getPdtCatSalesInventoryByTime();
}

if (isset($_POST['get_total_item_sales_by_start_date']) && isset($_POST['get_total_item_sales_by_end_date'])) {

    $getTotalItemSalesByTime = new AjaxSales();
    $getTotalItemSalesByTime -> startDate = $_POST['get_total_item_sales_by_start_date'];
    $getTotalItemSalesByTime -> endDate = $_POST['get_total_item_sales_by_end_date'];

    $getTotalItemSalesByTime -> getTotalItemSalesByTime();
}

if (isset($_POST['get_total_item_kit_sales_by_start_date']) && isset($_POST['get_total_item_kit_sales_by_end_date'])) {

    $getTotalItemKitSalesByTime = new AjaxSales();
    $getTotalItemKitSalesByTime -> startDate = $_POST['get_total_item_kit_sales_by_start_date'];
    $getTotalItemKitSalesByTime -> endDate = $_POST['get_total_item_kit_sales_by_end_date'];

    $getTotalItemKitSalesByTime -> getTotalItemKitSalesByTime();
}

if (isset($_POST['get_total_item_sales_by_storecode_start_date']) && isset($_POST['get_total_item_sales_by_storecode_end_date']) && isset($_POST['get_total_item_sales_by_storecode'])) {

    $getTotalItemSalesByStoreCodeAndTime = new AjaxSales();
    $getTotalItemSalesByStoreCodeAndTime -> startDate = $_POST['get_total_item_sales_by_storecode_start_date'];
    $getTotalItemSalesByStoreCodeAndTime -> endDate = $_POST['get_total_item_sales_by_storecode_end_date'];
    $getTotalItemSalesByStoreCodeAndTime -> storeCode = $_POST['get_total_item_sales_by_storecode'];

    $getTotalItemSalesByStoreCodeAndTime -> getTotalItemSalesByStoreCodeAndTime();
}

if (isset($_POST['get_total_item_kit_sales_by_storecode_start_date']) && isset($_POST['get_total_item_kit_sales_by_storecode_end_date']) && isset($_POST['get_total_item_sales_by_storecode'])) {

    $getTotalItemKitSalesByStoreCodeAndTime = new AjaxSales();
    $getTotalItemKitSalesByStoreCodeAndTime -> startDate = $_POST['get_total_item_kit_sales_by_storecode_start_date'];
    $getTotalItemKitSalesByStoreCodeAndTime -> endDate = $_POST['get_total_item_kit_sales_by_storecode_end_date'];
    $getTotalItemKitSalesByStoreCodeAndTime -> storeCode = $_POST['get_total_item_sales_by_storecode'];

    $getTotalItemKitSalesByStoreCodeAndTime -> getTotalItemKitSalesByStoreCodeAndTime();
}