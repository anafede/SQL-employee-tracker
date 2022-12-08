USE employeeTracker_db;

INSERT INTO department (title) VALUES ('Enginering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO employeeRole (title, salary, department_id) VALUES
('Sales Lead', 100000, 4), ('Salesperson', 80000, 4), ('Lead Engineer', 150000, 1), ('Software Engineer', 120000, 1), 
('Account Manager', 160000, 2), ('Accountant', 125000, 2), ('Legal Team Lead', 250000, 3), ('Lawyer', 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Chris', 'Evans', 1, NULL),
('Robin', 'Williams', 2, 1),
('Hailey', 'Bieber', 3, NULL),
('Harry', 'Styles', 4, 3),
('Bella', 'Hadid', 5, NULL),
('Andrew', 'Garfield', 6, 5),
('Spongebob', 'Squarepants', 7, NULL),
('Patrick', 'Star', 8, 7);