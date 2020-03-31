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
        $stmt->bindParam(":module_title", $employeeData["module_title"], PDO::PARAM_STR);

        $stmt->execute();

        if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) {

            return true;
        } else {
            return false;
        }
    }

    public static function mdlCheckEmployeeStoreExists($conn, $employeesStoresData)
    {
        $stmt = $conn->prepare("SELECT * FROM employees_stores WHERE person_id = :person_id AND store_id = :store_id");

        $stmt->bindParam(":person_id", $employeesStoresData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $employeesStoresData["store_id"], PDO::PARAM_STR);

        $stmt->execute();

        if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static function mdlCheckEmployeesTeamMemberExists($conn, $newEmployeesTeamData)
    {
        $stmt = $conn->prepare("SELECT * FROM employees_team WHERE leader_id = :leader_id AND member_id = :member_id");

        $stmt->bindParam(":leader_id", $newEmployeesTeamData["leader_id"], PDO::PARAM_INT);
        $stmt->bindParam(":member_id", $newEmployeesTeamData["member_id"], PDO::PARAM_INT);

        $stmt->execute();

        if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static function mdlCheckEmployeesDetailExists($conn, $person_id)
    {
        $stmt = $conn->prepare("SELECT * FROM employees_detail WHERE person_id = :person_id");

        $stmt->bindParam(":person_id", $person_id, PDO::PARAM_INT);

        $stmt->execute();

        if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static function mdlViewEmployeeByPersonId($personId)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM employees JOIN people ON employees.person_id = people.person_id WHERE employees.person_id = :person_id");
        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch();
    }

    public static function mdlViewEmployeePermissions($personId)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM employees_modules WHERE person_id = :person_id AND active = :active");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewEmployeesTeam($personId)
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM employees_team JOIN people ON employees_team.member_id = people.person_id WHERE leader_id = :person_id AND active = :active");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewActiveEmployees()
    {
        $stmt = Connection::connect()->prepare("SELECT * FROM employees_detail JOIN people ON employees_detail.person_id = people.person_id WHERE employees_detail.active = :active");

        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewEmployeesSalesTarget($personId, $storeId, $month, $year)
    {
        $stmt = Connection::connect()->prepare("SELECT 
        employees_sales_target.record_id, employees_sales_target.sales_target, employees_sales_target.person_id, employees_sales_target.store_id, employees_sales_target.month, employees_sales_target.year,
        people.first_name, people.last_name, people.designation, stores.store_id, stores.store_name
        FROM employees_sales_target 
        JOIN people 
        ON employees_sales_target.person_id = people.person_id 
        JOIN stores 
        ON employees_sales_target.store_id = stores.store_id 
        WHERE employees_sales_target.person_id = :person_id 
        AND employees_sales_target.store_id = :store_id 
        AND employees_sales_target.month = :month 
        AND employees_sales_target.year = :year");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
        $stmt->bindParam(":month", $month, PDO::PARAM_INT);
        $stmt->bindParam(":year", $year, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewEmployeeCurrentSales($personId, $storeId, $month, $year)
    {
        try {
            $stmt = Connection::connect()->prepare("SELECT SUM(total_sales) as total_sales
            FROM(
            (
            SELECT SUM( CAST( quantity_purchased * item_unit_price * 
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s 
            INNER JOIN sales_items ON s.sale_id = sales_items.sale_id 
            INNER JOIN stores ON s.store_id = stores.store_id 
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id 
            INNER JOIN items ON sales_items.item_id = items.item_id  
            WHERE YEAR(sale_time) = :year AND MONTH(sale_time) = :month AND s.store_id = :store_id AND s.employee_id = :person_id AND payment_amount != '0' AND discount_percent != '100'
            GROUP BY employee_id
            )
            UNION ALL
            (
            SELECT SUM( CAST( quantity_purchased * item_kit_unit_price * 
            ( ( 100 - discount_percent ) /100 ) AS DECIMAL( 6, 2 ) ) ) AS total_sales, employee_id
            FROM sales s 
            INNER JOIN stores ON s.store_id = stores.store_id 
            INNER JOIN sales_item_kits ON s.sale_id = sales_item_kits.sale_id
            INNER JOIN item_kits ON sales_item_kits.item_kit_id = item_kits.item_kit_id
            INNER JOIN sales_payments ON s.sale_id = sales_payments.sale_id  
            WHERE YEAR(sale_time) = :year_temp AND MONTH(sale_time) = :month_temp AND s.store_id = :store_id_temp AND s.employee_id = :person_id_temp AND payment_amount != '0' AND discount_percent != '100' 
            GROUP BY employee_id
            ) 
            ) AS temp
            GROUP BY temp.employee_id"
            );
    
            $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":month", $month, PDO::PARAM_INT);
            $stmt->bindParam(":year", $year, PDO::PARAM_INT);

            $stmt->bindParam(":person_id_temp", $personId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id_temp", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":month_temp", $month, PDO::PARAM_INT);
            $stmt->bindParam(":year_temp", $year, PDO::PARAM_INT);
    
            $stmt->execute();
    
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {

            return "Exception: " . $e->getMessage();
        }

    }

    public static function mdlViewEmployeesSalesTargetbyMonthYear($storeId, $month, $year)
    {
        $stmt = Connection::connect()->prepare("SELECT employees_sales_target.sales_target, employees_sales_target.month, employees_sales_target.year, employees_sales_target.person_id, people.first_name, people.last_name, people.designation, stores.store_id, stores.store_name FROM employees_sales_target JOIN people ON employees_sales_target.person_id = people.person_id JOIN stores ON employees_sales_target.store_id = stores.store_id WHERE employees_sales_target.store_id = :store_id AND employees_sales_target.month = :month AND employees_sales_target.year = :year AND employees_sales_target.sales_target != 0");

        $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
        $stmt->bindParam(":month", $month, PDO::PARAM_INT);
        $stmt->bindParam(":year", $year, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewLatestIndivSalaryVouchers($personId) {
        $table = 'payroll_salary_vouchers';
        $stmt = Connection::connect()->prepare("SELECT * FROM $table WHERE person_id = :person_id AND is_draft = 0 AND status = 'Approved' ORDER BY voucher_id DESC LIMIT 1");
        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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

    public static function mdlViewEmployeesDetail($personId)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("SELECT * FROM employees_detail WHERE person_id = :person_id");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlViewEmployeesStores($personId)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        $stmt = $conn->prepare("SELECT stores.store_id, stores.store_name, stores.store_code FROM employees_stores JOIN stores ON employees_stores.store_id = stores.store_id WHERE employees_stores.person_id = :person_id AND employees_stores.active = :active");

        $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
        $active = 1;
        $stmt->bindParam(":active", $active, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function mdlCreateNewEmployee($personData, $permissionsData, $teamMembersData)
    {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $response = PeopleModel::mdlCreateNewPerson($conn, $personData);
            $new_person_id = (int) $response['person_id'];
            $personData['person_id'] = $new_person_id;

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

            self::mdlCreateEmployeesDetail($conn, $personData);

            foreach ($personData['employees_stores'] as $index => $storeId) {
                $employeesStoresData = array(
                    'person_id' => $new_person_id,
                    'store_id' => $storeId,
                    'active' => 1,
                );
                self::mdlCreateEmployeesStores($conn, $employeesStoresData);
            }

            foreach ($permissionsData as $module => $active) {
                $allowedModuleData = array(
                    'person_id' => $new_person_id,
                    'module_title' => $module,
                    'active' => $active);

                self::mdlCreateEmployeePermissions($conn, $allowedModuleData);
            }

            foreach ($teamMembersData['employees_team'] as $index => $memberId) {
                $employeesTeamData = array(
                    'leader_id' => $new_person_id,
                    'member_id' => $memberId,
                    'active' => 1);

                self::mdlCreateTeamMembers($conn, $employeesTeamData);
            }

            $conn->commit();

            return $new_person_id;

        } catch (Exception $e) {

            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
        return false;
    }

    public static function mdlCreateEmployeesDetail($conn, $personData)
    {
        $stmt = $conn->prepare("INSERT INTO employees_detail(person_id, company_name, levy_amount, race, is_sg_pr, active, full_time) VALUES (:person_id, :company_name, :levy_amount, :race, :is_sg_pr, :active, :full_time)");

        $stmt->bindParam(":person_id", $personData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":company_name", $personData["company_name"], PDO::PARAM_STR);
        $stmt->bindParam(":levy_amount", $personData["levy_amount"], PDO::PARAM_STR);
        $stmt->bindParam(":race", $personData["race"], PDO::PARAM_STR);
        $stmt->bindParam(":is_sg_pr", $personData["is_sg_pr"], PDO::PARAM_INT);
        $stmt->bindParam(":active", $personData["active"], PDO::PARAM_INT);
        $stmt->bindParam(":full_time", $personData["full_time"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlCreateEmployeesStores($conn, $employeesStoresData)
    {
        $stmt = $conn->prepare("INSERT INTO employees_stores(person_id, store_id, active) VALUES (:person_id, :store_id, :active)");

        $stmt->bindParam(":person_id", $employeesStoresData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $employeesStoresData["store_id"], PDO::PARAM_STR);
        $active = 1;
        $stmt->bindParam(":active", $employeesStoresData["active"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlCreateEmployeePermissions($conn, $allowedModuleData)
    {
        $stmt = $conn->prepare("INSERT INTO employees_modules(person_id, module_title, active) VALUES (:person_id, :module_title, :active)");

        $stmt->bindParam(":person_id", $allowedModuleData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":module_title", $allowedModuleData["module_title"], PDO::PARAM_STR);
        $stmt->bindParam(":active", $allowedModuleData["active"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlCreateTeamMembers($conn, $employeesTeamData)
    {
        $stmt = $conn->prepare("INSERT INTO employees_team(leader_id, member_id, active) VALUES (:leader_id, :member_id, :active)");

        $stmt->bindParam(":leader_id", $employeesTeamData["leader_id"], PDO::PARAM_INT);
        $stmt->bindParam(":member_id", $employeesTeamData["member_id"], PDO::PARAM_INT);
        $stmt->bindParam(":active", $employeesTeamData["active"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlCreateEmployeeSalesTarget($personId, $storeId, $month, $year, $salesTarget)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("INSERT INTO employees_sales_target(person_id, store_id, month, year, sales_target) VALUES (:person_id, :store_id, :month, :year, :sales_target)");

            $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":month", $month, PDO::PARAM_INT);
            $stmt->bindParam(":year", $year, PDO::PARAM_INT);
            $stmt->bindParam(":sales_target", $salesTarget, PDO::PARAM_STR);

            $stmt->execute();

            $conn->commit();

            return true;

        } catch (Exception $e) {

            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }
        return false;
    }

    public static function mdlDeleteAllEmployeePermissions($conn, $employeeData)
    {
        $table = 'employees_modules';
        $person_id = $employeeData['person_id'];

        $deleteStmt = $conn->prepare("DELETE FROM $table WHERE person_id = :person_id");
        $deleteStmt->bindParam(":person_id", $person_id, PDO::PARAM_INT);
        $deleteStmt->execute();
    }

    public static function mdlEditEmployee($personData, $employeeData, $permissionsData, $teamMembersData)
    {

        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $response = PeopleModel::mdlEditPerson($conn, $personData);

            if ($employeeData["edit_password"] == 1) {

                //Password Hashing
                $dirtyPassword = $employeeData["password"];
                $cleanPassword = password_hash($dirtyPassword, PASSWORD_BCRYPT);

                $stmt = $conn->prepare("UPDATE employees SET username = :username, `password` = :cleanPassword WHERE person_id = :person_id");

                $stmt->bindParam(":username", $employeeData["username"], PDO::PARAM_STR);
                $stmt->bindParam(":cleanPassword", $cleanPassword, PDO::PARAM_STR);
                $stmt->bindParam(":person_id", $employeeData["person_id"], PDO::PARAM_INT);

                $stmt->execute();

            } else {

                $stmt = $conn->prepare("UPDATE employees SET username = :username WHERE person_id = :person_id");

                $stmt->bindParam(":username", $employeeData["username"], PDO::PARAM_STR);
                $stmt->bindParam(":person_id", $employeeData["person_id"], PDO::PARAM_INT);

                $stmt->execute();

            }

            $response = self::mdlCheckEmployeesDetailExists($conn, $personData['person_id']);

            if (!$response) {
                self::mdlCreateEmployeesDetail($conn, $personData);
            } else {
                self::mdlUpdateEmployeesDetail($conn, $personData);
            }

            foreach ($personData['updateStoreActive'] as $index => $active) {
                $employeesStoresData = array(
                    'active' => $active,
                    'person_id' => $personData['person_id'],
                    'store_id' => $personData['updateStoreSelection'][$index],
                );

                self::mdlUpdateEmployeesStores($conn, $employeesStoresData);
            }

            foreach ($personData['employees_stores'] as $index => $storeId) {

                $employeesStoresData = array(
                    'person_id' => $personData['person_id'],
                    'store_id' => $storeId,
                    'active' => 1,
                );
                $response = self::mdlCheckEmployeeStoreExists($conn, $employeesStoresData);

                if (!$response) {
                    self::mdlCreateEmployeesStores($conn, $employeesStoresData);
                } else {
                    self::mdlUpdateEmployeesStores($conn, $employeesStoresData);
                }
            }

            foreach ($permissionsData as $module => $active) {
                $allowedModuleData = array(
                    'person_id' => $employeeData["person_id"],
                    'module_title' => $module,
                    'active' => $active);

                self::mdlUpdateEmployeePermissions($conn, $allowedModuleData);
            }

            foreach ($teamMembersData["memberId"] as $index => $memberId) {
                $employeesTeamData = array(
                    'leader_id' => $employeeData["person_id"],
                    'member_id' => $memberId,
                    'active' => $teamMembersData["active"][$index]);

                self::mdlUpdateEmployeesTeam($conn, $employeesTeamData);
            }

            foreach ($teamMembersData['employees_team'] as $index => $memberId) {

                $newEmployeesTeamData = array(
                    'leader_id' => $employeeData["person_id"],
                    'member_id' => $memberId,
                    'active' => 1,
                );
                $response = self::mdlCheckEmployeesTeamMemberExists($conn, $newEmployeesTeamData);

                if (!$response) {
                    self::mdlCreateTeamMembers($conn, $newEmployeesTeamData);
                } else {
                    self::mdlUpdateEmployeesTeam($conn, $newEmployeesTeamData);
                }
            }

            $conn->commit();

            return true;

        } catch (PDOException $e) {
            $conn->rollBack();
            return "Exception: " . $e->getMessage();
        }

        return false;
    }

    public static function mdlUpdateEmployeePermissions($conn, $allowedModuleData)
    {
        $response = self::mdlCheckEmployeePermissionExists($allowedModuleData);

        if ($response) {
            $stmt = $conn->prepare("UPDATE employees_modules SET active = :active WHERE person_id = :person_id AND module_title = :module_title");

            $stmt->bindParam(":active", $allowedModuleData["active"], PDO::PARAM_INT);
            $stmt->bindParam(":person_id", $allowedModuleData["person_id"], PDO::PARAM_INT);
            $stmt->bindParam(":module_title", $allowedModuleData["module_title"], PDO::PARAM_STR);

            $stmt->execute();

            return true;
        } else {
            self::mdlCreateEmployeePermissions($conn, $allowedModuleData);

            return true;
        }

        return false;
    }

    public static function mdlUpdateEmployeesStores($conn, $employeesStoresData)
    {
        $stmt = $conn->prepare("UPDATE employees_stores SET active = :active WHERE person_id = :person_id AND store_id = :store_id");

        $stmt->bindParam(":active", $employeesStoresData["active"], PDO::PARAM_INT);
        $stmt->bindParam(":person_id", $employeesStoresData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":store_id", $employeesStoresData["store_id"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlUpdateEmployeesTeam($conn, $employeesTeamData)
    {
        $stmt = $conn->prepare("UPDATE employees_team SET active = :active WHERE leader_id = :leader_id AND member_id = :member_id");

        $stmt->bindParam(":active", $employeesTeamData["active"], PDO::PARAM_INT);
        $stmt->bindParam(":leader_id", $employeesTeamData["leader_id"], PDO::PARAM_INT);
        $stmt->bindParam(":member_id", $employeesTeamData["member_id"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlUpdateEmployeesSalesTarget($recordId, $personId, $storeId, $month, $year, $salesTarget)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("UPDATE employees_sales_target SET month = :month, year = :year, sales_target = :sales_target WHERE person_id = :person_id AND record_id = :record_id AND store_id = :store_id");

            $stmt->bindParam(":record_id", $recordId, PDO::PARAM_INT);
            $stmt->bindParam(":person_id", $personId, PDO::PARAM_INT);
            $stmt->bindParam(":store_id", $storeId, PDO::PARAM_INT);
            $stmt->bindParam(":month", $month, PDO::PARAM_INT);
            $stmt->bindParam(":year", $year, PDO::PARAM_INT);
            $stmt->bindParam(":sales_target", $salesTarget, PDO::PARAM_STR);

            $stmt->execute();
            $conn->commit();

            return true;

        } catch (PDOException $e) {
            $conn->rollBack();
            return false;
        }
    }

    public static function mdlUpdateEmployeesDetail($conn, $personData)
    {
        $stmt = $conn->prepare("UPDATE employees_detail SET company_name = :company_name, levy_amount = :levy_amount, race = :race, is_sg_pr = :is_sg_pr, active = :active, full_time = :full_time WHERE person_id = :person_id");

        $stmt->bindParam(":person_id", $personData["person_id"], PDO::PARAM_INT);
        $stmt->bindParam(":company_name", $personData["company_name"], PDO::PARAM_STR);
        $stmt->bindParam(":levy_amount", $personData["levy_amount"], PDO::PARAM_STR);
        $stmt->bindParam(":race", $personData["race"], PDO::PARAM_STR);
        $stmt->bindParam(":is_sg_pr", $personData["is_sg_pr"], PDO::PARAM_INT);
        $stmt->bindParam(":active", $personData["active"], PDO::PARAM_INT);
        $stmt->bindParam(":full_time", $personData["full_time"], PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function mdlDeleteEmployee($personData)
    {
        $conn = new Connection();
        $conn = $conn->connect();

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("UPDATE employees SET deleted = :deleted WHERE person_id = :person_id");
            $deleted = 1;
            $stmt->bindParam(":deleted", $deleted, PDO::PARAM_INT);
            $stmt->bindParam(":person_id", $personData["person_id"], PDO::PARAM_INT);

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
