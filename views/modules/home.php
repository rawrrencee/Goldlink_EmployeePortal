<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>

<script>
$(function() {
    $("#globalClock").htAnalogClock({
        hasShadow: false
    }, {
        timezone: "Asia/Singapore"
    });
});

var currentPersonId = <?php echo $_SESSION['person_id']; ?>
</script>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Home
            <small>Welcome Page</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
        </ol>

        <div class="row">
            <div class="text-center">
                <canvas id="globalClock" height="200" style="margin-top: 40px;"></canvas>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 col-md-12 col-xs-12" style="margin-top: 10px;">
                <div class="text-center">
                    <h1>
                        Welcome,
                        <strong>
                            <?php
                        if ($_SESSION['last_name'] != "") {
                            echo $_SESSION['first_name'].' '.$_SESSION['last_name'].'.';
                        } else {
                            echo $_SESSION['first_name'].'.';
                    }?>
                        </strong>
                    </h1>
                </div>
            </div>
        </div>

        <div class="box" style="margin-top: 20px; box-shadow: 1px 1px 4px 0px #bcbcbc">
            <div class="box-body">
                
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-xs-12" style="margin-top: 10px;">
                        <h4 class="text-center"><b>My Sales Targets</b></h4>
                    </div>
                </div>
                <hr />
                
                <div class="row">
                    <div id="homePageMySalesTargets"></div>
                </div>

                <hr />

                <div class="row">
                    <div class="col-lg-12 col-md-12 col-xs-12" style="margin-top: 10px;">
                        <h4 class="text-center"><b>My Salary Vouchers</b></h4>
                    </div>
                </div>
                <hr />
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-4 col-sm-12 col-xs-12">
                        <div class="info-box" style="box-shadow: 1px 1px 4px 0px #dfdfdf;">
                            <span class="info-box-icon bg-aqua"><i class="fa fa-hourglass"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text"><strong>Pending</strong></span>
                                <p>Salary Vouchers</p>
                                <span class="info-box-number">
                                    <?php
                                        $data = array(
                                            'person_id' => $_SESSION['person_id'],
                                            'status' => "Pending"
                                        );
                                        $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                                        echo $response['COUNT(*)'];
                                    ?>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 col-xs-12">
                        <div class="info-box" style="box-shadow: 1px 1px 4px 0px #dfdfdf;">
                            <span class="info-box-icon bg-green"><i class="fa fa-check"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text"><strong>Approved</strong></span>
                                <p>Salary Vouchers</p>
                                <span class="info-box-number">
                                    <?php
                                        $data = array(
                                            'person_id' => $_SESSION['person_id'],
                                            'status' => "Approved"
                                        );
                                        $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                                        echo $response['COUNT(*)'];
                                    ?>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 col-xs-12">
                        <div class="info-box" style="box-shadow: 1px 1px 4px 0px #dfdfdf;">
                            <span class="info-box-icon bg-red"><i class="fa fa-times"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text"><strong>Rejected</strong></span>
                                <p>Salary Vouchers</p>
                                <span class="info-box-number">
                                    <?php
                                        $data = array(
                                            'person_id' => $_SESSION['person_id'],
                                            'status' => "Rejected"
                                        );
                                        $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                                        echo $response['COUNT(*)'];
                                    ?>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="content">

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Personal Information</h3>
            </div>
            <div class="box-body">
                <p>
                    You are logged in as
                    <strong><?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'].'.';?></strong>
                </p>
                <p>
                    Your designation is
                    <strong><?php echo $_SESSION['designation'].'.';?></strong>
                </p>
                <p>
                    Your company is
                    <strong><?php echo $_SESSION['company_name'].'.';?></strong>
                </p>
            </div>
        </div>



    </section>
</div>

<div id="modalViewEmployeeSales" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">View Employee Sales</h4>
            </div>


            <div class="modal-body">
                <div class="box-body">

                    <div class="row">
                        <div id="displayEmployeeSalesModalDataMsg" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5 class="text-center text-info">Displaying sales for: Employee
                            </h5>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 20px;">
                            <h3 class="text-center"><b>Items</b></h3>
                        </div>
                    </div>
                    <hr />
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <table id="employeeItemSalesTable"
                                class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                <thead>
                                    <tr>
                                        <th width="15%;">Date</th>
                                        <th width="25%;">Item Name</th>
                                        <th width="20%;">Item Number</th>
                                        <th width="10%;">Item Category</th>
                                        <th width="10%;">Unit Price</th>
                                        <th width="10%;">Quantity</th>
                                        <th width="10%;">Total Sales</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeItemSalesTableBody">
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 20px;">
                            <h3 class="text-center"><b>Item Kits</b></h3>
                        </div>
                    </div>
                    <hr />

                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <table id="employeeItemKitSalesTable"
                                class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                <thead>
                                    <tr>
                                        <th width="15%;">Date</th>
                                        <th width="25%;">Item Kit Name</th>
                                        <th width="20%;">Item Kit Number</th>
                                        <th width="10%;">Item Kit Category</th>
                                        <th width="10%;">Unit Price</th>
                                        <th width="10%;">Quantity</th>
                                        <th width="10%;">Total Sales</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeItemKitSalesTableBody">
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            </div>

        </div>
    </div>
</div>


<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/home.js"></script>