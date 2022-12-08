DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30)
);

CREATE TABLE employeeRole (
role_id INT AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
employee_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30),
last_name VARCHAR (30),
manager_id INT,
role_id INT
);