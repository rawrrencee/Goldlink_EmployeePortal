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
	SELECT 
	item_kits.item_kit_id, item_kits.item_kit_number, item_kits.name, item_kits.description, item_kits.category, item_kits.unit_price, item_kits.cost_price, item_kits.store_id, item_kits.deleted, stores.store_name
	FROM item_kits
	JOIN stores ON item_kits.store_id = stores.store_id
 ) temp
EOT;

// Table's primary key
$primaryKey = 'item_kit_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'store_name', 'dt' => 0 ),
	array( 'db' => 'item_kit_number', 'dt' => 1 ),
	array( 'db' => 'name', 'dt' => 2 ),
	array( 'db' => 'description', 'dt' => 3 ),
	array( 'db' => 'category', 'dt' => 4 ),
	array( 'db' => 'unit_price', 'dt' => 5 ),
	array( 'db' => 'cost_price', 'dt' => 6 ),
	array( 'db' => 'store_id', 'dt' => 7 ),
	array( 'db' => 'item_kit_id', 'dt' => 8 )
);

// SQL server connection information
require('connection.ssp.php');
$sql_details = array(
	'user' => $db_username,
	'pass' => $db_password,
	'db'   => $db_name,
	'host' => $db_host
);

$extraWhere = "deleted = 0";


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
	SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $whereResult=null, $extraWhere )
);


