<?php
session_start();
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Dashboard
            <small>Control Panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Welcome</h3>
            </div>
            <div class="box-body">
            You are logged in as 
            <strong>
            <?php 
                echo $_SESSION['first_name'].' '.$_SESSION['last_name'].'.';
            ?>
            </strong>
            <?php
                $data = array(
                    'person_id' => $_SESSION['person_id'],
                    'status' => "Pending"
                );
                $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                echo '<p></p><p>You have <strong>'.$response['COUNT(*)'].'</strong> pending salary vouchers for approval.</p>';
                
                $data = array(
                    'person_id' => $_SESSION['person_id'],
                    'status' => "Approved"
                );
                $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                echo '<p></p><p>You have <strong>'.$response['COUNT(*)'].'</strong> approved salary vouchers.</p>';
                
                $data = array(
                    'person_id' => $_SESSION['person_id'],
                    'status' => "Rejected"
                );
                $response = PayrollController::ctrRetrieveIndivSalaryVoucherByStatus($data);
                echo '<p></p><p>You have <strong>'.$response['COUNT(*)'].'</strong> rejected salary vouchers.</p>';

                var_dump($_SESSION['allowedStoresData']);
            ?>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
            <?php 
            $date = date('h:i a', time());
            echo 'Time now is <strong>'.$date.'</strong>'; 
            ?>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->