<?php
session_start();
?>

<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Goldlink Employee Portal (EMP)</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="icon" href="views/img/template/favicon.png">


    <!--=====================================
  CSS PLUGINS
  ======================================-->

    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="views/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="views/bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="views/bower_components/Ionicons/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="views/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="views/dist/css/skins/_all-skins.min.css">
    <!-- jQuery File Upload Stylesheet -->
    <link rel="stylesheet" href="views/dist/css/jquery.fileupload.css">
    <link rel="stylesheet" href="views/dist/css/jquery.fileupload-ui.css">
    <!-- Select2 -->
    <link rel="stylesheet" href="views/bower_components/select2/dist/css/select2.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="views/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="views/bower_components/datatables.net-bs/css/responsive.bootstrap.min.css">
    <!-- Google Font -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="views/plugins/iCheck/all.css">
    <!-- daterange picker -->
    <link rel="stylesheet" href="views/bower_components/bootstrap-daterangepicker/daterangepicker.css">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="views/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">


    <!--=====================================
  JAVASCRIPT PLUGINS
  ======================================-->

    <!-- jQuery 3 -->
    <script src="views/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- jQuery UI -->
    <script src="views/bower_components/jquery-ui/jquery-ui.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="views/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- SlimScroll -->
    <script src="views/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="views/bower_components/fastclick/lib/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="views/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="views/dist/js/demo.js"></script>
    <!-- Select2 -->
    <script src="views/bower_components/select2/dist/js/select2.full.min.js"></script>
    <!-- DataTables -->
    <script src="views/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/dataTables.responsive.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/responsive.bootstrap.min.js"></script>
    <!-- SweetAlert2 -->
    <script src="views/plugins/sweetalert2/sweetalert2.all.js"></script>
    <!-- By default SweetAlert2 doesn't support IE. To enable IE 11 support, include Promise polyfill -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>
    <!-- iCheck 1.0.1 -->
    <script src="views/plugins/iCheck/icheck.min.js"></script>
    <!-- date-range-picker -->
    <script src="views/bower_components/moment/min/moment.min.js"></script>
    <script src="views/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
    <!-- bootstrap datepicker -->
    <script src="views/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
    <!-- javascript repeater -->
    <script src="views/plugins/repeater/repeater.js"></script>
</head>

<!--=====================================
  BODY DOCUMENTATION
======================================-->


<body class="hold-transition skin-blue sidebar-mini login-page">

    <?php

if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) {

    echo '<div class="wrapper">';

    include "modules/header.php";

    include "modules/sidebar.php";

    if (isset($_GET["route"])) {
        if ($_GET["route"] == "home" ||
            $_GET["route"] == "employee-salary-voucher-management" ||
            $_GET["route"] == "employee-salary-voucher-my" ||
            $_GET["route"] == "employee-salary-voucher-submit" ||
            $_GET["route"] == "logout") {
            include "modules/" . $_GET["route"] . ".php";
        } else {
            include "modules/404.php";
        }
    } else {
        include "modules/home.php";
    }

    include "modules/footer.php";

    echo '</div>';

} else {

    include "modules/login.php";

}

?>

    </div>
    <script src="views/js/template.js"></script>
    <script src="views/js/header.js"></script>
    <script src="views/js/payroll.js"></script>

</body>

</html>