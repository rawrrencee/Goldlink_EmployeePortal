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

    public static function ctrViewEmployeeCurrentSales($employeeId, $storeId, $month, $year)
    {

        $response = SalesModel::mdlViewEmployeeCurrentSales($employeeId, $storeId, $month, $year);

        return $response;
    }
}
