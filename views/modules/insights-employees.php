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
                    <div id="selectMonthOfSalesTarget" class="col-md-6 col-xs-6" style="padding-top: 20px;">
                        <h5>Month</h5>
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
                        <h5>Year</h5>
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
                    <div id="updateSalesTarget" class="col-md-4 col-xs-12 pull-right"
                        style="padding-top: 20px; padding-btm: 20px;">
                    </div>
                    <div id="updateSalesTargetButtonDiv" class="col-md-12 col-xs-12" style="padding-top: 20px; padding-btm: 20px;">
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