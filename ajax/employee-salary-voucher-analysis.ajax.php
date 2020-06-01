<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/payroll.controller.php";
require_once "../models/payroll.model.php";

class AjaxSalaryVoucherAnalysis
{
    public $monthToAnalyse;
    public $personId;
    public $yearToAnalyse;

    public function getPayrollDetails()
    {

        $monthToAnalyse = $this->monthToAnalyse;
        $yearToAnalyse = $this->yearToAnalyse;

        $answer = PayrollController::ctrViewAllSalaryVouchersByMonth($monthToAnalyse, $yearToAnalyse);

        echo json_encode($answer);

    }

    public function getPayrollDetailsByYear()
    {

        $yearToAnalyse = $this->yearToAnalyse;

        $answer = PayrollController::ctrViewAllSalaryVouchersByYear($yearToAnalyse);

        echo json_encode($answer);

    }

    public function getIndivPayrollDetailsByYear()
    {

        $personId = $this->personId;
        $yearToAnalyse = $this->yearToAnalyse;

        $answer = PayrollController::ctrViewIndivSalaryVouchersByYear($personId, $yearToAnalyse);

        echo json_encode($answer);

    }

}

if (isset($_POST['monthToAnalyse']) && isset($_POST['yearToAnalyse']) && !isset($_POST['personId'])) {

    $getPayrollDetails = new AjaxSalaryVoucherAnalysis();
    $getPayrollDetails -> monthToAnalyse = json_decode($_POST['monthToAnalyse']);
    $getPayrollDetails -> yearToAnalyse = json_decode($_POST['yearToAnalyse']);
    $getPayrollDetails -> getPayrollDetails();
}

if (isset($_POST['personId']) && isset($_POST['yearToAnalyse'])) {

    $getIndivPayrollDetailsByYear = new AjaxSalaryVoucherAnalysis();
    $getIndivPayrollDetailsByYear -> personId = json_decode($_POST['personId']);
    $getIndivPayrollDetailsByYear -> yearToAnalyse = json_decode($_POST['yearToAnalyse']);
    $getIndivPayrollDetailsByYear -> getIndivPayrollDetailsByYear();
}

if (isset($_POST['getPayrollDetailsByYear'])) {

    $getPayrollDetailsByYear = new AjaxSalaryVoucherAnalysis();
    $getPayrollDetailsByYear -> yearToAnalyse = json_decode($_POST['getPayrollDetailsByYear']);
    $getPayrollDetailsByYear -> getPayrollDetailsByYear();
}