<?php
session_start();
?>

<aside class="main-sidebar">
    <section class="sidebar">
        <ul class="sidebar-menu" data-api="tree" data-accordion=0>
            <li class="active">
                <a href="home">
                    <i class="fa fa-home"></i>
                    <span>Home</span>
                </a>
            </li>

            <li class="treeview menu-open">
                <a href="#">
                    <i class="fa fa-bar-chart"></i>
                    <span>Insights</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>

                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="insights-overview">
                            <i class="fa fa-circle-o"></i>
                            <span>Overview</span>
                        </a>
                    </li>
                </ul>

                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="insights-sales">
                            <i class="fa fa-circle-o"></i>
                            <span>Sales</span>
                        </a>
                    </li>
                </ul>

                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="insights-inventory">
                            <i class="fa fa-circle-o"></i>
                            <span>Inventory</span>
                        </a>
                    </li>
                </ul>
                
                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="insights-employees">
                            <i class="fa fa-circle-o"></i>
                            <span>Employees</span>
                        </a>
                    </li>
                </ul>

                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="insights-example">
                            <i class="fa fa-circle-o"></i>
                            <span>Example</span>
                        </a>
                    </li>
                </ul>
            </li>

            <?php 
            if (in_array('employee-management', $_SESSION['allowed_modules'])) {
                echo'
            <li class="treeview menu-open">
                <a href="#">
                    <i class="fa fa-address-book"></i>
                    <span>Employees</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                
                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <li>
                        <a href="employee-management">
                            <i class="fa fa-circle-o"></i>
                            <span>All Employees</span>
                        </a>
                    </li>
                </ul>
            </li>
            ';
            }
            ?>

            <?php 
            if (in_array('sales-terminal', $_SESSION['allowed_modules'])) {
                echo'
                    <li class="treeview menu-open">
                        <a href="#">
                            <i class="fa fa-address-book"></i>
                            <span>Sales</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>

                        <ul class="treeview-menu menu-open treeview-menu-visible">
                            <li>
                                <a href="sales-terminal">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Sales Terminal</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    ';
            }
            ?>

            <?php 
            if (in_array('supplier-management', $_SESSION['allowed_modules'])) {
                echo'
                    <li class="treeview menu-open">
                        <a href="#">
                            <i class="fa fa-address-book"></i>
                            <span>Suppliers</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>

                        <ul class="treeview-menu menu-open treeview-menu-visible">
                            <li>
                                <a href="supplier-management">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Supplier Management</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    ';
            }
            ?>

            <?php 
            if (in_array('item-management', $_SESSION['allowed_modules'])) {
                echo'
                    <li class="treeview menu-open">
                        <a href="#">
                            <i class="fa fa-address-book"></i>
                            <span>Items</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>

                        <ul class="treeview-menu menu-open treeview-menu-visible">
                            <li>
                                <a href="item-management">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Item Management</span>
                                </a>
                            </li>
                        </ul>
                    ';
            }
            if (in_array('item-kit-management', $_SESSION['allowed_modules'])) {
                echo'
                        <ul class="treeview-menu menu-open treeview-menu-visible">
                            <li>
                                <a href="item-kit-management">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Item Kits Management</span>
                                </a>
                            </li>
                        </ul>
                    ';
            }
            ?>
            </li>

            <li class="treeview menu-open">
                <?php
                    if (in_array('customer-management', $_SESSION['allowed_modules']) || in_array('customer-archives', $_SESSION['allowed_modules']) || in_array('customer-analytics', $_SESSION['allowed_modules'])) {
                        echo '
                        <a href="#">
                            <i class="fa fa-users"></i>
                            <span>Customers</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        ';
                    }
                ?>
                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <?php
                    if (in_array('customer-management', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="customer-management">
                                <i class="fa fa-circle-o"></i>
                                <span>All Customers</span>
                            </a>
                        </li>
                        ';
                    }
                ?>
                    <?php
                    if (in_array('customer-archives', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="customer-archives">
                                <i class="fa fa-circle-o"></i>
                                <span>Customer Archives</span>
                            </a>
                        </li>
                        ';
                    }
                ?>
                    <?php
                    if (in_array('customer-analytics', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="customer-analytics">
                                <i class="fa fa-circle-o"></i>
                                <span>Customer Analytics</span>
                            </a>
                        </li>
                        ';
                    }
                ?>
                </ul>
            </li>

            <li class="treeview menu-open">
                <?php
                    if (in_array('employee-salary-voucher-management', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-management-pt', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-my', $_SESSION['allowed_modules']) ||  in_array('employee-salary-voucher-my-pt', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-submit', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-submit-pt', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-analysis', $_SESSION['allowed_modules'])) {
                        echo '
                        <a href="#">
                        <i class="fa fa-address-book"></i>
                        <span>Payroll</span>
                        <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                        </span>
                        </a>
                        ';
                    }
                ?>
                <ul class="treeview-menu menu-open treeview-menu-visible">
                    <?php
                    if (in_array('employee-salary-voucher-analysis', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="employee-salary-voucher-analysis">
                                <i class="fa fa-circle-o"></i>
                                <span>Salary Analysis (Month)</span>
                            </a>
                        </li>
                        ';
                    }
                    ?>

                    <?php
                    if (in_array('employee-salary-voucher-analysis-yearly', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="employee-salary-voucher-analysis-yearly">
                                <i class="fa fa-circle-o"></i>
                                <span>Salary Analysis (Year)</span>
                            </a>
                        </li>
                        ';
                    }
                    ?>

                    <?php
                    if (in_array('employee-salary-voucher-management', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="employee-salary-voucher-management">
                                <i class="fa fa-circle-o"></i>
                                <span>All Salary Vouchers (FT)</span>
                            </a>
                        </li>
                        ';
                    }
                    ?>

                    <?php
                    if (in_array('employee-salary-voucher-management-pt', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="employee-salary-voucher-management-pt">
                                <i class="fa fa-circle-o"></i>
                                <span>All Salary Vouchers (PT)</span>
                            </a>
                        </li>
                        ';
                    }
                    ?>

                    <?php
                    if (in_array('employee-salary-voucher-my', $_SESSION['allowed_modules'])) {
                    echo '
                    <li>
                        <a href="employee-salary-voucher-my">
                            <i class="fa fa-circle-o"></i>
                            <span>My Salary Vouchers (FT)</span>
                        </a>
                    </li>
                    ';
                    }
                    ?>


                    <?php
                    if (in_array('employee-salary-voucher-my-pt', $_SESSION['allowed_modules'])) {
                    echo '
                    <li>
                        <a href="employee-salary-voucher-my-pt">
                            <i class="fa fa-circle-o"></i>
                            <span>My Salary Vouchers (PT)</span>
                        </a>
                    </li>
                    ';
                    }
                    ?>


                    <?php
                    if (in_array('employee-salary-voucher-team', $_SESSION['allowed_modules'])) {
                    echo '
                    <li>
                        <a href="employee-salary-voucher-team">
                            <i class="fa fa-circle-o"></i>
                            <span>Team Salary Vouchers (FT)</span>
                        </a>
                    </li>
                    ';
                    }
                    ?>


                    <?php
                    if (in_array('employee-salary-voucher-team-pt', $_SESSION['allowed_modules'])) {
                    echo '
                    <li>
                        <a href="employee-salary-voucher-team-pt">
                            <i class="fa fa-circle-o"></i>
                            <span>Team Salary Vouchers (PT)</span>
                        </a>
                    </li>
                    ';
                    }
                    ?>

                    <?php
                    if (in_array('employee-salary-voucher-submit', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-submit-pt', $_SESSION['allowed_modules'])) {
                        if ((strpos($_SESSION['designation'], '(FT)') !== false) || $_SESSION['full_time'] == 1) {
                            echo '
                            <li>
                                <a href="employee-salary-voucher-submit">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Submit Salary</span>
                                </a>
                            </li>
                            ';
                        } else {
                            echo '
                            <li>
                                <a href="employee-salary-voucher-submit-pt">
                                    <i class="fa fa-circle-o"></i>
                                    <span>Submit Salary (PT)</span>
                                </a>
                            </li>
                            ';
                        }
                    }
                    ?>
                </ul>
            </li>
        </ul>
    </section>
</aside>