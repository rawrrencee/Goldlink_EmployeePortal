<?php

require_once "connection.php";

class PeopleModel
{

    public static function mdlCreateNewPerson($conn, $personData)
    {
        $table = "people";
        $stmt = $conn->prepare("INSERT INTO $table(first_name, last_name, chinese_name, date_of_birth, gender, nationality, designation, email, mobile_number, phone_number, address_1, address_2, city, state, country, zip, duty_location, bank_name, bank_acct, commencement, left_date, comments, emergency_name, emergency_relation, emergency_address, emergency_contact) VALUES (:first_name, :last_name, :chinese_name, :date_of_birth, :gender, :nationality, :designation, :email, :mobile_number, :phone_number, :address_1, :address_2, :city, :state, :country, :zip, :duty_location, :bank_name, :bank_acct, :commencement, :left_date, :comments, :emergency_name, :emergency_relation, :emergency_address, :emergency_contact)");

        $stmt->bindParam(":first_name", $personData["first_name"], PDO::PARAM_STR);
        $stmt->bindParam(":last_name", $personData["last_name"], PDO::PARAM_STR);
        $stmt->bindParam(":chinese_name", $personData["chinese_name"], PDO::PARAM_STR);
        $stmt->bindParam(":date_of_birth", $personData["date_of_birth"], PDO::PARAM_STR);
        $stmt->bindParam(":gender", $personData["gender"], PDO::PARAM_STR);
        $stmt->bindParam(":nationality", $personData["nationality"], PDO::PARAM_STR);
        $stmt->bindParam(":designation", $personData["designation"], PDO::PARAM_STR);
        $stmt->bindParam(":email", $personData["email"], PDO::PARAM_STR);
        $stmt->bindParam(":mobile_number", $personData["mobile_number"], PDO::PARAM_STR);
        $stmt->bindParam(":phone_number", $personData["phone_number"], PDO::PARAM_STR);
        $stmt->bindParam(":address_1", $personData["address_1"], PDO::PARAM_STR);
        $stmt->bindParam(":zip", $personData["zip"], PDO::PARAM_STR);
        $stmt->bindParam(":duty_location", $personData["duty_location"], PDO::PARAM_STR);
        $stmt->bindParam(":bank_name", $personData["bank_name"], PDO::PARAM_STR);
        $stmt->bindParam(":bank_acct", $personData["bank_acct"], PDO::PARAM_STR);
        $stmt->bindParam(":commencement", $personData["commencement"], PDO::PARAM_STR);
        $stmt->bindParam(":left_date", $personData["left_date"], PDO::PARAM_STR);
        $stmt->bindParam(":comments", $personData["comments"], PDO::PARAM_STR);
        $stmt->bindParam(":emergency_name", $personData["emergency_name"], PDO::PARAM_STR);
        $stmt->bindParam(":emergency_relation", $personData["emergency_relation"], PDO::PARAM_STR);
        $stmt->bindParam(":emergency_address", $personData["emergency_address"], PDO::PARAM_STR);
        $stmt->bindParam(":emergency_contact", $personData["emergency_contact"], PDO::PARAM_STR);

        $emptyString = "";

        //UNUSED PARAMS
        $stmt->bindParam(":address_2", $emptyString, PDO::PARAM_STR);
        $stmt->bindParam(":city", $emptyString, PDO::PARAM_STR);
        $stmt->bindParam(":state", $emptyString, PDO::PARAM_STR);
        $stmt->bindParam(":country", $emptyString, PDO::PARAM_STR);

        $stmt->execute();

        $newPersonIdStmt = $conn->prepare("SELECT person_id FROM $table WHERE first_name = :first_name AND last_name = :last_name ORDER BY person_id DESC");
        $newPersonIdStmt->bindParam(":first_name", $personData["first_name"], PDO::PARAM_STR);
        $newPersonIdStmt->bindParam(":last_name", $personData["last_name"], PDO::PARAM_STR);

        $newPersonIdStmt->execute();

        $results = $newPersonIdStmt->fetch(PDO::FETCH_ASSOC);

        return $results;
    }

    public static function mdlEditPerson($table, $personData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("UPDATE $table SET first_name = :first_name, last_name = :last_name, chinese_name = :chinese_name, date_of_birth = :date_of_birth, gender = :gender, nationality = :nationality, designation = :designation, email = :email, mobile_number = :mobile_number, phone_number = :phone_number, address_1 = :address_1, zip = :zip, duty_location = :duty_location, bank_name = :bank_name, bank_acct = :bank_acct, commencement = :commencement, left_date = :left_date, comments = :comments, emergency_name = :emergency_name, emergency_relation = :emergency_relation, emergency_address = :emergency_address, emergency_contact = :emergency_contact WHERE person_id = :person_id");
        try {
            $conn->beginTransaction();
            $stmt->bindParam(":person_id", $personData["person_id"], PDO::PARAM_INT);

            $stmt->bindParam(":first_name", $personData["first_name"], PDO::PARAM_STR);
            $stmt->bindParam(":last_name", $personData["last_name"], PDO::PARAM_STR);
            $stmt->bindParam(":chinese_name", $personData["chinese_name"], PDO::PARAM_STR);
            $stmt->bindParam(":date_of_birth", $personData["date_of_birth"], PDO::PARAM_STR);
            $stmt->bindParam(":gender", $personData["gender"], PDO::PARAM_STR);
            $stmt->bindParam(":nationality", $personData["nationality"], PDO::PARAM_STR);
            $stmt->bindParam(":designation", $personData["designation"], PDO::PARAM_STR);
            $stmt->bindParam(":email", $personData["email"], PDO::PARAM_STR);
            $stmt->bindParam(":mobile_number", $personData["mobile_number"], PDO::PARAM_STR);
            $stmt->bindParam(":phone_number", $personData["phone_number"], PDO::PARAM_STR);
            $stmt->bindParam(":address_1", $personData["address_1"], PDO::PARAM_STR);
            $stmt->bindParam(":zip", $personData["zip"], PDO::PARAM_STR);
            $stmt->bindParam(":duty_location", $personData["duty_location"], PDO::PARAM_STR);
            $stmt->bindParam(":bank_name", $personData["bank_name"], PDO::PARAM_STR);
            $stmt->bindParam(":bank_acct", $personData["bank_acct"], PDO::PARAM_STR);
            $stmt->bindParam(":commencement", $personData["commencement"], PDO::PARAM_STR);
            $stmt->bindParam(":left_date", $personData["left_date"], PDO::PARAM_STR);
            $stmt->bindParam(":comments", $personData["comments"], PDO::PARAM_STR);
            $stmt->bindParam(":emergency_name", $personData["emergency_name"], PDO::PARAM_STR);
            $stmt->bindParam(":emergency_relation", $personData["emergency_relation"], PDO::PARAM_STR);
            $stmt->bindParam(":emergency_address", $personData["emergency_address"], PDO::PARAM_STR);
            $stmt->bindParam(":emergency_contact", $personData["emergency_contact"], PDO::PARAM_STR);

            $stmt->execute();
            $conn->commit();

            return true;

        } catch (PDOException $e) {
            $conn->rollBack();
            return false;
        }
    }
}
