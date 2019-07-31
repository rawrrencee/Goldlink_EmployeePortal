<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/payroll.controller.php";
require_once "../models/payroll.model.php";

class AjaxSalaryVoucherAnalysis
{
    public $monthToAnalyse;
    public $yearToAnalyse;

    public function getPayrollDetails()
    {

        $monthToAnalyse = $this->monthToAnalyse;
        $yearToAnalyse = $this->yearToAnalyse;

        $answer = PayrollController::ctrViewAllSalaryVouchersByMonth($monthToAnalyse, $yearToAnalyse);

        echo json_encode($answer);

    }

}

if (isset($_POST['monthToAnalyse'])) {

    $getPayrollDetails = new AjaxSalaryVoucherAnalysis();
    $getPayrollDetails -> monthToAnalyse = json_decode($_POST['monthToAnalyse']);
    $getPayrollDetails -> yearToAnalyse = json_decode($_POST['yearToAnalyse']);
    $getPayrollDetails -> getPayrollDetails();
}