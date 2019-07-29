<div class="content-wrapper">
    <section class="content-header">
        <h1>
            View Employees
            <small>Employee Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Employees</li>
        </ol>
    </section>
    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddEmployee">
                    Add Employee
                </button>
            </div>
            <div class="box-body">
                <div class="col-md-12" style="overflow-y: auto;">
                    <table class="table table-hover table-bordered table-striped dt-responsive tableEmployees"
                        width="100%">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Duty Location</th>
                                <th>Mobile Number</th>
                                <th>Designation</th>
                                <th class="none">Email</th>
                                <th class="none">Date Of Birth</th>
                                <th class="none">Address</th>
                                <th class="none">Postal Code</th>
                                <th class="none">Gender</th>
                                <th class="none">Nationality</th>
                                <th class="none">Phone Number</th>
                                <th class="none">Bank Name</th>
                                <th class="none">Bank Account Number</th>
                                <th class="none">Commencement Date</th>
                                <th class="none">Left Date</th>
                                <th class="none">Emergency Name</th>
                                <th class="none">Relationship</th>
                                <th class="none">Address</th>
                                <th class="none">Emergency Contact Number</th>
                                <th class="none">Username</th>
                                <th class="never">Person ID</th>
                                <th style="width: 40px;"><small>Edit</small></th>
                                <th style="width: 40px;"><small>Upload</small></th>
                                <th class="none" style="width: 40px;"><small>Delete</small></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </section>
</div>

<div id="modalAddEmployee" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add New Employee</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form id="addEmployeeForm" role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Profile Picture</p>
                        </div>
                        <div class="form-row">
                            <div class="col-md-2">
                                <img class="thumbnail preview" src="views/img/users/default/anonymous.png"
                                    width="100px">
                            </div>
                            <div class="col-md-10" style="padding-bottom: 30px;">
                                <input type="file" class="newProfilePhoto" name="newProfilePhoto">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Basic Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newFirstName">First Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newFirstName" name="newFirstName"
                                    placeholder="Given Name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newLastName">Last Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newLastName" name="newLastName"
                                    placeholder="Surname" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newChineseName">Chinese Name</label>
                                <input type="text" class="form-control" id="newChineseName" name="newChineseName"
                                    placeholder="Chinese Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newDateOfBirth">Date Of Birth</label>
                                <input type="text" class="form-control datepicker" id="newDateOfBirth"
                                    name="newDateOfBirth" style="background-color: white;">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newGender">Gender</label>
                                <select class="form-control" id="newGender" name="newGender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newNationality">Nationality</label>
                                <input type="text" class="form-control" id="newNationality" name="newNationality"
                                    placeholder="Nationality">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newDesignation">Designation</label>
                                <input type="text" class="form-control" id="newDesignation" name="newDesignation"
                                    placeholder="Designation">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newEmail">Email</label>
                                <input type="email" class="form-control" id="newEmail" name="newEmail"
                                    placeholder="Email" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newMobileNumber">Mobile Number&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newMobileNumber" name="newMobileNumber"
                                    placeholder="Mobile Number" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newPhoneNumber">Phone Number</label>
                                <input type="text" class="form-control" id="newPhoneNumber" name="newPhoneNumber"
                                    placeholder="Phone Number">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newAddress">Address</label>
                                <input type="text" class="form-control" id="newAddress" name="newAddress"
                                    placeholder="Address">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newPostalCode">Postal Code</label>
                                <input type="text" class="form-control" id="newPostalCode" name="newPostalCode"
                                    placeholder="Postal Code">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newDutyLocation">Duty Location</label>
                                <input type="text" class="form-control" id="newDutyLocation" name="newDutyLocation"
                                    placeholder="Duty Location">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newBankName">Bank Name</label>
                                <input type="text" class="form-control" id="newBankName" name="newBankName"
                                    placeholder="Bank Name">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newBankAccNum">Bank Account Number</label>
                                <input type="text" class="form-control" id="newBankAccNum" name="newBankAccNum"
                                    placeholder="Bank Account Number">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newCommencementDate">Commencement Date</label>
                                <input type="text" class="form-control datepicker" id="newCommencementDate"
                                    name="newCommencementDate" style="background-color: white;">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newLeftDate">Left Date</label>
                                <input type="text" class="form-control datepicker" id="newLeftDate" name="newLeftDate"
                                    style="background-color: white;">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newComments">Comments</label>
                                <input type="text" class="form-control" id="newComments" name="newComments"
                                    placeholder="Comments">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newRace">Race</label>
                                <select class="form-control select2" id="newRace" name="newRace">
                                    <option></option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Malay">Malay</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Eurasian">Eurasian</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <p style="font-size: 2em;">Emergency Contacts</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newEmergencyName">Name</label>
                                <input type="text" class="form-control" id="newEmergencyName" name="newEmergencyName"
                                    placeholder="Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newEmergencyRelationship">Relationship</label>
                                <input type="text" class="form-control" id="newEmergencyRelationship"
                                    name="newEmergencyRelationship" placeholder="Relationship">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newEmergencyAddress">Address</label>
                                <input type="text" class="form-control" id="newEmergencyAddress"
                                    name="newEmergencyAddress" placeholder="Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newEmergencyContact">Contact Number</label>
                                <input type="text" class="form-control" id="newEmergencyContact"
                                    name="newEmergencyContact" placeholder="Relationship">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <p style="font-size: 2em;">Login Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newUsername">Username&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newUsername" name="newUsername"
                                    placeholder="Username">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newPassword">Password&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="password" class="form-control" id="newPassword" name="newPassword"
                                    placeholder="Password">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <p style="font-size: 2em;">Company Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCompanySelection">Company Selection</label>
                                <select class="form-control select2" id="newCompanySelection" name="newCompanySelection"
                                    style="width: 100%;">
                                    <option></option>
                                    <option>Goldlink Asia Distribution Pte Ltd</option>
                                    <option>Goldlink Technologies Pte Ltd</option>
                                    <option>Doro International Pte Ltd</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newLevyAmount">Foreign Worker Levy</label>
                                <input type="number" class="form-control" id="newLevyAmount" min="0.00" step="0.01"
                                    value="0.00" name="newLevyAmount">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12">
                                <h4><strong>Store Selection</strong></h4>
                            </div>
                            <div id="newStoreEmployeeRepeater">
                                <div class="clearfix"></div>
                                <div class="items" data-group="stores_items">
                                    <div class="item-content">
                                        <div class="form-group">
                                            <div class="col-md-10 col-xs-9">
                                                <label for="newStoreSelections">Store&nbsp;&nbsp;<small
                                                        style="color:red;">*Required</small></label>
                                                <select class="form-control storeSelect2" style="width: 100%;"
                                                    data-skip-name="true" data-name="newStoreSelections[]" required>
                                                    <?php
                                                        $item = null;
                                                        $value = null;

                                                        $stores = StoreController::ctrViewAllStores($item, $value);

                                                        foreach ($stores as $key => $value) {
                                                            echo '<option value ="' . $value["store_id"] . '">' . $value["store_name"] . '</option>';
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                            <div class="col-md-2 col-xs-3" align="right" style="margin-top: 24px;">
                                                <button id="remove-btn" class="btn btn-block btn-danger"
                                                    onclick="$(this).parents('.items').remove()"><i
                                                        class="fa fa-minus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <div class="repeater-heading col-xs-12" align="center">
                                        <button type="button" style="margin-top: 24px;"
                                            class="btn btn-success repeater-add-btn"><i
                                                class="fa fa-plus"></i>&nbsp;&nbsp;Add
                                            Store</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <p style="font-size: 2em; margin-top: 24px;">Staff Permissions</p>
                        </div>
                        <div class="form-row">
                            <div class="col-md-12">
                                <h4><strong>Employee Management</strong></h4>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[0]" value="0">
                                <input type="checkbox" class="minimal" id="newEmployeeManagement"
                                    name="allowedModulesSelection[0]" value="1">
                                <input type="hidden" name="allowedModules[0]" value="employee-management">
                                <p style="margin-top: 5px;">View/Create/Update/Delete Employee Information</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[1]" value="0">
                                <input type="checkbox" class="minimal" id="newEmployeeUploadFiles"
                                    name="allowedModulesSelection[1]" value="1">
                                <input type="hidden" name="allowedModules[1]" value="employee-upload-files">
                                <p style="margin-top: 5px;">Upload Employee Documents</p>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12">
                                <h4><strong>Payroll Management</strong></h4>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[2]" value="0">
                                <input type="checkbox" class="minimal" id="newSalaryVoucherMgt"
                                    name="allowedModulesSelection[2]" value="1">
                                <input type="hidden" name="allowedModules[2]"
                                    value="employee-salary-voucher-management">

                                <p style="margin-top: 5px;">View/Update/Approve/Reject/Download <strong>ALL</strong>
                                    Salary Vouchers</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[3]" value="0">
                                <input type="checkbox" class="minimal" id="newSalaryVoucherMgtPT"
                                    name="allowedModulesSelection[3]" value="1">
                                <input type="hidden" name="allowedModules[3]"
                                    value="employee-salary-voucher-management-pt">

                                <p style="margin-top: 5px;">View/Update/Approve/Reject/Download
                                    <strong>ALL</strong>
                                    Salary Vouchers (PT)</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[4]" value="0">
                                <input type="checkbox" class="minimal" id="newViewOwnSalaryVoucher"
                                    name="allowedModulesSelection[4]" value="1">
                                <input type="hidden" name="allowedModules[4]" value="employee-salary-voucher-my">

                                <p style="margin-top: 5px;">View <strong>OWN</strong> Salary Vouchers</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[5]" value="0">
                                <input type="checkbox" class="minimal" id="newViewOwnSalaryVoucherPT"
                                    name="allowedModulesSelection[5]" value="1">
                                <input type="hidden" name="allowedModules[5]" value="employee-salary-voucher-my-pt">

                                <p style="margin-top: 5px;">View <strong>OWN</strong> Salary Vouchers (PT)</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[6]" value="0">
                                <input type="checkbox" class="minimal" id="newDownloadOwnSalaryVoucher"
                                    name="allowedModulesSelection[6]" value="1">
                                <input type="hidden" name="allowedModules[6]" value="employee-salary-voucher-download">

                                <p style="margin-top: 5px;">Download <strong>OWN</strong> Salary Vouchers</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[5]" value="0">
                                <input type="checkbox" class="minimal" id="newSubmitOwnSalaryVoucher"
                                    name="allowedModulesSelection[5]" value="1">
                                <input type="hidden" name="allowedModules[5]" value="employee-salary-voucher-submit">

                                <p style="margin-top: 5px;">Submit <strong>OWN</strong> Salary Vouchers (FT)</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="allowedModulesSelection[8]" value="0">
                                <input type="checkbox" class="minimal" id="newSubmitOwnSalaryVoucherPT"
                                    name="allowedModulesSelection[8]" value="1">
                                <input type="hidden" name="allowedModules[8]" value="employee-salary-voucher-submit-pt">

                                <p style="margin-top: 5px;">Submit <strong>OWN</strong> Salary Vouchers (PT)</p>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12">
                                <h4><strong>Customer Management</strong></h4>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="newAllowedModulesSelection[9]" value="0">
                                <input type="checkbox" class="minimal" id="newCustomerManagement"
                                    name="newAllowedModulesSelection[9]" value="1">
                                <input type="hidden" name="allowedModules[9]" value="customer-management">

                                <p style="margin-top: 5px;">View/Update <strong>ALL</strong> Customers</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="newAllowedModulesSelection[10]" value="0">
                                <input type="checkbox" class="minimal" id="newViewCustomerArchives"
                                    name="newAllowedModulesSelection[10]" value="1">
                                <input type="hidden" name="allowedModules[10]" value="customer-archives">

                                <p style="margin-top: 5px;">View/Update Customer Archives</p>
                            </div>
                            <div class="form-group col-md-6">
                                <input type="hidden" name="newAllowedModulesSelection[11]" value="0">
                                <input type="checkbox" class="minimal" id="newCustomerAnalytics"
                                    name="newAllowedModulesSelection[11]" value="1">
                                <input type="hidden" name="allowedModules[11]" value="customer-analytics">

                                <p style="margin-top: 5px;">View Customer Analytics</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary addEmployeeButton">Save</button>
            </div>

            <?php
                $createEmployee = new EmployeeController();
                $createEmployee->ctrCreateEmployee();
                $createEmployee->ctrDeleteEmployee();
            ?>
            </form>

        </div>
    </div>
</div>


<div id="modalEditEmployee" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Edit Employee</h4>
            </div>

            <ul class="nav nav-tabs" id="tabContent">
                <li class="active"><a href="#editProfilePictureTab" data-toggle="tab">Profile Picture</a></li>
                <li><a href="#editInformationTab" data-toggle="tab">Information</a></li>
                <li><a href="#editCompanyTab" data-toggle="tab">Company</a></li>
                <li><a href="#editAccountTab" data-toggle="tab">Account</a></li>
                <li><a href="#editPermissionsTab" data-toggle="tab">Permissions</a></li>
            </ul>
            <form id="editEmployeeForm" role="form" method="POST" enctype="multipart/form-data">

                <div class="tab-content">
                    <div class="tab-pane active" id="editProfilePictureTab">
                        <div class="modal-body">
                            <div class="box-body">
                                <input type="hidden" id="editEmployeeId" name="editEmployeeId" value="" />
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Profile Picture</p>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-2">
                                        <img class="thumbnail preview" src="views/img/users/default/anonymous.png"
                                            width="100px">
                                    </div>
                                    <div class="col-md-10" style="padding-bottom: 30px;">
                                        <input type="file" class="editProfilePhoto" name="editProfilePhoto">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary postButton">Update</button>
                        </div>
                    </div>
                    <div class="tab-pane" id="editInformationTab">
                        <div class="modal-body">
                            <div class="box-body">
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Basic Information</p>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editFirstName">First Name&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="text" class="form-control" id="editFirstName" name="editFirstName"
                                            required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editLastName">Last Name&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="text" class="form-control" id="editLastName" name="editLastName"
                                            required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editChineseName">Chinese Name</label>
                                        <input type="text" class="form-control" id="editChineseName"
                                            name="editChineseName">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editDateOfBirth">Date Of Birth</label>
                                        <input type="text" class="form-control datepicker" id="editDateOfBirth"
                                            name="editDateOfBirth" style="background-color: white;">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editGender">Gender</label>
                                        <select class="form-control" id="editGender" name="editGender">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editNationality">Nationality</label>
                                        <input type="text" class="form-control" id="editNationality"
                                            name="editNationality">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editDesignation">Designation</label>
                                        <input type="text" class="form-control" id="editDesignation"
                                            name="editDesignation">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editEmail">Email&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="email" class="form-control" id="editEmail" name="editEmail"
                                            required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editMobileNumber">Mobile Number&nbsp;&nbsp;<small
                                                style="color:red;">*Required</small></label>
                                        <input type="text" class="form-control" id="editMobileNumber"
                                            name="editMobileNumber" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editPhoneNumber">Phone Number</label>
                                        <input type="text" class="form-control" id="editPhoneNumber"
                                            name="editPhoneNumber">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editAddress">Address</label>
                                        <input type="text" class="form-control" id="editAddress" name="editAddress">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editPostalCode">Postal Code</label>
                                        <input type="text" class="form-control" id="editPostalCode"
                                            name="editPostalCode">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editDutyLocation">Duty Location</label>
                                        <input type="text" class="form-control" id="editDutyLocation"
                                            name="editDutyLocation">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editBankName">Bank Name</label>
                                        <input type="text" class="form-control" id="editBankName" name="editBankName">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editBankAccNum">Bank Account Number</label>
                                        <input type="text" class="form-control" id="editBankAccNum"
                                            name="editBankAccNum">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editCommencementDate">Commencement Date</label>
                                        <input type="text" class="form-control datepicker" id="editCommencementDate"
                                            name="editCommencementDate" style="background-color: white;">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editLeftDate">Left Date</label>
                                        <input type="text" class="form-control datepicker" id="editLeftDate"
                                            name="editLeftDate" style="background-color: white;">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editComments">Comments</label>
                                        <input type="text" class="form-control" id="editComments" name="editComments">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editRace">Race</label>
                                        <select class="form-control select2" id="editRace" name="editRace">
                                            <option></option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Malay">Malay</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Eurasian">Eurasian</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Emergency Contacts</p>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editEmergencyName">Name</label>
                                        <input type="text" class="form-control" id="editEmergencyName"
                                            name="editEmergencyName">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editEmergencyRelationship">Relationship</label>
                                        <input type="text" class="form-control" id="editEmergencyRelationship"
                                            name="editEmergencyRelationship">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editEmergencyAddress">Address</label>
                                        <input type="text" class="form-control" id="editEmergencyAddress"
                                            name="editEmergencyAddress">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editEmergencyContact">Contact Number</label>
                                        <input type="text" class="form-control" id="editEmergencyContact"
                                            name="editEmergencyContact">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                    <div class="tab-pane" id="editCompanyTab">
                        <div class="modal-body">
                            <div class="box-body">
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Company Information</p>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editCompanySelection">Company Selection</label>
                                        <select class="form-control select2" id="editCompanySelection"
                                            name="editCompanySelection" style="width: 100%;">
                                            <option></option>
                                            <option>Goldlink Asia Distribution Pte Ltd</option>
                                            <option>Goldlink Technologies Pte Ltd</option>
                                            <option>Doro International Pte Ltd</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editLevyAmount">Foreign Worker Levy</label>
                                        <input type="number" class="form-control" id="editLevyAmount" min="0.00"
                                            step="0.01" value="0.00" name="editLevyAmount">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <h4><strong>Store Selection</strong></h4>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group">
                                                <div id="appendDynamicStoreData">
                                                </div>
                                            </div>
                                        </div>

                                        <div id="editStoreEmployeeRepeater">
                                            <div class="clearfix"></div>
                                            <div class="items" data-group="stores_items">
                                                <div class="item-content">
                                                    <div class="form-group">
                                                        <div class="col-md-10 col-xs-9">
                                                            <label for="editStoreSelections">Store&nbsp;&nbsp;<small
                                                                    style="color:red;">*Required</small></label>
                                                            <select class="form-control storeSelect2"
                                                                style="width: 100%;" data-skip-name="true"
                                                                data-name="editStoreSelections[]" required>
                                                                <?php
                                                                    $item = null;
                                                                    $value = null;

                                                                    $stores = StoreController::ctrViewAllStores($item, $value);

                                                                    foreach ($stores as $key => $value) {
                                                                        echo '<option value ="' . $value["store_id"] . '">' . $value["store_name"] . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-2 col-xs-3" align="right"
                                                            style="margin-top: 24px;">
                                                            <button id="remove-btn" class="btn btn-block btn-danger"
                                                                onclick="$(this).parents('.items').remove()"><i
                                                                    class="fa fa-minus"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-12">
                                                <div class="repeater-heading col-xs-12" align="center">
                                                    <button type="button" style="margin-top: 24px;"
                                                        class="btn btn-success repeater-add-btn"><i
                                                            class="fa fa-plus"></i>&nbsp;&nbsp;Add
                                                        Store</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                    <div class="tab-pane" id="editAccountTab">
                        <div class="modal-body">
                            <div class="box-body">
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Login Information</p>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="editUsername">Username</label>
                                        <input type="text" class="form-control" id="editUsername" name="editUsername">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="editPassword">Password</label>
                                        <input type="password" class="form-control" id="editPassword"
                                            name="editPassword" value="" readonly>
                                    </div>
                                </div>
                                <div class="form-group col-md-6 pull-right">
                                    <input type="hidden" class="editPasswordSelection" name='editPasswordSelection'
                                        value="0" />
                                    <input type="checkbox" class="minimal" id="editPasswordSelection">&nbsp;&nbsp;Change
                                    Password
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                    <div class="tab-pane" id="editPermissionsTab">
                        <div class="modal-body">
                            <div class="box-body">
                                <div class="col-md-12">
                                    <p style="font-size: 2em;">Staff Permissions</p>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <h4><strong>Employee Management</strong></h4>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[0]" value="0">
                                        <input type="checkbox" class="minimal" id="editEmployeeManagement"
                                            name="editAllowedModulesSelection[0]" value="1">
                                        <input type="hidden" name="allowedModules[0]" value="employee-management">
                                        <p style="margin-top: 5px;">View/Create/Update/Delete Employee Information</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[1]" value="0">
                                        <input type="checkbox" class="minimal" id="editEmployeeUploadFiles"
                                            name="editAllowedModulesSelection[1]" value="1">
                                        <input type="hidden" name="allowedModules[1]" value="employee-upload-files">
                                        <p style="margin-top: 5px;">Upload Employee Documents</p>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-md-12">
                                        <h4><strong>Payroll Management</strong></h4>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[2]" value="0">
                                        <input type="checkbox" class="minimal" id="editSalaryVoucherMgt"
                                            name="editAllowedModulesSelection[2]" value="1">
                                        <input type="hidden" name="allowedModules[2]"
                                            value="employee-salary-voucher-management">

                                        <p style="margin-top: 5px;">View/Update/Approve/Reject/Download
                                            <strong>ALL</strong>
                                            Salary Vouchers</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[3]" value="0">
                                        <input type="checkbox" class="minimal" id="editSalaryVoucherMgtPT"
                                            name="editAllowedModulesSelection[3]" value="1">
                                        <input type="hidden" name="allowedModules[3]"
                                            value="employee-salary-voucher-management-pt">

                                        <p style="margin-top: 5px;">View/Update/Approve/Reject/Download
                                            <strong>ALL</strong>
                                            Salary Vouchers (PT)</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[4]" value="0">
                                        <input type="checkbox" class="minimal" id="editViewOwnSalaryVoucher"
                                            name="editAllowedModulesSelection[4]" value="1">
                                        <input type="hidden" name="allowedModules[4]"
                                            value="employee-salary-voucher-my">

                                        <p style="margin-top: 5px;">View <strong>OWN</strong> Salary Vouchers (FT)</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[5]" value="0">
                                        <input type="checkbox" class="minimal" id="editViewOwnSalaryVoucherPT"
                                            name="editAllowedModulesSelection[5]" value="1">
                                        <input type="hidden" name="allowedModules[5]"
                                            value="employee-salary-voucher-my-pt">

                                        <p style="margin-top: 5px;">View <strong>OWN</strong> Salary Vouchers (PT)</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[6]" value="0">
                                        <input type="checkbox" class="minimal" id="editDownloadOwnSalaryVoucher"
                                            name="editAllowedModulesSelection[6]" value="1">
                                        <input type="hidden" name="allowedModules[6]"
                                            value="employee-salary-voucher-download">

                                        <p style="margin-top: 5px;">Download <strong>OWN</strong> Salary Vouchers</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[7]" value="0">
                                        <input type="checkbox" class="minimal" id="editSubmitOwnSalaryVoucher"
                                            name="editAllowedModulesSelection[7]" value="1">
                                        <input type="hidden" name="allowedModules[7]"
                                            value="employee-salary-voucher-submit">

                                        <p style="margin-top: 5px;">Submit <strong>OWN</strong> Salary Vouchers (FT)</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[8]" value="0">
                                        <input type="checkbox" class="minimal" id="editSubmitOwnSalaryVoucherPT"
                                            name="editAllowedModulesSelection[8]" value="1">
                                        <input type="hidden" name="allowedModules[8]"
                                            value="employee-salary-voucher-submit-pt">

                                        <p style="margin-top: 5px;">Submit <strong>OWN</strong> Salary Vouchers (PT)</p>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="col-md-12">
                                        <h4><strong>Customer Management</strong></h4>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[9]" value="0">
                                        <input type="checkbox" class="minimal" id="editCustomerManagement"
                                            name="editAllowedModulesSelection[9]" value="1">
                                        <input type="hidden" name="allowedModules[9]" value="customer-management">

                                        <p style="margin-top: 5px;">View/Update <strong>ALL</strong> Customers</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[10]" value="0">
                                        <input type="checkbox" class="minimal" id="editCustomerArchives"
                                            name="editAllowedModulesSelection[10]" value="1">
                                        <input type="hidden" name="allowedModules[10]" value="customer-archives">

                                        <p style="margin-top: 5px;">View/Update Customer Archives</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="editAllowedModulesSelection[11]" value="0">
                                        <input type="checkbox" class="minimal" id="editCustomerAnalytics"
                                            name="editAllowedModulesSelection[11]" value="1">
                                        <input type="hidden" name="allowedModules[11]" value="customer-analytics">

                                        <p style="margin-top: 5px;">View Customer Analytics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary editEmployeeButton">Update</button>
                        </div>
                    </div>
                    <?php
                        $createEmployee = new EmployeeController();
                        $createEmployee->ctrEditEmployee();
                    ?>
                </div>
            </form>

        </div>
    </div>
</div>