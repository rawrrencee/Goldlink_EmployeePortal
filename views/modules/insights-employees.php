<style>
.select2-selection--multiple .select2-search__field {
    width: 100% !important;
}
</style>


<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Insights
            <small>Employees</small>
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
        <div class="box">
            <div class="box-header with-border">
                <div class="col-md-12 col-xs-12">
                    <i class="fa fa-user" style="display: inline-block; margin-right: 10px; margin-top: 5px;"></i>
                    <h4 style="display: inline;">
                        Employee Sales Performance
                    </h4>
                </div>
                <div class="col-md-12 col-xs-12">
                    <div class="box-tools pull-right">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddEmployeeSalesTarget">
                            Add Target
                        </button>
                    </div>
                </div>
            </div>
            <div class="box-body">

                <div class="col-md-12 col-xs-12">
                    <div class="col-md-12 col-xs-12">
                        <button id="filterEmployeeSalesChartsButtonDown" class="btn btn-default pull-right">Filter <i
                                class="fa fa-angle-down"></i></button>
                        <button id="filterEmployeeSalesChartsButtonUp" class="btn btn-default pull-right">Filter <i
                                class="fa fa-angle-up"></i></button>
                    </div>
                    <div id="filterStoreOfSalesTarget" class="col-md-3 col-xs-12 pull-right" style="padding-top: 5px;">
                        <h5>Store</h5>
                        <button id="selectAllFilterStoreOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetStoreOfSalesFilter" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist" style="height: 300px; overflow-y: scroll;">
                            <ul id="filterEmployeeSalesPerformanceByStore">
                            </ul>
                        </div>
                    </div>
                    <div id="filterYearOfSalesTarget" class="col-md-3 col-xs-6 pull-right" style="padding-top: 5px;">
                        <h5>Year</h5>
                        <button id="selectAllFilterYearOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetYearOfSalesFilter" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist" style="height: 300px; overflow-y: scroll;">
                            <ul id="filterEmployeeSalesPerformanceByYear">
                            </ul>
                        </div>
                    </div>
                    <div id="filterMonthOfSalesTarget" class="col-md-3 col-xs-6 pull-right" style="padding-top: 5px;">
                        <h5>Month</h5>
                        <button id="selectAllFilterMonthOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetMonthOfSalesFilter" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist" style="height: 300px; overflow-y: scroll;">
                            <ul id="filterEmployeeSalesPerformanceByMonth">
                            </ul>
                        </div>
                    </div>
                    <div id="divRetrieveSalesPerformanceWithFilters" class="col-md-4 col-xs-12 pull-right">
                        <button id="retrieveSalesPerformanceWithFilters"
                            class="btn btn-info pull-right">Retrieve</button>
                    </div>

                </div>

                <div id="employeeSalesTargetList" class="col-md-12 col-xs-12" style="margin-top: 10px;">
                </div>
            </div>
        </div>

    </section>
</div>


<div id="modalAddEmployeeSalesTarget" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add Sales Target</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <div id="selectedEmployeeForSalesTarget" class="col-md-12 col-xs-12">
                    </div>
                    <div class="col-md-12 col-xs-12">
                        <label for="newEmployeeSalesTargetSelection">Select Employee(s)</label>
                        <select class="form-control input-md select2" id="newEmployeeSalesTargetSelection"
                            name="newEmployeeSalesTargetSelection" multiple style="width: 100%;">
                            <?php
                                $activeEmployees = EmployeeController::ctrViewActiveEmployees();

                                foreach($activeEmployees as $employee => $employeeData) {
                                    echo '<option value="'.$employeeData['person_id'].'">'.$employeeData['first_name'].' '.$employeeData['last_name'].'</option>';
                                }
                            ?>
                        </select>
                    </div>
                    <div class="col-md-12 col-xs-12" style="margin-top: 10px;">
                        <button id="selectNewSalesTargetFilterButtonDown" class="btn btn-default">Select
                            Store/Month/Year <i class="fa fa-angle-down"></i></button>
                        <button id="selectNewSalesTargetFilterButtonUp" class="btn btn-default">Select Store/Month/Year
                            <i class="fa fa-angle-up"></i></button>
                    </div>
                    <div id="selectStoreOfSalesTarget" class="col-md-12 col-xs-12">
                        <h5><b>Store</b></h5>
                        <button id="selectAllStoreOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetStoreOfSalesTargetSelection" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist" style="height: 300px; overflow-y: scroll;">
                            <ul id="storeOfSalesTargetList">
                            </ul>
                        </div>
                    </div>
                    <div id="selectMonthOfSalesTarget" class="col-md-6 col-xs-6" style="padding-top: 20px;">
                        <h5><b>Month</b></h5>
                        <button id="selectAllMonthOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetMonthOfSalesTargetSelection" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist">
                            <ul id="monthOfSalesTargetList">
                            </ul>
                        </div>

                    </div>
                    <div id="selectYearOfSalesTarget" class="col-md-6 col-xs-6" style="padding-top: 20px;">
                        <h5><b>Year</b></h5>
                        <button id="selectAllYearOfSalesTarget" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Select All</button>
                        <button id="resetYearOfSalesTargetSelection" type="button" class="btn btn-sm btn-info"
                            style="margin-top: 5px; margin-btm: 5px;">Reset</button>
                        <div class="customlist">
                            <ul id="yearOfSalesTargetList">
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-12 col-xs-12">
                        <button id="retrieveSalesTarget" type="button" class="btn btn-primary"
                            style="width: 100%; margin-top: 10px; margin-btm: 10px;">Retrieve</button>
                    </div>
                    <div id="updateSalesTarget" class="col-md-12 col-xs-12 pull-right"
                        style="padding-top: 20px; padding-btm: 20px;">
                    </div>
                    <div id="updateSalesTargetButtonDiv" class="col-md-4 col-xs-12 pull-right"
                        style="padding-top: 20px; padding-btm: 20px;">
                        <button id="updateSalesTargetButton" type="button" class="btn btn-success"
                            style="width: 100%; margin-top: 10px; margin-btm: 10px;">Update</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="modalViewEmployeeSales" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">View Employee Sales</h4>
            </div>


            <div class="modal-body">
                <div class="box-body">

                    <div class="row">
                        <div id="displayEmployeeSalesModalDataMsg" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5 class="text-center text-info">Displaying sales for: Employee
                            </h5>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 20px;">
                            <h3 class="text-center"><b>Items</b></h3>
                        </div>
                    </div>
                    <hr />
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <table id="employeeItemSalesTable"
                                class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                <thead>
                                    <tr>
                                        <th width="15%;">Date</th>
                                        <th width="25%;">Item Name</th>
                                        <th width="20%;">Item Number</th>
                                        <th width="10%;">Item Category</th>
                                        <th width="10%;">Unit Price</th>
                                        <th width="10%;">Quantity</th>
                                        <th width="10%;">Total Sales</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeItemSalesTableBody">
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 20px;">
                            <h3 class="text-center"><b>Item Kits</b></h3>
                        </div>
                    </div>
                    <hr />

                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <table id="employeeItemKitSalesTable"
                                class="table table-hover table-bordered table-striped dt-responsive" width="100%">
                                <thead>
                                    <tr>
                                        <th width="15%;">Date</th>
                                        <th width="25%;">Item Kit Name</th>
                                        <th width="20%;">Item Kit Number</th>
                                        <th width="10%;">Item Kit Category</th>
                                        <th width="10%;">Unit Price</th>
                                        <th width="10%;">Quantity</th>
                                        <th width="10%;">Total Sales</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeItemKitSalesTableBody">
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            </div>

        </div>
    </div>
</div>

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/insights-functions.js"></script>
<script src="views/js/insights-employees.js"></script>