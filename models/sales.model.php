<?php

require_once "connection.php";

class SalesModel
{
    public static function mdlViewAllSales()
    {
        $stmt = Connection::connect()->prepare("SELECT sum(sales_items.quantity_purchased) as totalQuantity, sum(item_unit_price) as totalPrice, sum(sales_items.quantity_purchased)*sum(item_unit_price) as totalSales, sales.sale_time FROM sales_items JOIN sales ON sales_items.sale_id = sales.sale_id JOIN sales_item_kits ON sales.sale_id = sales_item_kits.sale_id JOIN items ON sales_items.item_id = items.item_id GROUP BY sales.sale_time");
        $stmt->execute();

        return $stmt->fetchAll();

        $stmt->close();
        $stmt = null;
    }

    
}