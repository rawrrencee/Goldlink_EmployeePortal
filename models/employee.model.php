<?php

require_once "connection.php";

class EmployeeModel
{

    public static function mdlViewAllEmployees($table, $item, $value)
    {

        if ($item != null) {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table JOIN people ON people.person_id = $table.person_id WHERE $item = :$item");
            $stmt->bindParam(":" . $item, $value, PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetch();
        } else {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table JOIN people ON people.person_id = $table.person_id AND deleted = ? ORDER BY last_name ASC");
            $stmt->execute([0]);

            return $stmt->fetchAll();
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCheckUsernameExists($table, $item, $value)
    {

        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE deleted = :deleted AND $item = :$item");
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
        $stmt->bindParam(":" . $item, $value, PDO::PARAM_STR);
        $stmt->execute();

        if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) {

            return true;
        } else {
            return false;
        }

        return true;
    }

    public static function mdlViewEmployeeByPersonId($personId)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM employees JOIN people ON employees.person_id = people.person_id WHERE employees.person_id = :person_id");
        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function updateMD5PasswordHash($passwordData)
    {

        $stmt = Connection::connect()->prepare("UPDATE employees SET `password` = :cleanPassword WHERE person_id = :person_id");

        $cleanPassword = password_hash($passwordData["legacy_password"], PASSWORD_BCRYPT);
        $stmt->bindParam(":cleanPassword", $cleanPassword, PDO::PARAM_STR);
        $stmt->bindParam(":person_id", $passwordData["person_id"], PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

}
