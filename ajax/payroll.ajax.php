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

    public function getSalaryRecordsPTByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryRecordsPTByVoucherId($value);

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

    public function getDailyWorkingHoursByVoucherId() {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewDailyWorkingHoursByVoucherId($value);

        echo json_encode($answer);

    }
}

if (isset($_POST['getSalaryVoucherById'])) {

    $getSalaryVoucherById = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getSalaryVoucherById'], FILTER_SANITIZE_NUMBER_INT);
    $getSalaryVoucherById -> salaryVoucherId = $voucher_id;
    $getSalaryVoucherById -> getSalaryVoucherById();

}

if (isset($_POST['getSalaryRecordsByVoucherId'])) {

    $getSalaryRecordsByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getSalaryRecordsByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getSalaryRecordsByVoucherId -> salaryVoucherId = $voucher_id;
    $getSalaryRecordsByVoucherId -> getSalaryRecordsByVoucherId();

}

if (isset($_POST['getSalaryRecordsPTByVoucherId'])) {

    $getSalaryRecordsPTByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getSalaryRecordsPTByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getSalaryRecordsPTByVoucherId -> salaryVoucherId = $voucher_id;
    $getSalaryRecordsPTByVoucherId -> getSalaryRecordsPTByVoucherId();

}

if (isset($_POST['getDeductionRecordsByVoucherId'])) {

    $getDeductionRecordsByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getDeductionRecordsByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getDeductionRecordsByVoucherId -> salaryVoucherId = $voucher_id;
    $getDeductionRecordsByVoucherId -> getDeductionRecordsByVoucherId();

}

if (isset($_POST['getOtherRecordsByVoucherId'])) {

    $getOtherRecordsByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getOtherRecordsByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getOtherRecordsByVoucherId -> salaryVoucherId = $voucher_id;
    $getOtherRecordsByVoucherId -> getOtherRecordsByVoucherId();

}

if (isset($_POST['getDailySalesFigureByVoucherId'])) {

    $getDailySalesFigureByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getDailySalesFigureByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getDailySalesFigureByVoucherId -> salaryVoucherId = $voucher_id;
    $getDailySalesFigureByVoucherId -> getDailySalesFigureByVoucherId();

}

if (isset($_POST['getAttendanceRecordsByVoucherId'])) {

    $getAttendanceRecordsByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getAttendanceRecordsByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getAttendanceRecordsByVoucherId -> salaryVoucherId = $voucher_id;
    $getAttendanceRecordsByVoucherId -> getAttendanceRecordsByVoucherId();

}

if (isset($_POST['getDailyWorkingHoursByVoucherId'])) {

    $getDailyWorkingHoursByVoucherId = new AjaxPayroll();
    $voucher_id = (int) filter_var((int) $_POST['getDailyWorkingHoursByVoucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getDailyWorkingHoursByVoucherId -> salaryVoucherId = $voucher_id;
    $getDailyWorkingHoursByVoucherId -> getDailyWorkingHoursByVoucherId();

}