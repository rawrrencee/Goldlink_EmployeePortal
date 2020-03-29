<?php

require_once "connection.php";

class StocktakesModel
{
    public static function mdlViewAllStocks($year, $month, $day)
    {

        
        $stmt = Connection::connect()->prepare("SELECT sum(stocktake_items.count_quantity) as stockCount, LEFT(stocktake_items.category,3) as productCategory 
        FROM stocktake_items 
        JOIN stocktakes ON stocktake_items.stocktake_id = stocktakes.id 
        WHERE YEAR(date_submitted) = :year AND MONTH(date_submitted) = :month AND DAY(date_submitted) = :day
        GROUP BY productCategory
        ORDER BY stockcount DESC");

        $stmt->bindParam(":year", $year, PDO::PARAM_INT);
        $stmt->bindParam(":month", $month, PDO::PARAM_INT);
        $stmt->bindParam(":day", $day, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public static function mdlGetLatestStocktakeDate($year, $month, $day){
        $stmt = Connection::connect()->prepare("SELECT date_submitted FROM stocktakes WHERE YEAR(date_submitted) = :year AND MONTH(date_submitted) = :month AND (DAY(date_submitted) <= :day) ORDER BY date_submitted DESC LIMIT 1");
        
        $stmt->bindParam(":year", $year, PDO::PARAM_INT);
        $stmt->bindParam(":month", $month, PDO::PARAM_INT);
        $stmt->bindParam(":day", $day, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll();
    }
}