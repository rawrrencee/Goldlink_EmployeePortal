<div class="content-wrapper">
    <section class="content-header">
        <h1>
            My Salary Vouchers
            <small>Payroll Management</small>
        </h1>
    </section>

    <section class="content">

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title"><strong>Submitted</strong></h3>

            </div>

            <div class="box-body">
                <div class="col-md-12 col-sm-12 col-xs-12" style="overflow-y: auto; width: 100%;">
                    <table
                        class="table display table-hover table-bordered table-striped dt-responsive tableMySalaryVouchers"
                        width="100%">
                        <thead>
                            <tr>
                                <th style="width: 40px;">ID</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Created on</th>
                                <th>Modified on</th>
                                <th class="never">Person ID</th>
                                <th class="never">Is Draft</th>
                                <th>Status</th>
                                <th>Updated By</th>
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
                                <th style="width: 40px;">View</th>
                                <th style="width: 40px;">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="box-footer">
                    Footer
                </div>
            </div>

    </section>
</div>


<div id="modalViewMySalaryVoucher" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">My Salary Voucher</h4>
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
            <input type="hidden" id="currentCreatedOn" name="currentCreatedOn" value="">
            <input type="hidden" id="viewIsDraft" name="viewIsDraft" value="">
            <input type="hidden" id="viewYearOfVoucher" name="viewYearOfVoucher" value="<?php echo date('Y') ?>">

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
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewMonthOfVoucher">Salary Voucher for the Month of</label>
                                    <select disabled id="viewMonthOfVoucher" name="viewMonthOfVoucher"
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

                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewPayToPersonName">Pay To (as in NRIC)</label>
                                    <input readonly type="text" class="form-control" id="viewPayToPersonName"
                                        name="viewPayToPersonName"
                                        value="<?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'];?>">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewDesignation">Designation</label>
                                    <input readonly type="text" class="form-control" id="viewDesignation"
                                        name="viewDesignation" value="<?php echo $_SESSION['designation'];?>">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewNRIC">NRIC</label>
                                    <input readonly type="text" class="form-control" id="viewNRIC" name="viewNRIC"
                                        value="">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewDateOfBirth">Date Of Birth</label>
                                    <input readonly type="text" class="form-control" id="viewDateOfBirth" name="viewDateOfBirth"
                                        value="">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewBankName">Bank Name</label>
                                    <input readonly type="text" class="form-control" id="viewBankName" name="viewBankName"
                                        value="<?php echo $_SESSION['bank_name'];?>">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewBankAccount">Bank Account</label>
                                    <input readonly type="text" class="form-control" id="viewBankAccount"
                                        name="viewBankAccount" value="<?php echo $_SESSION['bank_acct'];?>">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewBoutique">Boutique</label>
                                    <input readonly type="text" class="form-control" id="viewBoutique" name="viewBoutique"
                                        value="" placeholder="e.g. TE(Taka), TE(Tangs)">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewBoutiqueSales">Boutique Sales</label>
                                    <input readonly type="text" class="form-control" id="viewBoutiqueSales"
                                        name="viewBoutiqueSales" value=""
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
                            <div class="form-row">
                                <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                    <label for="viewSalaryBasicPayTitle">Basic Pay</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryBasicPayTitle"
                                        name="salaryTitle[0]" value="Basic Pay">
                                </div>
                                <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                    <label for="viewSalaryBasicPayAmount">Amount</label>
                                    <input readonly type="number" class="form-control grossPay"
                                        id="viewSalaryBasicPayAmount" min="0.00" step="0.01" value="0.00"
                                        name="salaryAmount[0]">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewSalaryBasicPayRemarks">Remarks</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryBasicPayRemarks"
                                        name="salaryRemarks[0]">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                    <label for="viewSalaryAttendanceTitle">Attendance</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryAttendanceTitle"
                                        name="salaryTitle[1]" value="Attendance">
                                </div>
                                <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                    <label for="viewSalaryAttendanceAmount">Amount</label>
                                    <input readonly type="number" class="form-control grossPay"
                                        id="viewSalaryAttendanceAmount" min="0.00" step="0.01" value="0.00"
                                        name="salaryAmount[1]">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewSalaryAttendanceRemarks">Remarks</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryAttendanceRemarks"
                                        name="salaryRemarks[1]">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                    <label for="viewSalaryProductivityTitle">Productivity</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryProductivityTitle"
                                        name="salaryTitle[2]" value="Productivity">
                                </div>
                                <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                    <label for="viewSalaryProductivityAmount">Amount</label>
                                    <input readonly type="number" class="form-control grossPay"
                                        id="viewSalaryProductivityAmount" min="0.00" step="0.01" value="0.00"
                                        name="salaryAmount[2]">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewSalaryProductivityRemarks">Remarks</label>
                                    <input readonly type="text" class="form-control" id="viewSalaryProductivityRemarks"
                                        name="salaryRemarks[2]">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div id="appendSalaryListing">
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
                                    <label for="viewIsSGPR">Singaporean/PR</label>
                                </div>
                                <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                    <input type="hidden" name='viewIsSGPR' value="0" />
                                    <input disabled type="checkbox" class="minimal" id="viewIsSGPR" name="viewIsSGPR"
                                        value="1">&nbsp;&nbsp;Yes
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                    <input type="hidden" id="viewDeductionCPF" value="CPF-EE" name="deductionTitle[0]">
                                    <label for="viewCPFEmployee">CPF-EE</label>
                                    <input readonly type="number" class="form-control totalDeductions"
                                        id="viewCPFEmployee" min="0.00" step="0.01" value="0.00"
                                        name="deductionAmount[0]">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                    <label for="viewCPFEmployer">CPF-ER</label>
                                    <input readonly type="number" class="form-control" id="viewCPFEmployer" min="0.00"
                                        step="0.01" value="0.00" name="viewCPFEmployer">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                    <label for="viewLevyAmount">Levy</label>
                                    <input readonly type="number" class="form-control"
                                        id="viewLevyAmount" min="0.00" step="0.01" value="0.00"
                                        name="viewLevyAmount">
                                </div>
                            </div>
                        </div>

                        <div class="form-row col-md-12 col-sm-12 col-xs-12">
                            <div id="appendDeductionListing">
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
                                    <label for="viewNumDaysZeroSales">Number of days closing $0 sales</label>
                                    <input readonly type="number" class="form-control" id="viewNumDaysZeroSales"
                                        name="viewNumDaysZeroSales" value="0" min="0" step="0">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewNumReportsSubmitted">Number of reports submitted</label>
                                    <input readonly type="number" class="form-control" id="viewNumReportsSubmitted"
                                        name="viewNumReportsSubmitted" value="0" min="0" step="0">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                    <label for="viewPersonalSales">Personal Sales</label>
                                    <strong>S$&nbsp;</strong>
                                    <input readonly type="number" class="form-control" id="viewPersonalSales" min="0.00"
                                        step="0.01" value="0.00" name="viewPersonalSales">
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
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="viewDayOfMonth" name="viewDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select disabled id="viewSalesInformation'.$i.'" class="form-control select2 viewSalesInformation" name="viewSalesInformation['.$i.']" style="width: 85%;">
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
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="viewDayOfMonth" name="viewDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select disabled id="viewSalesInformation'.$i.'" class="form-control select2 viewSalesInformation" name="viewSalesInformation['.$i.']" style="width: 85%;">
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
                                                <td style="width: 20px;">'.$i.'<input type="hidden" id="viewDayOfMonth" name="viewDayOfMonth['.$i.']" value="'.$i.'"></td>
                                                <td style="width: 100%;"><strong>S$&nbsp;</strong>
                                                    <select disabled id="viewSalesInformation'.$i.'" class="form-control select2 viewSalesInformation" name="viewSalesInformation['.$i.']" style="width: 85%">
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
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewOffDays">Off Days</label>
                                    <input readonly type="text" class="form-control" id="viewOffDays" value=""
                                        name="viewOffDays" placeholder="e.g. 10/10/2019, 11/10/2019 (2 DAYS)">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewLateDays">Late Days</label>
                                    <input readonly type="text" class="form-control" id="viewLateDays" value=""
                                        name="viewLateDays" placeholder="e.g. DD/MM/YYYY (NO. OF DAYS)">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewLeaveMCDays">Leave/MC Days</label>
                                    <input readonly type="text" class="form-control" id="viewLeaveMCDays" value=""
                                        name="viewLeaveMCDays" placeholder="e.g. DD/MM/YYYY (NO. OF DAYS)">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewTotalWorkingDays">Total Working Days</label>
                                    <input readonly type="number" class="form-control" id="viewTotalWorkingDays" min="0"
                                        name="viewTotalWorkingDays" step="0" value="0">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group">
                                    <p style="font-size: 20px;">Annual Leave</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewLeaveEntitled">Leave Entitled</label>
                                    <input readonly type="number" class="form-control" id="viewLeaveEntitled" min="0"
                                        step="0" name="viewLeaveEntitled" value="0">
                                </div>
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewLeaveTaken">Leave Taken</label>
                                    <input readonly type="number" class="form-control" id="viewLeaveTaken" min="0"
                                        step="0" name="viewLeaveTaken" value="0">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label for="viewLeaveRemaining">Leave Remaining</label>
                                    <input readonly type="text" class="form-control" id="viewLeaveRemaining" min="0"
                                        step="0" name="viewLeaveRemaining" value="0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-footer">
                <div class="pull-right">
                    <label for="viewGrossPay">Gross Pay (+):</label>
                    <input readonly type="number" id="viewGrossPay" class="form-control" name="viewGrossPay" value="0.00">
                    <p></p>
                    <label for="viewTotalDeductions">Total Deductions (-):</label>
                    <input readonly type="number" id="viewTotalDeductions" class="form-control" name="viewTotalDeductions"
                        value="0.00">
                    <p></p>
                    <label for="viewTotalOthers">Total Others (+ / -) :</label>
                    <input readonly type="number" id="viewTotalOthers" class="form-control" name="viewTotalOthers"
                        value="0.00">
                    <p></p>
                    <label for="viewFinalAmount">Nett Payment:</label>
                    <input readonly type="number" id="viewFinalAmount" class="form-control" name="viewFinalAmount"
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
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>