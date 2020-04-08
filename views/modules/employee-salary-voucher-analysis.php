<?php
session_start();
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">


    <div id="loading">
        <img id="loading-image" src="views/img/template/loading.gif" alt="Loading..." />
    </div>

    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Salary Voucher Analysis
            <small>Salary Voucher Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Salary Voucher Analysis</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Display Salary Analysis by Date</h3>
            </div>
            <div class="box-body">
                <div class="form-row">
                    <div class="form-group col-md-3 col-sm-6 col-xs-12">
                        <input type="hidden" id="tempBasicPay" value="">
                        <input type="hidden" id="tempAttendance" value="">
                        <input type="hidden" id="tempProductivity" value="">
                        <input type="hidden" id="tempSalary (Others)" value="">

                        <label for="analyseMonthOfVoucher">Month</label>
                        <select required id="analyseMonthOfVoucher" name="analyseMonthOfVoucher"
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
                    <div class="form-group col-md-3 col-sm-6 col-xs-12">
                        <label for="analyseYearOfVoucher">Year</label>
                        <select required id="analyseYearOfVoucher" name="analyseYearOfVoucher"
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
                    <div class="col-md-12 hidden-sm hidden-xs">
                    </div>

                    <div class="form-group col-md-3 col-sm-6 col-xs-12">
                        <button type="submit" id="fetchSalaryVoucherAnalysisButton"
                            class="btn btn-info btn-block fetchSalaryVoucherAnalysis"
                            style="width: 130px; margin-bottom: 10px;"><i
                                class="fa fa-search"></i>&nbsp;&nbsp;Fetch</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="analysis_box_GAD" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Goldlink Asia Distribution Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Full Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_GAD" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Basic Pay</th>
                                    <th class="text-right">Attendance</th>
                                    <th class="text-right">Productivity</th>
                                    <th class="text-right">Salary (Others)</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_GAD">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Part Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_GAD_PT" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_GAD_PT">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_total_GAD" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_total_GAD">
                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_GAD" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_GAD">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_CPF_GAD" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_CPF_GAD">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="analysis_box_Doro" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Doro International Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Full Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_Doro" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Basic Pay</th>
                                    <th class="text-right">Attendance</th>
                                    <th class="text-right">Productivity</th>
                                    <th class="text-right">Salary (Others)</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_Doro">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Part Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_Doro_PT" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_Doro_PT">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_total_Doro" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_total_Doro">
                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_Doro" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_Doro">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_CPF_Doro" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_CPF_Doro">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="analysis_box_Goldtech" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Goldlink Technologies Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Full Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_Goldtech" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Basic Pay</th>
                                    <th class="text-right">Attendance</th>
                                    <th class="text-right">Productivity</th>
                                    <th class="text-right">Salary (Others)</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_Goldtech">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Part Timer</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_Goldtech_PT" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                    <th class="text-right">Salary/Sales</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_Goldtech_PT">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_total_Goldtech" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Gross Pay</th>
                                    <th class="text-right">Deduction (Others)</th>
                                    <th class="text-right">Deduction (CDAC)</th>
                                    <th class="text-right">Deduction (MBMF)</th>
                                    <th class="text-right">Deduction (SINDA)</th>
                                    <th class="text-right">Deduction (ECF)</th>
                                    <th class="text-right">CPF Employee</th>
                                    <th class="text-right">CPF Employer</th>
                                    <th class="text-right">Total CPF</th>
                                    <th class="text-right">Net Pay</th>
                                    <th class="text-right">FWL</th>
                                    <th class="text-right">SDL</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_total_Goldtech">
                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_Goldtech" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_Goldtech">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="table-responsive">
                            <table id="journal_table_CPF_Goldtech" class="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="appendJournalContent_CPF_Goldtech">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/employee-salary-voucher-analysis.js"></script>