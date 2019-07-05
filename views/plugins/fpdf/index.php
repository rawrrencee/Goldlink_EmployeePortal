<?php
require 'fpdf.php';
session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"] || !isset($_GET['voucherId'])) {
    die("Invalid Authentication");
}

require_once "../../../controllers/payroll.controller.php";
require_once "../../../models/payroll.model.php";

class GenerateVoucherPDF
{
    public $salaryVoucherId;

    public function getSalaryVoucherById()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryVoucherById($value);

        return $answer;

    }

    public function getSalaryRecordsByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryRecordsByVoucherId($value);

        return $answer;

    }

    public function getDeductionRecordsByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewDeductionRecordsByVoucherId($value);

        return $answer;

    }

    public function getOtherRecordsByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewOtherRecordsByVoucherId($value);

        return $answer;

    }

    public function getDailySalesFigureByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewDailySalesFigureByVoucherId($value);

        return $answer;

    }

    public function getAttendanceRecordsByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewAttendanceRecordsByVoucherId($value);

        return $answer;

    }
}

if (isset($_GET['voucherId'])) {

    $getSalaryVoucherById = new GenerateVoucherPDF();

    $voucher_id = (int) filter_var((int) $_GET['voucherId'], FILTER_SANITIZE_NUMBER_INT);

    $getSalaryVoucherById->salaryVoucherId = $voucher_id;

    $salaryVoucherData = $getSalaryVoucherById->getSalaryVoucherById();

    $salaryRecordData = $getSalaryVoucherById->getSalaryRecordsByVoucherId();

    $deductionRecordData = $getSalaryVoucherById->getDeductionRecordsByVoucherId();

    $otherRecordData = $getSalaryVoucherById->getOtherRecordsByVoucherId();

    $dailySalesFigureData = $getSalaryVoucherById->getDailySalesFigureByVoucherId();

    $attendanceRecordData = $getSalaryVoucherById->getAttendanceRecordsByVoucherId();

    switch ($salaryVoucherData['month_of_voucher']) {
        case "1":
            $month = "January";
            break;
        case "2":
            $month = "February";
            break;
        case "3":
            $month = "March";
            break;
        case "4":
            $month = "April";
            break;
        case "5":
            $month = "May";
            break;
        case "6":
            $month = "June";
            break;
        case "7":
            $month = "July";
            break;
        case "8":
            $month = "August";
            break;
        case "9":
            $month = "September";
            break;
        case "10":
            $month = "October";
            break;
        case "11":
            $month = "November";
            break;
        case "12":
            $month = "December";
            break;
    }   

    $pdf = new FPDF();
    $pdf->AddPage('P', 'A4');
    $pdf->SetAutoPageBreak(true, 10);
    $pdf->SetFont('Arial', '', 12);
    $pdf->SetTopMargin(10);
    $pdf->SetLeftMargin(10);
    $pdf->SetRightMargin(10);
    
    /* --- Image --- */
    $pdf->Image('logo.png', 10, 10, 20, 20);
    /* --- Cell --- */
    $pdf->SetXY(10, 33);
    $pdf->SetFont('', 'B', 14);
    $pdf->Cell(0, 5, 'Goldlink - '.date(Y).' (Full Time)', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(152, 10);
    $pdf->SetFont('', 'B', 14);
    $pdf->Cell(49, 6, 'SALARY VOUCHER', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(152, 17);
    $pdf->SetFontSize(10);
    $pdf->Cell(48, 3, $month, 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(10, 44);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(41, 4, 'Pay To (as in NRIC):', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(52, 44);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(59, 4, $salaryVoucherData['pay_to_name'], 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(135, 44);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(14, 4, 'I/C No:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(165, 44);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['nric'], 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(10, 50);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(59, 4, 'Designation:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(52, 50);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(73, 3, $salaryVoucherData['designation'], 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(135, 50);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(27, 3, 'Date of Birth:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(165, 50);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, $_SESSION['date_of_birth'], 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(165, 56);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['bank_acct'], 0, 1, 'R', false);
    /* --- Cell --- */
    $pdf->SetXY(135, 56);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, 'Bank Account:', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(10, 56);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(43, 4, 'Bank Name:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(52, 56);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(69, 3, $salaryVoucherData['bank_name'], 0, 1, 'L', false);
    
    /* --- Line --- */
    $pdf->Line(10, 68, 200, 68);
    
    /* --- Cell --- */
    $pdf->SetXY(10, 72);
    $pdf->SetFont('', 'B', 12);
    $pdf->Cell(0, 4, 'Salary', 0, 1, 'L', false);

    $pdf->SetFont('', '', 12);

    foreach ($salaryRecordData as $index => $record) {
        /* --- Cell --- */
        $pdf->SetXY(10, 82 + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $record['title'], 0, 1, 'L', false);
        /* --- Cell --- */
        $pdf->SetXY(160, 82 + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, 'S$', 0, 1, 'R', false);
        /* --- Cell --- */
        $pdf->SetXY(180, 82 + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $salaryRecordData[$index]['amount'], 0, 1, 'R', false);
        /* --- Cell --- */
        $pdf->SetXY(94, 82 + 6 * $index);
        $pdf->SetFontSize(7);
        $pdf->Cell(19, 3, $salaryRecordData[$index]['remarks'], 0, 1, 'R', false);

        $finalHeight = 82 + 6* $index;
    }

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, 'Gross Pay:', 0, 1, 'L', false);
    
    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['gross_pay'], 0, 1, 'R', false);

    $finalHeight = $finalHeight + 12;

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 10);
    $pdf->SetFont('', 'B', 12);
    $pdf->Cell(0, 4, 'Deductions', 0, 1, 'L', false);

    $finalHeight = $finalHeight + 20;

    $pdf->SetFont('', '', 12);

    foreach ($deductionRecordData as $index => $record) {
        /* --- Cell --- */
        $pdf->SetXY(10, $finalHeight + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $record['title'], 0, 1, 'L', false);
        /* --- Cell --- */
        $pdf->SetXY(160, $finalHeight + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, 'S$', 0, 1, 'R', false);
        /* --- Cell --- */
        $pdf->SetXY(180, $finalHeight + 6 * $index);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $salaryRecordData[$index]['amount'], 0, 1, 'R', false);
    }

    $finalHeight = $finalHeight + (count($deductionRecordData) - 1) * 6;

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, 'Total Deductions:', 0, 1, 'L', false);
     
    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);
    
    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['total_deductions'], 0, 1, 'R', false);
    
    $finalHeight = $finalHeight + 12;
    


    $pdf->Output('Salary_Voucher_'.date(Y_M).'_'.$salaryVoucherData['pay_to_name'].'.pdf','I');

    $pdf->Output();

}