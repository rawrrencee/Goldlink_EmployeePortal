<?php

class PayrollController
{

    public static function ctrViewSalaryVoucherById($value){

        $response = PayrollModel::mdlViewSalaryVoucherById($value);

        return $response;

    }

    public static function ctrViewSalaryRecordsByVoucherId($value){

        $response = PayrollModel::mdlViewSalaryRecordsByVoucherId($value);

        return $response;
        
    }

    public static function ctrViewDeductionRecordsByVoucherId($value){

        $response = PayrollModel::mdlViewDeductionRecordsByVoucherId($value);

        return $response;
        
    }

    public static function ctrViewOtherRecordsByVoucherId($value){

        $response = PayrollModel::mdlViewOtherRecordsByVoucherId($value);

        return $response;
        
    }

    public static function ctrViewDailySalesFigureByVoucherId($value){

        $response = PayrollModel::mdlViewDailySalesFigureByVoucherId($value);

        return $response;
        
    }

    public static function ctrViewAttendanceRecordsByVoucherId($value){

        $response = PayrollModel::mdlViewAttendanceRecordsByVoucherId($value);

        return $response;
        
    }


    public static function ctrCreateNewSalaryVoucher()
    {
        if (isset($_POST['newIsDraft'])) {
            echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            //PARSE & SANITIZE ALL NON-ARRAY BASED INPUTS
            $submittedForm['person_id'] = $_SESSION['person_id'];
            if ($_POST['voucher_id'] != null) {
                $submittedForm['voucher_id'] = (int) filter_var((int) $_POST['voucher_id'], FILTER_SANITIZE_NUMBER_INT);
            }
            $submittedForm['is_draft'] = (int) filter_var((int) $_POST['newIsDraft'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['year_of_voucher'] = (int) filter_var((int) ($_POST['newYearOfVoucher']), FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['month_of_voucher'] = (int) filter_var((int) $_POST['newMonthOfVoucher'], FILTER_SANITIZE_NUMBER_INT);
            $submittedForm['pay_to_name'] = filter_var($_POST['newPayToPersonName'], FILTER_SANITIZE_STRING);
            $submittedForm['designation'] = filter_var($_POST['newDesignation'], FILTER_SANITIZE_STRING);
            $submittedForm['nric'] = filter_var($_POST['newNRIC'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_name'] = filter_var($_POST['newBankName'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_acct'] = filter_var($_POST['newBankAccount'], FILTER_SANITIZE_STRING);
            if ($_POST['newBoutique'] != null) {
                $submittedForm['boutique'] = filter_var($_POST['newBoutique'], FILTER_SANITIZE_STRING);
            }
            if ($_POST['newBoutiqueSales'] != null) {
                $submittedForm['boutique_sales'] = filter_var($_POST['newBoutiqueSales'], FILTER_SANITIZE_STRING);
            }
            $submittedForm['is_sg_pr'] = (int) filter_var((int) $_POST['newIsSGPR'], FILTER_SANITIZE_NUMBER_INT);
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

            //PARSE & SANITIZE ARRAY BASED INPUTS
            foreach ($_POST['salaryTitle'] as $index => $salaryTitle) {
                $submittedForm['salaryTitle'][$index] = filter_var($salaryTitle, FILTER_SANITIZE_STRING);
                $submittedForm['salaryAmount'][$index] = number_format(floatval(filter_var($_POST['salaryAmount'][$index], FILTER_SANITIZE_STRING)), 2, '.', '');
                $submittedForm['salaryRemarks'][$index] = filter_var($_POST['salaryRemarks'][$index], FILTER_SANITIZE_STRING);
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
                'bank_name' => $submittedForm['bank_name'],
                'bank_acct' => $submittedForm['bank_acct'],
                'gross_pay' => $submittedForm['gross_pay'],
                'total_deductions' => $submittedForm['total_deductions'],
                'total_others' => $submittedForm['total_others'],
                'final_amount' => $submittedForm['final_amount'],
                'is_sg_pr' => $submittedForm['is_sg_pr'],
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
            );

            $response = PayrollModel::mdlCreateNewSalaryVoucher($salaryVoucherData);

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
