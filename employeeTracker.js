const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "spider9",
    database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// ask user what they want to do & run functions accordingly
function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Jobs',
                'Add Employee',
                'Add Department',
                'Add Job',
                'Update Employee Job'
            ]
        }
    ])
        .then(answers => {
            if (answers.start === 'View All Employees') {
                viewAllEmpls();
            } else if (answers.start === 'View All Departments') {
                viewAllDepts();
            } else if (answers.start === 'View All Jobs') {
                viewAllJobs();
            } else if (answers.start === 'Add Employee') {
                addEmpl();
            } else if (answers.start === 'Add Department') {
                addDept();
            } else if (answers.start === 'Add Job') {
                addJob();
            } else if (answers.start === 'Update Employee Job') {
                updateEmplJob();
            }
        })
}

// view all employees
function viewAllEmpls() {
    let sql = "SELECT empl_id AS `Employee ID`, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, dept_name AS Department FROM employees INNER JOIN jobs ON employees.job_id = jobs.job_id INNER JOIN departments ON jobs.dept_id = departments.dept_id"
    connection.query(sql, function (err,res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        console.log("======================================================", '\n');
        start();
    })
}

// view all departments
function viewAllDepts() {
    connection.query("SELECT dept_id AS `Department ID`, dept_name AS `Department` FROM departments", function (err,res) {
        if (err) throw err;
        console.table(res);
        console.log("======================================================", '\n');
        start();
    })
}

// view all jobs
function viewAllJobs() {
    connection.query("SELECT job_id AS `Job ID`, title AS `Title`, salary AS `Salary`, dept_id as `Department` FROM jobs", function (err,res) {
        if (err) throw err;
        console.table(res);
        console.log("======================================================", '\n');
        start();
    })
}

// add new employee
function addEmpl() {
    connection.query("SELECT * from employees", function(err, emplRes) {
        if (err) throw err;
        connection.query("SELECT * from jobs", function(err, jobRes) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "emplFirstName",
                    type: "input",
                    message: "First name of new employee:"
                },
                {
                    name: "emplLastName",
                    type: "input",
                    message: "Last name of new employee"
                },
                {
                    name: "emplJob",
                    type: "list",
                    message: "Job of new employee",
                    choices: jobRes.map(function(item) {
                        return item.title
                    })
                },
                {
                    name: "emplManager",
                    type: "list",
                    message: "Manager of new employee",
                    choices: [...emplRes.map(function(item) {
                        return `${item.first_name} ${item.last_name}`;
                    }), "None"]
                }
            ])
            .then (answers => {
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: answers.emplFirstName,
                        last_name: answers.emplLastName,
                        job_id: jobRes.find(function(item) {
                            return item.title === answers.emplJob
                        }).job_id,
                        manager_id: emplRes.find(function(item) {
                            return `${item.first_name} ${item.last_name}` === answers.emplManager
                        }).empl_id || null,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("New employee added");
                        console.log("======================================================", '\n');
                        start();
                    }
                    )
            })
        });
    });
}

// add new department
function addDept() {
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "New department name:"
        }
    ])
    .then(answers => {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                dept_name: answers.newDept
            },
            function(err) {
                if (err) throw err;
                console.log("New department added");
                start();
            }
        )
    })
}

// add new job
function addJob() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
            inquirer.prompt([
                {
                    name: "newJob",
                    type: "input",
                    message: "New job title:"
                },
                {
                    name: "newJobDept",
                    type: "list",
                    message: "What department is this new job in?",
                    choices: results.map(function(item) {
                        return item.dept_name;
                    })
                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "New job salary (numbers only, no dollar signs, commas, or periods)"
                }
            ])
            .then(answers => {
                    connection.query(
                        "INSERT INTO jobs SET ?",
                        {
                            title: answers.newJob,
                            salary: answers.newSalary,
                            dept_id: results.find(function(item) {
                                return item.dept_name === answers.newJobDept
                            }).dept_id
                        },
                        function(err) {
                            if (err) throw err;
                            console.log("New job added");
                            start();
                        }
                    )
            })
        })
}

// update an employee's job
function updateEmplJob() {
    connection.query("SELECT * FROM employees", function(err, emplRes) {
        if (err) throw err;
        connection.query("SELECT * FROM jobs", function(err, jobRes) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "updatedEmpl",
                    type: "list",
                    message: "Which employee's job would you like to update?",
                    choices: emplRes.map(function(item) {
                        return `${item.first_name} ${item.last_name}`
                    })
                },
                {
                    name: "emplNewJob",
                    type: "list",
                    message: "What is the employee's new job?",
                    choices: jobRes.map(function(item) {
                        return item.title
                    })
                }
            ])
            .then (answers => {
                connection.query(
                    "UPDATE employees SET ? WHERE ?",
                    [
                        {
                            job_id: jobRes.find(function(item) {
                                return item.title === answers.emplNewJob
                            }).job_id
                        },
                        {
                            empl_id: emplRes.find(function(item) {
                                return `${item.first_name} ${item.last_name}` === answers.updatedEmpl
                            }).empl_id
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        console.log("Employee job updated");
                        console.log("======================================================", '\n');
                        start();
                    }
                )
            })
        })
    })
    
}
