<?php

session_start();
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
    employees.username, employees.deleted, people.first_name, people.last_name, people.duty_location, people.mobile_number, people.designation, people.email, people.date_of_birth, people.address_1, people.zip, people.gender, people.nationality, people.phone_number, people.bank_name, people.bank_acct, people.commencement, people.left_date, people.emergency_name, people.emergency_relation, people.emergency_address, people.emergency_contact, people.person_id 
    FROM employees
    JOIN people ON employees.person_id = people.person_id
 ) temp
EOT;

// Table's primary key
$primaryKey = 'person_id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'first_name', 'dt' => 0 ),
	array( 'db' => 'last_name', 'dt' => 1 ),
	array( 'db' => 'duty_location', 'dt' => 2 ),
	array( 'db' => 'mobile_number', 'dt' => 3 ),
	array( 'db' => 'designation', 'dt' => 4 ),
	array( 'db' => 'email', 'dt' => 5 ),
	array( 'db' => 'date_of_birth', 'dt' => 6 ),
	array( 'db' => 'address_1', 'dt' => 7 ),
	array( 'db' => 'zip', 'dt' => 8 ),
	array( 'db' => 'gender', 'dt' => 9 ),
	array( 'db' => 'nationality', 'dt' => 10 ),
    array( 'db' => 'phone_number', 'dt' => 11 ),
	array( 'db' => 'bank_name', 'dt' => 12 ),
	array( 'db' => 'bank_acct', 'dt' => 13 ),
	array( 'db' => 'commencement', 'dt' => 14 ),
	array( 'db' => 'left_date', 'dt' => 15 ),
	array( 'db' => 'emergency_name', 'dt' => 16 ),
	array( 'db' => 'emergency_relation', 'dt' => 17 ),
	array( 'db' => 'emergency_address', 'dt' => 18 ),
	array( 'db' => 'emergency_contact', 'dt' => 19 ),
    array( 'db' => 'username', 'dt' => 20 ),
	array( 'db' => 'person_id', 'dt' => 21 )
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


