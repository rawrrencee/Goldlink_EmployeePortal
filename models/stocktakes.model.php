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

    public static function mdlViewIndividualCategoryStocktakesByDate($startDate, $endDate, $category)
    {

        $stmt = Connection::connect()->prepare("SELECT
        CAST(date_submitted AS DATE) AS date_submitted, SUM(count_quantity) AS totalQty
        FROM stocktakes
        JOIN stocktake_items
        ON stocktake_items.stocktake_id = stocktakes.id
        WHERE DATE(date_submitted) >= :startDate
        AND DATE(date_submitted) <= :endDate
        AND category = :category
        GROUP BY CAST(date_submitted AS DATE)
        ORDER BY date_submitted ASC");

        $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
        $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
        $stmt->bindParam(":category", $category, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt->fetchAll();

    }

    public static function mdlViewIndividualItemStocktakesByDate($startDate, $endDate, $itemId)
    {

        $stmt = Connection::connect()->prepare("SELECT
        CAST(date_submitted AS DATE) AS date_submitted, SUM(count_quantity) AS totalQty
        FROM stocktakes
        JOIN stocktake_items
        ON stocktake_items.stocktake_id = stocktakes.id
        WHERE DATE(date_submitted) >= :startDate
        AND DATE(date_submitted) <= :endDate
        AND item_id = :item_id
        GROUP BY CAST(date_submitted AS DATE)
        ORDER BY date_submitted ASC");

        $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
        $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
        $stmt->bindParam(":item_id", $itemId, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt->fetchAll();

    }

    public static function mdlViewAllCategoryStocktakesByDate($stocktakeDate)
    {

        $year = date('Y', strtotime($stocktakeDate));
        $month = date('m', strtotime($stocktakeDate));
        $day = date('d', strtotime($stocktakeDate));

        $stmt = Connection::connect()->prepare("SELECT sum(stocktake_items.count_quantity) as stockCount,stocktake_items.category as productCategory
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

    public static function mdlViewLatestStocktakeDate($stocktakeDate)
    {

        $stmt = Connection::connect()->prepare("SELECT date_submitted FROM stocktakes WHERE DATE(date_submitted) <= :stocktakeDate ORDER BY date_submitted DESC LIMIT 1");

        try {

            $stmt->bindParam(":stocktakeDate", $stocktakeDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchColumn();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }

    }
}
