<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/payroll.controller.php";
require_once "../models/payroll.model.php";

class AjaxPayroll
{
    public $salaryVoucherId;

    public function getSalaryVoucherById() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryVoucherById($value);

        echo json_encode($answer);

    }

    public function getSalaryRecordsByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryRecordsByVoucherId($value);

        echo json_encode($answer);

    }

    public function getDeductionRecordsByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewDeductionRecordsByVoucherId($value);

        echo json_encode($answer);

    }

    public function getOtherRecordsByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewOtherRecordsByVoucherId($value);

        echo json_encode($answer);

    }

    public function getDailySalesFigureByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewDailySalesFigureByVoucherId($value);

        echo json_encode($answer);

    }

    public function getAttendanceRecordsByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewAttendanceRecordsByVoucherId($value);

        echo json_encode($answer);

    }
}

if (isset($_POST['getSalaryVoucherById'])) {

    $getSalaryVoucherById = new AjaxPayroll();
    $getSalaryVoucherById -> salaryVoucherId = $_POST['getSalaryVoucherById'];
    $getSalaryVoucherById -> getSalaryVoucherById();

}

if (isset($_POST['getSalaryRecordsByVoucherId'])) {

    $getSalaryRecordsByVoucherId = new AjaxPayroll();
    $getSalaryRecordsByVoucherId -> salaryVoucherId = $_POST['getSalaryRecordsByVoucherId'];
    $getSalaryRecordsByVoucherId -> getSalaryRecordsByVoucherId();

}

if (isset($_POST['getDeductionRecordsByVoucherId'])) {

    $getDeductionRecordsByVoucherId = new AjaxPayroll();
    $getDeductionRecordsByVoucherId -> salaryVoucherId = $_POST['getDeductionRecordsByVoucherId'];
    $getDeductionRecordsByVoucherId -> getDeductionRecordsByVoucherId();

}

if (isset($_POST['getOtherRecordsByVoucherId'])) {

    $getOtherRecordsByVoucherId = new AjaxPayroll();
    $getOtherRecordsByVoucherId -> salaryVoucherId = $_POST['getOtherRecordsByVoucherId'];
    $getOtherRecordsByVoucherId -> getOtherRecordsByVoucherId();

}

if (isset($_POST['getDailySalesFigureByVoucherId'])) {

    $getDailySalesFigureByVoucherId = new AjaxPayroll();
    $getDailySalesFigureByVoucherId -> salaryVoucherId = $_POST['getDailySalesFigureByVoucherId'];
    $getDailySalesFigureByVoucherId -> getDailySalesFigureByVoucherId();

}

if (isset($_POST['getAttendanceRecordsByVoucherId'])) {

    $getAttendanceRecordsByVoucherId = new AjaxPayroll();
    $getAttendanceRecordsByVoucherId -> salaryVoucherId = $_POST['getAttendanceRecordsByVoucherId'];
    $getAttendanceRecordsByVoucherId -> getAttendanceRecordsByVoucherId();

}