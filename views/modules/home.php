<?php
session_start();
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

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/home.js"></script>