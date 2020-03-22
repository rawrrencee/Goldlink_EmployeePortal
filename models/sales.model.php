<?php

require_once "connection.php";

class SalesModel
{
    public static function mdlViewAllSales()
    {
        $stmt = Connection::connect()->prepare("SELECT sum(quantity_purchased) as totalQuantity, sum(item_unit_price) as totalPrice, totalQuantity*totalPrice as totalSales, sales.sale_time FROM sales_items JOIN sales ON sales_items.sale_id = sales.sale_id JOIN sales_item_kits ON sales.sale_id = sales_item_kits.sale_id JOIN items ON sales_item.item_id = items.item_id OR sales_item_kits.item_id = items.item_id GROUP BY sales.sale_time");
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    
}