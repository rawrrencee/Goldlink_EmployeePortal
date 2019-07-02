<?php

class Connection {
    public static function connect() {
        $dbConnection = new PDO("mysql:host=localhost;dbname=goldlink_payroll", "root", "root");

        $dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $dbConnection;
    }
}