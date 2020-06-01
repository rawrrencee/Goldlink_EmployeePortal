<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = <<<EOT
 (
	SELECT DISTINCT
	items.item_id, items.name, items.item_number, items.category, items.cost_price, items.unit_price, items.deleted, stores_items.active
	FROM items
	JOIN stores_items ON items.item_id = stores_items.item_id
 ) temp
EOT;

// Table's primary key
$primaryKey = 'item_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'name', 'dt' => 0 ),
	array( 'db' => 'item_number', 'dt' => 1 ),
	array( 'db' => 'category', 'dt' => 2 ),
	array( 'db' => 'unit_price', 'dt' => 3 ),
	array( 'db' => 'cost_price', 'dt' => 4 ),
	array( 'db' => 'item_id', 'dt' => 5 )
);

// SQL server connection information
require('connection.ssp.php');
$sql_details = array(
	'user' => $db_username,
	'pass' => $db_password,
	'db'   => $db_name,
	'host' => $db_host
);

$extraWhere = "active = 1 AND deleted = 0";


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
	SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $whereResult=null, $extraWhere )
);


