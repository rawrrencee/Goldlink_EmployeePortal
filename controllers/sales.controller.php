<?php

class SalesController
{
    public static function ctrViewAllSales()
    {
        $response = ItemKitModel::mdlViewAllSales();

        return $response;
    }


}