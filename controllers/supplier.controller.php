<?php

class SupplierController
{

    public static function ctrViewAllSuppliers($item, $value)
    {
        $table = "suppliers";
        $response = SupplierModel::mdlViewAllSuppliers($table, $item, $value);

        return $response;
    }

    public static function ctrViewSupplierByPersonId($personId)
    {
        $table = 'suppliers';
        $response = SupplierModel::mdlViewSupplierByPersonId($table, $personId);

        return $response;
    }

    public static function ctrCreateSupplier()
    {

        if (isset($_POST["newCompanyName"])) {
            if (preg_match('/^[-0-9A-Za-z@._ ]+$/', $_POST["newCompanyName"])) {

                $emptyString = "";
                $supplierData = array('first_name' => $emptyString,
                    'last_name' => $emptyString,
                    'chinese_name' => $emptyString,
                    'date_of_birth' => $emptyString,
                    'gender' => $emptyString,
                    'nationality' => $emptyString,
                    'designation' => $emptyString,
                    'email' => $_POST["newEmail"],
                    'mobile_number' => $_POST["newMobileNumber"],
                    'phone_number' => $_POST["newPhoneNumber"],
                    'address_1' => $_POST["newAddress"],
                    'zip' => $_POST["newPostalCode"],
                    'duty_location' => $emptyString,
                    'bank_name' => $_POST["newBankName"],
                    'bank_acct' => $_POST["newAccountNumber"],
                    'commencement' => $emptyString,
                    'left_date' => $emptyString,
                    'comments' => $_POST["newComments"],
                    'emergency_name' => $emptyString,
                    'emergency_relation' => $emptyString,
                    'emergency_address' => $emptyString,
                    'emergency_contact' => $emptyString,
                    'company_name' => $_POST["newCompanyName"], 'account_number' => $_POST["newAccountNumber"]);

                //Debug with JS Alert
                //echo "<script type='text/javascript'> alert('".json_encode($response)."') </script>";

                //echo "<script type='text/javascript'> alert('".json_encode($supplierData)."') </script>";

                $response = SupplierModel::mdlCreateNewSupplier($supplierData);

                //echo "<script type='text/javascript'> alert('".json_encode($response)."') </script>";

                if ($response) {
                    echo '<script>

                    swal({
                        type: "success",
                        title: "Supplier added succesfully!",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "supplier-management";
                        }

                    });

                    </script>';

                    return;
                } else {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An unknown error has occurred.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "supplier-management";
                            }
                    });
                </script>';
                }
            } else {
                echo '<script>
                    swal({

                        type: "error",
                        title: "Please ensure that there are no special characters in the Company Name or Account Number.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "supplier-management";
                            }
                    });
                </script>';
            }
        }
    }

    public static function ctrEditSupplier()
    {

        if (isset($_POST['editSupplierId'])) {

            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $supplierId = $_POST['editSupplierId'];

            $emptyString = "";
            $supplierData = array(
                'person_id' => $supplierId,
                'first_name' => $emptyString,
                'last_name' => $emptyString,
                'chinese_name' => $emptyString,
                'date_of_birth' => $emptyString,
                'gender' => $emptyString,
                'nationality' => $emptyString,
                'designation' => $emptyString,
                'email' => $_POST["editEmail"],
                'mobile_number' => $_POST["editMobileNumber"],
                'phone_number' => $_POST["editPhoneNumber"],
                'address_1' => $_POST["editAddress"],
                'zip' => $_POST["editPostalCode"],
                'duty_location' => $emptyString,
                'bank_name' => $_POST["editBankName"],
                'bank_acct' => $_POST["editAccountNumber"],
                'commencement' => $emptyString,
                'left_date' => $emptyString,
                'comments' => $_POST["editComments"],
                'emergency_name' => $emptyString,
                'emergency_relation' => $emptyString,
                'emergency_address' => $emptyString,
                'emergency_contact' => $emptyString,
                'company_name' => $_POST["editCompanyName"], 'account_number' => $_POST["editAccountNumber"]);

            $response = SupplierModel::mdlEditSupplier($supplierData);

            if ($response) {
                echo '<script>

            swal({
                type: "success",
                title: "Supplier edited succesfully!",
                showConfirmButton: true,
                confirmButtonText: "Close"

            }).then(function(result){

                if(result.value){

                    window.location = "supplier-management";
                }

            });

            </script>';

                return;
            } else {
                echo '<script>
            swal({

                type: "error",
                title: "An unknown error has occurred.",
                showConfirmButton: true,
                confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "supplier-management";
                    }
            });
        </script>';
            }
        }

    }

    public static function ctrDeleteSupplier()
    {

    }
}
