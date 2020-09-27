DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments(
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE jobs(
    job_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    salary VARCHAR(45) NOT NULL,
    dept_id INT NOT NULL REFERENCES departments(dept_id),
    PRIMARY KEY (job_id)
);

CREATE TABLE employees(
    empl_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INT NOT NULL REFERENCES jobs(job_id),
    manager_id INT REFERENCES employees(empl_id),
    PRIMARY KEY (empl_id)
);
