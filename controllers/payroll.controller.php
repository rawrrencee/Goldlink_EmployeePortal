<?php

class PayrollController{

    public static function ctrCreateNewSalaryVoucher(){
        if (isset($_POST['newYearOfVoucher'])) {
            echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";
        }
    }
}