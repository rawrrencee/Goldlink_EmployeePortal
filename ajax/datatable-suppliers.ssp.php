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
    suppliers.company_name, suppliers.account_number, suppliers.deleted, people.mobile_number, people.email, people.address_1, people.zip, people.comments, people.phone_number, people.bank_name, people.person_id 
    FROM suppliers
    JOIN people ON suppliers.person_id = people.person_id
 ) temp
EOT;

// Table's primary key
$primaryKey = 'person_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'company_name', 'dt' => 0 ),
	array( 'db' => 'email', 'dt' => 1 ),
	array( 'db' => 'phone_number', 'dt' => 2 ),
	array( 'db' => 'mobile_number', 'dt' => 3 ),
	array( 'db' => 'address_1', 'dt' => 4 ),
	array( 'db' => 'zip', 'dt' => 5 ),
	array( 'db' => 'bank_name', 'dt' => 6 ),
	array( 'db' => 'account_number', 'dt' => 7 ),
	array( 'db' => 'comments', 'dt' => 8 ),
	array( 'db' => 'person_id', 'dt' => 9 )
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


