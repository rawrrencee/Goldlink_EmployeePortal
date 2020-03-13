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

    public function getEmployeesDetail() {
        $value = $this->employeeId;

        $answer = EmployeeController::ctrViewEmployeesDetail($value);

        echo json_encode($answer);
    }

    public function getEmployeesStores() {
        $value = $this->employeeId;

        $answer = EmployeeController::ctrViewEmployeesStores($value);

        echo json_encode($answer);
    }

    public function getEmployeesTeam() {
        $value = $this->employeeId;

        $answer = EmployeeController::ctrViewEmployeesTeam($value);

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

if (isset($_POST['get_employees_detail'])) {

    $getEmployeesDetail = new AjaxEmployees();
    $getEmployeesDetail -> employeeId = $_POST['get_employees_detail'];
    $getEmployeesDetail -> getEmployeesDetail();
}

if (isset($_POST['get_employees_stores'])) {

    $getEmployeesStores = new AjaxEmployees();
    $getEmployeesStores -> employeeId = $_POST['get_employees_stores'];
    $getEmployeesStores -> getEmployeesStores();
}

if (isset($_POST['get_employees_team'])) {

    $getEmployeesTeam = new AjaxEmployees();
    $getEmployeesTeam -> employeeId = $_POST['get_employees_team'];
    $getEmployeesTeam -> getEmployeesTeam();
}