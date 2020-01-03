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
    salary_vouchers.*, people.first_name, people.last_name
	FROM salary_vouchers
	JOIN people
	ON salary_vouchers.person_id = people.person_id
 ) temp
EOT;

// Table's primary key
$primaryKey = 'voucher_id';
$person_id = $_SESSION['person_id'];
$teamMembers = $_SESSION['teamMembersData'];
$orString = "";
if (count($teamMembers) > 0) {
    foreach ($teamMembers as $index => $memberData) {
        if ($index == 0) {
            $orString = "person_id = " . $memberData['member_id'];
        } else {
            $orString = $orString." OR person_id = ".$memberData['member_id'];
        }
    }
}

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes

$columns = array(
	array( 'db' => 'voucher_id', 'dt' => 0 ),
	array( 'db' => 'company_name', 'dt' => 1 ),
	array( 'db' => 'month_of_voucher', 'dt' => 2 ),
	array( 'db' => 'year_of_voucher', 'dt' => 3 ),
	array( 'db' => 'first_name', 'dt' => 4 ),
	array( 'db' => 'last_name', 'dt' => 5 ),
	array( 'db' => 'person_id', 'dt' => 6 ),
	array( 'db' => 'is_draft', 'dt' => 7 ),
	array( 'db' => 'status', 'dt' => 8 ),
	array( 'db' => 'updated_by', 'dt' => 9 ),
	array( 'db' => 'created_on', 'dt' => 10 ),
	array( 'db' => 'modified_on', 'dt' => 11 ),
	array( 'db' => 'pay_to_name', 'dt' => 12 ),
	array( 'db' => 'designation', 'dt' => 13 ),
	array( 'db' => 'nric', 'dt' => 14 ),
	array( 'db' => 'bank_name', 'dt' => 15 ),
	array( 'db' => 'bank_acct', 'dt' => 16 ),
	array( 'db' => 'gross_pay', 'dt' => 17 ),
	array( 'db' => 'total_deductions', 'dt' => 18 ),
    array( 'db' => 'total_others', 'dt' => 19 ),
	array( 'db' => 'final_amount', 'dt' => 20 ),
	array( 'db' => 'is_sg_pr', 'dt' => 21 ),
	array( 'db' => 'cpf_employee', 'dt' => 22 ),
	array( 'db' => 'cpf_employer', 'dt' => 23 ),
	array( 'db' => 'boutique', 'dt' => 24 ),
	array( 'db' => 'boutique_sales', 'dt' => 25 ),
	array( 'db' => 'personal_sales', 'dt' => 26 ),
	array( 'db' => 'num_days_zero_sales', 'dt' => 27 ),
	array( 'db' => 'num_reports_submitted', 'dt' => 28 ),
	array( 'db' => 'is_part_time', 'dt' => 29 )
);

// SQL server connection information
require('connection.ssp.php');
$sql_details = array(
	'user' => $db_username,
	'pass' => $db_password,
	'db'   => $db_name,
	'host' => $db_host
);
if (count($teamMembers) > 0) {
    $extraWhere = "is_draft = 0 AND is_part_time = 0 AND (".$orString. ")";
} else {
    $extraWhere = "is_draft = 0 AND is_part_time = 0";
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
	SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $whereResult=null, $extraWhere )
);


