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
                                <span>Salary Voucher Analysis</span>
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
                                <span>All Salary Vouchers</span>
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
                            <span>My Salary Vouchers</span>
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
                    if (in_array('employee-salary-voucher-submit', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-submit-pt', $_SESSION['allowed_modules'])) {
                        if (strpos($_SESSION['designation'], '(FT)') !== false) {
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