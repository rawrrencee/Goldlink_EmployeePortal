<?php

class ItemKitController
{

    public static function ctrViewItemKitByItemKitId($value)
    {

        $table = 'item_kits';
        $response = ItemKitModel::mdlViewItemKitByItemKitId($table, $value);

        return $response;
    }

    public static function ctrViewAllCategories()
    {
        $response = ItemKitModel::mdlViewAllCategories();

        return $response;
    }

    public static function ctrViewAllItemKitsByItemKitNumber($array)
    {

        $table = 'item_kits';
        $item_kit_number = $array['item_kit_number'];
        $response = ItemKitModel::mdlViewAllItemKitsByItemKitNumber($item_kit_number);

        return $response;
    }

    public static function ctrRetrieveDuplicateItemKitsByItemKitId($value)
    {
        $array = self::ctrViewItemKitByItemKitId($value);
        $response = self::ctrViewAllItemKitsByItemKitNumber($array);

        return $response;
    }

    public static function ctrRetrieveItemKitItemsByItemKitId($value)
    {

        $table = 'item_kit_items';
        $response = ItemKitModel::mdlViewItemKitItemsByItemKitId($table, $value);

        return $response;
    }

    public static function ctrRetrieveStoreItemDetails($store_id, $item_kit_id)
    {

        $response = ItemKitModel::mdlRetrieveStoreItemsByItemKitId($store_id, $item_kit_id);

        return $response;
    }

    public static function ctrCreateItemKit()
    {
        if (isset($_POST["newItemKitNumber"])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $submittedForm['item_kit_number'] = trim(filter_var($_POST["newItemKitNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['name'] = trim(filter_var($_POST["newItemKitName"], FILTER_SANITIZE_STRING));
            $submittedForm['description'] = trim(filter_var($_POST["newItemKitDescription"], FILTER_SANITIZE_STRING));
            $submittedForm['category'] = trim(filter_var($_POST["newCategory"], FILTER_SANITIZE_STRING));
            $submittedForm['cost_price'] = number_format(floatval(trim(filter_var($_POST['newCostPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');$submittedForm['item_kit_number'] = trim(filter_var($_POST["newItemKitNumber"], FILTER_SANITIZE_STRING));
            $submittedForm['unit_price'] = number_format(floatval(trim(filter_var($_POST['newUnitPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');$submittedForm['item_kit_number'] = trim(filter_var($_POST["newItemKitNumber"], FILTER_SANITIZE_STRING));

            $itemKitData = array(
                'item_kit_number' => $submittedForm['item_kit_number'],
                'name' => $submittedForm['name'],
                'description' => $submittedForm['description'],
                'category' => $submittedForm['category'],
                'cost_price' => $submittedForm['cost_price'],
                'unit_price' => $submittedForm['unit_price']
            );

            $newStoreSelections = $_POST['newStoreSelections'];
            $newItemKitItemIds = $_POST['newItemKitItemIds'];
            $newItemKitItemQuantities = $_POST['newItemKitItemQuantities'];

            $response = ItemKitModel::mdlCreateItemKit($itemKitData, $newStoreSelections, $newItemKitItemIds, $newItemKitItemQuantities);

            echo "<script type='text/javascript'> alert('response:" . json_encode($response)."') </script>";

            if (!strstr($response, 'Exception')) {

                //Create Folder Directory
                $folder = "uploads/item-kits/" . $submittedForm['item_kit_number'];

                if (!file_exists($folder)) {
                    mkdir($folder, 0755);
                }

                if (isset($_FILES["newItemKitImage"]["tmp_name"])) {

                    list($width, $height) = getimagesize($_FILES["newItemKitImage"]["tmp_name"]);

                    $newWidth = 500;
                    $newHeight = 500;

                    if ($_FILES["newItemKitImage"]["type"] == "image/jpeg" || $_FILES["newItemKitImage"]["type"] == "image/jpg") {

                        $filename = "item-kit";

                        $photo = $folder . "/" . $filename . ".jpg";

                        $srcImage = imagecreatefromjpeg($_FILES["newItemKitImage"]["tmp_name"]);

                        $destination = imagecreatetruecolor($newWidth, $newHeight);

                        imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                        imagejpeg($destination, $photo);

                    }

                    if ($_FILES["newItemKitImage"]["type"] == "image/png") {

                        $filename = "item-kit";

                        $photo = $folder . "/" . $filename . ".png";

                        $srcImage = imagecreatefrompng($_FILES["newItemKitImage"]["tmp_name"]);

                        $destination = imagecreatetruecolor($newWidth, $newHeight);

                        imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                        imagepng($destination, $photo);
                    }
                }
            }

            if (!strstr($response, 'Exception')) {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item Kit added succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-kit-management";
                    }

                });

                </script>';

                return;
            } else {
                echo '<script>
                swal({

                    type: "error",
                    title: "There was an issue creating the item kit. Please check the records before adding again.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-kit-management";
                        }
                });
                </script>';
                return;
            }

        }
    }

    public static function ctrEditItemKit()
    {
        if (isset($_POST['editItemKitId'])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            //SET DETAILS OF CURRENT ITEM KIT (BEFORE EDIT)
            $currentItemKitNumber = filter_var($_POST['currentItemKitNumber'], FILTER_SANITIZE_STRING);
            $item_kit_id = $_POST['editItemKitId'];

            //SET DETAILS OF ITEMS ALREADY AVAILABLE IN ITEM KIT
            $updateItemKitItemIds = $_POST['updateItemKitItemIds'];
            $updateItemActive = $_POST['updateItemActive'];
            $updateItemKitItemQuantities = $_POST['updateItemKitItemQuantities'];

            //SET DETAILS OF ITEMS TO BE ADDED TO ITEM KIT
            $editItemKitItemIds = $_POST['editItemKitItemIds'];
            $editItemKitItemQuantities = $_POST['editItemKitItemQuantities'];

            //SET DETAILS OF STORES THAT ALREADY HAVE THE ITEM KIT
            $updateStoreActive = $_POST['updateStoreActive'];
            $updateStoreSelection = $_POST['updateStoreSelection'];

            //SET DETAILS OF STORES TO ADD THE ITEM KIT TO
            $editStoreSelections = $_POST['editStoreSelections'];
            $editItemKitData = array(
                'item_kit_number' => trim(filter_var($_POST['editItemKitNumber'], FILTER_SANITIZE_STRING)),
                'name' => trim(filter_var($_POST['editItemKitName'], FILTER_SANITIZE_STRING)),
                'description' => trim(filter_var($_POST['editItemKitDescription'], FILTER_SANITIZE_STRING)),
                'category' => trim(filter_var($_POST['editCategory'], FILTER_SANITIZE_STRING)),
                'cost_price' => number_format(floatval(trim(filter_var($_POST['editCostPrice'], FILTER_SANITIZE_STRING))), 2, '.', ''),
                'unit_price' => number_format(floatval(trim(filter_var($_POST['editUnitPrice'], FILTER_SANITIZE_STRING))), 2, '.', ''),
                'store_id' => $storeId
            );

            //OVERALL STATUS

            //echo "<script type='text/javascript'> alert('" . json_encode($editItemKitItemIds) . "') </script>";

            //1. FIND ALL ITEM KITS WITH THE SAME ITEM KIT NUMBER & NOT DELETED
            $table = 'item_kits';
            $sameItemKits = ItemKitModel::mdlViewAllItemKitsByItemKitNumber($table, $currentItemKitNumber);

            $response = ItemKitModel::mdlUpdateItemKit($currentItemKitNumber, $updateItemKitItemIds, $updateItemActive, $updateItemKitItemQuantities, $editItemKitItemIds, $editItemKitItemQuantities, $updateStoreActive, $updateStoreSelection, $editStoreSelections, $editItemKitData);

            if ($response) {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item Kit edited succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-kit-management";
                    }

                });

                </script>';

                return;
            } else {
                echo '<script>
                swal({

                    type: "error",
                    title: "An unknown error has occurred. Please contact your system administrator.",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-kit-management";
                        }
                });
            </script>';
            }
        }
    }
}
