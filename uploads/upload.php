<?php
/*
 * jQuery File Upload Plugin PHP Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */
session_start();

error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
$user_filedirectory = $_SESSION['personIdToUpload'].'/';
$options = array(
    'upload_dir' => $user_filedirectory,
    'upload_url' => 'uploads/'.$user_filedirectory
);

$upload_handler = new UploadHandler($options, true, null);