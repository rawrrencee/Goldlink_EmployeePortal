<?php

require_once "connection.php";

class SalesModel
{
    public static function mdlViewTotalSalesForCurrentMonth()
    {
        $stmt = Connection::connect()->prepare("SELECT SUM(allsales) as allsales
        FROM
        ((SELECT SUM(CAST( quantity_purchased * item_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) )) AS allsales
        FROM sales AS s
        INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        INNER JOIN items ON sales_items.item_id = items.item_id
        WHERE YEAR(sale_time) = YEAR(NOW()) AND MONTH(sale_time) = MONTH(NOW()) AND payment_amount != '0' AND discount_percent != '100')
        UNION ALL
        (SELECT SUM(CAST( quantity_purchased * item_kit_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) )) AS allsales
        FROM sales AS s
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
        INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        WHERE YEAR(sale_time) = YEAR(NOW()) AND MONTH(sale_time) = MONTH(NOW()) AND payment_amount != '0' AND discount_percent != '100'))
        AS temp");
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public static function mdlViewTotalSalesCompositionForStoreByTime($storeId, $startDate, $endDate)
    {
        $stmt = Connection::connect()->prepare("SELECT first_name, last_name, SUM(total_sales) as total_sales, employee_id
        FROM
            ((SELECT first_name, last_name, SUM( CAST( quantity_purchased * item_unit_price *
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s
            INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN items ON sales_items.item_id = items.item_id
            INNER JOIN people ON s.employee_id = people.person_id
            WHERE s.store_id = :store_id AND DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0' AND discount_percent != '100'
            GROUP BY employee_id)

            UNION ALL

            (SELECT first_name, last_name, SUM( CAST( quantity_purchased * item_kit_unit_price *
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
            INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN people ON s.employee_id = people.person_id
            WHERE s.store_id = :store_id2 AND DATE(sale_time) >= :startDate2 AND DATE(sale_time) <= :endDate2 AND payment_amount != '0' AND discount_percent != '100'
            GROUP BY employee_id)) AS temp
            GROUP BY temp.employee_id, temp.first_name, temp.last_name
        ");

        try {

            $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id2", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
            $stmt->bindParam(":startDate2", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate2", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewStoresWithSalesByTime($startDate, $endDate)
    {

        $stmt = Connection::connect()->prepare("SELECT stores.store_id, stores.store_name, stores.store_code FROM
        (SELECT store_id
        FROM
        ((SELECT s.store_id
        FROM sales AS s
        INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        INNER JOIN items ON sales_items.item_id = items.item_id
        WHERE DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0' AND discount_percent != '100' GROUP BY s.store_id)
        UNION ALL
        (SELECT s.store_id
        FROM sales AS s
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
        INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        WHERE DATE(sale_time) >= :startDate2 AND DATE(sale_time) <= :endDate2 AND payment_amount != '0' AND discount_percent != '100' GROUP BY s.store_id))
        AS temp
        GROUP BY store_id) AS getStores
        JOIN stores ON getStores.store_id = stores.store_id");

        try {

            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
            $stmt->bindParam(":startDate2", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate2", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewTotalSalesForStoreByTime($storeId, $startDate, $endDate)
    {

        $stmt = Connection::connect()->prepare("SELECT SUM(allsales) as allsales
        FROM
        ((SELECT SUM(CAST( quantity_purchased * item_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) )) AS allsales
        FROM sales AS s
        INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        INNER JOIN items ON sales_items.item_id = items.item_id
        WHERE s.store_id = :store_id AND DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0' AND discount_percent != '100')
        UNION ALL
        (SELECT SUM(CAST( quantity_purchased * item_kit_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) )) AS allsales
        FROM sales AS s
        INNER JOIN stores ON s.store_id = stores.store_id
        INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
        INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
        INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
        WHERE s.store_id = :store_id2 AND DATE(sale_time) >= :startDate2 AND DATE(sale_time) <= :endDate2 AND payment_amount != '0' AND discount_percent != '100'))
        AS temp");

        try {

            $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id2", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
            $stmt->bindParam(":startDate2", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate2", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchColumn();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewTotalCategorySalesByDate($startDate, $endDate) {
        $stmt = Connection::connect()->prepare(
            "SELECT category, SUM(totalQty) AS totalQty, SUM(totalDiscSales) AS totalDiscSales, SUM(totalNonDiscSales) AS totalNonDiscSales FROM
            
            ((SELECT 
            category,
            SUM(quantity_purchased) AS totalQty, 
            SUM(CAST( quantity_purchased * item_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ))  AS totalDiscSales,
            SUM(CAST( quantity_purchased * item_unit_price AS DECIMAL( 6, 2 ) ))  AS totalNonDiscSales     
            FROM sales AS s
            INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN items ON sales_items.item_id = items.item_id
            WHERE DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0'
            AND discount_percent != '100'
            GROUP BY items.category)
            
            UNION ALL 
            
            (SELECT 
            category,
            SUM(quantity_purchased) AS totalQty, 
            SUM(CAST( quantity_purchased * item_kit_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ))  AS totalDiscSales,
            SUM(CAST( quantity_purchased * item_kit_unit_price AS DECIMAL( 6, 2 ) ))  AS totalNonDiscSales     
            FROM sales AS s
            INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
            WHERE DATE(sale_time) >= :startDate2 AND DATE(sale_time) <= :endDate2 AND payment_amount != '0'
            AND discount_percent != '100'
            GROUP BY item_kits.category)) AS products
            
            GROUP BY category"
        );

        try {

            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);
            $stmt->bindParam(":startDate2", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate2", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewTotalItemSalesByDate($startDate, $endDate)
    {
        $stmt = Connection::connect()->prepare(
            "SELECT sales_items.item_id, items.name, items.category, items.item_number, items.unit_price, SUM(quantity_purchased) AS totalQty, SUM(CAST( quantity_purchased * item_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ))  AS totalDiscSales, SUM(CAST( quantity_purchased * item_unit_price AS DECIMAL( 6, 2 ) ))  AS totalNonDiscSales
            FROM sales AS s
            INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN items ON sales_items.item_id = items.item_id
            WHERE DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0'
            AND discount_percent != '100'
            GROUP BY sales_items.item_id"
        );

        try {

            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewTotalItemKitSalesByDate($startDate, $endDate)
    {
        $stmt = Connection::connect()->prepare(
            "SELECT sales_item_kits.item_kit_id, item_kits.name, item_kits.category, item_kits.item_kit_number, item_kits.unit_price, SUM(quantity_purchased) AS totalQty, SUM(CAST( quantity_purchased * item_kit_unit_price * ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ))  AS totalDiscSales, SUM(CAST( quantity_purchased * item_kit_unit_price AS DECIMAL( 6, 2 ) ))  AS totalNonDiscSales
            FROM sales AS s
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
            INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            WHERE DATE(sale_time) >= :startDate AND DATE(sale_time) <= :endDate AND payment_amount != '0'
            AND discount_percent != '100'
            GROUP BY sales_item_kits.item_kit_id"
        );

        try {

            $stmt->bindParam(":startDate", $startDate, PDO::PARAM_STR);
            $stmt->bindParam(":endDate", $endDate, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt->fetchAll();
        } catch (Exception $e) {

            $error = print_r($e->getMessage(), true);
            return $error;
        }
    }

    public static function mdlViewEmployeeCurrentSales($personId, $storeId, $month, $year)
    {
        $stmt = Connection::connect()->prepare(
            "SELECT SUM(total_sales) as total_sales
            FROM(
            (
            SELECT SUM( CAST( quantity_purchased * item_unit_price *
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s
            INNER JOIN sales_items ON s.sale_id = sales_items.sale_id
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            INNER JOIN items ON sales_items.item_id = items.item_id
            WHERE YEAR(sale_time) = :year AND MONTH(sale_time) = :month AND s.store_id = :store_id AND s.employee_id = :person_id AND payment_amount != '0' AND discount_percent != '100'
            GROUP BY employee_id
            )
            UNION ALL
            (
            SELECT SUM( CAST( quantity_purchased * item_kit_unit_price *
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s
            INNER JOIN stores ON s.store_id = stores.store_id
            INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
            INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id
            WHERE YEAR(sale_time) = :year AND MONTH(sale_time) = :month AND s.store_id = :store_id AND s.employee_id = :person_id AND payment_amount != '0' AND discount_percent != '100'
            GROUP BY employee_id
            )
            ) AS temp
            GROUP BY temp.employee_id"
        );

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
        $stmt->bindParam(":month", $month, PDO::PARAM_INT);
        $stmt->bindParam(":year", $year, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
