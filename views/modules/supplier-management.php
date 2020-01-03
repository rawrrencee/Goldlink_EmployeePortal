<div class="content-wrapper">
    <section class="content-header">
        <h1>
            View Suppliers
            <small>Supplier Management</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Suppliers</li>
        </ol>
    </section>

    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalAddSupplier">
                    Add Supplier
                </button>
            </div>
            <div class="box-body">
                <div class="col-md-12" style="overflow-y: auto;">
                    <table class="table table-hover table-bordered table-striped dt-responsive tableSuppliers"
                        width="100%">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Mobile Number</th>
                                <th class="none">Address</th>
                                <th class="none">Postal Code</th>
                                <th class="none">Bank Name</th>
                                <th class="none">Account Number</th>
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
            <div class="box-footer">
                Footer
            </div>
        </div>
    </section>
</div>

<div id="modalAddSupplier" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Add New Supplier</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Supplier Information</p>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="newCompanyName">Company Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="newCompanyName" name="newCompanyName"
                                    placeholder="Company Name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newEmail">Email</label>
                                <input type="email" class="form-control" id="newEmail" name="newEmail"
                                    placeholder="Email">
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
                                <label for="newBankName">Bank Name</label>
                                <input type="text" class="form-control" id="newBankName" name="newBankName"
                                    placeholder="Bank Name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="newAccountNumber">Account Number</label>
                                <input type="text" class="form-control" id="newAccountNumber" name="newAccountNumber"
                                    placeholder="Account Number">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="newComments">Comments</label>
                                <input type="text" class="form-control" id="newComments" name="newComments"
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
                $createSupplier = new SupplierController();
                $createSupplier->ctrCreateSupplier();
            ?>
            </form>

        </div>
    </div>
</div>

<div id="modalEditSupplier" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header" style="background: #3c8dbc; color: #fff">
                <button type="button" class="close" data-dismiss="modal"
                    style="color: #ffffff; opacity: 1;">&times;</button>
                <h4 class="modal-title">Edit Supplier</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                    <form role="form" method="POST" enctype="multipart/form-data">
                        <div class="col-md-12">
                            <p style="font-size: 2em;">Supplier Information</p>
                            <input type="hidden" id="editSupplierId" name="editSupplierId" value="" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editCompanyName">Company Name&nbsp;&nbsp;<small
                                        style="color:red;">*Required</small></label>
                                <input type="text" class="form-control" id="editCompanyName" name="editCompanyName" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editEmail">Email</label>
                                <input type="email" class="form-control" id="editEmail" name="editEmail">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editMobileNumber">Mobile Number</label>
                                <input type="text" class="form-control" id="editMobileNumber" name="editMobileNumber">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editPhoneNumber">Phone Number</label>
                                <input type="text" class="form-control" id="editPhoneNumber" name="editPhoneNumber">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editAddress">Address</label>
                                <input type="text" class="form-control" id="editAddress" name="editAddress">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editPostalCode">Postal Code</label>
                                <input type="text" class="form-control" id="editPostalCode" name="editPostalCode">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="editBankName">Bank Name</label>
                                <input type="text" class="form-control" id="editBankName" name="editBankName">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="editAccountNumber">Account Number</label>
                                <input type="text" class="form-control" id="editAccountNumber" name="editAccountNumber">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="editComments">Comments</label>
                                <input type="text" class="form-control" id="editComments" name="editComments">
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
            <?php
                $editSupplier = new SupplierController();
                $editSupplier->ctrEditSupplier();
            ?>
            </form>

        </div>
    </div>
</div>