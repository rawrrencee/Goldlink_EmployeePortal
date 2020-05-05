<?php
    if (isset($_POST['switchStore'])) {
        $switchStore = new StoreController();
        $switchStore->ctrSwitchStore();
    }
?>

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

                <li>
                    <a href="#" data-toggle="control-sidebar"><i class="fa fa-map-marker"></i><small>&nbsp;
                        <?php
                        if (isset($_SESSION['store_name'])) {
                            echo ''.$_SESSION['store_name'].'';
                        } else {
                            echo 'Not Available';
                        }
                    ?></small></a>
                </li>

                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">

                        <?php

                            $filename = "profile_picture";
                            $profile_photo_path_jpg = "uploads/".$_SESSION["person_id"]."/".$filename.".jpg";
                            $profile_photo_path_png = "uploads/".$_SESSION["person_id"]."/".$filename.".png";

                            if (file_exists($profile_photo_path_jpg)) {
                                echo '<img src="'.$profile_photo_path_jpg.'" class="user-image">';
                            } else if (file_exists($profile_photo_path_png)) {
                                echo '<img src="'.$profile_photo_path_png.'" class="user-image">';
                            } else {
                                echo '<img src="views/img/users/default/anonymous.png" class="user-image">'; 
                            }

                            ?>

                        <span><?php echo '&nbsp;&nbsp;'.$_SESSION["first_name"]?></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="user-header">
                            <?php

                                $filename = "profile_picture";
                                $profile_photo_path_jpg = "uploads/".$_SESSION["person_id"]."/".$filename.".jpg";
                                $profile_photo_path_png = "uploads/".$_SESSION["person_id"]."/".$filename.".png";
                        
                                if (file_exists($profile_photo_path_jpg)) {
                                    echo '<img src="'.$profile_photo_path_jpg.'" class="img-circle">';
                                } else if (file_exists($profile_photo_path_png)) {
                                    echo '<img src="'.$profile_photo_path_png.'" class="img-circle">';
                                } else {
                                    echo '<img src="views/img/users/default/anonymous.png" class="img-circle">'; 
                                }
                            
                            ?>
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

<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
    <div class="tab-content">
        <h3 class="control-sidebar-heading"><strong>Current Store</strong></h3>
        <h4 class="control-sidebar-subheading">
            <?php
                if (isset($_SESSION['store_name'])) {
                echo ''.$_SESSION['store_name'].'';
                } else {
                echo 'Not Available';
                }
            ?>
        </h4>
        <h3 class="control-sidebar-heading"><strong>Switch Store</strong></h3>
        <form id="switchStoreForm" method="POST">
            <select class="form-control input-md select2" name="switchStore">
                <?php
                    $person_id = $_SESSION['person_id'];

                    $allowed_stores_array = StoreController::ctrViewAllowedStores($person_id);

                    foreach($allowed_stores_array as $key => $value) {
                        echo '<option value="'.$value['store_id'].'">'.$value['store_name'].'</option>';
                    }
                ?>
            </select>
            <br>
            <div class="menu-info">
                <button type="submit" style="margin-top: 20px;" class="btn btn-sm btn-primary">Update</button>
            </div>
        </form>
    </div>
</aside>
<div class="control-sidebar-bg"></div>