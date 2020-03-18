<?php

require_once "connection.php";

class StocktakesModel
{
    public static function mdlViewAllStocks($table)
    {

        
        $stmt = Connection::connect()->prepare("SELECT sum(count_quantity) as stockCount, LEFT(category,3) FROM $table GROUP BY LEFT(category,3)");
        $stmt->execute();
        return $stmt->fetchAll();
   
        $stmt->close();
        $stmt = null;
    }
}