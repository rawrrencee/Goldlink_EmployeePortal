<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

//DB INFO FOR SERVER-SIDE PROCESSING SCRIPT
//Please reflect any changes to "models/connection.php" as well.

$db_username 	= 'root';
$db_password 	= 'root';
$db_name 		= 'goldlink_payroll';
$db_host 		= 'localhost';
?>