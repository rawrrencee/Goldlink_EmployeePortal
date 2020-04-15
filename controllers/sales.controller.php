<?php

class SalesController
{
    public static function ctrViewTotalSalesForCurrentMonth()
    {
        $response = SalesModel::mdlViewTotalSalesForCurrentMonth();

        return $response;
    }

    public static function ctrViewTotalSalesForAllStoresByTime($startDate, $endDate)
    {
        $allStores = SalesModel::mdlViewStoresWithSalesByTime($startDate, $endDate);

        for ($index = 0; $index < count($allStores); $index++) {
            $totalSales = SalesModel::mdlViewTotalSalesForStoreByTime($allStores[$index]['store_id'], $startDate, $endDate);
            $allStores[$index]['total_sales'] = $totalSales;
            $allStores[$index]['sales_composition'] = SalesModel::mdlViewTotalSalesCompositionForStoreByTime($allStores[$index]['store_id'], $startDate, $endDate);
        }

        return $allStores;
    }

    public static function ctrViewTotalSalesCompositionForStoreByTime($storeId, $startDate, $endDate)
    {
        $response = SalesModel::mdlViewTotalSalesCompositionForStoreByTime($storeId, $startDate, $endDate);

        return $response;
    }

    public static function ctrViewPdtCatSalesInventoryByTime($startDate, $endDate, $stocktakeDate)
    {
        $totalCategorySales = SalesModel::mdlViewPdtCatSalesInventoryByTime($startDate, $endDate);

        return $totalCategorySales;
    }

    public static function ctrViewTotalCategorySalesByTime($startDate, $endDate)
    {
        $totalCategorySales = SalesModel::mdlViewTotalCategorySalesByDate($startDate, $endDate);

        return $totalCategorySales;
    }

    public static function ctrViewTotalItemSalesByTime($startDate, $endDate)
    {
        $totalItemSales = SalesModel::mdlViewTotalItemSalesByDate($startDate, $endDate);

        return $totalItemSales;
    }

    public static function ctrViewTotalItemKitSalesByTime($startDate, $endDate)
    {
        $totalItemKitSales = SalesModel::mdlViewTotalItemKitSalesByDate($startDate, $endDate);

        return $totalItemKitSales;
    }

    public static function ctrViewTotalItemSalesByStoreCodeAndTime($startDate, $endDate, $storeCode)
    {
        $totalItemSales = SalesModel::mdlViewTotalItemSalesByStoreCodeAndDate($startDate, $endDate, $storeCode);

        return $totalItemSales;
    }

    public static function ctrViewTotalItemKitSalesByByStoreCodeAndTime($startDate, $endDate, $storeCode)
    {
        $totalItemKitSales = SalesModel::mdlViewTotalItemKitSalesByByStoreCodeAndDate($startDate, $endDate, $storeCode);

        return $totalItemKitSales;
    }

    public static function ctrViewEmployeeCurrentSales($employeeId, $storeId, $month, $year)
    {

        $response = SalesModel::mdlViewEmployeeCurrentSales($employeeId, $storeId, $month, $year);

        return $response;
    }

    public static function ctrViewEmployeeItemSalesByStoreAndTime($personId, $storeId, $month, $year)
    {

        $response = SalesModel::mdlViewEmployeeItemSalesByStoreAndTime($personId, $storeId, $month, $year);

        return $response;
    }

    public static function ctrViewEmployeeItemKitSalesByStoreAndTime($personId, $storeId, $month, $year)
    {

        $response = SalesModel::mdlViewEmployeeItemKitSalesByStoreAndTime($personId, $storeId, $month, $year);

        return $response;
    }
}
