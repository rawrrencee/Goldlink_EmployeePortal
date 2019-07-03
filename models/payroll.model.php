<?php

require_once "connection.php";

class PayrollModel
{
    public static function mdlViewSalaryVoucherById($value) {
        $table = 'salary_vouchers';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function mdlViewSalaryRecordsByVoucherId($value) {
        $table = 'salary_records';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewDeductionRecordsByVoucherId($value) {
        $table = 'deduction_records';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewOtherRecordsByVoucherId($value) {
        $table = 'other_records';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewDailySalesFigureByVoucherId($value) {
        $table = 'daily_sales_figure';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewAttendanceRecordsByVoucherId($value) {
        $table = 'attendance_records';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE voucher_id = :voucher_id");
        $stmt->bindParam(":voucher_id", $value, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function mdlCreateNewSalaryVoucher($salaryVoucherData)
    {
        $table = 'salary_vouchers';
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("INSERT INTO $table(created_on, modified_on, person_id, month_of_voucher, year_of_voucher, is_draft, pay_to_name, designation, nric, bank_name, bank_acct, gross_pay, total_deductions, total_others, final_amount, is_sg_pr, cpf_employee, cpf_employer, boutique, boutique_sales, personal_sales, num_days_zero_sales, num_reports_submitted) VALUES (:created_on, :modified_on, :person_id, :month_of_voucher, :year_of_voucher, :is_draft, :pay_to_name, :designation, :nric, :bank_name, :bank_acct, :gross_pay, :total_deductions, :total_others, :final_amount, :is_sg_pr, :cpf_employee, :cpf_employer, :boutique, :boutique_sales, :personal_sales, :num_days_zero_sales, :num_reports_submitted)");

        try {

            $conn->beginTransaction();

            $stmt->bindParam(":created_on", $salaryVoucherData['created_on'], PDO::PARAM_STR);
            $stmt->bindParam(":modified_on", $salaryVoucherData['modified_on'], PDO::PARAM_STR);
            $stmt->bindParam(":person_id", $salaryVoucherData['person_id'], PDO::PARAM_INT);
            $stmt->bindParam(":month_of_voucher", $salaryVoucherData['month_of_voucher'], PDO::PARAM_INT);
            $stmt->bindParam(":year_of_voucher", $salaryVoucherData['year_of_voucher'], PDO::PARAM_INT);
            $stmt->bindParam(":is_draft", $salaryVoucherData['is_draft'], PDO::PARAM_INT);
            $stmt->bindParam(":pay_to_name", $salaryVoucherData['pay_to_name'], PDO::PARAM_STR);
            $stmt->bindParam(":designation", $salaryVoucherData['designation'], PDO::PARAM_STR);
            $stmt->bindParam(":nric", $salaryVoucherData['nric'], PDO::PARAM_STR);
            $stmt->bindParam(":bank_name", $salaryVoucherData['bank_name'], PDO::PARAM_STR);
            $stmt->bindParam(":bank_acct", $salaryVoucherData['bank_acct'], PDO::PARAM_STR);
            $stmt->bindParam(":gross_pay", $salaryVoucherData['gross_pay'], PDO::PARAM_STR);
            $stmt->bindParam(":total_deductions", $salaryVoucherData['total_deductions'], PDO::PARAM_STR);
            $stmt->bindParam(":total_others", $salaryVoucherData['total_others'], PDO::PARAM_STR);
            $stmt->bindParam(":final_amount", $salaryVoucherData['final_amount'], PDO::PARAM_STR);
            $stmt->bindParam(":is_sg_pr", $salaryVoucherData['is_sg_pr'], PDO::PARAM_INT);
            $stmt->bindParam(":cpf_employee", $salaryVoucherData['cpf_employee'], PDO::PARAM_STR);
            $stmt->bindParam(":cpf_employer", $salaryVoucherData['cpf_employer'], PDO::PARAM_STR);
            $stmt->bindParam(":boutique", $salaryVoucherData['boutique'], PDO::PARAM_STR);
            $stmt->bindParam(":boutique_sales", $salaryVoucherData['boutique_sales'], PDO::PARAM_STR);
            $stmt->bindParam(":personal_sales", $salaryVoucherData['personal_sales'], PDO::PARAM_STR);
            $stmt->bindParam(":num_days_zero_sales", $salaryVoucherData['num_days_zero_sales'], PDO::PARAM_INT);
            $stmt->bindParam(":num_reports_submitted", $salaryVoucherData['num_reports_submitted'], PDO::PARAM_INT);

            $stmt->execute();

            $newSalaryVoucherIdStmt = $conn->prepare("SELECT voucher_id FROM $table WHERE person_id = :person_id AND created_on = :created_on ORDER BY voucher_id DESC LIMIT 1");
            $newSalaryVoucherIdStmt->bindParam(":person_id", $salaryVoucherData["person_id"], PDO::PARAM_INT);
            $newSalaryVoucherIdStmt->bindParam(":created_on", $salaryVoucherData["created_on"], PDO::PARAM_STR);
            $newSalaryVoucherIdStmt->execute();

            $results = $newSalaryVoucherIdStmt->fetch(PDO::FETCH_ASSOC);
            $salaryVoucherData['voucher_id'] = $results['voucher_id'];

            foreach ($salaryVoucherData['salary_titles'] as $index => $salaryTitle) {
                $salaryRecordData = array(
                    'voucher_id' => $results['voucher_id'],
                    'title' => $salaryTitle,
                    'amount' => $salaryVoucherData['salary_amounts'][$index],
                    'remarks' => $salaryVoucherData['salary_remarks'][$index],
                );
                self::mdlCreateSalaryRecords($conn, $salaryRecordData);
            }

            foreach ($salaryVoucherData['deduction_titles'] as $index => $deductionTitle) {
                $deductionRecordData = array(
                    'voucher_id' => $results['voucher_id'],
                    'title' => $deductionTitle,
                    'amount' => $salaryVoucherData['deduction_amounts'][$index],
                );
                self::mdlCreateDeductionRecords($conn, $deductionRecordData);
            }

            if ($salaryVoucherData['other_titles'] != null) {
                foreach ($salaryVoucherData['other_titles'] as $index => $otherTitle) {
                    $otherRecordData = array(
                        'voucher_id' => $results['voucher_id'],
                        'title' => $otherTitle,
                        'amount' => $salaryVoucherData['other_amounts'][$index],
                    );
                    self::mdlCreateOtherRecords($conn, $otherRecordData);
                }
            }

            foreach ($salaryVoucherData['days_of_month'] as $index => $dayOfMonth) {
                $dailySalesFigureData = array(
                    'voucher_id' => $results['voucher_id'],
                    'day_of_month' => $dayOfMonth,
                    'sales_information' => $salaryVoucherData['sales_information'][$index],
                );
                self::mdlCreateDailySalesFigures($conn, $dailySalesFigureData);
            }

            $attendanceRecordData = array(
                'voucher_id' => $results['voucher_id'],
                'off_days' => $salaryVoucherData['off_days'],
                'late_days' => $salaryVoucherData['late_days'],
                'leave_mc_days' => $salaryVoucherData['leave_mc_days'],
                'total_working_days' => $salaryVoucherData['total_working_days'],
                'leave_entitled' => $salaryVoucherData['leave_entitled'],
                'leave_taken' => $salaryVoucherData['leave_taken'],
                'leave_remaining' => $salaryVoucherData['leave_remaining']
            );

            self::mdlCreateAttendanceRecords($conn, $attendanceRecordData);

            $conn->commit();

            return true;

        } catch (PDOException $e) {

            $conn->rollBack();
            $error = print_r($e->getMessage(), true);
            return $error;

        }
    }

    public static function mdlCreateSalaryRecords($conn, $salaryRecordData)
    {

        $table = 'salary_records';
        $stmt = $conn->prepare("INSERT INTO $table (voucher_id, title, amount, remarks) VALUES (:voucher_id, :title, :amount, :remarks)");
        $stmt->bindParam(":voucher_id", $salaryRecordData['voucher_id'], PDO::PARAM_INT);
        $stmt->bindParam(":title", $salaryRecordData['title'], PDO::PARAM_STR);
        $stmt->bindParam(":amount", $salaryRecordData['amount'], PDO::PARAM_STR);
        $stmt->bindParam(":remarks", $salaryRecordData['remarks'], PDO::PARAM_STR);

        $stmt->execute();

    }

    public static function mdlCreateDeductionRecords($conn, $deductionRecordData)
    {

        $table = 'deduction_records';
        $stmt = $conn->prepare("INSERT INTO $table (voucher_id, title, amount) VALUES (:voucher_id, :title, :amount)");
        $stmt->bindParam(":voucher_id", $deductionRecordData['voucher_id'], PDO::PARAM_INT);
        $stmt->bindParam(":title", $deductionRecordData['title'], PDO::PARAM_STR);
        $stmt->bindParam(":amount", $deductionRecordData['amount'], PDO::PARAM_STR);

        $stmt->execute();

    }

    public static function mdlCreateOtherRecords($conn, $otherRecordData)
    {

        $table = 'other_records';
        $stmt = $conn->prepare("INSERT INTO $table (voucher_id, title, amount) VALUES (:voucher_id, :title, :amount)");
        $stmt->bindParam(":voucher_id", $otherRecordData['voucher_id'], PDO::PARAM_INT);
        $stmt->bindParam(":title", $otherRecordData['title'], PDO::PARAM_STR);
        $stmt->bindParam(":amount", $otherRecordData['amount'], PDO::PARAM_STR);

        $stmt->execute();

    }

    public static function mdlCreateDailySalesFigures($conn, $dailySalesFigureData)
    {

        $table = 'daily_sales_figure';
        $stmt = $conn->prepare("INSERT INTO $table (voucher_id, day_of_month, sales_information) VALUES (:voucher_id, :day_of_month, :sales_information)");
        $stmt->bindParam(":voucher_id", $dailySalesFigureData['voucher_id'], PDO::PARAM_INT);
        $stmt->bindParam(":day_of_month", $dailySalesFigureData['day_of_month'], PDO::PARAM_STR);
        $stmt->bindParam(":sales_information", $dailySalesFigureData['sales_information'], PDO::PARAM_STR);

        $stmt->execute();

    }

    public static function mdlCreateAttendanceRecords($conn, $attendanceRecordData) {
        $table = 'attendance_records';
        $stmt = $conn->prepare("INSERT INTO $table (voucher_id, off_days, late_days, leave_mc_days, total_working_days, leave_entitled, leave_taken, leave_remaining) VALUES (:voucher_id, :off_days, :late_days, :leave_mc_days, :total_working_days, :leave_entitled, :leave_taken, :leave_remaining)");

        $stmt->bindParam(":voucher_id", $attendanceRecordData['voucher_id'], PDO::PARAM_INT);
        $stmt->bindParam(":off_days", $attendanceRecordData['off_days'], PDO::PARAM_STR);
        $stmt->bindParam(":late_days", $attendanceRecordData['late_days'], PDO::PARAM_STR);
        $stmt->bindParam(":leave_mc_days", $attendanceRecordData['leave_mc_days'], PDO::PARAM_STR);
        $stmt->bindParam(":total_working_days", $attendanceRecordData['total_working_days'], PDO::PARAM_INT);
        $stmt->bindParam(":leave_entitled", $attendanceRecordData['leave_entitled'], PDO::PARAM_INT);
        $stmt->bindParam(":leave_taken", $attendanceRecordData['leave_taken'], PDO::PARAM_INT);
        $stmt->bindParam(":leave_remaining", $attendanceRecordData['leave_remaining'], PDO::PARAM_INT);

        $stmt->execute();
    }

}
