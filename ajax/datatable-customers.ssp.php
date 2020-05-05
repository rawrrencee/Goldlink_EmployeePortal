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
    stores.store_name, customers.person_id, customers.nric, customers.title, customers.account_number, customers.company_name, customers.designation, customers.nationality, customers.birthday, customers.preferred_contact, customers.discount, customers.store, customers.deleted, customers.create_date, customers.modify_date, customers.modify_by, people.first_name, people.last_name, people.email, people.phone_number, people.mobile_number, people.address_1, people.zip, people.gender, people.chinese_name, people.comments
    FROM customers
	JOIN people ON customers.person_id = people.person_id
	JOIN stores ON customers.store = stores.store_code
 ) temp
EOT;

// Table's primary key
$primaryKey = 'person_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'store_name', 'dt' => 0 ),
	array( 'db' => 'first_name', 'dt' => 1 ),
	array( 'db' => 'last_name', 'dt' => 2 ),
	array( 'db' => 'mobile_number', 'dt' => 3 ),
	array( 'db' => 'email', 'dt' => 4 ),
	array( 'db' => 'create_date', 'dt' => 5 ),
	array( 'db' => 'birthday', 'dt' => 6 ),
	array( 'db' => 'discount', 'dt' => 7 ),
	array( 'db' => 'chinese_name', 'dt' => 8 ),
    array( 'db' => 'gender', 'dt' => 9 ),
	array( 'db' => 'nric', 'dt' => 10 ),
	array( 'db' => 'title', 'dt' => 11 ),
	array( 'db' => 'designation', 'dt' => 12 ),
	array( 'db' => 'phone_number', 'dt' => 13 ),
	array( 'db' => 'address_1', 'dt' => 14 ),
	array( 'db' => 'zip', 'dt' => 15 ),
	array( 'db' => 'nationality', 'dt' => 16 ),
	array( 'db' => 'company_name', 'dt' => 17 ),
	array( 'db' => 'account_number', 'dt' => 18 ),	
	array( 'db' => 'preferred_contact', 'dt' => 19 ),
	array( 'db' => 'modify_date', 'dt' => 20 ),
	array( 'db' => 'modify_by', 'dt' => 21 ),
	array( 'db' => 'comments', 'dt' => 22 ),
	array( 'db' => 'person_id', 'dt' => 23 )
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


