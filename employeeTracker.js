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

// ask "What would you like to do?"
// choices: 
//      View All Employees
//      View All Employees By Department
//      View All Employees by MAnager
//      Add Employee
//      Update Employee Role
//      extra: Remove Employee
//      extra: Update Employee Manager

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
                'View Employees By Department',
                'View Employees By Manager',
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
            } else if (answers.start === 'View All Employees By Department') {
                // viewEmplsByDept();
            } else if (answers.start === 'View All Employees By Manager') {
                //viewEmplsByManager();
            } else if (answers.start === 'Add Employee') {
                //addEmpl();
            } else if (answers.start === 'Add Department') {
                addDept();
            } else if (answers.start === 'Add Job') {
                addJob();
            } else if (answers.start === 'Update Employee Job') {
                //updateEmplJob();
            }
        })
}

function viewAllEmpls() {
    connection.query("SELECT empl_id, first_name, last_name FROM employees", function (err,res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllDepts() {
    connection.query("SELECT * FROM departments", function (err,res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllJobs() {
    connection.query("SELECT * FROM jobs", function (err,res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// function viewEmplsByDept() {
//     connection.query("SELECT * FROM departments", function (err, results) {
//         if (err) throw err;
//         let deptArr = [];
//         for (var i = 0; i < results.length; i++) {
//             deptArr.push(results[i].dept_name);
//         }
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'department',
//                 message: 'Choose department:',
//                 choices: deptArr
//             }
//         ])
//             .then(answers => {
//                 connection.query(
//                     "SELECT e.first_name, e.last_name, j.title FROM employees e ")


//                 let dept = answers.department;
//                 connection.query("SELECT employees.last_name, employees.first_name, jobs.title FROM employees INNER JOIN jobs ON employees.job_id = jobs.job_id INNER JOIN departments ON jobs.dept_id = departments.dept_id WHERE departments.dept_id=dept)

//                 connection.query("SELECT dept_id FROM departments WHERE dept_name=?", [dept], function (err, res) {
//                     if (err) throw err;
//                     let deptID = res[0].dept_id;
//                     connection.query("SELECT job_id FROM jobs WHERE dept_id=?", [deptID], function (err, res) {
//                         if (err) throw err;
//                         let jobIDArr = [];
//                         for (let i=0; i<res.length; i++) {
//                             jobIDArr.push(res[i].job_id);
//                         }
//                         connection.query("SELECT first_name, last_name from employees WHERE job_id=?", [3 && 4], function(err,res) {
//                             console.table(res);
//                         })
//                     })
//                 })
//             })
//     })
// }

// function viewEmplsByManager() {

// }

// function addEmpl() {

// }

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

function addJob() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        let deptArr = [];
        for (var i = 0; i < results.length; i++) {
            deptArr.push(results[i].dept_name);
        }
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
                    choices: deptArr
                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "New job salary (numbers only, no dollar signs, commas, or periods"
                }
            ])
            .then(answers => {
                let newJobDept = answers.newJobDept;
                connection.query("SELECT dept_id FROM departments WHERE dept_name=?", [newJobDept], function(err, res) {
                    if (err) throw err;
                    let newJobDeptID = res.dept_id;
                    console.log(newJobDeptID);
                })
                    connection.query(
                        "INSERT INTO jobs SET ?",
                        {
                            title: answers.newJob,
                            salary: answers.newSalary,
                            dept_id: newJobDeptID,
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

// function updateEmplJob() {

// }