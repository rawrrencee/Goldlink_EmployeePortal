<?php
require 'fpdf.php';
session_start();
if (!isset($_SESSION["loggedIn"]) || !isset($_GET['voucherId'])) {
    if (!isset($_SESSION["loggedIn"])) {
        echo '<script>
        window.location = "https://emp.goldlink.com.sg/login";
        </script>';
    } else {
        die("Invalid Authentication");
    }
}

if (!in_array('employee-salary-voucher-download', $_SESSION['allowed_modules'])) {
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

        if (!in_array('employee-salary-voucher-management', $_SESSION['allowed_modules'])) {
            if ($answer['person_id'] != $_SESSION['person_id']) {
                die("Invalid Authentication");
            }
        }

        return $answer;

    }

    public function getSalaryRecordsByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryRecordsByVoucherId($value);

        return $answer;

    }

    public function getSalaryRecordsPTByVoucherId()
    {

        $value = $this->salaryVoucherId;

        $answer = PayrollController::ctrViewSalaryRecordsPTByVoucherId($value);

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

    if ($salaryVoucherData['is_part_time'] == 0) {
        $salaryRecordData = $getSalaryVoucherById->getSalaryRecordsByVoucherId();
    } else {
        $salaryRecordData = $getSalaryVoucherById->getSalaryRecordsPTByVoucherId();
    }

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

    if ($salaryVoucherData['is_part_time'] == 1) {
        if ($salaryVoucherData['company_name'] == 'Goldlink Asia') {
            /* --- Image --- */
            $pdf->Image('logo.png', 10, 10, 20, 20);
            /* --- Cell --- */
            $pdf->SetXY(10, 33);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Goldlink Asia - ' . date(Y) . ' (Part Time)', 0, 1, 'L', false);
        } else if ($salaryVoucherData['company_name'] == 'Goldlink Technologies') {
            $pdf->SetXY(10, 15);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Goldlink Technologies - ' . date(Y) . ' (Part Time)', 0, 1, 'L', false);
        } else {
            $pdf->SetXY(10, 15);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Doro  International - ' . date(Y) . ' (Part Time)', 0, 1, 'L', false);
        }
    } else {
        if ($salaryVoucherData['company_name'] == 'Goldlink Asia') {
            /* --- Image --- */
            $pdf->Image('logo.png', 10, 10, 20, 20);
            /* --- Cell --- */
            $pdf->SetXY(10, 33);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Goldlink Asia - ' . date(Y) . ' (Full Time)', 0, 1, 'L', false);
        } else if ($salaryVoucherData['company_name'] == 'Goldlink Technologies') {
            $pdf->SetXY(10, 15);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Goldlink Technologies - ' . date(Y) . ' (Full Time)', 0, 1, 'L', false);
        } else {
            $pdf->SetXY(10, 15);
            $pdf->SetFont('', 'B', 14);
            $pdf->Cell(0, 5, 'Doro  International - ' . date(Y) . ' (Full Time)', 0, 1, 'L', false);
        }
    }

    /* --- Cell --- */
    $pdf->SetXY(151, 15);
    $pdf->SetFont('', 'B', 14);
    $pdf->Cell(49, 3, 'SALARY VOUCHER', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(151, 21);
    $pdf->SetFontSize(10);
    $pdf->Cell(49, 3, $month, 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(151, 27);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(49, 3, '#' . $salaryVoucherData['voucher_id'], 0, 1, 'L', false);

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
    $pdf->Cell(73, 4, $salaryVoucherData['designation'], 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(135, 50);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(27, 3, 'Date of Birth:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(165, 50);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['date_of_birth'], 0, 1, 'R', false);

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
    $pdf->Cell(69, 4, $salaryVoucherData['bank_name'], 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(10, 62);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(43, 4, 'Method of Payment:', 0, 1, 'L', false);
    /* --- Cell --- */
    $pdf->SetXY(52, 62);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(69, 4, $salaryVoucherData['method_of_payment'], 0, 1, 'L', false);

    /* --- Line --- */
    $pdf->Line(10, 68, 200, 68);

    /* --- Cell --- */
    $pdf->SetXY(10, 72);
    $pdf->SetFont('', 'B', 12);
    $pdf->Cell(0, 4, 'Salary', 0, 1, 'L', false);

    $pdf->SetFont('', '', 12);

    if ($salaryVoucherData['is_part_time'] == 0) {
        foreach ($salaryRecordData as $index => $record) {
            /* --- Cell --- */
            $pdf->SetXY(10, 82 + 6 * $index);
            $pdf->SetFont('', '', 10);
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
            $pdf->SetFont('', 'I', 7);
            $pdf->Cell(19, 3, $salaryRecordData[$index]['remarks'], 0, 1, 'L', false);

            $finalHeight = 82 + 6 * $index;
        }
    } else {
        foreach ($salaryRecordData as $index => $record) {
            /* --- Cell --- */
            $pdf->SetXY(10, 82 + 6 * $index);
            $pdf->SetFont('', '', 10);
            $pdf->Cell(19, 3, $record['title'], 0, 1, 'L', false);
            /* --- Cell --- */
            $pdf->SetXY(160, 82 + 6 * $index);
            $pdf->SetFontSize(10);
            $pdf->Cell(19, 3, 'S$', 0, 1, 'R', false);
            /* --- Cell --- */
            $pdf->SetXY(180, 82 + 6 * $index);
            $pdf->SetFontSize(10);
            $pdf->Cell(19, 3, $salaryRecordData[$index]['subtotal'], 0, 1, 'R', false);
            /* --- Cell --- */
            $pdf->SetXY(65, 82 + 6 * $index);
            $pdf->SetFont('', 'I', 7);
            $pdf->Cell(4, 3, 'Rate: ', 0, 1, 'L', false);
            /* --- Cell --- */
            $pdf->SetXY(95, 82 + 6 * $index);
            $pdf->SetFont('', 'I', 7);
            $pdf->Cell(5, 3, $salaryRecordData[$index]['rate'] . ' / unit', 0, 1, 'R', false);
            /* --- Cell --- */
            $pdf->SetXY(115, 82 + 6 * $index);
            $pdf->SetFont('', 'I', 7);
            $pdf->Cell(1, 3, ' x ', 0, 1, 'R', false);
            /* --- Cell --- */
            $pdf->SetXY(120, 82 + 6 * $index);
            $pdf->SetFont('', 'I', 7);
            $pdf->Cell(19, 3, $salaryRecordData[$index]['unit'] . ' units', 0, 1, 'R', false);

            $finalHeight = 82 + 6 * $index;
        }
    }

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', '', 10);
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
        if ($salaryVoucherData['is_sg_pr'] == 0 && $record['title'] == "CPF-EE") {
            continue;
        }
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
        $pdf->Cell(19, 3, $deductionRecordData[$index]['amount'], 0, 1, 'R', false);
    }

    $finalHeight = $finalHeight + (count($deductionRecordData) - 1) * 6;

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Total Deductions:', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, '-' . $salaryVoucherData['total_deductions'], 0, 1, 'R', false);

    $finalHeight = $finalHeight + 12;

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 10);
    $pdf->SetFont('', 'B', 12);
    $pdf->Cell(0, 4, 'Others', 0, 1, 'L', false);

    $finalHeight = $finalHeight + 20;

    $pdf->SetFont('', '', 12);

    foreach ($otherRecordData as $index => $record) {
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
        $pdf->Cell(19, 3, $otherRecordData[$index]['amount'], 0, 1, 'R', false);
    }

    $finalHeight = $finalHeight + (count($otherRecordData) - 1) * 6;

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Total Others:', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['total_others'], 0, 1, 'R', false);

    $finalHeight = $finalHeight + 12;

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, 'Nett Payment:', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);

    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, $salaryVoucherData['final_amount'], 0, 1, 'R', false);

    /* --- Line --- */
    $pdf->Line(10, $finalHeight + 22, 200, $finalHeight + 22);

    $finalHeight = $finalHeight + 22;

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 4);
    $pdf->SetFont('', 'B', 12);
    $pdf->Cell(0, 4, 'Company Payout', 0, 1, 'L', false);

    $finalHeight += 4;

    if ($salaryVoucherData['is_sg_pr'] == 1) {
        /* --- Cell --- */
        $pdf->SetXY(10, $finalHeight + 12);
        $pdf->SetFont('', '', 10);
        $pdf->Cell(0, 4, 'CPF-ER', 0, 1, 'L', false);
        /* --- Cell --- */
        $pdf->SetXY(160, $finalHeight + 12);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, 'S$', 0, 1, 'R', false);
        /* --- Cell --- */
        $pdf->SetXY(180, $finalHeight + 12);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $salaryVoucherData['cpf_employer'], 0, 1, 'R', false);
    } else {
        /* --- Cell --- */
        $pdf->SetXY(10, $finalHeight + 12);
        $pdf->SetFont('', '', 10);
        $pdf->Cell(0, 4, 'Levy', 0, 1, 'L', false);
        /* --- Cell --- */
        $pdf->SetXY(160, $finalHeight + 12);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, 'S$', 0, 1, 'R', false);
        /* --- Cell --- */
        $pdf->SetXY(180, $finalHeight + 12);
        $pdf->SetFontSize(10);
        $pdf->Cell(19, 3, $salaryVoucherData['levy_amount'], 0, 1, 'R', false);
    }

    $finalHeight = $finalHeight + 12;

    /* --- Line --- */
    $pdf->Line(130, $finalHeight + 10, 199, $finalHeight + 10);

    /* --- Cell --- */
    $pdf->SetXY(130, $finalHeight + 12);
    $pdf->SetFont('', 'B', 10);
    $pdf->Cell(0, 4, 'Total Payout:', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(160, $finalHeight + 12);
    $pdf->SetFontSize(10);
    $pdf->Cell(19, 4, 'S$', 0, 1, 'R', false);

    $totalPayout = 0.00;

    if ($salaryVoucherData['is_sg_pr'] == 1) {
        $totalPayout = number_format((float) ($salaryVoucherData['gross_pay'] + $salaryVoucherData['cpf_employer']), 2, '.', '');
    } else {
        $totalPayout = number_format((float) ($salaryVoucherData['gross_pay'] + $salaryVoucherData['levy_amount']), 2, '.', '');
    }

    /* --- Cell --- */
    $pdf->SetXY(180, $finalHeight + 12);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, $totalPayout, 0, 1, 'R', false);

    /* --- Line --- */
    $pdf->Line(10, $finalHeight + 22, 200, $finalHeight + 22);

    $finalHeight += 22;

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 4);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Personal Sales: S$' . $salaryVoucherData['personal_sales'], 0, 1, 'L', false);

    if (is_infinite($totalPayout / $salaryVoucherData['personal_sales']) || is_nan($totalPayout / $salaryVoucherData['personal_sales'])) {
        $percentage = "N/A";
    } else {
        $percentage = round(($totalPayout / $salaryVoucherData['personal_sales']) * 100, 2);
    }

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 10);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Percentage of Salary/Sales: ' . $percentage . '%', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 16);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Number of days closing $0 sales: ' . $salaryVoucherData['num_days_zero_sales'] . ' days', 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(10, $finalHeight + 22);
    $pdf->SetFont('', '', 10);
    $pdf->Cell(0, 4, 'Number of reports handed up: ' . $salaryVoucherData['num_reports_submitted'], 0, 1, 'L', false);

    /* --- Cell --- */
    $pdf->SetXY(91, $finalHeight + 16);
    if ($salaryVoucherData['status'] == 'Approved') {
        $date = date_create($salaryVoucherData['modified_on']);
        $pdf->Cell(0, 10, 'Supervisor Sign & Date: ', 1, 1, 'L', false);
        $pdf->SetFont('Courier', '', 9);
        $pdf->Text(132, $finalHeight + 22, $salaryVoucherData['updated_by'] . ' - ' . date_format($date, 'd M Y'));
    } else {
        $pdf->Cell(0, 10, 'Supervisor Sign & Date: ', 1, 1, 'L', false);
    }
    $pdf->Output('Salary_Voucher_' . date(Y_M) . '_' . $salaryVoucherData['pay_to_name'] . '.pdf', 'I');

    $pdf->Output();

}
