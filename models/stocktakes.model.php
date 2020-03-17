<?php

require_once "connection.php";

class StocktakesModel
{
    public static function mdlViewAllStocks($table)
    {

        
        $stmt = Connection::connect()->prepare("SELECT sum(count_quantity) * FROM $table GROUP BY category");
        $stmt->execute();
        return $stmt->fetchAll();
   
        $stmt->close();
        $stmt = null;
    }
}