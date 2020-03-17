<?php

class StocktakesController
{
    public static function ctrViewAllStocktakes()
    {
        $table = "stocktake_items";
        $response = StocktakesModel::mdlViewAllStocks($table);

        return $response;
    }
}