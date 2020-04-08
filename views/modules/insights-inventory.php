<style>
#categoryInventoryItemsByDateTable tbody tr {
    cursor: pointer;
}
</style>

<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Insights
            <small>Inventory</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Insights</li>
        </ol>
    </section>

    <div id="loading">
        <img id="loading-image" src="views/img/template/loading.gif" alt="Loading..." />
    </div>

    <section class="content">

        <div class="row">
            <section class="col-lg-12 col-md-12 col-xs-12">


                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Inventory Levels by Category</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <button id="filterCategoryInventoryByDateButtonDown" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-down"></i></button>
                                <button id="filterCategoryInventoryByDateButtonUp" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-up"></i></button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <div id="currentFilterCategoryInventoryByDatePeriodMsg"></div>
                            </div>
                        </div>
                        <div id="filterCategoryInventoryByDate"
                            style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right" style="margin-top: 10px;">
                                    <label for="categoryInventoryByEndDate">End Date:</label>
                                    <input type="text" id="categoryInventoryByEndDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                                <div class="col-lg-3 col-xs-6 pull-right" style="margin-top: 10px;">
                                    <label for="categoryInventoryByStartDate">Start Date:</label>
                                    <input type="text" id="categoryInventoryByStartDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                                <div class="col-lg-3 col-xs-12 pull-right" style="margin-top: 10px;">
                                    <label for="categoryInventoryByName">Category</label>
                                    <select class="form-control select2" style="width: 100%;"
                                        id="categoryInventoryByName">
                                        <?php
                                            $categories = ItemController::ctrViewAllCategories();

                                            foreach($categories as $key => $value) {
                                                echo '<option value ="'.$value["category"].'">'.$value["category"].'</option>';
                                            }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-xs-12 pull-right">
                                    <div id="filterCategoryInventoryByDateMsg"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <button id="categoryInventoryByDateFilterApply" type="button"
                                        class="btn btn-info pull-right" style="margin-top: 10px;">Apply</button>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div class="row">
                            <div id="categoryInventoryHeader" class="col-lg-12" style="margin-top: 20px;">
                                <h3 class="text-center"><b>Categories</b></h3>
                            </div>
                        </div>

                        <div class="row" style="margin-top: 10px; margin-bottom: 20px;">
                            <div id="displayCategoryInventoryDataMsg" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h5 class="text-center text-info">Select a category from above to view inventory level.
                                </h5>
                            </div>
                            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" style="margin-top: 40px;">
                                <canvas id="categoryInventoryItemsByDateChart" height="450"></canvas>
                            </div>
                            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" style="margin-top: 20px;">
                                <h4 class="text-center"><b>Items in category</b></h4>
                                <hr />
                                <table id="categoryInventoryItemsByDateTable"
                                    class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Item Number</th>
                                            <th>Unit Price</th>
                                            <th>Item ID</th>
                                            <th class="text-center">View</th>
                                        </tr>
                                    </thead>
                                    <tbody id="categoryInventoryItemsByDateTableBody">
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>


                <div class="nav-tabs-custom">
                    <!-- Tabs within a box -->
                    <ul class="nav nav-tabs pull-right">
                        <li><a href="#top100pdtCatSalesInventory" data-toggle="tab">Top 100</a></li>
                        <li class="active"><a href="#top10pdtCatSalesInventory" data-toggle="tab">Top 10</a></li>
                        <li class="pull-left header">Product Category (Sales &
                            Inventory)</li>
                    </ul>
                    <div class="tab-content no-padding">
                        <div class="row" style="margin-top: 20px; margin-left: 10px; margin-right: 10px;">
                            <div class="col-lg-3 col-md-3 col-xs-12 pull-right">
                                <button id="filterPdtCatSalesInventoryByDateButtonDown"
                                    class="btn btn-default pull-right" style="width: 100%;">Filter <i
                                        class="fa fa-angle-down"></i></button>
                                <button id="filterPdtCatSalesInventoryByDateButtonUp" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-up"></i></button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px; margin-left: 10px;">
                            <div class="col-lg-3 col-md-3 col-xs-12 pull-right">
                                <div id="currentFilterPdtCatSalesInventoryByDatePeriodMsg"></div>
                            </div>
                        </div>
                        <div id="filterPdtCatSalesInventoryByDate"
                            style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                            <div class="row">
                                <div class="col-lg-3 col-xs-12 pull-right">
                                    <label for="pdtCatSalesInventorySelectDate">Select Date:</label>
                                    <input type="text" id="pdtCatSalesInventorySelectDate"
                                        class="form-control datepicker" style="background-color: white;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xs-12 pull-right">
                                    <div id="filterPdtCatSalesInventoryByDateMsg"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <button id="pdtCatSalesInventoryFilterApply" type="button"
                                        class="btn btn-info pull-right" style="margin-top: 10px;">Apply</button>
                                </div>
                            </div>
                        </div>
                        <div id="displayPdtCatSalesInventoryMsg" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5 class="text-center text-info">There are no sales recorded yet for today. Select a past date to check sales/inventory levels.
                            </h5>
                        </div>
                        <div class="tab-pane active" id="top10pdtCatSalesInventory">
                            <div class="box-body">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-lg-12">
                                        <div class="chart-container" style="height:20vh; width:100%">
                                            <canvas id="pdtCatSalesInventoryChartTop10"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="top100pdtCatSalesInventory">
                            <div class="box-body">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-lg-12">
                                        <div class="chart-container" style="height:20vh; width:100%">
                                            <canvas id="pdtCatSalesInventoryChartTop100"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-body">
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-lg-12">
                                    <table id="pdtCatSalesInventoryByDateTable"
                                        class="table table-hover table-bordered table-striped dt-responsive"
                                        width="100%">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Quantity Sold</th>
                                                <th>Total Sales</th>
                                                <th>Latest Inventory Count</th>
                                            </tr>
                                        </thead>
                                        <tbody id="pdtCatSalesInventoryByDateTableBody">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </section>
        </div>
    </section>
</div>

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/insights-functions.js"></script>
<script src="views/js/insights-inventory.js"></script>