<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/customer.controller.php";
require_once "../models/customer.model.php";

class AjaxCustomers
{
    public $customerId;

    public function getCustomerDetails()
    {

        $value = $this->customerId;

        $answer = CustomerController::ctrViewCustomerByPersonId($value);
        
        echo json_encode($answer);

    }

}

if (isset($_POST['person_id'])) {

    $getCustomerDetails = new AjaxCustomers();
    $getCustomerDetails -> customerId = $_POST['person_id'];
    $getCustomerDetails -> getCustomerDetails();
}