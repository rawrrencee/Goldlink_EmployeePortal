<?php

class ItemController
{

    public static function ctrViewAllItems()
    {
        $response = ItemModel::mdlViewAllItems();

        return $response;
    }

    public static function ctrViewAllCategories()
    {
        $response = ItemModel::mdlViewAllCategories();

        return $response;
    }

    public static function ctrCreateItem()
    {

        if (isset($_POST["newItemNumber"])) {
            if (preg_match('/^[-0-9A-Za-z@._,\/\- ]+$/', $_POST["newItemNumber"])) {

                $newItemNumber = trim(filter_var($_POST["newItemNumber"], FILTER_SANITIZE_STRING));
                $results = ItemModel::mdlViewItemByItemNumber($newItemNumber);

                if (count($results) > 0) {
                    echo '<script>
                    swal({
                        type: "error",
                        title: "Item Number already exists. Please use another item number.",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){
                    });
                    </script>';

                    return;
                }

                $submittedForm['name'] = trim(filter_var($_POST['newItemName'], FILTER_SANITIZE_STRING));
                $submittedForm['category'] = trim(filter_var($_POST['newCategory'], FILTER_SANITIZE_STRING));
                $submittedForm['supplier_id'] = trim(filter_var($_POST['newSupplierId'], FILTER_SANITIZE_STRING));
                $submittedForm['item_number'] = trim(filter_var($_POST['newItemNumber'], FILTER_SANITIZE_STRING));
                $submittedForm['description'] = trim(filter_var($_POST['newDescription'], FILTER_SANITIZE_STRING));
                $submittedForm['cost_price'] = number_format(floatval(trim(filter_var($_POST['newCostPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');
                $submittedForm['unit_price'] = number_format(floatval(trim(filter_var($_POST['newUnitPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');
                $submittedForm['factory_id'] = trim(filter_var($_POST['newFactoryId'], FILTER_SANITIZE_STRING));

                //echo "<script type='text/javascript'> alert('" . json_encode($submittedForm) . "') </script>";

                $table = 'items';
                $emptyString = "";
                $defaultValue = 0;
                $itemData = array('name' => $submittedForm["name"],
                    'category' => $submittedForm["category"],
                    'supplier_id' => $submittedForm["supplier_id"],
                    'item_number' => $submittedForm["item_number"],
                    'description' => $submittedForm["description"],
                    'cost_price' => $submittedForm["cost_price"],
                    'unit_price' => $submittedForm["unit_price"],
                    'reorder_level' => $defaultValue,
                    'location' => $emptyString,
                    'allow_alt_description' => $defaultValue,
                    'is_serialized' => $defaultValue,
                    'factory_id' => $submittedForm["factory_id"]);

                $newStoreSelections = $_POST["newStoreSelections"];
                $newItemQuantities = $_POST["newItemQuantities"];

                $response = ItemModel::mdlCreateNewItem($itemData, $newStoreSelections, $newItemQuantities);
                //echo "<script type='text/javascript'> alert('" . json_encode($response) . "') </script>";

                if (!strstr($response, 'Exception')) {

                    //Create Folder Directory
                    $folder = "uploads/items/" . $response;

                    if (!file_exists($folder)) {
                        mkdir($folder, 0755);
                    }

                    if (isset($_FILES["newItemImage"]["tmp_name"])) {

                        list($width, $height) = getimagesize($_FILES["newItemImage"]["tmp_name"]);

                        $newWidth = 500;
                        $newHeight = 500;

                        if ($_FILES["newItemImage"]["type"] == "image/jpeg" || $_FILES["newItemImage"]["type"] == "image/jpg") {

                            $filename = "item";

                            $photo = $folder . "/" . $filename . ".jpg";

                            $srcImage = imagecreatefromjpeg($_FILES["newItemImage"]["tmp_name"]);

                            $destination = imagecreatetruecolor($newWidth, $newHeight);

                            imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                            imagejpeg($destination, $photo);

                        }

                        if ($_FILES["newItemImage"]["type"] == "image/png") {

                            $filename = "item";

                            $photo = $folder . "/" . $filename . ".png";

                            $srcImage = imagecreatefrompng($_FILES["newItemImage"]["tmp_name"]);

                            $destination = imagecreatetruecolor($newWidth, $newHeight);

                            imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                            imagepng($destination, $photo);
                        }
                    }
                }

                if (strstr($response, 'Exception')) {
                    echo '<script>
                    swal({

                        type: "error",
                        title: "An error has occurred: ' . $response . '",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                        }).then(function(result){

                            if(result.value){

                                window.location = "item-management";
                            }
                    });
                    </script>';

                } else {
                    echo '<script>

                    swal({
                        type: "success",
                        title: "Item added succesfully!",
                        showConfirmButton: true,
                        confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-management";
                        }

                    });

                    </script>';
                }
            }
        }
    }

    public static function ctrEditItem()
    {

        if (isset($_POST['editItemId'])) {
            //echo "<script type='text/javascript'> alert('" . json_encode($_POST) . "') </script>";

            $itemId = (int) filter_var((int) $_POST['editItemId'], FILTER_SANITIZE_NUMBER_INT);

            $submittedForm['name'] = trim(filter_var($_POST['editItemName'], FILTER_SANITIZE_STRING));
            $submittedForm['category'] = trim(filter_var($_POST['editCategory'], FILTER_SANITIZE_STRING));
            $submittedForm['supplier_id'] = trim(filter_var($_POST['editSupplierId'], FILTER_SANITIZE_STRING));
            $submittedForm['item_number'] = trim(filter_var($_POST['editItemNumber'], FILTER_SANITIZE_STRING));
            $submittedForm['description'] = trim(filter_var($_POST['editDescription'], FILTER_SANITIZE_STRING));
            $submittedForm['cost_price'] = number_format(floatval(trim(filter_var($_POST['editCostPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');
            $submittedForm['unit_price'] = number_format(floatval(trim(filter_var($_POST['editUnitPrice'], FILTER_SANITIZE_STRING))), 2, '.', '');
            $submittedForm['factory_id'] = trim(filter_var($_POST['editFactoryId'], FILTER_SANITIZE_STRING));

            // UPDATE ITEM FIRST
            $itemData = array(
                'item_id' => $itemId,
                'item_number' => $submittedForm['item_number'],
                'factory_id' => $submittedForm['factory_id'],
                'name' => $submittedForm['name'],
                'category' => $submittedForm['category'],
                'cost_price' => $submittedForm['cost_price'],
                'unit_price' => $submittedForm['unit_price'],
                'description' => $submittedForm['description'],
                'supplier_id' => (int) $submittedForm['supplier_id']);

            // UPDATE STORE ITEM INFORMATION
            $updateStoreActive = $_POST['updateStoreActive'];
            $updateStoreSelection = $_POST['updateStoreSelection'];
            $updateStoreQuantity = $_POST['updateStoreQuantity'];

            // ADD STORES+QTY IF NOT ALREADY EXISTING (ELSE FAIL)
            $editStoreSelections = $_POST["editStoreSelections"];
            $editItemQuantities = $_POST["editItemQuantities"];

            $response = ItemModel::mdlEditItem($itemData, $updateStoreActive, $updateStoreSelection, $updateStoreQuantity, $editStoreSelections, $editItemQuantities);

            if (!strstr($response, 'Exception')) {

                //Create Folder Directory
                $folder = "uploads/items/" . $response;

                if (!file_exists($folder)) {
                    mkdir($folder, 0755);
                }

                if (isset($_FILES["newItemImage"]["tmp_name"])) {

                    list($width, $height) = getimagesize($_FILES["newItemImage"]["tmp_name"]);

                    $newWidth = 500;
                    $newHeight = 500;

                    if ($_FILES["newItemImage"]["type"] == "image/jpeg" || $_FILES["newItemImage"]["type"] == "image/jpg") {

                        $filename = "item";

                        $photo = $folder . "/" . $filename . ".jpg";

                        $srcImage = imagecreatefromjpeg($_FILES["newItemImage"]["tmp_name"]);

                        $destination = imagecreatetruecolor($newWidth, $newHeight);

                        imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                        imagejpeg($destination, $photo);

                    }

                    if ($_FILES["newItemImage"]["type"] == "image/png") {

                        $filename = "item";

                        $photo = $folder . "/" . $filename . ".png";

                        $srcImage = imagecreatefrompng($_FILES["newItemImage"]["tmp_name"]);

                        $destination = imagecreatetruecolor($newWidth, $newHeight);

                        imagecopyresized($destination, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                        imagepng($destination, $photo);

                        $image = imagecreatefrompng($photo);
                        $bg = imagecreatetruecolor(imagesx($image), imagesy($image));
                        imagefill($bg, 0, 0, imagecolorallocate($bg, 255, 255, 255));
                        imagealphablending($bg, true);
                        imagecopy($bg, $image, 0, 0, 0, 0, imagesx($image), imagesy($image));
                        imagedestroy($image);
                        $quality = 100; // 0 = worst / smaller file, 100 = better / bigger file
                        imagejpeg($bg, $photo . ".jpg", $quality);
                        imagedestroy($bg);
                    }
                }
            }

            if (strstr($response, 'Exception')) {
                echo "<script type='text/javascript'> alert('" . json_encode($response) . "') </script>";

                echo '<script>
                swal({

                    type: "error",
                    title: "An error has occurred: ' . $response . '",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                    }).then(function(result){

                        if(result.value){

                            window.location = "item-management";
                        }
                });
                </script>';

            } else {
                echo '<script>

                swal({
                    type: "success",
                    title: "Item updated succesfully!",
                    showConfirmButton: true,
                    confirmButtonText: "Close"

                }).then(function(result){

                    if(result.value){

                        window.location = "item-management";
                    }

                });

                </script>';
            }
            return;
        }
    }

    public static function ctrViewItemByItemId($value)
    {
        $table = 'items';
        $response = ItemModel::mdlViewItemByItemId($table, $value);

        return $response;
    }

    public static function ctrViewStoresWithItem($value)
    {
        $table = 'stores_items';
        $response = ItemModel::mdlViewStoresWithItem($table, $value);

        return $response;
    }

    public static function ctrViewItemWithStoreData($value)
    {
        $table = 'items';
        $response = ItemModel::mdlViewItemWithStoreData($table, $value);

        return $response;
    }

}
