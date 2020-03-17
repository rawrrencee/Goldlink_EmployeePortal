<?php

session_start();
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/stocktakes.controller.php";
require_once "../models/stocktakes.model.php";

class AjaxStocktakes
{
    public $stocktakesId;

    public function getAllStocktakes(){
        $answer = StocktakesController::ctrViewAllStocktakes();

        echo json_encode($answer);
    }

}