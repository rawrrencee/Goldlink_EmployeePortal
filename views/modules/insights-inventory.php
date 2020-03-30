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

                <div class="nav-tabs-custom">
                    <!-- Tabs within a box -->
                    <ul class="nav nav-tabs pull-right">
                        <li><a href="#top100pdtCatSalesInventory" data-toggle="tab">Top 100</a></li>
                        <li class="active"><a href="#top10pdtCatSalesInventory" data-toggle="tab">Top 10</a></li>
                        <li class="pull-left header"><i class="fa fa-inbox"></i>&nbsp;Product Category (Sales &
                            Inventory)</li>
                    </ul>
                    <div class="tab-content no-padding">
                        <div class="row" style="margin-top: 20px; margin-left: 10px; margin-right: 10px;">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <button id="filterPdtCatSalesInventoryByDateButtonDown"
                                    class="btn btn-default pull-right" style="width: 100%;">Filter <i
                                        class="fa fa-angle-down"></i></button>
                                <button id="filterPdtCatSalesInventoryByDateButtonUp" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-up"></i></button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px; margin-left: 10px;">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <div id="currentFilterPdtCatSalesInventoryByDatePeriodMsg"></div>
                            </div>
                        </div>
                        <div id="filterPdtCatSalesInventoryByDate"
                            style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="pdtCatSalesInventoryEndDate">End Date:</label>
                                    <input type="text" id="pdtCatSalesInventoryEndDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="pdtCatSalesInventoryStartDate">Start Date:</label>
                                    <input type="text" id="pdtCatSalesInventoryStartDate"
                                        class="form-control datepicker" style="background-color: white;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-xs-12 pull-right">
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
                        <div class="tab-pane active" id="top10pdtCatSalesInventory">
                            <div class="box-body">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-lg-12">
                                        <canvas id="pdtCatSalesInventoryChartTop10" height="400"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="top100pdtCatSalesInventory">
                            <div class="box-body">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-lg-12">
                                        <div class="chart-container" style="height:40vh; width:100%">
                                            <canvas id="pdtCatSalesInventoryChartTop100" height="400"></canvas>
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
                                                <th>Quantity</th>
                                                <th>Total Sales</th>
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
<script src="views/js/insights-inventory.js"></script>