<?php

require_once "connection.php";

class SalesModel
{
    public static function mdlViewAllSales()
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

        $stmt->close();
        $stmt = null;
    }

    
}