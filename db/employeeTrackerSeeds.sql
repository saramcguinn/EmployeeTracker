USE employeeTracker_DB;

INSERT INTO department(dept_name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO position(title, salary, dept_id) VALUES ('Sales Lead', '100000', 1);
INSERT INTO position(title, salary, dept_id) VALUES ('Salesperson', '80000', 1);
INSERT INTO position(title, salary, dept_id) VALUES ('Lead Engineer', '150000', 2);
INSERT INTO position(title, salary, dept_id) VALUES ('Software Engineer', '120000', 2);
INSERT INTO position(title, salary, dept_id) VALUES ('Accountant', '125000', 3);
INSERT INTO position(title, salary, dept_id) VALUES ('Legal Team Lead', '250000', 4);
INSERT INTO position(title, salary, dept_id) VALUES ('Lawyer', '190000', 4);

INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('John', 'Doe', 1, 3);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Mike', 'Chan', 2, 1);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Ashley', 'Rodriguez', 3, null);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Kevin', 'Tupik', 4, 3);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Malia', 'Brown', 5, null);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Sarah', 'Lourd', 6, null);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Tom', 'Allen', 7, 6);
INSERT INTO employee(first_name, last_name, pos_id, manager_id) VALUES ('Christian', 'Eckenrode', 4, 3);

