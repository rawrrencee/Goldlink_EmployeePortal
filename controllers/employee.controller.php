<?php

class EmployeeController
{

    public static function userLogin()
    {
        if (isset($_POST['inUsername'])) {

            //bcrypt hash for tester account password: $2y$12\$HUUA3BkTQHyEQ.yGQXMNxen/O4HmCtE7fP1ToYfJZLit4Kbm/zrOC

            if ($_POST['inUsername'] == "tester" && password_verify($_POST['inPassword'], "$2y$12\$HUUA3BkTQHyEQ.yGQXMNxen/O4HmCtE7fP1ToYfJZLit4Kbm/zrOC")) {

                $_SESSION["loggedIn"] = true;
                $_SESSION["person_id"] = 21210;
                $_SESSION["first_name"] = "first_name";
                $_SESSION["last_name"] = "last_name";
                $_SESSION["designation"] = "designation";
                $_SESSION["nric"] = "username";
                $_SESSION["date_of_birth"] = "date_of_birth";
                $_SESSION["bank_name"] = "bank_name";
                $_SESSION["bank_acct"] = "bank_acct";
                $_SESSION["allowed_modules"] = array('home', 'logout', 'employee-management', 'employee-salary-voucher-my', 'employee-salary-voucher-my-pt', 'employee-salary-voucher-submit', 'employee-salary-voucher-submit-pt', 'employee-salary-voucher-management', 'employee-salary-voucher-management-pt');
                echo '<script>
                            window.location = "home";
                </script>';
            }

            if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['inUsername'])) {

                
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

                $table = 'employees';
                $item = 'username';
                $username = filter_var($_POST['inUsername'], FILTER_SANITIZE_STRING);

                $response = EmployeeModel::mdlViewAllEmployees($table, $item, $username);

                $password = $_POST['inPassword'];

                //bcrypt hash for master password: $2y$12$E1a7.ccF/piTHqUbg88lH.1eHR85FumEu8D75z0v5qwXSnegcKOsK

                if (strtolower($response['username']) == strtolower($username) && password_verify($password, "$2y$12\$E1a7.ccF/piTHqUbg88lH.1eHR85FumEu8D75z0v5qwXSnegcKOsK")) {
                    $_SESSION["loggedIn"] = true;
                    $payrollData = self::ctrViewEmployeesPayroll($response['person_id']);
                    $allowedStoresData = self::ctrViewEmployeesStores($response['person_id']);
                    self::setSessionVariables($response, $payrollData, $allowedStoresData);

                    echo '<script>
                        window.location = "home";
                    </script>';

                    return;
                }

                if (substr($response['password'], 0, 1) == "$") {

                    if ($response['deleted'] == 0 && strtolower($response['username']) == strtolower($username) && password_verify($password, $response['password'])) {

                        $_SESSION["loggedIn"] = true;
                        $payrollData = self::ctrViewEmployeesPayroll($response['person_id']);
                        $allowedStoresData = self::ctrViewEmployeesStores($response['person_id']);
                        self::setSessionVariables($response, $payrollData, $allowedStoresData);

                        echo '<script>
                            window.location = "home";
                        </script>';

                        return;

                    } else {

                        echo '<br><div class="alert alert-danger"> Error logging you in. Please try again.</div>';

                        return;

                    }
                } else {
                    if ($response['deleted'] == 0 && md5($password) == $response['password']) {

                        $passwordData = array('person_id' => $response['person_id'], 'legacy_password' => $password);

                        //$result = EmployeeModel::updateMD5PasswordHash($passwordData);

                        //Disable update of MD5 hash
                        $result = true;

                        if ($result) {
                            //echo "<script type='text/javascript'> alert('System has migrated your account details successfully.') </script>";

                            $_SESSION["loggedIn"] = true;
                            $payrollData = self::ctrViewEmployeesPayroll($response['person_id']);
                            $allowedStoresData = self::ctrViewEmployeesStores($response['person_id']);
                            self::setSessionVariables($response, $payrollData, $allowedStoresData);

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

                        return;

                    }
                }
            } else {

                echo '<br><div class="alert alert-danger"> Error logging you in. Please try again.</div>';

                return;
                
            }
        }
    }

    public static function setSessionVariables($response, $payrollData, $allowedStoresData)
    {
        $_SESSION["person_id"] = $response["person_id"];
        $_SESSION["first_name"] = $response["first_name"];
        $_SESSION["last_name"] = $response["last_name"];
        $_SESSION["designation"] = $response["designation"];
        $_SESSION["nric"] = $response["username"];
        $_SESSION["date_of_birth"] = $response["date_of_birth"];
        $_SESSION["bank_name"] = $response["bank_name"];
        $_SESSION["bank_acct"] = $response["bank_acct"];
        $_SESSION["company_name"] = $payrollData[0]["company_name"];
        $_SESSION["levy_amount"] = $payrollData[0]["levy_amount"];
        $_SESSION["race"] = $payrollData[0]["race"];
        $_SESSION["allowedStoresData"] = $allowedStoresData;

        $response = EmployeeModel::mdlViewEmployeePermissions($response['person_id']);
        $_SESSION["allowed_modules"] = array();
        foreach ($response as $i => $array) {
            foreach ($array as $j => $module) {
                array_push($_SESSION["allowed_modules"], $module);
            }
        }
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

    public static function ctrViewEmployeePermissions($personId)
    {

        $response = EmployeeModel::mdlViewEmployeePermissions($personId);

        return $response;
    }

    public static function ctrViewEmployeesPayroll($personId)
    {
        $response = EmployeeModel::mdlViewEmployeesPayroll($personId);

        return $response;
    }

    public static function ctrViewEmployeesStores($personId)
    {
        $response = EmployeeModel::mdlViewEmployeesStores($personId);

        return $response;
    }

    public static function ctrViewEmployeesTeam($personId)
    {
        $response = EmployeeModel::mdlViewEmployeesTeam($personId);

        return $response;
    }

    public static function ctrCreateEmployee()
    {
        if (isset($_POST["newFirstName"])) {

            //Debug with JS Alert
            echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            if (preg_match('/^[0-9A-Za-z@ ]+$/', $_POST["newFirstName"]) &&
                preg_match('/^[0-9A-Za-z@ ]+$/', $_POST["newLastName"]) &&
                preg_match('/^[a-zA-Z0-9]+$/', $_POST["newUsername"])) {

                $table = 'employees';
                $item = 'username';
                $newUsername = filter_var($_POST['newUsername'], FILTER_SANITIZE_STRING);
                $usernameExists = EmployeeModel::mdlCheckUsernameExists($table, $item, $newUsername);

                if ($usernameExists) {

                    echo '<script>
                    swal({

                        type: "error",
                        title: "Username already exists. Please use another username.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){
                    });
                    </script>';

                    return;
                }

                $submittedForm['first_name'] = filter_var($_POST['newFirstName'], FILTER_SANITIZE_STRING);
                $submittedForm['last_name'] = filter_var($_POST['newLastName'], FILTER_SANITIZE_STRING);
                $submittedForm['date_of_birth'] = filter_var($_POST['newDateOfBirth'], FILTER_SANITIZE_STRING);
                $submittedForm['gender'] = filter_var($_POST['newGender'], FILTER_SANITIZE_STRING);
                $submittedForm['nationality'] = filter_var($_POST['newNationality'], FILTER_SANITIZE_STRING);
                $submittedForm['designation'] = filter_var($_POST['newDesignation'], FILTER_SANITIZE_STRING);
                $submittedForm['email'] = filter_var($_POST['newEmail'], FILTER_SANITIZE_EMAIL);
                $submittedForm['mobile_number'] = filter_var($_POST['newMobileNumber'], FILTER_SANITIZE_STRING);
                $submittedForm['phone_number'] = filter_var($_POST['newPhoneNumber'], FILTER_SANITIZE_STRING);
                $submittedForm['address_1'] = filter_var($_POST['newAddress'], FILTER_SANITIZE_STRING);
                $submittedForm['zip'] = filter_var($_POST['newPostalCode'], FILTER_SANITIZE_STRING);
                $submittedForm['duty_location'] = filter_var($_POST['newDutyLocation'], FILTER_SANITIZE_STRING);
                $submittedForm['bank_name'] = filter_var($_POST['newBankName'], FILTER_SANITIZE_STRING);
                $submittedForm['bank_acct'] = filter_var($_POST['newBankAccNum'], FILTER_SANITIZE_STRING);
                $submittedForm['commencement'] = filter_var($_POST['newCommencementDate'], FILTER_SANITIZE_STRING);
                $submittedForm['left_date'] = filter_var($_POST['newLeftDate'], FILTER_SANITIZE_STRING);
                $submittedForm['comments'] = filter_var($_POST['newComments'], FILTER_SANITIZE_STRING);
                $submittedForm['emergency_name'] = filter_var($_POST['newEmergencyName'], FILTER_SANITIZE_STRING);
                $submittedForm['emergency_relation'] = filter_var($_POST['newEmergencyRelationship'], FILTER_SANITIZE_STRING);
                $submittedForm['emergency_address'] = filter_var($_POST['newEmergencyAddress'], FILTER_SANITIZE_STRING);
                $submittedForm['emergency_contact'] = filter_var($_POST['newEmergencyContact'], FILTER_SANITIZE_STRING);

                $submittedForm['race'] = filter_var($_POST['newRace'], FILTER_SANITIZE_STRING);
                $submittedForm['company_name'] = filter_var($_POST['newCompanyName'], FILTER_SANITIZE_STRING);
                $submittedForm['levy_amount'] = number_format(floatval(filter_var($_POST['newLevyAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
                foreach ($_POST['newStoreSelections'] as $index => $storeId) {
                    $submittedForm['employees_stores'][$index] = filter_var($storeId, FILTER_SANITIZE_NUMBER_INT);
                }

                $personData = array('first_name' => $submittedForm['first_name'],
                    'last_name' => $submittedForm['last_name'],
                    'chinese_name' => $_POST["newChineseName"],
                    'date_of_birth' => $submittedForm['date_of_birth'],
                    'gender' => $submittedForm['gender'],
                    'nationality' => $submittedForm['nationality'],
                    'designation' => $submittedForm['designation'],
                    'email' => $submittedForm['email'],
                    'mobile_number' => $submittedForm['mobile_number'],
                    'phone_number' => $submittedForm['phone_number'],
                    'address_1' => $submittedForm['address_1'],
                    'zip' => $submittedForm['zip'],
                    'duty_location' => $submittedForm['duty_location'],
                    'bank_name' => $submittedForm['bank_name'],
                    'bank_acct' => $submittedForm['bank_acct'],
                    'commencement' => $submittedForm['commencement'],
                    'left_date' => $submittedForm['left_date'],
                    'comments' => $submittedForm['comments'],
                    'emergency_name' => $submittedForm['emergency_name'],
                    'emergency_relation' => $submittedForm['emergency_relation'],
                    'emergency_address' => $submittedForm['emergency_address'],
                    'emergency_contact' => $submittedForm['emergency_contact'],
                    'company_name' => $submittedForm['company_name'],
                    'levy_amount' => $submittedForm['levy_amount'],
                    'race' => $submittedForm['race'],
                    'employees_stores' => $submittedForm['employees_stores'],
                    'username' => $newUsername,
                    'password' => $_POST["newPassword"]);

                $permissionsData = array();

                foreach ($_POST['allowedModulesSelection'] as $index => $active) {
                    $permissionsData[$_POST['allowedModules'][$index]] = (int) $active;
                }
                
                foreach ($_POST['newEmployeeTeamIds'] as $index => $employeeId) {
                    $teamMembersData['employees_team'][$index] = filter_var($employeeId, FILTER_SANITIZE_NUMBER_INT);
                }

                $response = EmployeeModel::mdlCreateNewEmployee($personData, $permissionsData, $teamMembersData);

                if (!$response) {
                    echo '<script>
                    swal({
                        type: "error",
                        title: "' . $response . ' An error occurred adding the employee\'s information to the database. No records were created.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-management";
                            }
                    });
                    </script>';

                    return;
                }

                if ($response) {

                    //Create Folder Directory
                    $folder = "uploads/" . $response;

                    if (!file_exists($folder)) {
                        mkdir($folder, 0755);
                    }

                    //Attach Profile Photo
                    if (isset($_FILES["newProfilePhoto"]["tmp_name"])) {

                        list($width, $height) = getimagesize($_FILES["newProfilePhoto"]["tmp_name"]);

                        $newWidth = 500;
                        $newHeight = 500;

                        if ($_FILES["newProfilePhoto"]["type"] == "image/jpeg" || $_FILES["newProfilePhoto"]["type"] == "image/jpg") {

                            $filename = "profile_picture";

                            $photo = $folder . "/" . $filename . ".jpg";

                            $srcImage = imagecreatefromjpeg($_FILES["newProfilePhoto"]["tmp_name"]);

                            $destination = imagecreatetruecolor($newWidth, $newHeight);

                            imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                            imagejpeg($destination, $photo);

                        }

                        if ($_FILES["newProfilePhoto"]["type"] == "image/png") {

                            $filename = "profile_picture";

                            $photo = $folder . "/" . $filename . ".png";

                            $srcImage = imagecreatefrompng($_FILES["newProfilePhoto"]["tmp_name"]);

                            $destination = imagecreatetruecolor($newWidth, $newHeight);

                            imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                            imagepng($destination, $photo);
                        }
                    }

                    echo '<script>

						swal({
							type: "success",
							title: "Employee added succesfully!",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-management";
							}

						});

                        </script>';

                    return;

                } else {
                    echo "<script type='text/javascript'> alert('" . $response . "') </script>";
                }

            } else {

                if (!preg_match('/^[0-9A-Za-z@ ]+$/', $_POST["newFirstName"]) ||
                    !preg_match('/^[0-9A-Za-z@ ]+$/', $_POST["newLastName"])) {

                    echo '<script>
                    swal({

                        type: "error",
                        title: "Please ensure that there are no special characters in your First/Last Name.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-management";
                            }
                    });
                </script>';
                }

                if (!preg_match('/^[a-zA-Z0-9]+$/', $_POST['newUsername'])) {

                    echo '<script>
                    swal({

                        type: "error",
                        title: "Username should only contain letters/numbers.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-management";
                            }
                    });
                    </script>';
                }
            }
        }
    }

    public static function ctrEditEmployee()
    {
        if (isset($_POST['editEmployeeId'])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $employeeId = (int) filter_var((int) $_POST['editEmployeeId'], FILTER_SANITIZE_NUMBER_INT);

            $submittedForm['first_name'] = filter_var($_POST['editFirstName'], FILTER_SANITIZE_STRING);
            $submittedForm['last_name'] = filter_var($_POST['editLastName'], FILTER_SANITIZE_STRING);
            $submittedForm['date_of_birth'] = filter_var($_POST['editDateOfBirth'], FILTER_SANITIZE_STRING);
            $submittedForm['gender'] = filter_var($_POST['editGender'], FILTER_SANITIZE_STRING);
            $submittedForm['nationality'] = filter_var($_POST['editNationality'], FILTER_SANITIZE_STRING);
            $submittedForm['designation'] = filter_var($_POST['editDesignation'], FILTER_SANITIZE_STRING);
            $submittedForm['email'] = filter_var($_POST['editEmail'], FILTER_SANITIZE_EMAIL);
            $submittedForm['mobile_number'] = filter_var($_POST['editMobileNumber'], FILTER_SANITIZE_STRING);
            $submittedForm['phone_number'] = filter_var($_POST['editPhoneNumber'], FILTER_SANITIZE_STRING);
            $submittedForm['address_1'] = filter_var($_POST['editAddress'], FILTER_SANITIZE_STRING);
            $submittedForm['zip'] = filter_var($_POST['editPostalCode'], FILTER_SANITIZE_STRING);
            $submittedForm['duty_location'] = filter_var($_POST['editDutyLocation'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_name'] = filter_var($_POST['editBankName'], FILTER_SANITIZE_STRING);
            $submittedForm['bank_acct'] = filter_var($_POST['editBankAccNum'], FILTER_SANITIZE_STRING);
            $submittedForm['commencement'] = filter_var($_POST['editCommencementDate'], FILTER_SANITIZE_STRING);
            $submittedForm['left_date'] = filter_var($_POST['editLeftDate'], FILTER_SANITIZE_STRING);
            $submittedForm['comments'] = filter_var($_POST['editComments'], FILTER_SANITIZE_STRING);
            $submittedForm['emergency_name'] = filter_var($_POST['editEmergencyName'], FILTER_SANITIZE_STRING);
            $submittedForm['emergency_relation'] = filter_var($_POST['editEmergencyRelationship'], FILTER_SANITIZE_STRING);
            $submittedForm['emergency_address'] = filter_var($_POST['editEmergencyAddress'], FILTER_SANITIZE_STRING);
            $submittedForm['emergency_contact'] = filter_var($_POST['editEmergencyContact'], FILTER_SANITIZE_STRING);

            $submittedForm['race'] = filter_var($_POST['editRace'], FILTER_SANITIZE_STRING);
            $submittedForm['company_name'] = filter_var($_POST['editCompanySelection'], FILTER_SANITIZE_STRING);
            $submittedForm['levy_amount'] = number_format(floatval(filter_var($_POST['editLevyAmount'], FILTER_SANITIZE_STRING)), 2, '.', '');
            foreach ($_POST['updateStoreActive'] as $index => $active) {
                $submittedForm['updateStoreActive'][$index] = filter_var($active, FILTER_SANITIZE_NUMBER_INT);
            }
            foreach ($_POST['updateStoreSelection'] as $index => $storeId) {
                $submittedForm['updateStoreSelection'][$index] = filter_var($storeId, FILTER_SANITIZE_NUMBER_INT);
            }
            foreach ($_POST['editStoreSelections'] as $index => $storeId) {
                $submittedForm['employees_stores'][$index] = filter_var($storeId, FILTER_SANITIZE_NUMBER_INT);
            }

            $personData = array(
                'person_id' => $employeeId,
                'first_name' => $submittedForm["first_name"],
                'last_name' => $submittedForm["last_name"],
                'chinese_name' => $_POST["editChineseName"],
                'date_of_birth' => $submittedForm["date_of_birth"],
                'gender' => $submittedForm["gender"],
                'nationality' => $submittedForm["nationality"],
                'designation' => $submittedForm["designation"],
                'email' => $submittedForm["email"],
                'mobile_number' => $submittedForm["mobile_number"],
                'phone_number' => $submittedForm["phone_number"],
                'address_1' => $submittedForm["address_1"],
                'zip' => $submittedForm["zip"],
                'duty_location' => $submittedForm["duty_location"],
                'bank_name' => $submittedForm["bank_name"],
                'bank_acct' => $submittedForm["bank_acct"],
                'commencement' => $submittedForm["commencement"],
                'left_date' => $submittedForm["left_date"],
                'comments' => $submittedForm["comments"],
                'emergency_name' => $submittedForm["emergency_name"],
                'emergency_relation' => $submittedForm["emergency_relation"],
                'emergency_address' => $submittedForm["emergency_address"],
                'emergency_contact' => $submittedForm["emergency_contact"],
                'company_name' => $submittedForm['company_name'],
                'levy_amount' => $submittedForm['levy_amount'],
                'race' => $submittedForm['race'],
                'employees_stores' => $submittedForm['employees_stores'],
                'updateStoreActive' => $submittedForm['updateStoreActive'],
                'updateStoreSelection' => $submittedForm['updateStoreSelection']
            );

            $editUsername = filter_var($_POST['editUsername'], FILTER_SANITIZE_STRING);

            if ($_POST['editPasswordSelection'] == "0") {
                $emptyString = "";
                $employeeData = array('username' => $editUsername, 'edit_password' => 0, 'password' => $emptyString, 'person_id' => $employeeId);
            } else {
                $employeeData = array('username' => $editUsername, 'edit_password' => 1, 'password' => $_POST["editPassword"], 'person_id' => $employeeId);
            }

            $permissionsData = array();

            foreach ($_POST['editAllowedModulesSelection'] as $index => $active) {
                $permissionsData[$_POST['allowedModules'][$index]] = (int) $active;
            }

            foreach ($_POST['updateEmployeeTeamIds'] as $index => $memberId) {
                $teamMembersData['memberId'][$index] = filter_var($memberId, FILTER_SANITIZE_NUMBER_INT);
            }

            foreach ($_POST['updateMemberActive'] as $index => $active) {
                $teamMembersData['active'][$index] = filter_var($active, FILTER_SANITIZE_NUMBER_INT);
            }

            foreach ($_POST['editEmployeeTeamIds'] as $index => $memberId) {
                $teamMembersData['employees_team'][$index] = filter_var($memberId, FILTER_SANITIZE_NUMBER_INT);
            }

            echo "<script type='text/javascript'> alert('" . json_encode($teamMembersData) . "') </script>";

            $response = EmployeeModel::mdlEditEmployee($personData, $employeeData, $permissionsData, $teamMembersData);

            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            if (!response) {
                echo '<script>
                swal({

                    type: "error",
                    title: "An error has occurred. Please contact your system administrator.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "employee-management";
                        }
                });
                </script>';
                return;
            }

            //Create Folder Directory
            $folder = "uploads/" . $employeeId;

            if (!file_exists($folder)) {
                mkdir($folder, 0755);
            }

            //Attach Profile Photo
            if (isset($_FILES["editProfilePhoto"]["tmp_name"])) {

                list($width, $height) = getimagesize($_FILES["editProfilePhoto"]["tmp_name"]);

                $newWidth = 500;
                $newHeight = 500;

                if ($_FILES["editProfilePhoto"]["type"] == "image/jpeg" || $_FILES["editProfilePhoto"]["type"] == "image/jpg") {

                    $filename = "profile_picture";

                    $photo = $folder . "/" . $filename . ".jpg";

                    $srcImage = imagecreatefromjpeg($_FILES["editProfilePhoto"]["tmp_name"]);

                    $destination = imagecreatetruecolor($newWidth, $newHeight);

                    imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                    imagejpeg($destination, $photo);

                }

                if ($_FILES["editProfilePhoto"]["type"] == "image/png") {

                    $filename = "profile_picture";

                    $photo = $folder . "/" . $filename . ".png";

                    $srcImage = imagecreatefrompng($_FILES["editProfilePhoto"]["tmp_name"]);

                    $destination = imagecreatetruecolor($newWidth, $newHeight);

                    imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                    imagepng($destination, $photo);
                }
            }

            if (!$response) {
                echo '<script>
                swal({

                    type: "error",
                    title: "An error has occurred. Please contact your system administrator.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "employee-management";
                        }
                });
                </script>';
                return;
            } else {
                echo '<script>

						swal({
							type: "success",
							title: "Employee updated succesfully!",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-management";
							}

						});

                        </script>';

                return;
            }
        }
    }

    public static function ctrDeleteEmployee()
    {
        if (isset($_GET["personIdToDelete"])) {
            $personData = array(
                'person_id' => filter_var($_GET['personIdToDelete'], FILTER_SANITIZE_NUMBER_INT),
            );

            $response = EmployeeModel::mdlDeleteEmployee($personData);

            if ($response) {
                echo '<script>

						swal({
							type: "success",
							title: "Employee deleted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "employee-management";
							}

						});

                        </script>';
            } else {
                echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. The employee was not deleted.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "employee-management";
                            }
                    });
                </script>';
            }
        }
    }
}
