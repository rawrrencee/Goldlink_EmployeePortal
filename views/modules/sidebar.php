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
                            <span>View All Employees</span>
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="treeview menu-open">
                <?php
                    if (in_array('employee-salary-voucher-management', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-my', $_SESSION['allowed_modules']) || in_array('employee-salary-voucher-my', $_SESSION['allowed_modules'])) {
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
                    if (in_array('employee-salary-voucher-management', $_SESSION['allowed_modules'])) {
                    echo '
                        <li>
                            <a href="employee-salary-voucher-management">
                                <i class="fa fa-circle-o"></i>
                                <span>View All Salary Vouchers</span>
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
                            <span>View My Salary Vouchers</span>
                        </a>
                    </li>
                    ';
                    }
                ?>

                <?php
                    if (in_array('employee-salary-voucher-submit', $_SESSION['allowed_modules'])) {
                    echo '
                    <li>
                        <a href="employee-salary-voucher-submit">
                            <i class="fa fa-circle-o"></i>
                            <span>Submit Salary</span>
                        </a>
                    </li>
                    ';
                    }
                ?>

                </ul>
            </li>
        </ul>
    </section>
</aside>