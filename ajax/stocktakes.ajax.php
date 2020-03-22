<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/stocktakes.controller.php";
require_once "../models/stocktakes.model.php";

class AjaxStocktakes
{
    public $stocktakesId;
    public $chosenDate;

    public function getAllStocktakes(){
        $value = $this->chosenDate;
        $answer = StocktakesController::ctrViewAllStocktakes($value);

        echo json_encode($answer);
    }

}

if (isset($_POST['get_all_stocktakes'])) {

    $getAllStocktakes = new AjaxStocktakes();
    $getAllStocktakes -> chosenDate = $_POST['get_all_stocktakes'];
    $getAllStocktakes -> getAllStocktakes();
}