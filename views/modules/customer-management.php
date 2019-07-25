<div class="content-wrapper">
    <section class="content-header">
        <h1>
            View Customers
            <small>Customer Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Customers</li>
        </ol>
    </section>
    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <div class="col-md-2 col-xs-12">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddCustomer">
                        Add Customer
                    </button>
                </div>
                <div class="col-md-10 col-xs-12">
                    <div class="box-tools pull-right">
                        <span>Filter by store:</span>
                        <select id="dataTablesFilterCustomersByStore" class="select2">
                            <?php
                            $item = null;
                            $value = null;

                            $stores = StoreController::ctrViewAllStores($item, $value);

                            foreach ($stores as $key => $value) {
                                echo '<option value ="' . $value["store_name"] . '">' . $value["store_name"] . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="box-body">
                <div class="col-md-12" style="overflow-y: auto;">
                    <table class="table table-hover table-bordered table-striped dt-responsive tableCustomers"
                        width="100%">
                        <thead>
                            <tr>
                                <th>Store</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Create Date</th>
                                <th class="none">Birthday</th>
                                <th class="none">Discount</th>
                                <th class="none">Chinese Name</th>
                                <th class="none">Gender</th>
                                <th class="none">NRIC</th>
                                <th class="none">Title</th>
                                <th class="none">Designation</th>
                                <th class="none">Phone Number</th>
                                <th class="none">Address</th>
                                <th class="none">Postal Code</th>
                                <th class="none">Nationality</th>
                                <th class="none">Company Name</th>
                                <th class="none">Account Number</th>
                                <th class="none">Preferred Contact</th>
                                <th class="none">Modify Date</th>
                                <th class="none">Modify By</th>
                                <th class="none">Comments</th>
                                <th class="never">Person ID</th>
                                <th style="width: 40px;"><small>Edit</small></th>
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

<div id="modalAddCustomer" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add New Customer</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Customer Picture</p>
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
                            <div class="form-group col-md-2">
                                <label for="newTitle">Title&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control" id="newTitle" name="newTitle" style="width: 100%;"
                                    required>
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
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
                                <label for="newCustomerNRIC">NRIC</label>
                                <input type="text" class="form-control" id="newCustomerNRIC" name="newCustomerNRIC"
                                    placeholder="Customer NRIC">
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
                                <label for="newDateOfBirth">Date Of Birth</label>
                                <input type="text" class="form-control" id="newDateOfBirth" name="newDateOfBirth"
                                    style="background-color: white;">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newEmail">Email</label>
                                <input type="email" class="form-control" id="newEmail" name="newEmail"
                                    placeholder="Email">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newNationality">Nationality</label>
                                <input type="text" class="form-control" id="newNationality" name="newNationality"
                                    placeholder="Nationality">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newMobileNumber">Mobile Number</label>
                                <input type="text" class="form-control" id="newMobileNumber" name="newMobileNumber"
                                    placeholder="Mobile Number">
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
                                <label for="newCompanyName">Company Name</label>
                                <input type="text" class="form-control" id="newCompanyName" name="newCompanyName"
                                    placeholder="Company Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newDesignation">Designation</label>
                                <input type="text" class="form-control" id="newDesignation" name="newDesignation"
                                    placeholder="Designation">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newPreferredContact">Preferred Contact</label>
                                <select class="form-control" style="width: 100%;" id="newPreferredContact"
                                    name="newPreferredContact">
                                    <option selected>None</option>
                                    <option>Email</option>
                                    <option>Phone</option>
                                    <option>Letter</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newDiscount">Discount</label>
                                <div class="input-group">
                                    <input type="number" min="0" step="0.01" class="form-control" id="newDiscount"
                                        name="newDiscount" placeholder="Discount">
                                    <span class="input-group-addon"><i class="fa fa-percent"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newStoreSelection">Origin Store</label>
                                <select id="newStoreSelection" class="form-control" name="newStoreSelection">
                                    <?php
                                    $item = null;
                                    $value = null;

                                    $stores = StoreController::ctrViewAllStores($item, $value);

                                    foreach ($stores as $key => $value) {
                                        echo '<option value="' . $value['store_code'] . '">' . $value['store_name'] . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newComments">Comments</label>
                                <input type="text" name="newComments" class="form-control" id="newComments"
                                    placeholder="Comments">
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>

            <?php
            $createCustomer = new CustomerController();
            $createCustomer->ctrCreateCustomer();
            ?>
            </form>

        </div>
    </div>
</div>


<div id="modalEditCustomer" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Edit Customer</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form role="form" method="POST" enctype="multipart/form-data">
                        <input type="hidden" id="editCustomerId" name="editCustomerId" value="" />
                        <input type="hidden" id="editCustomerPersonnelId" name="editCustomerPersonnelId"
                            value="<?php echo $_SESSION['person_id'] ?>" />
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Customer Picture</p>
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
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Basic Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="editTitle">Title&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <select class="form-control" id="editTitle" name="editTitle" style="width: 100%;"
                                    required>
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="editFirstName">First Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="editFirstName" name="editFirstName"
                                    placeholder="Given Name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editLastName">Last Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="editLastName" name="editLastName"
                                    placeholder="Surname" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editChineseName">Chinese Name</label>
                                <input type="text" class="form-control" id="editChineseName" name="editChineseName"
                                    placeholder="Chinese Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editCustomerNRIC">NRIC</label>
                                <input type="text" class="form-control" id="editCustomerNRIC" name="editCustomerNRIC"
                                    placeholder="Customer NRIC">
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
                                <label for="editDateOfBirth">Date Of Birth</label>
                                <input type="text" class="form-control" id="editDateOfBirth" name="editDateOfBirth"
                                    style="background-color: white;">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editEmail">Email</label>
                                <input type="email" class="form-control" id="editEmail" name="editEmail"
                                    placeholder="Email">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editNationality">Nationality</label>
                                <input type="text" class="form-control" id="editNationality" name="editNationality"
                                    placeholder="Nationality">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editMobileNumber">Mobile Number</label>
                                <input type="text" class="form-control" id="editMobileNumber" name="editMobileNumber"
                                    placeholder="Mobile Number">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editPhoneNumber">Phone Number</label>
                                <input type="text" class="form-control" id="editPhoneNumber" name="editPhoneNumber"
                                    placeholder="Phone Number">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editAddress">Address</label>
                                <input type="text" class="form-control" id="editAddress" name="editAddress"
                                    placeholder="Address">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editPostalCode">Postal Code</label>
                                <input type="text" class="form-control" id="editPostalCode" name="editPostalCode"
                                    placeholder="Postal Code">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editCompanyName">Company Name</label>
                                <input type="text" class="form-control" id="editCompanyName" name="editCompanyName"
                                    placeholder="Company Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editDesignation">Designation</label>
                                <input type="text" class="form-control" id="editDesignation" name="editDesignation"
                                    placeholder="Designation">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editPreferredContact">Preferred Contact</label>
                                <select class="form-control" style="width: 100%;" id="editPreferredContact"
                                    name="editPreferredContact">
                                    <option selected>None</option>
                                    <option>Email</option>
                                    <option>Phone</option>
                                    <option>Letter</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editDiscount">Discount</label>
                                <div class="input-group">
                                    <input type="number" min="0" step="0.01" class="form-control" id="editDiscount"
                                        name="editDiscount" placeholder="Discount">
                                    <span class="input-group-addon"><i class="fa fa-percent"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editStoreSelection">Origin Store</label>
                                <select id="editStoreSelection" class="form-control" name="editStoreSelection">
                                    <?php
                                    $item = null;
                                    $value = null;

                                    $stores = StoreController::ctrViewAllStores($item, $value);

                                    foreach ($stores as $key => $value) {
                                        echo '<option value="' . $value['store_code'] . '">' . $value['store_name'] . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editComments">Comments</label>
                                <input type="text" name="editComments" class="form-control" id="editComments"
                                    placeholder="Comments">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="editCreateDate">Create Date</label>
                            <input readonly type="text" name="editCreateDate" id="editCreateDate" class="form-control" value="">
                            </div>
                            <div class="form-group col-md-4">
                            <label for="editModifyDate">Modify Date</label>
                            <input readonly type="text" name="editModifyDate" id="editModifyDate" class="form-control" value="">
                            </div>
                            <div class="form-group col-md-4">
                            <label for="editModifiedBy">Modified By</label>
                            <input readonly type="text" name="editModifiedBy" id="editModifiedBy" class="form-control" value="">
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>

            <?php
            $editCustomer = new CustomerController();
            $editCustomer->ctrEditCustomer();
            $editCustomer->ctrDeleteCustomer();
            ?>
            </form>
        </div>
    </div>
</div>