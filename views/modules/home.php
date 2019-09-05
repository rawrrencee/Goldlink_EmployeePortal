<?php
session_start();
?>

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

        <div class="hidden-xs hidden-sm">
            <div class="text-center">
                <iframe
                    src="https://freesecure.timeanddate.com/clock/i6v5pe01/n236/szw210/szh210/hoc000/hbw4/cf100/hgr0/fav0/fiv0/mqc000/mqs3/mql25/mqw2/mqd96/mhc000/mhs3/mhl20/mhw2/mhd96/mmc000/mms3/mml5/mmw2/mmd96/hhs2/hhw8/hms2/hmw8/hmr4/hsc000/hss3/hsl90"
                    frameborder="0" width="210" height="210" style="margin-top: 20px;">
                </iframe>
            </div>
        </div>

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

        <div class="row" style="margin-top: 20px;">
            <div class="col-md-4 col-sm-12 col-xs-12">
                <div class="info-box">
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
                <div class="info-box">
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
                <div class="info-box">
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
    </section>

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Personal Information</h3>
            </div>
            <div class="box-body">
                <p>
                    You are logged in as
                    <strong>
                        <?php 
                echo $_SESSION['first_name'].' '.$_SESSION['last_name'].'.';
                ?>
                    </strong>
                </p>
                <p>
                    Your designation is
                    <strong>
                        <?php 
                echo $_SESSION['designation'].'.';
                ?>
                    </strong>
                </p>
                <p>
                    Your company is
                    <strong>
                        <?php 
                echo $_SESSION['company_name'].'.';
                ?>
                    </strong>
                </p>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->



    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->