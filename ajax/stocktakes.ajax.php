<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["loggedIn"]) || !$_SESSION["loggedIn"]) die("Invalid Authentication");

require_once "../controllers/stocktakes.controller.php";
require_once "../models/stocktakes.model.php";

class AjaxStocktakes
{
    public $stocktakesId;
    public $chosenDate;
    public $startDate;
    public $endDate;
    public $category;
    public $itemId;

    public function getAllStocktakes(){
        $value = $this->chosenDate;
        $answer = StocktakesController::ctrViewAllStocktakes($value);

        echo json_encode($answer);
    }

    public function getIndividualCategoryStocktakes(){
        $startDate = $this->startDate;
        $endDate = $this->endDate;
        $category = $this->category;

        $answer = StocktakesController::ctrViewIndividualCategoryStocktakesByDate($startDate, $endDate, $category);

        echo json_encode($answer);
    }

    public function getIndividualItemStocktakes(){
        $startDate = $this->startDate;
        $endDate = $this->endDate;
        $itemId = $this->itemId;

        $answer = StocktakesController::ctrViewIndividualItemStocktakesByDate($startDate, $endDate, $itemId);

        echo json_encode($answer);
    }

}

if (isset($_POST['get_all_stocktakes'])) {

    $getAllStocktakes = new AjaxStocktakes();
    $getAllStocktakes -> chosenDate = $_POST['get_all_stocktakes'];
    $getAllStocktakes -> getAllStocktakes();
}

if (isset($_POST['get_individual_category_stocktakes_start_date']) && isset($_POST['get_individual_category_stocktakes_end_date']) && isset($_POST['get_individual_category_stocktakes_category'])) {

    $getIndividualCategoryStocktakes = new AjaxStocktakes();
    $getIndividualCategoryStocktakes -> startDate = $_POST['get_individual_category_stocktakes_start_date'];
    $getIndividualCategoryStocktakes -> endDate = $_POST['get_individual_category_stocktakes_end_date'];
    $getIndividualCategoryStocktakes -> category = $_POST['get_individual_category_stocktakes_category'];
    $getIndividualCategoryStocktakes -> getIndividualCategoryStocktakes();
}

if (isset($_POST['get_individual_item_stocktakes_start_date']) && isset($_POST['get_individual_item_stocktakes_end_date']) && isset($_POST['get_individual_item_stocktakes_item_id'])) {

    $getIndividualItemStocktakes = new AjaxStocktakes();
    $getIndividualItemStocktakes -> startDate = $_POST['get_individual_item_stocktakes_start_date'];
    $getIndividualItemStocktakes -> endDate = $_POST['get_individual_item_stocktakes_end_date'];
    $getIndividualItemStocktakes -> itemId = $_POST['get_individual_item_stocktakes_item_id'];
    $getIndividualItemStocktakes -> getIndividualItemStocktakes();
}