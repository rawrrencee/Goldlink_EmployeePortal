<?php

class SalesController
{
    public static function ctrViewAllSales()
    {
        $response = SalesModel::mdlViewAllSales();

        return $response;
    }


}