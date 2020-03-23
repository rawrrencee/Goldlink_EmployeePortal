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
    <!-- jQuery UI Theme -->
    <link rel="stylesheet" href="views/bower_components/jquery-ui/themes/custom-theme/autocomplete.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="views/bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="views/bower_components/Ionicons/css/ionicons.min.css">
    <!-- jQuery File Upload Stylesheet -->
    <link rel="stylesheet" href="views/dist/css/jquery.fileupload.css">
    <link rel="stylesheet" href="views/dist/css/jquery.fileupload-ui.css">
    <!-- Select2 -->
    <link rel="stylesheet" href="views/bower_components/select2/dist/css/select2.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="views/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="views/bower_components/datatables.net-bs/css/responsive.bootstrap.min.css">
    <!-- Google Font
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"> -->
    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="views/plugins/iCheck/all.css">
    <!-- daterange picker -->
    <link rel="stylesheet" href="views/bower_components/bootstrap-daterangepicker/daterangepicker.css">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="views/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="views/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="views/dist/css/skins/_all-skins.min.css">
    <!--jqListbox-->
    <link rel="stylesheet" href="views/plugins/jqListbox/jqListbox.css"></script>

    <!--=====================================
  JAVASCRIPT PLUGINS
  ======================================-->

    <!-- jQuery 3 -->
    <script src="views/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- jQuery UI -->
    <script src="views/bower_components/jquery-ui/jquery-ui.min.js"></script>
    <!-- jQuery Migrate -->
    <script src="views/bower_components/jquery/dist/jquery-migrate-3.1.0.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="views/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- ChartJS -->
    <script src="views/bower_components/chart.js/Chart.js"></script>
    <!-- SlimScroll -->
    <script src="views/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="views/bower_components/fastclick/lib/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="views/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="views/dist/js/demo.js"></script>
    <!-- jQuery File Upload -->
    <script src="views/bower_components/jquery-file-upload/js/tmpl.min.js"></script>
    <script src="views/bower_components/jquery-load-image/js/load-image.all.min.js"></script>
    <script src="views/bower_components/jquery-canvas-to-blob/js/canvas-to-blob.min.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.iframe-transport.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.fileupload.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.fileupload-image.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"></script>
    <script src="views/bower_components/jquery-file-upload/js/jquery.fileupload-ui.js"></script>
    <!-- Select2 -->
    <script src="views/bower_components/select2/dist/js/select2-v4013.min.js"></script>
    <!-- DataTables -->
    <script src="views/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/dataTables.responsive.min.js"></script>
    <script src="views/bower_components/datatables.net-bs/js/responsive.bootstrap.min.js"></script>
    <!-- SweetAlert2 -->
    <script src="views/plugins/sweetalert2/sweetalert2.all.js"></script>
    <!-- By default SweetAlert2 doesn't support IE. To enable IE 11 support, include Promise polyfill -->
    <script type="text/javascript" src="views/plugins/sweetalert2/core.js"></script>
    <!-- iCheck 1.0.1 -->
    <script src="views/plugins/iCheck/icheck.min.js"></script>
    <!-- date-range-picker -->
    <script src="views/bower_components/moment/min/moment.min.js"></script>
    <script src="views/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
    <!-- bootstrap datepicker -->
    <script src="views/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
    <!-- javascript repeater -->
    <script src="views/plugins/repeater/repeater.js"></script>
    <!-- date.js -->
    <script type="text/javascript" src="views/plugins/dateJS/date.js"></script>
    <!-- jqListbox.js -->
    <script src="views/plugins/jqListbox/jqListbox.plugin-1.3.min.js"></script>
    <!-- jqListbox.js -->
    <script src="views/plugins/ProgressBar.js/progressbar.min.js"></script>
</head>

<!--=====================================
  BODY DOCUMENTATION
======================================-->


<body class="hold-transition skin-blue sidebar-mini login-page">

    <?php

    $maintenance_mode = 0;

    if ($maintenance_mode == 1) {
        echo '<p style="color: white; padding: 10%">Website under maintenance.</p>';
        return;
    }

    if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) {

            echo '<div class="wrapper">';

            include "modules/header.php";

            include "modules/sidebar.php";

            if (isset($_GET["route"])) {
                if (

                    $_GET["route"] == "home" ||
                    $_GET["route"] == "logout" ||
                    //DEV OVERRIDES - For Insights page development
                    //TODO: Once development completes, shift "Insights" page to allowed modules
                    strpos($_GET["route"], "insights") !== false
                ) {
                    include "modules/" . $_GET["route"] . ".php";

                } else if (

                    (
                        $_GET["route"] == "customer-archives" ||
                        $_GET["route"] == "customer-management" ||
                        $_GET["route"] == "employee-management" ||
                        $_GET["route"] == "employee-upload-files" ||
                        $_GET["route"] == "employee-salary-voucher-management" ||
                        $_GET["route"] == "employee-salary-voucher-management-pt" ||
                        $_GET["route"] == "employee-salary-voucher-team" ||
                        $_GET["route"] == "employee-salary-voucher-team-pt" ||
                        $_GET["route"] == "employee-salary-voucher-my" ||
                        $_GET["route"] == "employee-salary-voucher-my-pt" ||
                        $_GET["route"] == "employee-salary-voucher-submit" ||
                        $_GET["route"] == "employee-salary-voucher-submit-pt" ||
                        $_GET["route"] == "employee-salary-voucher-analysis" ||
                        $_GET["route"] == "employee-salary-voucher-analysis-yearly" ||
                        $_GET["route"] == "item-management" ||
                        $_GET["route"] == "item-kit-management" ||
                        $_GET["route"] == "sales-terminal" ||
                        $_GET["route"] == "supplier-management"
                    )
                    && in_array($_GET["route"], $_SESSION['allowed_modules'])) {

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

    <script src="views/js/customers.js"></script>
    <script src="views/js/customer-archives.js"></script>
    <script src="views/js/employees.js"></script>
    <script src="views/js/employee-salary-voucher-analysis.js"></script>
    <script src="views/js/employee-salary-voucher-analysis-yearly.js"></script>
    <script src="views/js/items.js"></script>
    <script src="views/js/item-kits.js"></script>
    <script src="views/js/insights-inventory.js"></script>
    <script src="views/js/insights-sales.js"></script>
    <script src="views/js/payroll-submit.js"></script>
    <script src="views/js/payroll-functions.js"></script>
    <script src="views/js/payroll-salary-voucher-drafts.js"></script>
    <script src="views/js/payroll-salary-voucher-drafts-pt.js"></script>
    <script src="views/js/payroll-salary-voucher-management.js"></script>
    <script src="views/js/payroll-salary-voucher-management-pt.js"></script>
    <script src="views/js/payroll-salary-voucher-my.js"></script>
    <script src="views/js/payroll-salary-voucher-my-pt.js"></script>
    <script src="views/js/payroll-salary-voucher-team.js"></script>
    <script src="views/js/payroll-salary-voucher-team-pt.js"></script>
    <script src="views/js/people.js"></script>
    <script src="views/js/sales.js"></script>
    <script src="views/js/suppliers.js"></script>
</body>

</html>