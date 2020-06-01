<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

class PayrollController
{

    public static function ctrViewSalaryVoucherById($value)
    {

        $response = PayrollModel::mdlViewSalaryVoucherById($value);

        return $response;

    }

    public static function ctrViewSalaryRecordsByVoucherId($value)
    {

        $response = PayrollModel::mdlViewSalaryRecordsByVoucherId($value);

        return $response;

    }

    public static function ctrViewSalaryRecordsPTByVoucherId($value)
    {

        $response = PayrollModel::mdlViewSalaryRecordsPTByVoucherId($value);

        return $response;

    }

    public static function ctrViewDeductionRecordsByVoucherId($value)
    {

        $response = PayrollModel::mdlViewDeductionRecordsByVoucherId($value);

        return $response;

    }

    public static function ctrViewOtherRecordsByVoucherId($value)
    {

        $response = PayrollModel::mdlViewOtherRecordsByVoucherId($value);

        return $response;

    }

    public static function ctrViewDailySalesFigureByVoucherId($value)
    {

        $response = PayrollModel::mdlViewDailySalesFigureByVoucherId($value);

        return $response;

    }

    public static function ctrViewDailyWorkingHoursByVoucherId($value)
    {

        $response = PayrollModel::mdlViewDailyWorkingHoursByVoucherId($value);

        return $response;

    }

    public static function ctrViewAttendanceRecordsByVoucherId($value)
    {

        $response = PayrollModel::mdlViewAttendanceRecordsByVoucherId($value);

        return $response;

    }

    public static function ctrViewAllSalaryVouchersByMonth($monthToAnalyse, $yearToAnalyse)
    {

        $response = PayrollModel::mdlViewAllSalaryVouchersByMonth($monthToAnalyse, $yearToAnalyse);

        return $response;

    }

    public static function ctrViewAllSalaryVouchersByYear($yearToAnalyse)
    {
        $response = PayrollModel::mdlViewAllSalaryVouchersByYear($yearToAnalyse);

        return $response;
    }

    public static function ctrViewIndivSalaryVouchersByYear($personId, $yearToAnalyse)
    {
        $response = PayrollModel::mdlViewIndivSalaryVouchersByYear($personId, $yearToAnalyse);

        return $response;
    }

    public static function ctrRetrieveIndivSalaryVoucherByStatus($data)
    {

        $response = PayrollModel::mdlRetrieveIndivSalaryVoucherByStatus($data);

        return $response;
    }

    public static function ctrCreateNewSalaryVoucher()
    {
        if ($_POST['newIsDraft'] != null && $_POST['currentVoucherId'] == null) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            //PARSE & SANITIZE ALL NON-ARRAY BASED INPUTS
            $submittedForm['person_id'] = $_SESSION['person_id'];
            if ($_POST['voucher_id'] != null) {
                $submittedForm['voucher_id'] = (int) filter_var((int) $_POST['voucher_id'], FILTER_SANITIZE_NUMBER_INT);
            }
            $submittedForm['is_draft'] = (int) filter_var((int) $_POST['newIsDraft'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_part_time'] = (int) filter_var((int) $_POST['newIsPartTime'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['year_of_voucher'] = (int) filter_var((int) ($_POST['newYearOfVoucher']), FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['month_of_voucher'] = (int) filter_var((int) $_POST['newMonthOfVoucher'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['pay_to_name'] = filter_var($_POST['newPayToPersonName'], FILTER_SANITIZE_STRING);
            $submittedForm['designation'] = filter_var($_POST['newDesignation'], FILTER_SANITIZE_STRING);
            $submittedForm['nric'] = filter_var($_POST['newNRIC'], FILTER_SANITIZE_STRING);
            $submittedForm['date_of_birth'] = filter_var($_POST['newDateOfBirth'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_name'] = filter_var($_POST['newBankName'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_acct'] = filter_var($_POST['newBankAccount'], FILTER_SANITIZE_STRING);
            if ($_POST['newBoutique'] != null) {
                $submittedForm['boutique'] = filter_var($_POST['newBoutique'], FILTER_SANITIZE_STRING);
            }
            if ($_POST['newBoutiqueSales'] != null) {
                $submittedForm['boutique_sales'] = filter_var($_POST['newBoutiqueSales'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_sg_pr'] = (int) filter_var((int) $_POST['newIsSGPR'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_csm'] = (int) filter_var((int) $_POST['newCSMSelection'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['cpf_employee'] = number_format(floatval(filter_var($_POST['deductionAmount'][0], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['cpf_employer'] = number_format(floatval(filter_var($_POST['newCPFEmployer'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['num_days_zero_sales'] = (int) filter_var((int) $_POST['newNumDaysZeroSales'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['num_reports_submitted'] = (int) filter_var((int) $_POST['newNumReportsSubmitted'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['personal_sales'] = number_format(floatval(filter_var($_POST['newPersonalSales'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['gross_pay'] = number_format(floatval(filter_var($_POST['newGrossPay'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_deductions'] = number_format(floatval(filter_var($_POST['newTotalDeductions'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_others'] = number_format(floatval(filter_var($_POST['newTotalOthers'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['final_amount'] = number_format(floatval(filter_var($_POST['newFinalAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');

            $submittedForm['off_days'] = filter_var($_POST['newOffDays'], FILTER_SANITIZE_STRING);
            $submittedForm['late_days'] = filter_var($_POST['newLateDays'], FILTER_SANITIZE_STRING);
            $submittedForm['leave_mc_days'] = filter_var($_POST['newLeaveMCDays'], FILTER_SANITIZE_STRING);
            $submittedForm['total_working_days'] = (int) filter_var((int) $_POST['newTotalWorkingDays'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_entitled'] = (int) filter_var((int) $_POST['newLeaveEntitled'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_taken'] = (int) filter_var((int) $_POST['newLeaveTaken'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_remaining'] = (int) filter_var((int) $_POST['newLeaveRemaining'], FILTER_SANITIZE_NUMBER_INT);

            $submittedForm['levy_amount'] = number_format(floatval(filter_var($_POST['newLevyAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['sdl_amount'] = number_format(floatval(filter_var($_POST['newSDLAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['company_name'] = filter_var($_POST['newCompanyName'], FILTER_SANITIZE_STRING);

            if ($_POST['newIsPartTime'] == 1) {
                $submittedForm['total_hours_worked'] = filter_var($_POST['newTotalHoursWorked'], FILTER_SANITIZE_STRING);
            }

            //PARSE & SANITIZE ARRAY BASED INPUTS
            if ($_POST['newIsPartTime'] == 0) {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryAmount'][$index] = number_format(floatval(filter_var($_POST['salaryAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            } else {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryRate'][$index] = number_format(floatval(filter_var($_POST['salaryRate'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryUnit'][$index] = number_format(floatval(filter_var($_POST['salaryUnit'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salarySubtotal'][$index] = number_format(floatval(filter_var($_POST['salarySubtotal'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            }

            foreach ($_POST['deductionTitle'] as $index => $deductionTitle) {
                $submittedForm['deductionTitle'][$index] = filter_var($deductionTitle, FILTER_SANITIZE_STRING);
                $submittedForm['deductionAmount'][$index] = number_format(floatval(filter_var($_POST['deductionAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
            }

            if ($_POST['othersTitle'] != null) {
                foreach ($_POST['othersTitle'] as $index => $othersTitle) {
                    $submittedForm['othersTitle'][$index] = filter_var($othersTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['othersAmount'][$index] = number_format(floatval(filter_var($_POST['othersAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                }
            }

            foreach ($_POST['newSalesInformation'] as $index => $salesInformation) {
                $submittedForm['newDayOfMonth'][$index] = (int) filter_var((int) $_POST['newDayOfMonth'][$index], FILTER_SANITIZE_NUMBER_INT);
                $submittedForm['newSalesInformation'][$index] = filter_var($salesInformation, FILTER_SANITIZE_STRING);
            }

            if ($_POST['newIsPartTime'] == 1) {
                foreach ($_POST['newDailyHoursWorked'] as $index => $hoursWorked) {
                    $submittedForm['newDailyHoursWorked'][$index] = filter_var($hoursWorked, FILTER_SANITIZE_STRING);
                }
            }

            if ($_POST['newIsPartTime'] == 1) {
                $salaryVoucherData = array(
                    'created_on' => date('Y-m-d H:i:s'),
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'is_part_time' => $submittedForm['is_part_time'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_rates' => $submittedForm['salaryRate'],
                    'salary_units' => $submittedForm['salaryUnit'],
                    'salary_subtotals' => $submittedForm['salarySubtotal'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'hours' => $submittedForm['newDailyHoursWorked'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                    'total_hours_worked' => $submittedForm['total_hours_worked'],
                );
            } else {
                $salaryVoucherData = array(
                    'created_on' => date('Y-m-d H:i:s'),
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_amounts' => $submittedForm['salaryAmount'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                );
            }

            //echo "<script type='text/javascript'> alert('hello, salaryvoucher:" . json_encode($salaryVoucherData) . "') </script>";

            if ($_POST['newIsPartTime'] == 1) {
                $response = PayrollModel::mdlCreateNewSalaryVoucherPT($salaryVoucherData);
            } else {
                $response = PayrollModel::mdlCreateNewSalaryVoucher($salaryVoucherData);
            }

            if ($_POST['newIsPartTime'] == 1) {
                if ($response) {
                    if ($submittedForm['is_draft'] == 1) {
                        echo '<script>

						swal({
							type: "success",
							title: "Draft saved succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit-pt";
							}

						});

                        </script>';
                    } else {

                        $response = self::notifySalarySubmissionViaEmail($response, $submittedForm);

                        echo '<script>
                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"
                        }).then(function(result){
                            if(result.value){
                                window.location = "employee-salary-voucher-submit-pt";
                            }
                        });
                        </script>';
                    }
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your information was not saved.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit-pt";
                            }
                    });
                </script>';
                }

            } else {
                if ($response) {
                    if ($submittedForm['is_draft'] == 1) {
                        echo '<script>

						swal({
							type: "success",
							title: "Draft saved succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit";
							}

						});

                        </script>';
                    } else {

                        $response = self::notifySalarySubmissionViaEmail($response, $submittedForm);

                        echo '<script>
                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"
                        }).then(function(result){
                            if(result.value){
                                window.location = "employee-salary-voucher-submit";
                            }
                        });
                        </script>';
                    }
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your information was not saved.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit";
                            }
                    });
                </script>';
                }
            }
        }
    }

    public static function ctrEditSalaryVoucher()
    {
        if (isset($_POST['newIsDraft']) != null && $_POST['currentVoucherId'] != null) {
            //echo "<script type='text/javascript'> alert('EDITING DRAFT: " . json_encode($_POST) . "') </script>";

            //PARSE & SANITIZE ALL NON-ARRAY BASED INPUTS

            $submittedForm['person_id'] = $_SESSION['person_id'];
            if ($_POST['currentVoucherId'] != null) {
                $submittedForm['voucher_id'] = (int) filter_var((int) $_POST['currentVoucherId'], FILTER_SANITIZE_NUMBER_INT);
            }
            if ($_POST['currentCreatedOn'] != null) {
                $submittedForm['created_on'] = filter_var($_POST['currentCreatedOn'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_draft'] = (int) filter_var((int) $_POST['newIsDraft'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_part_time'] = (int) filter_var((int) $_POST['newIsPartTime'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['year_of_voucher'] = (int) filter_var((int) ($_POST['newYearOfVoucher']), FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['month_of_voucher'] = (int) filter_var((int) $_POST['newMonthOfVoucher'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['method_of_payment'] = filter_var($_POST['newMethodOfPayment'], FILTER_SANITIZE_STRING);
            $submittedForm['pay_to_name'] = filter_var($_POST['newPayToPersonName'], FILTER_SANITIZE_STRING);
            $submittedForm['designation'] = filter_var($_POST['newDesignation'], FILTER_SANITIZE_STRING);
            $submittedForm['nric'] = filter_var($_POST['newNRIC'], FILTER_SANITIZE_STRING);
            $submittedForm['date_of_birth'] = filter_var($_POST['newDateOfBirth'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_name'] = filter_var($_POST['newBankName'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_acct'] = filter_var($_POST['newBankAccount'], FILTER_SANITIZE_STRING);
            if ($_POST['newBoutique'] != null) {
                $submittedForm['boutique'] = filter_var($_POST['newBoutique'], FILTER_SANITIZE_STRING);
            }
            if ($_POST['newBoutiqueSales'] != null) {
                $submittedForm['boutique_sales'] = filter_var($_POST['newBoutiqueSales'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_sg_pr'] = (int) filter_var((int) $_POST['newIsSGPR'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_csm'] = (int) filter_var((int) $_POST['newCSMSelection'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['cpf_employee'] = number_format(floatval(filter_var($_POST['deductionAmount'][0], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['cpf_employer'] = number_format(floatval(filter_var($_POST['newCPFEmployer'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['num_days_zero_sales'] = (int) filter_var((int) $_POST['newNumDaysZeroSales'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['num_reports_submitted'] = (int) filter_var((int) $_POST['newNumReportsSubmitted'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['personal_sales'] = number_format(floatval(filter_var($_POST['newPersonalSales'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['gross_pay'] = number_format(floatval(filter_var($_POST['newGrossPay'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_deductions'] = number_format(floatval(filter_var($_POST['newTotalDeductions'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_others'] = number_format(floatval(filter_var($_POST['newTotalOthers'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['final_amount'] = number_format(floatval(filter_var($_POST['newFinalAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');

            $submittedForm['off_days'] = filter_var($_POST['newOffDays'], FILTER_SANITIZE_STRING);
            $submittedForm['late_days'] = filter_var($_POST['newLateDays'], FILTER_SANITIZE_STRING);
            $submittedForm['leave_mc_days'] = filter_var($_POST['newLeaveMCDays'], FILTER_SANITIZE_STRING);
            $submittedForm['total_working_days'] = (int) filter_var((int) $_POST['newTotalWorkingDays'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_entitled'] = (int) filter_var((int) $_POST['newLeaveEntitled'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_taken'] = (int) filter_var((int) $_POST['newLeaveTaken'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_remaining'] = (int) filter_var((int) $_POST['newLeaveRemaining'], FILTER_SANITIZE_NUMBER_INT);

            $submittedForm['levy_amount'] = number_format(floatval(filter_var($_POST['newLevyAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['sdl_amount'] = number_format(floatval(filter_var($_POST['newSDLAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['company_name'] = filter_var($_POST['newCompanyName'], FILTER_SANITIZE_STRING);
            $submittedForm['status'] = "Pending";
            $submittedForm['updated_by'] = filter_var($_POST['voucherUpdatedBy'], FILTER_SANITIZE_STRING);

            if ($_POST['newIsPartTime'] == 1) {
                $submittedForm['total_hours_worked'] = filter_var($_POST['newTotalHoursWorked'], FILTER_SANITIZE_STRING);
            }

            //PARSE & SANITIZE ARRAY BASED INPUTS
            if ($_POST['newIsPartTime'] == 0) {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryAmount'][$index] = number_format(floatval(filter_var($_POST['salaryAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            } else {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryRate'][$index] = number_format(floatval(filter_var($_POST['salaryRate'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryUnit'][$index] = number_format(floatval(filter_var($_POST['salaryUnit'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salarySubtotal'][$index] = number_format(floatval(filter_var($_POST['salarySubtotal'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            }

            foreach ($_POST['deductionTitle'] as $index => $deductionTitle) {
                $submittedForm['deductionTitle'][$index] = filter_var($deductionTitle, FILTER_SANITIZE_STRING);
                $submittedForm['deductionAmount'][$index] = number_format(floatval(filter_var($_POST['deductionAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
            }

            if ($_POST['othersTitle'] != null) {
                foreach ($_POST['othersTitle'] as $index => $othersTitle) {
                    $submittedForm['othersTitle'][$index] = filter_var($othersTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['othersAmount'][$index] = number_format(floatval(filter_var($_POST['othersAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                }
            }

            foreach ($_POST['newSalesInformation'] as $index => $salesInformation) {
                $submittedForm['newDayOfMonth'][$index] = (int) filter_var((int) $_POST['newDayOfMonth'][$index], FILTER_SANITIZE_NUMBER_INT);
                $submittedForm['newSalesInformation'][$index] = filter_var($salesInformation, FILTER_SANITIZE_STRING);
            }

            if ($_POST['newIsPartTime'] == 1) {
                foreach ($_POST['newDailyHoursWorked'] as $index => $hoursWorked) {
                    $submittedForm['newDailyHoursWorked'][$index] = filter_var($hoursWorked, FILTER_SANITIZE_STRING);
                }
            }

            if ($_POST['newIsPartTime'] == 1) {
                $salaryVoucherData = array(
                    'voucher_id' => $submittedForm['voucher_id'],
                    'created_on' => date('Y-m-d H:i:s'),
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'is_part_time' => $submittedForm['is_part_time'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'status' => $submittedForm['status'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_rates' => $submittedForm['salaryRate'],
                    'salary_units' => $submittedForm['salaryUnit'],
                    'salary_subtotals' => $submittedForm['salarySubtotal'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'hours' => $submittedForm['newDailyHoursWorked'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                    'total_hours_worked' => $submittedForm['total_hours_worked'],
                );
            } else {
                $salaryVoucherData = array(
                    'voucher_id' => $submittedForm['voucher_id'],
                    'created_on' => date('Y-m-d H:i:s'),
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'status' => $submittedForm['status'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_amounts' => $submittedForm['salaryAmount'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                );
            }

            //echo "<script type='text/javascript'> alert('EDITING: " . json_encode($salaryVoucherData) . "') </script>";

            if ($_POST['newIsPartTime'] == 1) {
                $response = PayrollModel::mdlUpdateSalaryVoucherPT($salaryVoucherData);
            } else {
                $response = PayrollModel::mdlUpdateSalaryVoucher($salaryVoucherData);
            }

            if ($_POST['newIsPartTime'] == 1) {
                if ($response) {
                    if ($submittedForm['is_draft'] == 1) {
                        echo '<script>

						swal({
							type: "success",
							title: "Draft saved succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit-pt";
							}

						});

                        </script>';
                    } else {

                        $response = self::notifySalarySubmissionViaEmail($response, $submittedForm);

                        echo '<script>
                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"
                        }).then(function(result){
                            if(result.value){
                                window.location = "employee-salary-voucher-submit-pt";
                            }
                        });
                        </script>';
                    }
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your information was not saved.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit-pt";
                            }
                    });
                </script>';
                }

            } else {
                if ($response) {
                    if ($submittedForm['is_draft'] == 1) {
                        echo '<script>

						swal({
							type: "success",
							title: "Draft saved succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit";
							}

						});

                        </script>';
                    } else {

                        $response = self::notifySalarySubmissionViaEmail($response, $submittedForm);

                        echo '<script>
                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"
                        }).then(function(result){
                            if(result.value){
                                window.location = "employee-salary-voucher-submit";
                            }
                        });
                        </script>';
                    }
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your information was not saved.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit";
                            }
                    });
                </script>';
                }
            }
        }
    }

    public static function ctrOverwriteSalaryVoucher()
    {
        if ($_POST['newIsDraft'] != null && $_POST['currentVoucherId'] != null && $_POST['currentPersonId'] != null) {
            //echo "<script type='text/javascript'> alert('EDITING: " . json_encode($_POST) . "') </script>";
            //return;

            //PARSE & SANITIZE ALL NON-ARRAY BASED INPUTS

            $submittedForm['person_id'] = (int) filter_var((int) $_POST['currentPersonId'], FILTER_SANITIZE_NUMBER_INT);

            if ($_POST['currentVoucherId'] != null) {
                $submittedForm['voucher_id'] = (int) filter_var((int) $_POST['currentVoucherId'], FILTER_SANITIZE_NUMBER_INT);
            }
            if ($_POST['currentCreatedOn'] != null) {
                $submittedForm['created_on'] = filter_var($_POST['currentCreatedOn'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_draft'] = (int) filter_var((int) $_POST['newIsDraft'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_team'] = (int) filter_var((int) $_POST['newIsTeam'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_part_time'] = (int) filter_var((int) $_POST['newIsPartTime'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['year_of_voucher'] = (int) filter_var((int) ($_POST['newYearOfVoucher']), FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['month_of_voucher'] = (int) filter_var((int) $_POST['newMonthOfVoucher'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['method_of_payment'] = filter_var($_POST['newMethodOfPayment'], FILTER_SANITIZE_STRING);
            $submittedForm['pay_to_name'] = filter_var($_POST['newPayToPersonName'], FILTER_SANITIZE_STRING);
            $submittedForm['designation'] = filter_var($_POST['newDesignation'], FILTER_SANITIZE_STRING);
            $submittedForm['nric'] = filter_var($_POST['newNRIC'], FILTER_SANITIZE_STRING);
            $submittedForm['date_of_birth'] = filter_var($_POST['newDateOfBirth'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_name'] = filter_var($_POST['newBankName'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_acct'] = filter_var($_POST['newBankAccount'], FILTER_SANITIZE_STRING);
            if ($_POST['newBoutique'] != null) {
                $submittedForm['boutique'] = filter_var($_POST['newBoutique'], FILTER_SANITIZE_STRING);
            }
            if ($_POST['newBoutiqueSales'] != null) {
                $submittedForm['boutique_sales'] = filter_var($_POST['newBoutiqueSales'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_sg_pr'] = (int) filter_var((int) $_POST['newIsSGPR'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['is_csm'] = (int) filter_var((int) $_POST['newCSMSelection'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['cpf_employee'] = number_format(floatval(filter_var($_POST['deductionAmount'][0], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['cpf_employer'] = number_format(floatval(filter_var($_POST['newCPFEmployer'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['num_days_zero_sales'] = (int) filter_var((int) $_POST['newNumDaysZeroSales'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['num_reports_submitted'] = (int) filter_var((int) $_POST['newNumReportsSubmitted'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['personal_sales'] = number_format(floatval(filter_var($_POST['newPersonalSales'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['gross_pay'] = number_format(floatval(filter_var($_POST['newGrossPay'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_deductions'] = number_format(floatval(filter_var($_POST['newTotalDeductions'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['total_others'] = number_format(floatval(filter_var($_POST['newTotalOthers'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['final_amount'] = number_format(floatval(filter_var($_POST['newFinalAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');

            $submittedForm['off_days'] = filter_var($_POST['newOffDays'], FILTER_SANITIZE_STRING);
            $submittedForm['late_days'] = filter_var($_POST['newLateDays'], FILTER_SANITIZE_STRING);
            $submittedForm['leave_mc_days'] = filter_var($_POST['newLeaveMCDays'], FILTER_SANITIZE_STRING);
            $submittedForm['total_working_days'] = (int) filter_var((int) $_POST['newTotalWorkingDays'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_entitled'] = (int) filter_var((int) $_POST['newLeaveEntitled'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_taken'] = (int) filter_var((int) $_POST['newLeaveTaken'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['leave_remaining'] = (int) filter_var((int) $_POST['newLeaveRemaining'], FILTER_SANITIZE_NUMBER_INT);

            $submittedForm['levy_amount'] = number_format(floatval(filter_var($_POST['newLevyAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['sdl_amount'] = number_format(floatval(filter_var($_POST['newSDLAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            $submittedForm['company_name'] = filter_var($_POST['newCompanyName'], FILTER_SANITIZE_STRING);

            $submittedForm['status'] = filter_var($_POST['updateVoucherStatus'], FILTER_SANITIZE_STRING);
            $submittedForm['updated_by'] = filter_var($_POST['voucherUpdatedBy'], FILTER_SANITIZE_STRING);

            if ($_POST['newIsPartTime'] == 1) {
                $submittedForm['total_hours_worked'] = filter_var($_POST['newTotalHoursWorked'], FILTER_SANITIZE_STRING);
            }

            //PARSE & SANITIZE ARRAY BASED INPUTS
            if ($_POST['newIsPartTime'] == 0) {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryAmount'][$index] = number_format(floatval(filter_var($_POST['salaryAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            } else {
                foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                    $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['salaryRate'][$index] = number_format(floatval(filter_var($_POST['salaryRate'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryUnit'][$index] = number_format(floatval(filter_var($_POST['salaryUnit'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salarySubtotal'][$index] = number_format(floatval(filter_var($_POST['salarySubtotal'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                    $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
                }
            }

            foreach ($_POST['deductionTitle'] as $index => $deductionTitle) {
                $submittedForm['deductionTitle'][$index] = filter_var($deductionTitle, FILTER_SANITIZE_STRING);
                $submittedForm['deductionAmount'][$index] = number_format(floatval(filter_var($_POST['deductionAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
            }

            if ($_POST['othersTitle'] != null) {
                foreach ($_POST['othersTitle'] as $index => $othersTitle) {
                    $submittedForm['othersTitle'][$index] = filter_var($othersTitle, FILTER_SANITIZE_STRING);
                    $submittedForm['othersAmount'][$index] = number_format(floatval(filter_var($_POST['othersAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                }
            }

            foreach ($_POST['newSalesInformation'] as $index => $salesInformation) {
                $submittedForm['newDayOfMonth'][$index] = (int) filter_var((int) $_POST['newDayOfMonth'][$index], FILTER_SANITIZE_NUMBER_INT);
                $submittedForm['newSalesInformation'][$index] = filter_var($salesInformation, FILTER_SANITIZE_STRING);
            }

            if ($_POST['newIsPartTime'] == 1) {
                foreach ($_POST['newDailyHoursWorked'] as $index => $hoursWorked) {
                    $submittedForm['newDailyHoursWorked'][$index] = filter_var($hoursWorked, FILTER_SANITIZE_STRING);
                }
            }
            if ($_POST['newIsPartTime'] == 1) {
                $salaryVoucherData = array(
                    'voucher_id' => $submittedForm['voucher_id'],
                    'created_on' => $submittedForm['created_on'],
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'is_part_time' => $submittedForm['is_part_time'],
                    'method_of_payment' => $submittedForm['method_of_payment'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'status' => $submittedForm['status'],
                    'updated_by' => $submittedForm['updated_by'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_rates' => $submittedForm['salaryRate'],
                    'salary_units' => $submittedForm['salaryUnit'],
                    'salary_subtotals' => $submittedForm['salarySubtotal'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'hours' => $submittedForm['newDailyHoursWorked'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                    'total_hours_worked' => $submittedForm['total_hours_worked'],
                );
            } else {
                $salaryVoucherData = array(
                    'voucher_id' => $submittedForm['voucher_id'],
                    'created_on' => $submittedForm['created_on'],
                    'modified_on' => date('Y-m-d H:i:s'),
                    'person_id' => $submittedForm['person_id'],
                    'month_of_voucher' => $submittedForm['month_of_voucher'],
                    'year_of_voucher' => $submittedForm['year_of_voucher'],
                    'is_draft' => $submittedForm['is_draft'],
                    'is_part_time' => $submittedForm['is_part_time'],
                    'method_of_payment' => $submittedForm['method_of_payment'],
                    'pay_to_name' => $submittedForm['pay_to_name'],
                    'designation' => $submittedForm['designation'],
                    'nric' => $submittedForm['nric'],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'gross_pay' => $submittedForm['gross_pay'],
                    'total_deductions' => $submittedForm['total_deductions'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'total_others' => $submittedForm['total_others'],
                    'final_amount' => $submittedForm['final_amount'],
                    'is_sg_pr' => $submittedForm['is_sg_pr'],
                    'is_csm' => $submittedForm['is_csm'],
                    'cpf_employee' => $submittedForm['cpf_employee'],
                    'cpf_employer' => $submittedForm['cpf_employer'],
                    'boutique' => $submittedForm['boutique'],
                    'boutique_sales' => $submittedForm['boutique_sales'],
                    'personal_sales' => $submittedForm['personal_sales'],
                    'num_days_zero_sales' => $submittedForm['num_days_zero_sales'],
                    'num_reports_submitted' => $submittedForm['num_reports_submitted'],
                    'off_days' => $submittedForm['off_days'],
                    'late_days' => $submittedForm['late_days'],
                    'leave_mc_days' => $submittedForm['leave_mc_days'],
                    'total_working_days' => $submittedForm['total_working_days'],
                    'leave_entitled' => $submittedForm['leave_entitled'],
                    'leave_taken' => $submittedForm['leave_taken'],
                    'leave_remaining' => $submittedForm['leave_remaining'],
                    'status' => $submittedForm['status'],
                    'updated_by' => $submittedForm['updated_by'],
                    'salary_titles' => $submittedForm['salaryTitle'],
                    'salary_amounts' => $submittedForm['salaryAmount'],
                    'salary_remarks' => $submittedForm['salaryRemarks'],
                    'deduction_titles' => $submittedForm['deductionTitle'],
                    'deduction_amounts' => $submittedForm['deductionAmount'],
                    'other_titles' => $submittedForm['othersTitle'],
                    'other_amounts' => $submittedForm['othersAmount'],
                    'days_of_month' => $submittedForm['newDayOfMonth'],
                    'sales_information' => $submittedForm['newSalesInformation'],
                    'hours' => $submittedForm['newDailyHoursWorked'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'sdl_amount' => $submittedForm['sdl_amount'],
                    'company_name' => $submittedForm['company_name'],
                    'total_hours_worked' => $submittedForm['total_hours_worked'],
                );
            }

            //echo "<script type='text/javascript'> alert('EDITING: " . json_encode($salaryVoucherData) . "') </script>";

            if ($_POST['newIsPartTime'] == 1) {
                $response = PayrollModel::mdlUpdateSalaryVoucherPT($salaryVoucherData);
            } else {
                $response = PayrollModel::mdlUpdateSalaryVoucher($salaryVoucherData);
            }

            if ($response) {
                if ($submittedForm['is_draft'] == 1) {
                    echo '<script>

						swal({
							type: "success",
							title: "Draft updated succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-management";
							}

						});

                        </script>';
                } else if ($submittedForm['is_part_time'] == 1 && $submittedForm['is_team'] == 0) {
                    echo '<script>

						swal({
							type: "success",
							title: "Salary information submitted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-management-pt";
							}

						});

                        </script>';
                } else if ($submittedForm['is_part_time'] == 0 && $submittedForm['is_team'] == 0) {
                    echo '<script>

                            swal({
                                type: "success",
                                title: "Salary information submitted succesfully.",
                                showConfirmButton: true,
                                confirmButtonText: "Close"

                            }).then(function(result){

                                if(result.value){

                                    window.location = "employee-salary-voucher-management";
                                }

                            });

                            </script>';
                } else if ($submittedForm['is_part_time'] == 0 && $submittedForm['is_team'] == 1) {
                    echo '<script>

                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-team";
                            }

                        });

                        </script>';
                } else if ($submittedForm['is_part_time'] == 1 && $submittedForm['is_team'] == 1) {
                    echo '<script>

                        swal({
                            type: "success",
                            title: "Salary information submitted succesfully.",
                            showConfirmButton: true,
                            confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-team-pt";
                            }

                        });

                        </script>';
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your information was not saved.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-management";
                            }
                    });
                </script>';

                }
            }
        }

        return;
    }

    public static function ctrDeleteSalaryVoucher()
    {
        if (isset($_GET["voucherIdToDelete"])) {
            $salaryVoucherData = array(
                'voucher_id' => $_GET['voucherIdToDelete'],
            );

            $answer = self::ctrViewSalaryVoucherById($salaryVoucherData['voucher_id']);

            if ($answer['person_id'] != $_SESSION['person_id']) {
                if ($answer['is_part_time'] == 1) {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "You cannot delete this voucher.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit-pt";
                            }
                        });
                    </script>';
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "You cannot delete this voucher.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit";
                            }
                        });
                    </script>';
                }
                die('Invalid Authentication');
            }

            $response = PayrollModel::mdlDeleteSalaryVoucher($salaryVoucherData);

            if ($answer['is_part_time'] == 1) {
                if ($response) {
                    echo '<script>

						swal({
							type: "success",
							title: "Draft deleted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit-pt";
							}

						});

                        </script>';
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your draft was not deleted.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit-pt";
                            }
                    });
                </script>';
                }
            } else {
                if ($response) {
                    echo '<script>

						swal({
							type: "success",
							title: "Draft deleted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-submit";
							}

						});

                        </script>';
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. Your draft was not deleted.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-salary-voucher-submit";
                            }
                    });
                </script>';
                }
            }
        }
    }

    public static function ctrUpdateSalaryVoucherStatus()
    {

        if ($_POST['voucherIdToUpdate'] != null && ($_POST['voucherStatusToUpdate'] == "Approved" || $_POST['voucherStatusToUpdate'] == "Rejected" || $_POST['voucherStatusToUpdate'] == "Pending")) {

            //echo "<script type='text/javascript'> alert('UPDATE: " . json_encode($_POST) . "') </script>";

            $submittedForm['updated_by'] = $_SESSION['first_name'] . ' ' . $_SESSION['last_name'];
            $submittedForm['voucher_id'] = (int) filter_var((int) $_POST['voucherIdToUpdate'], FILTER_SANITIZE_NUMBER_INT);

            $salaryVoucherData = array(
                'voucher_id' => $submittedForm['voucher_id'],
                'modified_on' => date('Y-m-d H:i:s'),
                'updated_by' => $submittedForm['updated_by'],
                'status' => $_POST['voucherStatusToUpdate'],
            );

            $response = PayrollModel::mdlUpdateSalaryVoucherStatus($salaryVoucherData);

            if ($response) {
                echo '<script>

						swal({
							type: "success",
							title: "Voucher updated succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-management";
							}

						});

                        </script>';
            } else {
                echo '<script>

						swal({
							type: "error",
							title: "There was a problem updating the salary voucher\'s status.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-salary-voucher-management";
							}

						});

                        </script>';
            }
        }
    }

    public function notifySalarySubmissionViaEmail($voucher_id, $submittedForm)
    {
        switch ($submittedForm['month_of_voucher']) {
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

        $to = "account@goldlink.com.sg";
        //$to = "lawrencelim1996@gmail.com";
        $subject = "Salary Voucher submitted by " . $_SESSION['first_name'] . " for " . $month . " " . $submittedForm['year_of_voucher'];

        $message = "
            <html>
            <head>
            <title>Salary Voucher Submitted</title>
            </head>
            <body>
            <p>Dear Management,</p>
            <p>A salary voucher has been submitted on <strong>" . date('d M Y H:i:s') . "</strong></p>
            <p></p>
            <p>
            <strong>Submitted by: </strong>" . $_SESSION['first_name'] . " " . $_SESSION['last_name'] . "
            </p>
            <p>
            <strong>Salary Voucher for: </strong>" . $month . " " . $submittedForm['year_of_voucher'] . "
            </p>
            <p>
            <a href='https://emp.goldlink.com.sg/views/plugins/fpdf/index.php?voucherId=" . $voucher_id . "'><button>View PDF</button></a>
            <small>*Requires you to be logged in. If you are not, please click this button again after doing so.</small>
            </p>
            <p></p>
            <p>
            Best Regards,
            </p>
            <span>
            Goldlink Employee Portal
            </span>
            <p>
            <small>This is a computer-generated email. No reply will be received/responded to.</small>
            </p>
            </body>
            </html>
            ";

        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        $headers .= 'From: <noreply@goldlink.com.sg>' . "\r\n";

        return mail($to, $subject, $message, $headers);
    }
}
