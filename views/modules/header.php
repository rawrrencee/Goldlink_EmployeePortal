<header class="main-header">

    <!--=====================================
LOGO
======================================-->

    <a href="home" class="logo">

        <span class="logo-mini">
            <img src="views/img/template/goldlink_logo.png" class="img-responsive" style="padding: 10px;">
        </span>
        <span class="logo-lg">
            Goldlink<b>EMP</b>
        </span>

    </a>
    <!--=====================================
NAVBAR
======================================-->

    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>

        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="views/img/users/default/anonymous.png" class="user-image">
                        <span>&nbsp;&nbsp;<?php echo $_SESSION["first_name"]?></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="user-header">
                            <img src="views/img/users/default/anonymous.png" class="img-circle">

                            <?php
                                echo '<p>
                                    '.$_SESSION['first_name'].'
                                    <small>'.$_SESSION['designation'].'</small>
                                    </p>'
                            ?>
                        </li>
                        <li class="user-body">
                            <div class="pull-right">
                                <a href="logout" class="btn btn-default btn-flat">Logout</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>


</header>