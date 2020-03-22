<?php

class StocktakesController
{
    public static function ctrViewAllStocktakes($chosenDate)
    {

        $dateArray = explode("/", $chosenDate);
/*
$year = (int) date('Y');
$month = (int) date('m');
$day = (int) date('d');
 */
        $year = (int) $dateArray[2];
        $month = (int) $dateArray[1];
        $day = (int) $dateArray[0];

        $latestDate = StocktakesModel::mdlGetLatestStocktakeDate($year, $month, $day);
        $timestamp = strtotime($latestDate[0]['date_submitted']);
        //return $timestamp;

        $latestYear = (int) date('Y', $timestamp);
        //return $latestYear;
        $latestMonth = (int) date('m', $timestamp);
        //return $latestMonth;
        $latestDay = (int) date('d', $timestamp);
        //return $latestDay;
        $response = StocktakesModel::mdlViewAllStocks($latestYear, $latestMonth, $latestDay);

        return $response;

    }

}
