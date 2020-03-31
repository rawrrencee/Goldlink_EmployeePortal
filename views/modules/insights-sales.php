<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Insights
            <small>Sales</small>
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
            <section class="col-lg-12 col-md-12 col-xs-12 connectedSortable">

                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Total Sales by Store</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <button id="filterTotalSalesByDateButtonDown" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-down"></i></button>
                                <button id="filterTotalSalesByDateButtonUp" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-up"></i></button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <div id="currentFilterTotalSalesByStoreDatePeriodMsg"></div>
                            </div>
                        </div>
                        <div id="filterTotalSalesByStoreByDate"
                            style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="totalSalesByStoreEndDate">End Date:</label>
                                    <input type="text" id="totalSalesByStoreEndDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="totalSalesByStoreStartDate">Start Date:</label>
                                    <input type="text" id="totalSalesByStoreStartDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-xs-12 pull-right">
                                    <div id="filterTotalSalesByStoreByDateMsg"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <button id="totalSalesByStoreFilterApply" type="button"
                                        class="btn btn-info pull-right" style="margin-top: 10px;">Apply</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12" style="margin-top: 20px;">
                                <h3 class="text-center"><b>Sales by Store</b></h3>
                            </div>
                            <div id="displayTotalSalesByStoreDataMsg" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h5 class="text-center text-info">Displaying sales for <b>all stores</b>
                                </h5>
                            </div>
                        </div>
                        <hr/>

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6">
                                <canvas id="totalSalesByStoreBar" height="400"></canvas>
                            </div>
                            <div class="col-lg-6">
                                <table id="totalSalesByStoreTable"
                                    class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Item/Item Kit Name</th>
                                            <th>Category</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Total Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody id="totalSalesByStoreTableBody">
                                        <td colspan="5" class="text-center">Select a store on the chart to view items sold.</td>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Total Sales by Product</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <button id="filterTotalProductSalesByDateButtonDown" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-down"></i></button>
                                <button id="filterTotalProductSalesByDateButtonUp" class="btn btn-default pull-right"
                                    style="width: 100%;">Filter <i class="fa fa-angle-up"></i></button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6 col-md-6 col-xs-12 pull-right">
                                <div id="currentFilterTotalSalesByProductDatePeriodMsg"></div>
                            </div>
                        </div>
                        <div id="filterTotalProductSalesByDate"
                            style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="totalProductSalesByEndDate">End Date:</label>
                                    <input type="text" id="totalProductSalesByEndDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <label for="totalProductSalesByStartDate">Start Date:</label>
                                    <input type="text" id="totalProductSalesByStartDate" class="form-control datepicker"
                                        style="background-color: white;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-xs-12 pull-right">
                                    <div id="filterTotalProductSalesByDateMsg"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-xs-6 pull-right">
                                    <button id="totalProductSalesByDateFilterApply" type="button"
                                        class="btn btn-info pull-right" style="margin-top: 10px;">Apply</button>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div class="row">
                            <div class="col-lg-12" style="margin-top: 20px;">
                                <h3 class="text-center"><b>Items</b></h3>
                            </div>
                        </div>
                        <hr />

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6">
                                <canvas id="totalItemSalesByDateBar" height="400"></canvas>
                            </div>
                            <div class="col-lg-6">

                                <table id="totalItemSalesByDateTable"
                                    class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Item Category</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Total Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody id="totalItemSalesByDateTableBody">
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <hr />

                        <div class="row">
                            <div class="col-lg-12" style="margin-top: 20px;">
                                <h3 class="text-center"><b>Item Kits</b></h3>
                            </div>
                        </div>
                        <hr />

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6">
                                <canvas id="totalItemKitSalesByDateBar" height="400"></canvas>
                            </div>
                            <div class="col-lg-6">

                                <table id="totalItemKitSalesByDateTable"
                                    class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Item Kit Name</th>
                                            <th>Item Kit Category</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Total Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody id="totalItemKitSalesByDateTableBody">
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <hr />

                        <div class="row">
                            <div class="col-lg-12" style="margin-top: 20px;">
                                <h3 class="text-center"><b>Categories</b></h3>
                            </div>
                        </div>
                        <hr />

                        <div class="row" style="margin-top: 10px;">
                            <div class="col-lg-6">
                                <canvas id="totalCategorySalesByDateBar" height="400"></canvas>
                            </div>
                            <div class="col-lg-6">

                                <table id="totalCategorySalesByDateTable"
                                    class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Total Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody id="totalCategorySalesByDateTableBody">
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    </section>
</div>

</div>

<script src="views/js/insights-sales.js"></script>