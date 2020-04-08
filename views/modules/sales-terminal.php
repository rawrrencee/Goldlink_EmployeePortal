<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Sales
            <small>Employee Sales Terminal</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Sales Terminal</li>
        </ol>
    </section>

    <div id="loading">
        <img id="loading-image" src="views/img/template/loading.gif" alt="Loading..." />
    </div>

    <section class="content">

        <div class="row">
            <div class="col-md-8">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title" style="padding-bottom: 10px"><strong>Sales Terminal</strong></h3>
                        <input type="text" class="form-control salesItemSearchBar" id="salesItemSearchBar" placeholder="Search">
                    </div>

                    <div class="box-body">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="overflow-y: auto; width: 100%;">
                            <table id="tableSalesTransaction"
                                class="table display table-hover table-bordered table-striped dt-responsive"
                                width="100%">
                                <thead>
                                    <tr class="tableheader">
                                        <th style="width:40px">#</th>
                                        <th style="width:60px">Id</th>
                                        <th style="width:250px">Item</th>
                                        <th style="width:120px">Price</th>
                                        <th style="width:60px">Qty</th>
                                        <th style="width:60px">Disc %</th>
                                        <th style="width:120px">Total</th>
                                    </tr>
                                </thead>
                                <tbody id="appendSalesTerminalRows">
                                    <td id="emptyCart" colspan="10">No item added.</td>
                                </tbody>
                            </table>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-6 pull-right">
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label">Total Qty.</label>
                                        <div class="col-sm-6">
                                            <input readonly="" type="text"
                                                class="form-control itemsInCartQuantity text-right"
                                                id="itemsInCartQuantity" value="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-6 pull-right">
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label">Subtotal:</label>
                                        <div class="col-sm-6">
                                            <input readonly="" type="text"
                                                class="form-control itemsInCartQuantity text-right"
                                                id="itemsInCartQuantity" value="0.00">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            <div class="col-md-4">
                <div class="box box-danger">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Sale ID</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control " id="retrieveTransactionId" value="">
                                        <span class="input-group-btn">
                                            <button type="submit" title="Retrieve transaction" class="btn btn-primary "
                                                id="retrieveTransactionButton" name="retrieveTransactionButton">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Cust.</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control " id="customerId" value=""
                                            placeholder="Enter name">
                                        <span class="input-group-btn">
                                            <button type="submit" title="New Customer" class="btn btn-primary "
                                                id="newCustomerButton" name="newCustomerButton">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Date</label>
                                <div class="col-sm-9">
                                    <input readonly="" type="text" class="form-control transactionDate"
                                        id="transactionDate" value="<?php echo date("d/m/Y"); ?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3  control-label">Salesperson</label>
                                <div class="col-sm-9">
                                    <input readonly="" type="text" class="form-control transactionOwner"
                                        id="transactionOwner" value="<?php
                                            if ($_SESSION['last_name'] != "") {
                                                echo $_SESSION['first_name'] . ' ' . $_SESSION['last_name'];
                                            } else {
                                                echo $_SESSION['first_name'];
                                            }?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Store</label>
                                <div class="col-sm-9">
                                    <input readonly="" type="text" class="form-control transactionStoreName"
                                        id="transactionStoreName" value="<?php
                                        if ($_SESSION['store_name'] != "") {
                                            echo '' . $_SESSION['store_name'] . '';
                                        } else {
                                            echo 'Not Available';
                                        }?>">
                                    <input type="hidden" class="form-control transactionStoreID"
                                        id="transactionStoreID" value="<?php
                                        if ($_SESSION['store_id'] != "") {
                                            echo '' . $_SESSION['store_id'] . '';
                                        } else {
                                            echo '-1';
                                        }?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Disc.</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <input type="text" class="form-control decimal text-right"
                                            id="totalDiscountPercentage" value="0">
                                        <span class="input-group-addon ">%</span>
                                    </div>
                                </div>
                            </div>


                            <button type="submit" title="Payment (F9)"
                                class="btn btn-primary btn-success btn-block btnpayment" id="btnpayment">
                                <i class="fa fa-shopping-cart"></i> Proccess Payment
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title"><strong>Draft Sales</strong></h3>
                <p><strong>Pressing the yellow "Load" button will overwrite the current sale with a previously saved
                        one.</strong></p>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                        title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip"
                        title="Remove">
                        <i class="fa fa-times"></i></button>
                </div>
            </div>

            <div class="box-body">
                <div class="col-md-12 col-sm-12 col-xs-12" style="overflow-y: auto; width: 100%;">
                    <table class="table display table-hover table-bordered table-striped dt-responsive" width="100%">
                        <thead>
                            <tr>
                                <th style="width: 40px;">ID</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Created on</th>
                                <th>Modified on</th>
                                <th>Amount</th>
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

<script src="views/js/template.js"></script>
<script src="views/js/header.js"></script>
<script src="views/js/sales.js"></script>