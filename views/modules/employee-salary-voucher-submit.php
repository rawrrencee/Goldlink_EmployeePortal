<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Submit Salary Voucher
            <small>Payroll Management</small>
        </h1>
    </section>

    <div id="loading">
        <img id="loading-image" src="views/img/template/loading.gif" alt="Loading..." />
    </div>

    <section class="content">

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title"><strong>Drafts</strong></h3>
                <p><strong>Pressing the yellow "Load" button will load a draft into the Salary Voucher form below.</strong></p>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                        title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip"
                        title="Remove">
                        <i class="fa fa-times"></i></button>
                </div>
            </div>

            <div class="box-body">
                <div class="col-md-12 col-sm-12 col-xs-12" style="overflow-y: auto; width: 100%;">
                    <table
                        class="table display table-hover table-bordered table-striped dt-responsive tableSalaryVoucherDrafts"
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
                                <th class="never">Approved</th>
                                <th class="never">Updated By</th>
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
                                <th class="none">Part Time</th>
                                <th style="width: 40px;">Load</th>
                                <th class="none" style="width: 40px;">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title pull-right"><?php echo date("Y"); ?> (Full Time)</h3>
            </div>
            <form id="salaryVoucherForm" role="form" method="POST">

                <ul class="nav nav-tabs" id="tabContent">
                    <li class="active"><a href="#salaryTab" data-toggle="tab">Salary</a></li>
                    <li><a href="#deductionsTab" data-toggle="tab">Deductions</a></li>
                    <li><a href="#othersTab" data-toggle="tab">Others</a></li>
                    <li><a href="#dailySalesFigureTab" data-toggle="tab">Attendance/Sales</a></li>

                    <div class="btn-group pull-right" style="padding: 10px;">
                        <a class="btn btn-default btnPrevious"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Previous</a>
                        <a class="btn btn-default btnNext">Next&nbsp;&nbsp;<i class="fa fa-arrow-right"></i></a>
                    </div>
                </ul>


                <input type="hidden" id="currentVoucherId" name="currentVoucherId" value="">
                <input type="hidden" id="currentPersonDOB" name="currentPersonDOB"
                    value="<?php echo $_SESSION['date_of_birth'] ?>">
                <input type="hidden" id="currentCreatedOn" name="currentCreatedOn" value="">
                <input type="hidden" id="newIsDraft" name="newIsDraft" value="">
                <input type="hidden" id="newCompanyName" name="newCompanyName"
                    value="<?php echo $_SESSION['company_name'] ?>">
                <input type="hidden" id="newRaceValue" name="newRaceValue" value="<?php echo $_SESSION['race'] ?>">

                <input type="hidden" id="voucherUpdatedBy" name="voucherUpdatedBy"
                    value="<?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'] ?>">

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
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newYearOfVoucher">Year <small
                                                style="color:red;">*Required</small></label>
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
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newPayToPersonName">Pay To Name (Your name used by the bank) <small
                                                style="color:red;">*Required</small></label>
                                        <input required type="text" class="form-control" id="newPayToPersonName"
                                            name="newPayToPersonName"
                                            value="">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newDesignation">Designation</label>
                                        <input readonly type="text" class="form-control" id="newDesignation"
                                            name="newDesignation" value="<?php echo $_SESSION['designation'];?>">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newNRIC">NRIC <small style="color:red;">*Required</small></label>
                                        <input required readonly type="text" class="form-control" id="newNRIC"
                                            name="newNRIC" value="<?php echo $_SESSION['nric'];?>">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newDateOfBirth">Date Of Birth</label>
                                        <input readonly type="text" class="form-control" id="newDateOfBirth"
                                            name="newDateOfBirth" value="<?php echo $_SESSION['date_of_birth'];?>">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBankName">Bank Name <small
                                                style="color:red;">*Required</small></label>
                                        <input required type="text" class="form-control" id="newBankName"
                                            name="newBankName" value="<?php echo $_SESSION['bank_name'];?>">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newBankAccount">Bank Account Number <small
                                                style="color:red;">*Required</small></label>
                                        <input required type="text" class="form-control" id="newBankAccount"
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
                                <div class="form-row">
                                    <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                        <label for="newSalaryBasicPayTitle">Basic Pay</label>
                                        <input readonly type="text" class="form-control" id="newSalaryBasicPayTitle"
                                            name="salaryTitle[0]" value="Basic Pay">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalaryBasicPayAmount">Amount</label>
                                        <input type="number" class="form-control grossPay" id="newSalaryBasicPayAmount"
                                            min="0.00" step="0.01" value="0.00" name="salaryAmount[0]">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newSalaryBasicPayRemarks">Remarks</label>
                                        <input type="text" class="form-control" id="newSalaryBasicPayRemarks"
                                            name="salaryRemarks[0]">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                        <label for="newSalaryAttendanceTitle">Attendance</label>
                                        <input readonly type="text" class="form-control" id="newSalaryAttendanceTitle"
                                            name="salaryTitle[1]" value="Attendance">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalaryAttendanceAmount">Amount</label>
                                        <input type="number" class="form-control grossPay"
                                            id="newSalaryAttendanceAmount" min="0.00" step="0.01" value="0.00"
                                            name="salaryAmount[1]">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newSalaryAttendanceRemarks">Remarks</label>
                                        <input type="text" class="form-control" id="newSalaryAttendanceRemarks"
                                            name="salaryRemarks[1]">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-4 col-sm-3 col-xs-6">
                                        <label for="newSalaryProductivityTitle">Productivity</label>
                                        <input readonly type="text" class="form-control" id="newSalaryProductivityTitle"
                                            name="salaryTitle[2]" value="Productivity">
                                    </div>
                                    <div class="form-group col-md-2 col-sm-3 col-xs-6">
                                        <label for="newSalaryProductivityAmount">Amount</label>
                                        <input type="number" class="form-control grossPay"
                                            id="newSalaryProductivityAmount" min="0.00" step="0.01" value="0.00"
                                            name="salaryAmount[2]">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label for="newSalaryProductivityRemarks">Remarks</label>
                                        <input type="text" class="form-control" id="newSalaryProductivityRemarks"
                                            name="salaryRemarks[2]">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div id="appendSalaryListing">
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-3 col-sm-6 col-xs-6">
                                            <label for="newSalaryListingCategory">Select Salary Listing Category</label>
                                            <select id="newSalaryListingCategory" name="newSalaryListingCategory"
                                                class="form-control select2">
                                                <option selected disabled>Select a category</option>
                                                <option value="Medical">Medical</option>
                                                <option value="OT">OT e.g. <?php echo "(1 ".date('M')." ".date('Y')." - ".cal_days_in_month(CAL_GREGORIAN, date('m'), date('y'))." ".date('M')." ".date('Y').")"; ?></option>
                                                <option value="Commission">Commission (Indicate Type in Remarks)</option>
                                                <option value="Training Allowance">Training Allowance</option>
                                                <option value="Weekly Sales Report">Weekly Sales Report</option>
                                                <option value="Custom">Custom</option>
                                            </select>
                                        </div>
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
                                        <input readonly type="number" class="form-control totalDeductions"
                                            id="newCPFEmployee" min="0.00" step="0.01" value="0.00"
                                            name="deductionAmount[0]">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                                        <label for="newCPFEmployer">CPF-ER</label>
                                        <input readonly type="number" class="form-control" id="newCPFEmployer"
                                            min="0.00" step="0.01" value="0.00" name="newCPFEmployer">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                        <label for="newLevyAmount">Foreign Worker Levy</label>
                                        <input readonly type="number" class="form-control" id="newLevyAmount" min="0.00"
                                            step="0.01" value="<?php echo $_SESSION['levy_amount'] ?>"
                                            name="newLevyAmount">
                                    </div>
                                    <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                        <label for="newSDLAmount">Skills Development Levy</label>
                                        <input readonly type="number" class="form-control" id="newSDLAmount" min="0.00"
                                            step="0.01" value="0.00" name="newSDLAmount">
                                    </div>
                                </div>
                            </div>

                            <div class="form-row col-md-12 col-sm-12 col-xs-12">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <label for="newCSMSelection">Self-Help Groups (SHGs) and SHARE Donations</label>
                                </div>
                                <div class="form-group col-md-12 col-sm-12 col-xs-12">
                                    <input type="hidden" name='newCSMSelection' value="0" />
                                    <input checked type="checkbox" class="minimal" id="newCSMSelection"
                                        name="newCSMSelection" value="1">&nbsp;&nbsp;Yes
                                </div>
                                <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                    <label for="newCSMTitle">SHGs and SHARE Donations to</label>
                                    <input readonly type="text" class="form-control" id="newCSMTitle"
                                        name="deductionTitle[1]" value="<?php
                                        switch($_SESSION['race']) {case "Chinese":
                                                    echo "CDAC";
                                                    break;
                                                case "Malay":
                                                    echo "MBMF";
                                                    break;
                                                case "Indian":
                                                    echo "SINDA";
                                                    break;
                                                case "Eurasian":
                                                    echo "ECF";
                                                    break;
                                                default:
                                                    break;}?>">
                                </div>
                                <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                    <label for="newCSMAmount">Amount</label>
                                    <input readonly type="number" class="form-control totalDeductions" id="newCSMAmount"
                                        min="0.00" step="0.01" value="0.00" name="deductionAmount[1]">
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
                                        <p style="font-size: 20px;">Personal Sales</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12 col-xs-12">
                                        <label for="newPersonalSales">Amount</label>
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
                                                        <option selected value="N/A">N/A</option>
                                                    </select>
                                                </td>
                                            </tr>';
                                        }

                                        ?>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Daily Sales Figure</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-3 col-sm-3 col-xs-6">
                                        <label for="newNumDaysZeroSales">No. days closing $0 sales</label>
                                        <input type="number" class="form-control" id="newNumDaysZeroSales"
                                            name="newNumDaysZeroSales" value="0" min="0" step="0">
                                    </div>
                                    <div class="form-group col-md-3 col-sm-3 col-xs-6">
                                        <label for="newNumReportsSubmitted">No. reports submitted</label>
                                        <input type="number" class="form-control" id="newNumReportsSubmitted"
                                            name="newNumReportsSubmitted" value="0" min="0" step="0">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group">
                                        <p style="font-size: 20px;">Attendance</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-4 col-sm-4 col-xs-12">
                                        <label for="newOffDays">Off Days</label>
                                        <textarea readonly class="form-control" id="newOffDays" rows="5" value=""
                                            name="newOffDays"></textarea>
                                    </div>
                                    <div class="form-group col-md-4 col-sm-4 col-xs-12">
                                        <label for="newLateDays">Late Days</label>
                                        <textarea class="form-control" id="newLateDays" rows="5" value=""
                                            name="newLateDays"></textarea>
                                    </div>
                                    <div class="form-group col-md-4 col-sm-4 col-xs-12">
                                        <label for="newLeaveMCDays">Leave/MC Days</label>
                                        <textarea readonly class="form-control" id="newLeaveMCDays" rows="5" value=""
                                            name="newLeaveMCDays"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-row">
                                    <div class="form-group col-md-3 col-sm-3 col-xs-6">
                                        <label for="newTotalWorkingDays">Total Working Days</label>
                                        <input type="number" class="form-control" id="newTotalWorkingDays" min="0"
                                            name="newTotalWorkingDays" step="0" value="0">
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
                                    <div class="form-group col-md-4 col-sm-4 col-xs-6">
                                        <label for="newLeaveEntitled">Leave Entitled</label>
                                        <input type="number" class="form-control" id="newLeaveEntitled" min="0" step="0"
                                            name="newLeaveEntitled" value="0">
                                    </div>
                                    <div class="form-group col-md-4 col-sm-4 col-xs-6">
                                        <label for="newLeaveTaken">Leave Taken</label>
                                        <input type="number" class="form-control" id="newLeaveTaken" min="0" step="0"
                                            name="newLeaveTaken" value="0">
                                    </div>
                                    <div class="form-group col-md-4 col-sm-4 col-xs-6">
                                        <label for="newLeaveRemaining">Leave Remaining</label>
                                        <input type="text" class="form-control" id="newLeaveRemaining" min="0" step="0"
                                            name="newLeaveRemaining" value="0">
                                    </div>
                                </div>
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
                    </div>
                </div>

                <div class="box-footer">
                    <div class="pull-right">
                        <div class="btn-group" style="padding: 10px;">
                            <a class="btn btn-default btnPrevious"><i
                                    class="fa fa-arrow-left"></i>&nbsp;&nbsp;Previous</a>
                            <a class="btn btn-default btnNext">Next&nbsp;&nbsp;<i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

                <div class="box-footer">
                    <div class="pull-right">
                        <div class="form-group">
                            <div class="form-group">
                                <button type="reset" id="resetVoucher" class="btn btn-warning resetButton"
                                    style="width: 130px; margin-bottom: 10px;"><i
                                        class="fa fa-refresh"></i>&nbsp;&nbsp;Reset</button>&nbsp;&nbsp;
                                <button type="submit" id="saveDraftVoucher" class="btn btn-info postButton"
                                    style="width: 130px; margin-bottom: 10px;"><i
                                        class="fa fa-save"></i>&nbsp;&nbsp;Save as Draft</button>&nbsp;&nbsp;
                                <button type="submit" id="submitVoucher" class="btn btn-success postButton"
                                    style="width: 130px; margin-bottom: 10px;"><i
                                        class="fa fa-check"></i>&nbsp;&nbsp;Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <?php
                    $createSalaryVoucher = new PayrollController();
                    $createSalaryVoucher->ctrCreateNewSalaryVoucher();
                    $createSalaryVoucher->ctrEditSalaryVoucher();
                ?>
            </form>

        </div>




    </section>
</div>

<?php
    $createSalaryVoucher = new PayrollController();
    $createSalaryVoucher->ctrDeleteSalaryVoucher();   
?>