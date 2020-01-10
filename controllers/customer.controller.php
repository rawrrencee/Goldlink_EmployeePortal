<?php

class CustomerController
{

    public static function ctrViewAllCustomers($item, $value)
    {
        $table = "customers";
        $response = CustomerModel::mdlViewAllCustomers($table, $item, $value);

        return $response;
    }

    public static function ctrViewCustomerByPersonId($customerId)
    {
        $response = CustomerModel::mdlViewCustomerByPersonId($customerId);

        return $response;
    }

    public static function ctrCreateCustomer()
    {
        if (isset($_POST["newFirstName"])) {

            $emptyString = "";

            //PARSE & SANITISE ALL INPUT
            $submittedForm['first_name'] = trim(filter_var($_POST["newFirstName"], FILTER_SANITIZE_STRING));
            $submittedForm['last_name'] = trim(filter_var($_POST["newLastName"], FILTER_SANITIZE_STRING));
            $submittedForm['chinese_name'] = trim(filter_var($_POST["newChineseName"], FILTER_SANITIZE_STRING));
            $submittedForm['date_of_birth'] = trim(filter_var($_POST["newDateOfBirth"], FILTER_SANITIZE_STRING));
            $submittedForm['gender'] = trim(filter_var($_POST["newGender"], FILTER_SANITIZE_STRING));
            $submittedForm['nationality'] = trim(filter_var($_POST["newNationality"], FILTER_SANITIZE_STRING));
            $submittedForm['designation'] = trim(filter_var($_POST["newDesignation"], FILTER_SANITIZE_STRING));
            $submittedForm['email'] = trim(filter_var($_POST["newEmail"], FILTER_SANITIZE_STRING));
            $submittedForm['mobile_number'] = trim(filter_var($_POST["newMobileNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['phone_number'] = trim(filter_var($_POST["newPhoneNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['address_1'] = trim(filter_var($_POST["newAddress"], FILTER_SANITIZE_STRING));
            $submittedForm['zip'] = trim(filter_var($_POST["newPostalCode"], FILTER_SANITIZE_STRING));
            $submittedForm['duty_location'] = $emptyString;
            $submittedForm['bank_name'] = $emptyString;
            $submittedForm['bank_acct'] = $emptyString;
            $submittedForm['commencement'] = $emptyString;
            $submittedForm['left_date'] = $emptyString;
            $submittedForm['comments'] = trim(filter_var($_POST["newComments"], FILTER_SANITIZE_STRING));
            $submittedForm['emergency_name'] = $emptyString;
            $submittedForm['emergency_relation'] = $emptyString;
            $submittedForm['emergency_address'] = $emptyString;
            $submittedForm['emergency_contact'] = $emptyString;
            $submittedForm['nric'] = trim(filter_var($_POST["newCustomerNRIC"], FILTER_SANITIZE_STRING));
            $submittedForm['title'] = trim(filter_var($_POST["newTitle"], FILTER_SANITIZE_STRING));
            $submittedForm['company_name'] = trim(filter_var($_POST["newCompanyName"], FILTER_SANITIZE_STRING));
            $submittedForm['designation'] = trim(filter_var($_POST["newDesignation"], FILTER_SANITIZE_STRING));
            $submittedForm['nationality'] = trim(filter_var($_POST["newNationality"], FILTER_SANITIZE_STRING));

            if ($_POST["newDateOfBirth"] != "") {
                $newDateOfBirth = date("Y-m-d", strtotime($_POST["newDateOfBirth"]));

                //echo "<script type='text/javascript'> alert('" . json_encode($newDateOfBirth) . "') </script>";
            } else {
                $newDateOfBirth = "";
            }
            $submittedForm['birthday'] = $newDateOfBirth;
            $submittedForm['preferred_contact'] = trim(filter_var($_POST["newPreferredContact"], FILTER_SANITIZE_STRING));
            $submittedForm['discount'] = trim(filter_var($_POST["newDiscount"], FILTER_SANITIZE_STRING));
            $submittedForm['dunhill_discount'] = $emptyString;
            $submittedForm['store'] = trim(filter_var($_POST["newStoreSelection"], FILTER_SANITIZE_STRING));
            $submittedForm['create_date'] = date('Y-m-d H:i:s');
            $submittedForm['modify_date'] = date('Y-m-d H:i:s');
            $submittedForm['modify_by'] = $_SESSION["first_name"] . ' ' . $_SESSION["last_name"];

            $customerData = array(
                'first_name' => $submittedForm['first_name'],
                'last_name' => $submittedForm['last_name'],
                'chinese_name' => $submittedForm['chinese_name'],
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
                'nric' => $submittedForm['nric'],
                'title' => $submittedForm['title'],
                'company_name' => $submittedForm['company_name'],
                'nationality' => $submittedForm['nationality'],
                'birthday' => $submittedForm['birthday'],
                'preferred_contact' => $submittedForm['preferred_contact'],
                'discount' => $submittedForm["discount"],
                'dunhill_discount' => $submittedForm['dunhill_discount'],
                'store' => $submittedForm["store"],
                'create_date' => $submittedForm['create_date'],
                'modify_date' => $submittedForm['modify_date'],
                'modify_by' => $submittedForm["modify_by"],
            );

            $response = CustomerModel::mdlCreateNewCustomer($customerData);

            if (!$response) {
                echo '<script>
                    swal({

                        type: "error",
                        title: "An error has occurred. Please contact your system administrator.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "customer-management";
                            }
                    });
                    </script>';
                return;
            } else {
                echo '<script>

                            swal({
                                type: "success",
                                title: "Customer created succesfully!' . ' ' . $response . ' ",
                                showConfirmButton: true,
                                confirmButtonText: "Close"

                            }).then(function(result){

                                if(result.value){

                                    window.location = "customer-management";
                                }

                            });

                            </script>';

                return;
            }

        }
    }

    public static function ctrEditCustomer()
    {
        if (isset($_POST["editCustomerId"])) {
            
            $emptyString = "";

            //PARSE & SANITISE ALL INPUT
            $submittedForm['first_name'] = trim(filter_var($_POST["editFirstName"], FILTER_SANITIZE_STRING));
            $submittedForm['last_name'] = trim(filter_var($_POST["editLastName"], FILTER_SANITIZE_STRING));
            $submittedForm['chinese_name'] = trim(filter_var($_POST["editChineseName"], FILTER_SANITIZE_STRING));
            $submittedForm['date_of_birth'] = trim(filter_var($_POST["editDateOfBirth"], FILTER_SANITIZE_STRING));
            $submittedForm['gender'] = trim(filter_var($_POST["editGender"], FILTER_SANITIZE_STRING));
            $submittedForm['nationality'] = trim(filter_var($_POST["editNationality"], FILTER_SANITIZE_STRING));
            $submittedForm['designation'] = trim(filter_var($_POST["editDesignation"], FILTER_SANITIZE_STRING));
            $submittedForm['email'] = trim(filter_var($_POST["editEmail"], FILTER_SANITIZE_STRING));
            $submittedForm['mobile_number'] = trim(filter_var($_POST["editMobileNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['phone_number'] = trim(filter_var($_POST["editPhoneNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['address_1'] = trim(filter_var($_POST["editAddress"], FILTER_SANITIZE_STRING));
            $submittedForm['zip'] = trim(filter_var($_POST["editPostalCode"], FILTER_SANITIZE_STRING));
            $submittedForm['duty_location'] = $emptyString;
            $submittedForm['bank_name'] = $emptyString;
            $submittedForm['bank_acct'] = $emptyString;
            $submittedForm['commencement'] = $emptyString;
            $submittedForm['left_date'] = $emptyString;
            $submittedForm['comments'] = trim(filter_var($_POST["editComments"], FILTER_SANITIZE_STRING));
            $submittedForm['emergency_name'] = $emptyString;
            $submittedForm['emergency_relation'] = $emptyString;
            $submittedForm['emergency_address'] = $emptyString;
            $submittedForm['emergency_contact'] = $emptyString;
            $submittedForm['nric'] = trim(filter_var($_POST["editCustomerNRIC"], FILTER_SANITIZE_STRING));
            $submittedForm['title'] = trim(filter_var($_POST["editTitle"], FILTER_SANITIZE_STRING));
            $submittedForm['company_name'] = trim(filter_var($_POST["editCompanyName"], FILTER_SANITIZE_STRING));
            $submittedForm['designation'] = trim(filter_var($_POST["editDesignation"], FILTER_SANITIZE_STRING));
            $submittedForm['nationality'] = trim(filter_var($_POST["editNationality"], FILTER_SANITIZE_STRING));

            if ($_POST["editDateOfBirth"] != "") {
                $editDateOfBirth = date("Y-m-d", strtotime($_POST["editDateOfBirth"]));

                //echo "<script type='text/javascript'> alert('" . json_encode($editDateOfBirth) . "') </script>";
            } else {
                $editDateOfBirth = "";
            }
            $submittedForm['birthday'] = $editDateOfBirth;
            $submittedForm['preferred_contact'] = trim(filter_var($_POST["editPreferredContact"], FILTER_SANITIZE_STRING));
            $submittedForm['discount'] = trim(filter_var($_POST["editDiscount"], FILTER_SANITIZE_STRING));
            $submittedForm['dunhill_discount'] = $emptyString;
            $submittedForm['store'] = trim(filter_var($_POST["editStoreSelection"], FILTER_SANITIZE_STRING));
            $submittedForm['create_date'] = $_POST["editCreateDate"];
            $submittedForm['modify_date'] = date('Y-m-d H:i:s');
            $submittedForm['modify_by'] = $_SESSION["first_name"] . ' ' . $_SESSION["last_name"];

            $customerData = array(
                'person_id' => $_POST["editCustomerId"],
                'first_name' => $submittedForm['first_name'],
                'last_name' => $submittedForm['last_name'],
                'chinese_name' => $submittedForm['chinese_name'],
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
                'nric' => $submittedForm['nric'],
                'title' => $submittedForm['title'],
                'company_name' => $submittedForm['company_name'],
                'nationality' => $submittedForm['nationality'],
                'birthday' => $submittedForm['birthday'],
                'preferred_contact' => $submittedForm['preferred_contact'],
                'discount' => $submittedForm["discount"],
                'dunhill_discount' => $submittedForm['dunhill_discount'],
                'store' => $submittedForm["store"],
                'create_date' => $submittedForm['create_date'],
                'modify_date' => $submittedForm['modify_date'],
                'modify_by' => $submittedForm["modify_by"],
            );

            $response = CustomerModel::mdlEditCustomer($customerData);

            if (!$response) {
                echo '<script>
                    swal({

                        type: "error",
                        title: "An error has occurred. Please contact your system administrator.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "customer-management";
                            }
                    });
                    </script>';
                return;
            } else {
                echo '<script>

                            swal({
                                type: "success",
                                title: "Customer edited succesfully! '.' '. $response.'",
                                showConfirmButton: true,
                                confirmButtonText: "Close"

                            }).then(function(result){

                                if(result.value){

                                    window.location = "customer-management";
                                }

                            });

                            </script>';

                return;
            }
        }
    }

    public static function ctrDeleteCustomer()
    {
        if (isset($_GET["archiveCustomerIdToDelete"])) {
            $customerData = array(
                'person_id' => filter_var($_GET['archiveCustomerIdToDelete'], FILTER_SANITIZE_NUMBER_INT)
            );

            $response = CustomerModel::mdlDeleteCustomer($customerData);

            if ($response) {
                echo '<script>

						swal({
							type: "success",
							title: "Customer deleted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "customer-archives";
							}

						});

                        </script>';
            } else {
                echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. The customer was not deleted.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "customer-archives";
                            }
                    });
                </script>';
            }
        }

        if (isset($_GET["customerIdToDelete"])) {
            $customerData = array(
                'person_id' => filter_var($_GET['customerIdToDelete'], FILTER_SANITIZE_NUMBER_INT)
            );

            $response = CustomerModel::mdlDeleteCustomer($customerData);

            if ($response) {
                echo '<script>

						swal({
							type: "success",
							title: "Customer deleted succesfully.",
							showConfirmButton: true,
							confirmButtonText: "Close"

						}).then(function(result){

							if(result.value){

								window.location = "customer-management";
							}

						});

                        </script>';
            } else {
                echo '<script>
                    swal({

                        type: "error",
                        title: "An error occurred. The customer was not deleted.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "customer-management";
                            }
                    });
                </script>';
            }
        }
    }
}
