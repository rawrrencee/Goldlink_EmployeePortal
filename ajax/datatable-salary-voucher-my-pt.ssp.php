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
    *
    FROM salary_vouchers
 ) temp
EOT;

// Table's primary key
$primaryKey = 'voucher_id';
$person_id = $_SESSION['person_id'];

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'voucher_id', 'dt' => 0 ),
	array( 'db' => 'month_of_voucher', 'dt' => 1 ),
	array( 'db' => 'year_of_voucher', 'dt' => 2 ),
	array( 'db' => 'created_on', 'dt' => 3 ),
	array( 'db' => 'modified_on', 'dt' => 4 ),
	array( 'db' => 'person_id', 'dt' => 5 ),
	array( 'db' => 'is_draft', 'dt' => 6 ),
	array( 'db' => 'status', 'dt' => 7 ),
	array( 'db' => 'updated_by', 'dt' => 8 ),
	array( 'db' => 'pay_to_name', 'dt' => 9 ),
	array( 'db' => 'designation', 'dt' => 10 ),
	array( 'db' => 'nric', 'dt' => 11 ),
	array( 'db' => 'bank_name', 'dt' => 12 ),
	array( 'db' => 'bank_acct', 'dt' => 13 ),
	array( 'db' => 'gross_pay', 'dt' => 14 ),
	array( 'db' => 'total_deductions', 'dt' => 15 ),
    array( 'db' => 'total_others', 'dt' => 16 ),
	array( 'db' => 'final_amount', 'dt' => 17 ),
	array( 'db' => 'is_sg_pr', 'dt' => 18 ),
	array( 'db' => 'cpf_employee', 'dt' => 19 ),
	array( 'db' => 'cpf_employer', 'dt' => 20 ),
	array( 'db' => 'boutique', 'dt' => 21),
	array( 'db' => 'boutique_sales', 'dt' => 22 ),
	array( 'db' => 'personal_sales', 'dt' => 23 ),
	array( 'db' => 'num_days_zero_sales', 'dt' => 24 ),
	array( 'db' => 'num_reports_submitted', 'dt' => 25 )
);

// SQL server connection information
require('connection.ssp.php');
$sql_details = array(
	'user' => $db_username,
	'pass' => $db_password,
	'db'   => $db_name,
	'host' => $db_host
);

$extraWhere = "is_draft = 0 AND is_part_time = 1 AND person_id = ".$person_id;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
	SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $whereResult=null, $extraWhere )
);


