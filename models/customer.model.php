<?php

require_once "connection.php";

class CustomerModel
{

    public static function mdlViewAllCustomers($table, $item, $value)
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

    public static function mdlViewCustomerByPersonId($customerId)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM customers JOIN people ON customers.person_id = people.person_id WHERE customers.person_id = :person_id");
        $stmt->bindParam(":person_id", $customerId, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetch();

        $stmt->close();
        $stmt = null;
    }

    public static function mdlCreateNewCustomer($customerData)
    {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $response = PeopleModel::mdlCreateNewPerson($conn, $customerData);
            $new_person_id = (int) $response['person_id'];

            $table = 'customers';
            $stmt = $conn->prepare("INSERT INTO $table(nric, title, person_id, account_number, company_name, designation, nationality, birthday, preferred_contact, discount, dunhill_discount, store, taxable, deleted, create_date, modify_date, modify_by) VALUES(:nric, :title, :person_id, :account_number, :company_name, :designation, :nationality, :birthday, :preferred_contact, :discount, :dunhill_discount, :store, :taxable, :deleted, :create_date, :modify_date, :modify_by)");

            $stmt->bindParam(":nric", $customerData["nric"], PDO::PARAM_STR);
            $stmt->bindParam(":title", $customerData["title"], PDO::PARAM_STR);
            $stmt->bindParam(":person_id", $new_person_id, PDO::PARAM_INT);
            $stmt->bindValue(":account_number", null, PDO::PARAM_STR);
            $stmt->bindParam(":company_name", $customerData["company_name"], PDO::PARAM_STR);
            $stmt->bindParam(":designation", $customerData["designation"], PDO::PARAM_STR);
            $stmt->bindParam(":nationality", $customerData["nationality"], PDO::PARAM_STR);
            if ($customerData["birthday"] == "") {
                $stmt->bindValue(":birthday", null, PDO::PARAM_STR);
            } else {
                $stmt->bindParam(":birthday", $customerData["birthday"], PDO::PARAM_STR);
            }
            $stmt->bindParam(":preferred_contact", $customerData["preferred_contact"], PDO::PARAM_STR);
            $stmt->bindParam(":discount", $customerData["discount"], PDO::PARAM_STR);
            $stmt->bindParam(":dunhill_discount", $customerData["dunhill_discount"], PDO::PARAM_STR);
            $stmt->bindParam(":store", $customerData["store"], PDO::PARAM_STR);
            $taxable = 1;
            $stmt->bindParam(":taxable", $taxable, PDO::PARAM_INT);
            $deleted = 0;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":create_date", $customerData["create_date"], PDO::PARAM_STR);
            $stmt->bindParam(":modify_date", $customerData["modify_date"], PDO::PARAM_STR);
            $stmt->bindParam(":modify_by", $customerData["modify_by"], PDO::PARAM_STR);

            $stmt->execute();

            $conn->commit();

            return $new_person_id;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public static function mdlEditCustomer($customerData)
    {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $response = PeopleModel::mdlEditPerson($conn, $customerData);

            $table = 'customers';

            $stmt = Connection::connect()->prepare("UPDATE $table SET nric = :nric, title = :title, account_number = :account_number, company_name = :company_name, designation = :designation, nationality = :nationality, birthday = :birthday, preferred_contact = :preferred_contact, discount = :discount, dunhill_discount = :dunhill_discount, store = :store, taxable = :taxable, deleted = :deleted, create_date = :create_date, modify_date = :modify_date, modify_by = :modify_by WHERE person_id = :person_id");

            $stmt->bindParam(":person_id", $customerData["person_id"], PDO::PARAM_INT);
            $stmt->bindParam(":nric", $customerData["nric"], PDO::PARAM_STR);
            $stmt->bindParam(":title", $customerData["title"], PDO::PARAM_STR);
            $stmt->bindValue(":account_number", null, PDO::PARAM_STR);
            $stmt->bindParam(":company_name", $customerData["company_name"], PDO::PARAM_STR);
            $stmt->bindParam(":designation", $customerData["designation"], PDO::PARAM_STR);
            $stmt->bindParam(":nationality", $customerData["nationality"], PDO::PARAM_STR);
            if ($customerData["birthday"] == "") {
                $stmt->bindValue(":birthday", null, PDO::PARAM_STR);
            } else {
                $stmt->bindParam(":birthday", $customerData["birthday"], PDO::PARAM_STR);
            }
            $stmt->bindParam(":preferred_contact", $customerData["preferred_contact"], PDO::PARAM_STR);
            $stmt->bindParam(":discount", $customerData["discount"], PDO::PARAM_STR);
            $stmt->bindParam(":dunhill_discount", $customerData["dunhill_discount"], PDO::PARAM_STR);
            $stmt->bindParam(":store", $customerData["store"], PDO::PARAM_STR);
            $taxable = 1;
            $stmt->bindParam(":taxable", $taxable, PDO::PARAM_INT);
            $deleted = 0;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":create_date", $customerData["create_date"], PDO::PARAM_STR);
            $stmt->bindParam(":modify_date", $customerData["modify_date"], PDO::PARAM_STR);
            $stmt->bindParam(":modify_by", $customerData["modify_by"], PDO::PARAM_STR);

            $stmt->execute();

            $conn->commit();

            return true;

        } catch (Exception $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

    public static function mdlDeleteCustomer($customerData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("UPDATE customers SET deleted = :deleted WHERE person_id = :person_id");
            $deleted = 1;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":person_id", $customerData["person_id"], PDO::PARAM_INT);

            $stmt->execute();

            $conn->commit();

            return true;

        } catch (PDOException $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
    }

}
