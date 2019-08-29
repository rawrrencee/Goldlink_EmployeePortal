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
            Salary Voucher Analysis by Year
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
            <div class="box-body">
                <div class="form-row">
                    <div class="form-group col-md-3 col-sm-6 col-xs-12">
                        <input type="hidden" id="tempBasicPay" value="">
                        <input type="hidden" id="tempAttendance" value="">
                        <input type="hidden" id="tempProductivity" value="">
                        <input type="hidden" id="tempSalary (Others)" value="">
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
                        <button type="submit" id="fetchSalaryVoucherAnalysisYearlyButton"
                            class="btn btn-info btn-block fetchSalaryVoucherAnalysisYearly"
                            style="width: 130px; margin-bottom: 10px;"><i
                                class="fa fa-search"></i>&nbsp;&nbsp;Fetch</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="analysis_box_yearly_GAD" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Goldlink Asia Distribution Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Gross Salary</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_GAD" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_GAD">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_total_GAD"
                            class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_total_GAD">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="analysis_box_yearly_Doro" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Doro International Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Gross Salary</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_Doro" class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_Doro">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_total_Doro"
                            class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_total_Doro">
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>

        <div id="analysis_box_yearly_Goldtech" class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Goldlink Technologies Pte Ltd</h3>
            </div>
            <div class="box-body">
                <div class="col-sm-12 col-md-12 col-xs-12">

                    <h5><strong>Gross Salary</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_Goldtech"
                            class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Person ID</th>
                                    <th>Name</th>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_Goldtech">
                                <td colspan="10">No information available.</td>
                            </tbody>
                        </table>
                    </div>

                    <h5><strong>Total</strong></h5>

                    <div class="table-responsive">
                        <table id="analysis_table_yearly_total_Goldtech"
                            class="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th class="text-right">Jan</th>
                                    <th class="text-right">Feb</th>
                                    <th class="text-right">Mar</th>
                                    <th class="text-right">Apr</th>
                                    <th class="text-right">May</th>
                                    <th class="text-right">Jun</th>
                                    <th class="text-right">Jul</th>
                                    <th class="text-right">Aug</th>
                                    <th class="text-right">Sep</th>
                                    <th class="text-right">Oct</th>
                                    <th class="text-right">Nov</th>
                                    <th class="text-right">Dec</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody id="appendAnalysisContent_yearly_total_Goldtech">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->