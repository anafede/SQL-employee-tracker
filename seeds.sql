USE employeeTracker_db;

INSERT INTO department (title) VALUES ('Enginering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO employeeRole (title, salary, department_id) VALUES
('Sales Lead', 100000, 4), ('Salesperson', 80000, 4), ('Lead Engineer', 150000, 1), ('Software Engineer', 120000, 1), 
('Account Manager', 160000, 2), ('Accountant', 125000, 2), ('Legal Team Lead', 250000, 3), ('Lawyer', 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Chris', 'Evans', 1, NULL),
('Robin', 'Williams', 2, 1);
-- ('Hailey', 'Bieber', 'Lead Engineer', 'Engineering', 150000, NULL),
-- ('Harry', 'Styles', 'Software Engineer', 'Engineering', 12000, 3),
-- ('Bella', 'Hadid', 'Account Manager', 'Finance', 160000, NULL),
-- ('Andrew', 'Garfield', 'Accountant', 'Finance', 125000, 5),
-- ('Spongebob', 'Squarepants', 'Legal Team Lead', 'Legal', 250000, NULL),
-- ('Patrick', 'Star', 'Lawyer', 'Legal', 190000, 7);