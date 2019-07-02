<div id="back"></div>

<div class="login-box">
    <div class="login-logo">
        <img src="views/img/template/goldlink_logo.png" class="img-responsive"
            style="margin-left: auto; margin-right: auto; padding: 10px;">
    </div>
    <div class="login-box-body">
        <p class="login-box-msg">Please login to access Goldlink EMP.</p>
        <form method="post">
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="User ID" name="inUsername">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password" name="inPassword">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>
            </div>

            <?php

            $login = new EmployeeController();
            $login -> userLogin();

            ?>

        </form>
    </div>
</div>