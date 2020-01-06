<?php

require_once "connection.php";

class SupplierModel
{

    public static function mdlViewAllSuppliers($table, $item, $value)
    {

        if ($item != null) {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table JOIN people ON people.person_id = $table.person_id WHERE $item = :$item");
            $stmt->bindParam(":" . $item, $value, PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetch();
        } else {
            $stmt = Connection::connect()->prepare("SELECT * FROM $table JOIN people ON people.person_id = $table.person_id AND deleted = ? ORDER BY company_name ASC");
            $stmt->execute([0]);

            return $stmt->fetchAll();
        }

        $stmt->close();
        $stmt = null;
    }

    public static function mdlViewSupplierByPersonId($table, $personId) {

        $stmt = Connection::connect()->prepare("SELECT * FROM $table JOIN people ON $table.person_id = people.person_id WHERE $table.person_id = :person_id AND $table.deleted = :deleted");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $deleted = 0;
        $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCreateNewSupplier($supplierData) {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $response = PeopleModel::mdlCreateNewPerson($conn, $supplierData);
            $new_person_id = (int) $response['person_id'];

            $table = 'suppliers';
            $stmt = Connection::connect()->prepare("INSERT INTO $table (person_id, company_name, account_number, deleted) VALUES (:person_id, :company_name, :account_number, :deleted)");
        
            $stmt->bindParam(":person_id", $new_person_id, PDO::PARAM_INT);
            $stmt->bindParam(":company_name", $supplierData["company_name"], PDO::PARAM_STR);
            $stmt->bindParam(":account_number", $supplierData["account_number"], PDO::PARAM_STR);
            $deleted = 0; //set not deleted by default
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);

            $stmt->execute();

            $conn->commit();

            return $new_person_id;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public static function mdlEditSupplier($supplierData) {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $response = PeopleModel::mdlEditPerson($conn, $supplierData);

            $table = 'suppliers';

            $stmt = Connection::connect()->prepare("UPDATE $table SET company_name = :company_name, account_number = :account_number WHERE person_id = :person_id");

            $stmt->bindParam(":person_id", $supplierData['person_id'], PDO::PARAM_STR);
            $stmt->bindParam(":company_name", $supplierData['company_name'], PDO::PARAM_STR);
            $stmt->bindParam(":account_number", $supplierData['account_number'], PDO::PARAM_STR);

            $stmt->execute();

            $conn->commit();

            return true;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public static function mdlDeleteSupplier($supplierData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("UPDATE suppliers SET deleted = :deleted WHERE person_id = :person_id");
            $deleted = 1;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":person_id", $supplierData["person_id"], PDO::PARAM_INT);

            $stmt->execute();

            $conn->commit();

            return true;

        } catch (PDOException $e) {
            $conn->rollBack();
            return false;
        }

        return false;
    }
}