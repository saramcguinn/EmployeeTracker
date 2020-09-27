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
    return inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Update Employee Job'
            ]
        }
    ])
        .then(answers => {
            if (answers.start === 'View All Employees') {
                console.log("you chose view all empls");
                // viewAllEmpls();
            } else if (answers.start === 'View All Employees By Department') {
                console.log("you chose view empls by dept");
                // viewEmplsByDept();
            } else if (answers.start === 'View All Employees By Manager') {
                console.log("you chose view empls by manager");
                //viewEmplsByManager();
            } else if (answers.start === 'Add Employee') {
                console.log("you chose add employee");
                // addEmpl();
            } else if (answers.start === 'Update Employee Job') {
                console.log("you chose update employee job");
                //updateEmplJob();
            }
        })
}

// function viewAllEmpls() {

// }

// function viewEmplsByDept() {
//     let emplsByDeptArr = [connection.query("SELECT")]
//     console.table(emplsByDeptArr);
// }

// function viewEmplsByManager() {

// }

// function addEmpl() {

// }

// function updateEmplJob() {

// }