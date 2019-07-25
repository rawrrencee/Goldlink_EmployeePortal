<?php

session_start();
if (!in_array('employee-salary-voucher-management-pt', $_SESSION['allowed_modules'])) {
    //die('Invalid Authentication');
}

?>
<div class="content-wrapper">
    <section class="content-header">
        <h1>
            All Salary Vouchers (PT)
            <small>Payroll Management</small>
        </h1>
    </section>

    <section class="content">

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title"><strong>All Submitted Vouchers</strong></h3>

            </div>

            <div class="box-body">
                <div class="col-md-12 col-sm-12 col-xs-12" style="overflow-y: auto; overflow-x: auto; width: 100%;">
                    <form id="updateVoucherStatusForm" role="form" method="POST">
                        <input type="hidden" id="voucherIdToUpdate" name="voucherIdToUpdate" value="">
                        <input type="hidden" id="voucherStatusToUpdate" name="voucherStatusToUpdate" value="">
                        <input type="hidden" id="voucherUpdatedBy" name="voucherUpdatedBy"
                            value="<?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'] ?>">
                        <table
                            class="table table-hover table-bordered table-striped dt-responsive tableAllSalaryVouchersPT"
                            width="100%">
                            <thead>
                                <tr>
                                    <th style="width: 40px;">ID</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>First Name</th>
                                    <th class="desktop">Last Name</th>
                                    <th class="never">Person ID</th>
                                    <th class="never">Is Draft</th>
                                    <th>Status</th>
                                    <th class="desktop">Updated By</th>
                                    <th class="desktop">Created on</th>
                                    <th class="desktop">Modified on</th>
                                    <th class="none">Pay To Name</th>
                                    <th class="none">Designation</th>
                                    <th class="none">NRIC</th>
                                    <th class="none">Bank Name</th>
                                    <th class="none">Bank Account</th>
                                    <th class="none">Gross Pay</th>
                                    <th class="none">Total Deductions</th>
                                    <th class="none">Total Others</th>
                                    <th class="none">Final Amount</th>
                                    <th class="never">Singaporean/PR</th>
                                    <th class="none">Employee CPF</th>
                                    <th class="none">Employer CPF</th>
                                    <th class="none">Boutique</th>
                                    <th class="none">Boutique Sales</th>
                                    <th class="none">Personal Sales</th>
                                    <th class="none">Zero Sales Days</th>
                                    <th class="none">Reports Submitted</th>
                                    <th class="never">Part Time</th>
                                    <th style="width: 40px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <?php
                            $createSalaryVoucher = new PayrollController();
                            $createSalaryVoucher->ctrUpdateSalaryVoucherStatus();
                        ?>
                    </form>
                </div>

                <div class="box-footer">
                    Footer
                </div>
            </div>

    </section>
</div>

<div id="modalEditSalaryVoucher" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <form id="salaryVoucherForm" role="form" method="POST">
                <div class="modal-header" style="background: #3c8dbc; color: #fff">
                    <button type="button" class="close" data-dismiss="modal"
                        style="color: #ffffff; opacity: 1;">&times;</button>
                    <h4 class="modal-title">Edit Salary Voucher (PT)</h4>
                </div>

                <ul class="nav nav-tabs" id="tabContent">
                    <li class="active"><a href="#salaryTab" data-toggle="tab">Salary</a></li>
                    <li><a href="#deductionsTab" data-toggle="tab">Deductions</a></li>
                    <li><a href="#othersTab" data-toggle="tab">Others</a></li>
                    <li><a href="#dailySalesFigureTab" data-toggle="tab">Daily Sales Figure</a></li>
                    <li><a href="#attendanceTab" data-toggle="tab">Attendance</a></li>

                    <div class="btn-group pull-right" style="padding: 10px;">
                        <a class="btn btn-default btnPrevious"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Previous</a>
                        <a class="btn btn-default btnNext">Next&nbsp;&nbsp;<i class="fa fa-arrow-right"></i></a>
                    </div>
                </ul>

                <input type="hidden" id="currentVoucherId" name="currentVoucherId" value="">
                <input type="hidden" id="currentPersonId" name="currentPersonId" value="">
                <input type="hidden" id="currentCreatedOn" name="currentCreatedOn" value="">

                <input type="hidden" id="updateVoucherStatus" name="updateVoucherStatus" value="">
                <input type="hidden" id="voucherUpdatedBy" name="voucherUpdatedBy"
                    value="<?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'] ?>">

                <input type="hidden" id="newIsDraft" name="newIsDraft" value="3">
                <input type="hidden" id="newCompanyName" name="newCompanyName" value="">
                <input type="hidden" id="newIsPartTime" name="newIsPartTime" value="">

                <div class="tab-content">
                    <div class="tab-pane active" id="salaryTab">
                        <div class="box-body">

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Information</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-3 col-sm-3 col-xs-12">
                                        <label for="newMonthOfVoucher">Month <small
                                                style="color:red;">*Required</small></label>
                                        <select required id="newMonthOfVoucher" name="newMonthOfVoucher"
                                            class="form-control select2" style="width: 100%;">
                                            <option></option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-3 col-sm-3 col-xs-12">
                                        <label for="newYearOfVoucher">
                                            Year <small style="color:red;">*Required</small></label>
                                        <select required id="newYearOfVoucher" name="newYearOfVoucher"
                                            class="form-control select2" style="width: 100%;">
                                            <option></option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                            <option value="2031">2031</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newMethodOfPayment">Method of Payment <small
                                                style="color:red;">*Required</small></label>
                                        <select required id="newMethodOfPayment" name="newMethodOfPayment"
                                            class="form-control select2" placeholder="Select Method of Payment"
                                            style="width: 100%;">
                                            <option></option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newPayToPersonName">Pay To (as in NRIC)</label>
                                        <input type="text" class="form-control" id="newPayToPersonName"
                                            name="newPayToPersonName"
                                            value="<?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'];?>">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newDesignation">Designation</label>
                                        <input type="text" class="form-control" id="newDesignation"
                                            name="newDesignation" value="<?php echo $_SESSION['designation'];?>">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newNRIC">NRIC</label>
                                        <input type="text" class="form-control" id="newNRIC" name="newNRIC"
                                            value="<?php echo $_SESSION['nric'];?>">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newDateOfBirth">Date Of Birth</label>
                                        <input type="text" class="form-control" id="newDateOfBirth"
                                            name="newDateOfBirth" value="<?php echo $_SESSION['date_of_birth'];?>">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBankName">Bank Name</label>
                                        <input type="text" class="form-control" id="newBankName" name="newBankName"
                                            value="<?php echo $_SESSION['bank_name'];?>">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBankAccount">Bank Account</label>
                                        <input type="text" class="form-control" id="newBankAccount"
                                            name="newBankAccount" value="<?php echo $_SESSION['bank_acct'];?>">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBoutique">Boutique</label>
                                        <input type="text" class="form-control" id="newBoutique" name="newBoutique"
                                            value="" placeholder="e.g. TE(Taka), TE(Tangs)">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBoutiqueSales">Boutique Sales</label>
                                        <input type="text" class="form-control" id="newBoutiqueSales"
                                            name="newBoutiqueSales" value=""
                                            placeholder="e.g. TE(Taka) $100, TE(Tangs) $200">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Salary</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div id="appendSalaryListingPT_first" class="form-row">
                                    <div class="form-group col-md-3 col-sm-3 col-xs-6">
                                        <label for="newSalaryTitle">Title</label>
                                        <input type="text" class="form-control" id="newSalaryTitle"
                                            name="salaryTitle[0]" value="">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalaryRate">Rate</label>
                                        <input type="number" class="form-control ratePT" id="newSalaryRate" min="0.00"
                                            step="0.01" value="0.00" name="salaryRate[0]">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalaryUnit">Unit</label>
                                        <input type="number" class="form-control unitPT" id="newSalaryUnit" min="0"
                                            step="0" value="0" name="salaryUnit[0]">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalarySubtotal">Subtotal</label>
                                        <input readonly type="number" class="form-control subTotalPT grossPay"
                                            id="newSalarySubtotal" min="0" step="0" value="0" name="salarySubtotal[0]">
                                    </div>
                                    <div class="form-group col-md-3 col-sm-3 col-xs-6">
                                        <label for="newSalaryRemarks">Remarks</label>
                                        <input type="text" class="form-control" id="newSalaryRemarks"
                                            name="salaryRemarks[0]">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div id="appendSalaryListingPT">
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" id="addSalaryListing"
                                            class="btn btn-primary addSalaryListing"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add Salary Listing</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="tab-pane" id="deductionsTab">

                        <div class="box-body">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Deductions</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <label for="newIsSGPR">Singaporean/PR</label>
                                    </div>
                                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                        <input type="hidden" name='newIsSGPR' value="0" />
                                        <input type="checkbox" class="minimal" id="newIsSGPR" name="newIsSGPR"
                                            value="1">&nbsp;&nbsp;Yes
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                        <input type="hidden" id="newDeductionCPF" value="CPF-EE"
                                            name="deductionTitle[0]">
                                        <label for="newCPFEmployee">CPF-EE</label>
                                        <input type="number" class="form-control totalDeductions" id="newCPFEmployee"
                                            min="0.00" step="0.01" value="0.00" name="deductionAmount[0]">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                        <label for="newCPFEmployer">CPF-ER</label>
                                        <input type="number" class="form-control" id="newCPFEmployer" min="0.00"
                                            step="0.01" value="0.00" name="newCPFEmployer">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                        <label for="newLevyAmount">Levy (if applicable)</label>
                                        <input type="number" class="form-control" id="newLevyAmount" min="0.00"
                                            step="0.01" value="0.00" name="newLevyAmount">
                                    </div>
                                </div>
                            </div>

                            <div class="form-row col-md-12 col-sm-12 col-xs-12">
                                <div id="appendDeductionListing">
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" id="addDeductionListing"
                                            class="btn btn-primary addDeductionListing"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add Deduction Listing</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane" id="othersTab">
                        <div class="box-body">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Others</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row col-md-12 col-sm-12 col-xs-12">
                                <div id="appendOthersListing">
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" id="addOthersListing"
                                            class="btn btn-primary addOthersListing"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add "Others" Listing</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane" id="dailySalesFigureTab">
                        <div class="box-body">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Daily Sales Figure</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newNumDaysZeroSales">Number of days closing $0 sales</label>
                                        <input type="number" class="form-control" id="newNumDaysZeroSales"
                                            name="newNumDaysZeroSales" value="0" min="0" step="0">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newNumReportsSubmitted">Number of reports submitted</label>
                                        <input type="number" class="form-control" id="newNumReportsSubmitted"
                                            name="newNumReportsSubmitted" value="0" min="0" step="0">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                        <label for="newPersonalSales">Personal Sales</label>
                                        <strong>S$&nbsp;</strong>
                                        <input readonly type="number" class="form-control" id="newPersonalSales"
                                            min="0.00" step="0.01" value="0.00" name="newPersonalSales">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Sales Figure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 1; $i <= 10; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newSalesInformation'.$i.'" class="form-control select2 newSalesInformation" name="newSalesInformation['.$i.']" style="width: 85%;">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Sales Figure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 11; $i <= 20; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newSalesInformation'.$i.'" class="form-control select2 newSalesInformation" name="newSalesInformation['.$i.']" style="width: 85%;">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Sales Figure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 21; $i <= 31; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newSalesInformation'.$i.'" class="form-control select2 newSalesInformation" name="newSalesInformation['.$i.']" style="width: 85%">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="attendanceTab">
                        <div class="box-body">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Attendance</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                        <label for="newTotalHoursWorked">Total Hours Worked</label>
                                        <input readonly type="number" class="form-control" id="newTotalHoursWorked"
                                            min="0.00" step="0.01" value="0.00" name="newTotalHoursWorked">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Hours Worked</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 1; $i <= 10; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newDailyHoursWorked'.$i.'" class="form-control select2 newDailyHoursWorked" name="newDailyHoursWorked['.$i.']" style="width: 85%;">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option selected value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Hours Worked</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 11; $i <= 20; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newDailyHoursWorked'.$i.'" class="form-control select2 newDailyHoursWorked" name="newDailyHoursWorked['.$i.']" style="width: 85%;">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option selected value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <table class="table display table-hover table-bordered table-striped dt-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Hours Worked</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 

                                        for ($i = 21; $i <= 31; $i++) {
                                            echo'<tr>
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="newDayOfMonth" name="newDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select required id="newDailyHoursWorked'.$i.'" class="form-control select2 newDailyHoursWorked" name="newDailyHoursWorked['.$i.']" style="width: 85%">
                                                        <option></option>
                                                        <option disabled>Select or type a number</option>
                                                        <option value="Sick Leave">Sick Leave</option>
                                                        <option value="Annual Leave">Annual Leave</option>
                                                        <option value="Unpaid Leave">Unpaid Leave</option>
                                                        <option value="OFF">OFF</option>
                                                        <option value="PH/RO">PH/RO</option>
                                                        <option selected value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="box-footer">
                    <div class="pull-right">
                        <label for="newGrossPay">Gross Pay (+):</label>
                        <input readonly type="number" id="newGrossPay" class="form-control" name="newGrossPay"
                            value="0.00">
                        <p></p>
                        <label for="newTotalDeductions">Total Deductions (-):</label>
                        <input readonly type="number" id="newTotalDeductions" class="form-control"
                            name="newTotalDeductions" value="0.00">
                        <p></p>
                        <label for="newTotalOthers">Total Others (+ / -) :</label>
                        <input readonly type="number" id="newTotalOthers" class="form-control" name="newTotalOthers"
                            value="0.00">
                        <p></p>
                        <label for="newFinalAmount">Nett Payment:</label>
                        <input readonly type="number" id="newFinalAmount" class="form-control" name="newFinalAmount"
                            value="0.00">
                        <p></p>
                        <label for="status">Status:</label>
                        <input readonly type="text" id="status" class="form-control" name="status">
                        <p></p>
                        <label for="updatedBy">Updated By:</label>
                        <input readonly type="text" id="updatedBy" class="form-control" name="updatedBy">
                    </div>


                </div>

                <div class="box-footer">
                    <div class="pull-right">
                        <div class="form-group">
                            <div class="form-group">
                                <strong>Set Voucher Status:&nbsp;&nbsp;</strong>
                                <button type="submit" id="submitPendingVoucher"
                                    class="btn btn-warning postButton submitPendingVoucher"
                                    style="margin-bottom: 10px;"><i
                                        class="fa fa-pencil"></i>&nbsp;&nbsp;Pending</button>&nbsp;&nbsp;
                                <button type='submit' style='margin-bottom: 10px;' id='submitApprovedVoucher'
                                    title='Approve' class='btn btn-success postButton submitApprovedVoucher'><i
                                        class='fa fa-check'></i>&nbsp;&nbsp;Approve</button>&nbsp;&nbsp;
                                <button type='submit' style='margin-bottom: 10px;' id='submitRejectedVoucher'
                                    title='Reject' class='btn btn-danger postButton submitRejectedVoucher'><i
                                        class='fa fa-times'></i>&nbsp;&nbsp;Reject</button>

                            </div>
                        </div>
                    </div>
                </div>

                <?php
                        $createSalaryVoucher = new PayrollController();
                        $createSalaryVoucher->ctrOverwriteSalaryVoucher();
                    ?>
            </form>
        </div>
    </div>
</div>