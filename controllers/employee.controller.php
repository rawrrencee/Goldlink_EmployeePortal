<?php

class EmployeeController
{

    public static function userLogin()
    {
        if (isset($_POST['inUsername'])) {

            if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['inUsername'])) {

                $table = 'employees';
                $item = 'username';
                $value = $_POST['inUsername'];

                $response = EmployeeModel::mdlViewAllEmployees($table, $item, $value);

                $password = $_POST['inPassword'];

                if (substr($response['password'], 0, 1) == "$") {

                    if (strtolower($response['username']) == strtolower($_POST["inUsername"]) && password_verify($password, $response['password'])) {

                        $_SESSION["loggedIn"] = true;
                        self::setSessionVariables($response);

                        echo '<script>
                            window.location = "home";
                        </script>';

                    } else {

                        echo '<br><div class="alert alert-danger"> Error logging you in. Please try again.</div>';

                    }
                } else {
                    if (md5($password) == $response['password']) {

                        $passwordData = array('person_id' => $response['person_id'], 'legacy_password' => $password);

                        $result = EmployeeModel::updateMD5PasswordHash($passwordData);

                        if ($result) {
                            echo "<script type='text/javascript'> alert('System has migrated your account details successfully.') </script>";

                            $_SESSION["loggedIn"] = true;
                            self::setSessionVariables($response);

                            echo '<script>
                                window.location = "home";
                            </script>';

                            return;

                        } else {
                            echo "<script type='text/javascript'> alert('Something went wrong. Please contact your system administrator to reset your password if you are unable to login.') </script>";

                            $_SESSION["loggedIn"] = false;

                            echo '<script>
                                    window.location = "login";
                                </script>';

                            return;
                        }
                    } else {

                        echo '<br><div class="alert alert-danger"> Error logging you in. Please try again.</div>';

                    }
                }
            }
        }
    }

    public static function setSessionVariables($response)
    {
        $_SESSION["person_id"] = $response["person_id"];
        $_SESSION["first_name"] = $response["first_name"];
        $_SESSION["last_name"] = $response["last_name"];
        $_SESSION["designation"] = $response["designation"];
        $_SESSION["nric"] = $response["username"];
        $_SESSION["date_of_birth"] = $response["date_of_birth"];
        $_SESSION["bank_name"] = $response["bank_name"];
        $_SESSION["bank_acct"] = $response["bank_acct"];
    }

    public static function ctrViewAllEmployees($item, $value)
    {
        $table = "employees";
        $response = EmployeeModel::mdlViewAllEmployees($table, $item, $value);

        return $response;
    }

    public static function ctrViewEmployeeByPersonId($personId)
    {

        $response = EmployeeModel::mdlViewEmployeeByPersonId($personId);

        return $response;
    }
}
