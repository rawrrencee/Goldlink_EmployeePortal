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

    public static function mdlCheckEmployeePermissionExists($employeeData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("SELECT * FROM employees_modules WHERE person_id = :person_id AND module_title = :module_title");

        $stmt->bindParam(":person_id", $employeeData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":module_title", $employeeData["module_title"], PDO::PARAM_INT);

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

    public static function mdlCreateNewEmployee($personData, $allowedModules)
    {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $response = PeopleModel::mdlCreateNewPerson($conn, $personData);
            $new_person_id = (int) $response['person_id'];

            //Password Hashing
            $dirtyPassword = $personData["password"];
            $cleanPassword = password_hash($dirtyPassword, PASSWORD_BCRYPT);

            $stmt = $conn->prepare("INSERT INTO employees(username, password, person_id, deleted) VALUES (:username, :password, :person_id, :deleted)");

            $stmt->bindParam(":username", $personData["username"], PDO::PARAM_STR);
            $stmt->bindParam(":password", $cleanPassword, PDO::PARAM_STR);
            $stmt->bindParam(":person_id", $new_person_id, PDO::PARAM_INT);
            $deleted = 0; //set not deleted by default
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

            $stmt->execute();

            foreach ($allowedModules as $index => $module) {
                $allowedModuleData = array(
                    'person_id' => $new_person_id,
                    'module_title' => $module);

                self::mdlCreateEmployeePermissions($conn, $allowedModuleData);
            }

            $conn->commit();

            return true;

        } catch (Exception $e) {

            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
        return false;
    }

    public static function mdlCreateEmployeePermissions($conn, $allowedModuleData)
    {
        $stmt = $conn->prepare("INSERT INTO employees_modules(person_id, module_title, active) VALUES (:person_id, :module_title, :active)");

        $stmt->bindParam(":person_id", $allowedModuleData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":module_title", $allowedModuleData["module_title"], PDO::PARAM_STR);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlDeleteAllEmployeePermissions($employeeData)
    {
        $table = 'employees_modules';
        $person_id = $employeeData['person_id'];

        $deleteStmt = $conn->prepare("DELETE FROM $table WHERE person_id = :person_id");
        $deleteStmt->bindParam(":person_id", $person_id, PDO::PARAM_INT);
        $deleteStmt->execute();
    }

    public static function mdlEditEmployee($table, $employeeData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        if ($employeeData["edit_password"] == 1) {

            //Password Hashing
            $dirtyPassword = $employeeData["password"];
            $cleanPassword = password_hash($dirtyPassword, PASSWORD_BCRYPT);

            $stmt = $conn->prepare("UPDATE $table SET username = :username, `password` = :cleanPassword WHERE person_id = :person_id");

            try {
                $conn->beginTransaction();

                $stmt->bindParam(":username", $employeeData["username"], PDO::PARAM_STR);
                $stmt->bindParam(":cleanPassword", $cleanPassword, PDO::PARAM_STR);
                $stmt->bindParam(":person_id", $employeeData["person_id"], PDO::PARAM_INT);

                $stmt->execute();
                $conn->commit();

                return true;

            } catch (PDOException $e) {
                $conn->rollBack();
                return false;
            }

        } else {

            $stmt = $conn->prepare("UPDATE $table SET username = :username WHERE person_id = :person_id");

            try {
                $conn->beginTransaction();

                $stmt->bindParam(":username", $employeeData["username"], PDO::PARAM_STR);
                $stmt->bindParam(":person_id", $employeeData["person_id"], PDO::PARAM_INT);

                $stmt->execute();
                $conn->commit();

                return true;

            } catch (PDOException $e) {
                $conn->rollBack();
                return false;
            }

        }

        return false;
    }

}
