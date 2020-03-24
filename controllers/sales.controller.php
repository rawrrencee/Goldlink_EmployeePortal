<?php

class SalesController
{
    public static function ctrViewAllSales()
    {
        $response = SalesModel::mdlViewAllSales();

        return $response;
    }

    public static function ctrViewEmployeeCurrentSales($employeeId, $storeId, $month, $year)
    {

        $response = SalesModel::mdlViewEmployeeCurrentSales($employeeId, $storeId, $month, $year);

        return $response;
    }


}