<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/supplier.controller.php";
require_once "../models/supplier.model.php";

class SuppliersTable
{

    public function showSuppliersTable()
    {

        $item = null;
        $value = null;

        $suppliers = SupplierController::ctrViewAllSuppliers($item, $value);

        $jsonData = '{"data":[';

        for ($i = 0; $i < count($suppliers); $i++) {

            $editSupplierButton = "<button id='btnEditSupplier' supplierId='".$suppliers[$i]["person_id"]."' class='btn btn-warning btn-sm' data-toggle='modal' data-target='#modalEditSupplier'><i class='fa fa-pencil'></i></button>";

            $deleteSupplierButton ="<button supplierId='".$suppliers[$i]["person_id"]."' class='btn btn-danger btn-sm'><i class='fa fa-times'></i></button>";

            $jsonData .= '[
                    "' . ($i + 1) . '",
                    "' . $suppliers[$i]["company_name"] . '",
                    "' . $suppliers[$i]["email"] . '",
                    "' . $suppliers[$i]["phone_number"] . '",
                    "' . $suppliers[$i]["mobile_number"] . '",
                    "' . $suppliers[$i]["address_1"] . '",
                    "' . $suppliers[$i]["zip"] . '",
                    "' . $suppliers[$i]["bank_name"] . '",
                    "' . $suppliers[$i]["account_number"] . '",
                    "' . $suppliers[$i]["comments"] . '",
                    "' . $editSupplierButton . '",
                    "' . $deleteSupplierButton . '"
                ],';

        }

        $jsonData = substr($jsonData, 0, -1);

        $jsonData .= ']}';

        echo $jsonData;
    }

}

$allSuppliers = new SuppliersTable();
$allSuppliers -> showSuppliersTable();
