<?php

require_once "controllers/template.controller.php";
require_once "controllers/customer.controller.php";
require_once "controllers/employee.controller.php";
require_once "controllers/payroll.controller.php";
require_once "controllers/store.controller.php";
require_once "controllers/supplier.controller.php";

require_once "models/customer.model.php";
require_once "models/employee.model.php";
require_once "models/payroll.model.php";
require_once "models/people.model.php";
require_once "models/store.model.php";
require_once "models/supplier.model.php";

require_once "views/plugins/fpdf/fpdf.php";

date_default_timezone_set('Asia/Singapore');

$template = new TemplateController();
$template->template_controller();