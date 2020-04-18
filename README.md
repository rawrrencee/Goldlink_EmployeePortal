# Introduction

Goldlink EMPortal is an employee portal built to replace older version of Goldlink&apos;s webapp suite. 

## Technical Requirements
| Software Name | Version | Remarks |
| ------------- | ------- | ------- |
| PHP           | &gt;7   | N.A.    |
| MySQL         | &gt;5   | N.A.    |
Recommended software: SourceTree, MAMP/WAMP

## High-level Feature List
+ **Point-of-Sales**
	+ Employee Management
	+ Customer Management
	+ Sales Management
	+ Item Management
	+ Supplier Management
+ **Analytics**
	+ Overview
	+ Sales Insights
	+ Inventory Insights
	+ Employee Insights
	+ Customer Insights
+ **HR - Payroll**
	+ Salary Analysis
	+ Salary Voucher Management
	+ Salary Submission


## Detailed Feature List
### **Point-of-Sales**

##### Employee Management
| Feature | Remarks |
| - | - |
| View All Employees | CRUD employee data |
| Timecard | Allow employees to time-in their start/end of work. Break times to be considered as well |

##### Customer Management
| Feature | Remarks |
| - | - |
| View All Customers | CRUD customer data |
| View Customer Archives | CRUD customer data belonging to previous stores |

##### Sales Management
| Feature  | Remarks |
| - | - |
| Sales Terminal | For Employee usage: POS Terminal for sales (e.g. new sale, refunds) |
| Sales Management | CRUD All sales made by staff |

##### Item Management

| Feature            | Remarks                                      |
| ------------------ | -------------------------------------------- |
| View All Items     | CRUD all items available in the database     |
| View All Item Kits | CRUD all item kits available in the database |

##### Supplier Management

| Feature            | Remarks            |
| ------------------ | ------------------ |
| View All Suppliers | CRUD supplier data |

### **Analytics**

| Feature            | Remarks                                                      |
| ------------------ | ------------------------------------------------------------ |
| Overview           | Show an overview of important analytics insights to the user |
| Sales Insights     | Show sales analytics data: <br />All store sales<br />Sales by: Items, Item Kits, Categories |
| Inventory Insights | Show inventory analytics:<br />Inventory count by category<br />Inventory count by product<br />Inventory count vs products sold |
| Employee Insights  | Show employee performance by sales amount, by store<br />Show products employee has sold at the store |
| Customer Insights  | Show customer analytics (e.g. repeat customers)              |

### HR - Payroll

##### Salary Analysis

| Feature                   | Remarks                                                      |
| ------------------------- | ------------------------------------------------------------ |
| Salary Analysis (Monthly) | All employee salary values for the selected month presented in a table |
| Salary Analysis (Yearly)  | All employee salary values for 12 months of a year presented in a table |

##### Salary Voucher Management

**Part Time** & **Full Time** employees to be considered separately in different pages due to different salary requirements

| Feature                   | Remarks                                                    |
| ------------------------- | ---------------------------------------------------------- |
| View All Salary Vouchers  | CRUD any submitted salary voucher                          |
| View My Salary Vouchers   | View only my own submitted salary vouchers                 |
| View Team Salary Vouchers | CRUD salary vouchers submitted by an employee in your team |

##### Salary Voucher Submission

**Part Time** & **Full Time** employees to be considered separately in different pages due to different salary requirements

| Feature       | Remarks               |
| ------------- | --------------------- |
| Submit Salary | Submit salary voucher |

