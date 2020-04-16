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

    public $month;
    public $year;
    public $storeId;
    public $personId;

    public $thisMonthStartDate;
    public $thisMonthEndDate;
    public $prevMonthStartDate;
    public $prevMonthEndDate;

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

    public function getEmployeeItemSalesByStoreAndTime() {
        
        $personId = $this->personId;
        $storeId = $this->storeId;
        $month = $this->month;
        $year = $this->year;

        $answer = SalesController::ctrViewEmployeeItemSalesByStoreAndTime($personId, $storeId, $month, $year);

        echo json_encode($answer);
    }

    public function getEmployeeItemKitSalesByStoreAndTime() {
        
        $personId = $this->personId;
        $storeId = $this->storeId;
        $month = $this->month;
        $year = $this->year;

        $answer = SalesController::ctrViewEmployeeItemKitSalesByStoreAndTime($personId, $storeId, $month, $year);

        echo json_encode($answer);
    }

    public function getHighestStoreSalesOverview() {

        $storeSalesOverviewData = [];

        $thisMonthStartDate = $this->thisMonthStartDate;
        $thisMonthEndDate = $this->thisMonthEndDate;

        $thisMonthData = SalesController::ctrViewTotalSalesForAllStoresByTime($thisMonthStartDate, $thisMonthEndDate);

        $prevMonthStartDate = $this->prevMonthStartDate;
        $prevMonthEndDate = $this->prevMonthEndDate;

        $prevMonthData = SalesController::ctrViewTotalSalesForAllStoresByTime($prevMonthStartDate, $prevMonthEndDate);

        $totalSales = 0.00;
        $bestStore = [];
        foreach ($thisMonthData as $store) {
            if (floatval($store['total_sales']) > $totalSales) {
                $totalSales = floatval($store['total_sales']);
                $bestStore = $store;
            }
        }

        $prevTotalSales = 0.00;
        $prevBestStore = [];
        foreach ($prevMonthData as $store) {
            if (floatval($store['total_sales']) > $prevTotalSales) {
                $prevTotalSales = floatval($store['total_sales']);
                $prevBestStore = $store;
            }
        }

        $worstStoreTotalSales = 0.00;
        $worstStore = [];
        for ($index = 0; $index < count($thisMonthData); $index++) {
            if ($index === 0) {
                $worstStoreTotalSales = floatval($thisMonthData[$index]['total_sales']);
                $worstStore = $thisMonthData[$index];
            }
            if (floatval($thisMonthData[$index]['total_sales']) < $worstStoreTotalSales) {
                $worstStoreTotalSales = floatval($thisMonthData[$index]['total_sales']);
                $worstStore = $thisMonthData[$index];
            }
        }

        $prevWorstStoreTotalSales = 0.00;
        $prevWorstStore = [];
        for ($index = 0; $index < count($prevMonthData); $index++) {
            if ($index === 0) {
                $prevWorstStoreTotalSales = floatval($prevMonthData[$index]['total_sales']);
                $prevWorstStore = $prevMonthData[$index];
            }
            if (floatval($prevMonthData[$index]['total_sales']) < $prevWorstStoreTotalSales) {
                $prevWorstStoreTotalSales = floatval($prevMonthData[$index]['total_sales']);
                $prevWorstStore = $prevMonthData[$index];
            }
        }

        $itemSalesData = SalesController::ctrViewTotalItemSalesByStoreCodeAndTime($thisMonthStartDate, $thisMonthEndDate, $bestStore['store_code']);

        $bestOverallItemSalesValue = 0.00;
        $bestOverallItemByValue = [];

        $worstOverallItemSalesValue = 0.00;
        $worstOverallItemByValue = [];

        $bestOverallItemQuantity = 0;
        $bestOverallItemByQuantity = [];

        $worstOverallItemQuantity = 0;
        $worstOverallItemByQuantity = [];

        for ($index = 0; $index < count($itemSalesData); $index++) {
            if ($index === 0) {
                $worstOverallItemSalesValue = $itemSalesData[$index]['totalDiscSales'];
                $worstOverallItemByValue = $itemSalesData[$index];

                $worstOverallItemQuantity = $itemSalesData[$index]['totalQty'];
                $worstOverallItemByQuantity = $itemSalesData[$index];
            }
            if (floatval($itemSalesData[$index]['totalDiscSales']) > $bestOverallItemSalesValue) {
                $bestOverallItemSalesValue = floatval($itemSalesData[$index]['totalDiscSales']);
                $bestOverallItemByValue = $itemSalesData[$index];
            }
            if (intval($itemSalesData[$index]['totalQty']) > $bestOverallItemQuantity) {
                $bestOverallItemQuantity = floatval($itemSalesData[$index]['totalQty']);
                $bestOverallItemByQuantity = $itemSalesData[$index];
            }

            if (floatval($itemSalesData[$index]['totalDiscSales']) < $worstOverallItemSalesValue) {
                $worstOverallItemSalesValue = floatval($itemSalesData[$index]['totalDiscSales']);
                $worstOverallItemByValue = $itemSalesData[$index];
            }
            if (intval($itemSalesData[$index]['totalQty']) < $worstOverallItemQuantity) {
                $worstOverallItemQuantity = floatval($itemSalesData[$index]['totalQty']);
                $worstOverallItemByQuantity = $itemSalesData[$index];
            }
        }

        $totalItemDiscSales = 0.00;
        $lowestItemDiscSales = 0.00;
        $bestItem = [];
        $worstItem = [];
        for ($index = 0; $index < count($itemSalesData); $index++) {
            if ($index === 0) {
                $lowestItemDiscSales = floatval($itemSalesData[$index]['totalDiscSales']);
                $worstItem = $itemSalesData[$index];
            }
            if (floatval($itemSalesData[$index]['totalDiscSales']) > $totalItemDiscSales) {
                $totalItemDiscSales = floatval($itemSalesData[$index]['totalDiscSales']);
                $bestItem = $itemSalesData[$index];
            }
            if (floatval($itemSalesData[$index]['totalDiscSales']) < $lowestItemDiscSales) {
                $lowestItemDiscSales = floatval($itemSalesData[$index]['totalDiscSales']);
                $worstItem = $itemSalesData[$index];
            }
        } 

        $worstStoreItemSalesData = SalesController::ctrViewTotalItemSalesByStoreCodeAndTime($thisMonthStartDate, $thisMonthEndDate, $worstStore['store_code']);

        $worstStoreTotalItemDiscSales = 0.00;
        $worstStoreLowestItemDiscSales = 0.00;
        $worstStoreBestItem = [];
        $worstStoreWorstItem = [];
        for ($index = 0; $index < count($worstStoreItemSalesData); $index++) {
            if ($index === 0) {
                $worstStoreLowestItemDiscSales = floatval($worstStoreItemSalesData[$index]['totalDiscSales']);
                $worstStoreWorstItem = $worstStoreItemSalesData[$index];
            }
            if (floatval($worstStoreItemSalesData[$index]['totalDiscSales']) > $worstStoreTotalItemDiscSales) {
                $worstStoreTotalItemDiscSales = floatval($worstStoreItemSalesData[$index]['totalDiscSales']);
                $worstStoreBestItem = $worstStoreItemSalesData[$index];
            }
            if (floatval($worstStoreItemSalesData[$index]['totalDiscSales']) < $worstStoreLowestItemDiscSales) {
                $worstStoreLowestItemDiscSales = floatval($worstStoreItemSalesData[$index]['totalDiscSales']);
                $worstStoreWorstItem = $worstStoreItemSalesData[$index];
            }
        }

        $storeSalesOverviewData['thisMonthData'] = $thisMonthData;
        $storeSalesOverviewData['prevMonthData'] = $prevMonthData;
        
        $storeSalesOverviewData['bestStore'] = $bestStore;
        $storeSalesOverviewData['prevBestStore'] = $prevBestStore;
        $storeSalesOverviewData['worstStore'] = $worstStore;
        $storeSalesOverviewData['prevWorstStore'] = $prevWorstStore;

        $storeSalesOverviewData['bestStoreBestItem'] = $bestItem;
        $storeSalesOverviewData['bestStoreWorstItem'] = $worstItem;
        $storeSalesOverviewData['worstStoreBestItem'] = $worstStoreBestItem;
        $storeSalesOverviewData['worstStoreWorstItem'] = $worstStoreWorstItem;

        $storeSalesOverviewData['bestOverallItemByValue'] = $bestOverallItemByValue;
        $storeSalesOverviewData['bestOverallItemByQuantity'] = $bestOverallItemByQuantity;

        $storeSalesOverviewData['worstOverallItemByValue'] = $worstOverallItemByValue;
        $storeSalesOverviewData['worstOverallItemByQuantity'] = $worstOverallItemByQuantity;


        echo json_encode($storeSalesOverviewData);
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

if (isset($_POST['highest_store_sales_this_start_date']) && isset($_POST['highest_store_sales_this_end_date']) && isset($_POST['highest_store_sales_prev_start_date']) && isset($_POST['highest_store_sales_prev_end_date'])) {

    $getHighestStoreSalesOverview = new AjaxSales();
    $getHighestStoreSalesOverview -> thisMonthStartDate = $_POST['highest_store_sales_this_start_date'];
    $getHighestStoreSalesOverview -> thisMonthEndDate = $_POST['highest_store_sales_this_end_date'];
    $getHighestStoreSalesOverview -> prevMonthStartDate = $_POST['highest_store_sales_prev_start_date'];
    $getHighestStoreSalesOverview -> prevMonthEndDate = $_POST['highest_store_sales_prev_end_date'];

    $getHighestStoreSalesOverview -> getHighestStoreSalesOverview();
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

if (isset($_POST['getEmployeeItemSales_month']) && isset($_POST['getEmployeeItemSales_year']) && isset($_POST['getEmployeeItemSales_storeId']) && isset($_POST['getEmployeeItemSales_personId'])) {

    $getEmployeeItemSalesByStoreAndTime = new AjaxSales();
    $getEmployeeItemSalesByStoreAndTime -> month = $_POST['getEmployeeItemSales_month'];
    $getEmployeeItemSalesByStoreAndTime -> year = $_POST['getEmployeeItemSales_year'];
    $getEmployeeItemSalesByStoreAndTime -> storeId = $_POST['getEmployeeItemSales_storeId'];
    $getEmployeeItemSalesByStoreAndTime -> personId = $_POST['getEmployeeItemSales_personId'];

    $getEmployeeItemSalesByStoreAndTime -> getEmployeeItemSalesByStoreAndTime();
}

if (isset($_POST['getEmployeeItemKitSales_month']) && isset($_POST['getEmployeeItemKitSales_year']) && isset($_POST['getEmployeeItemKitSales_storeId']) && isset($_POST['getEmployeeItemKitSales_personId'])) {

    $getEmployeeItemKitSalesByStoreAndTime = new AjaxSales();
    $getEmployeeItemKitSalesByStoreAndTime -> month = $_POST['getEmployeeItemKitSales_month'];
    $getEmployeeItemKitSalesByStoreAndTime -> year = $_POST['getEmployeeItemKitSales_year'];
    $getEmployeeItemKitSalesByStoreAndTime -> storeId = $_POST['getEmployeeItemKitSales_storeId'];
    $getEmployeeItemKitSalesByStoreAndTime -> personId = $_POST['getEmployeeItemKitSales_personId'];

    $getEmployeeItemKitSalesByStoreAndTime -> getEmployeeItemKitSalesByStoreAndTime();
}