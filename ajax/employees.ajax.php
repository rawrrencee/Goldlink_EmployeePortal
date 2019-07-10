<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/employee.controller.php";
require_once "../models/employee.model.php";

class AjaxEmployees
{
    public $employeeId;

    public function getEmployeeDetails()
    {

        $value = $this->employeeId;

        $answer = EmployeeController::ctrViewEmployeeByPersonId($value);

        echo json_encode($answer);

    }

    public function getAllowedModules()
    {

        $value = $this->employeeId;

        $answer = EmployeeController::ctrViewEmployeePermissions($value);

        echo json_encode($answer);

    }

}

if (isset($_POST['person_id'])) {

    $getEmployeeDetails = new AjaxEmployees();
    $getEmployeeDetails -> employeeId = $_POST['person_id'];
    $getEmployeeDetails -> getEmployeeDetails();
}

if (isset($_POST['get_allowed_modules'])) {

    $getEmployeeDetails = new AjaxEmployees();
    $getEmployeeDetails -> employeeId = $_POST['get_allowed_modules'];
    $getEmployeeDetails -> getAllowedModules();
}