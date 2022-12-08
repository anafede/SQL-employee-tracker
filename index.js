const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();
console.log(process.env);

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.password,
      database: 'employeeTracker_db',
    },
    console.log(`Connected to the employeeTracker database.`)
  );
connection.connect((err) => {
if (err) throw err;
    begin ();
});  

function begin() {
    inquirer.prompt ({
        name: "choices",
        type: "list",
        message: "Please make a selection",
        choices: [
           "View all employees",
           "Add employee",
           "Update employee role",
           "View all roles",
           "Add role",
           "View all departments",
           "Add department",
           "Quit" 
        ]
    })
    .then((answers) => {
        const {choices} = answers;
    
        if (choices === 'View all employees'){
            viewAllEmployees();
            return;
        }
        else if (choices === 'Add employee'){
            addEmployee();
            return;
        }
        else if (choices === 'Update employee role'){
            updateEmployeeRole();
            return;
        }
        else if (choices === 'View all roles'){
            viewAllRoles();
            return;
        }
        else if (choices === 'Add role'){
            addRole();
            return;
        }
        else if (choices === 'View all departments'){
            viewAllDepartments();
            return;
        }
        else if (choices === 'Add department'){
            addDepartment();
            return;
        }
        else{
            connection.end();
        }
    })
};

viewAllEmployees = () => {
    connection.query( `SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        begin();
    })
};

viewAllRoles = () => {
    connection.query(`SELECT * FROM employeeRole`, (err, res) =>{
        if (err) throw err;
        console.table('\n', res, '\n');
        begin();
    })
};

viewAllDepartments = () =>{
    connection.query(`SELECT * FROM department`, (err, res) =>{
        if (err) throw err;
        console.table('\n', res, '\n');
        begin();
    })
}

addEmployee = () => {
    connection.query(`SELECT * FROM employeeRole`, (err, res) => {
        if (err) throw err;
        let addRole = res.map(employeeRole => ({name:employeeRole.title, value: employeeRole.role_id}));
    connection.query(`SELECT * FROM employee`, (err, res) =>{
        if (err) throw err;
        let newEmployee = res.map(employee => ({name: employee.first_name + employee.last_name, value:employee.id}));
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName', 
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName', 
                message: "What is the employee's last name?"
            }, 
            {
                type: 'rawlist',
                name: 'role',
                message: "What is the employee's role?",
                choices: addRole
            }, 
            {
                type: 'rawlist',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: newEmployee
            }
        ]).then((answers)=> {
            connection.query(`INSERT INTO employee SET ?`, {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager
            }, (err, res) =>{
                if (err) throw err;
                console.log(`${answers.firstName} ${answers.lastName} added to the database`);
                begin();
            })

        });
    })
    })
    };

addDepartment = () => {
    inquirer.prompt([
        {type: 'input',
        name: 'department',
        message: 'What department are you adding?'
    }
])
    .then((answers)=>{
        connection.query(`INSERT INTO department SET ?`, {
            title: answers.department
        }, (err) => {
            if (err) throw err;
            console.log(`${answers.department} added to the database`);
            begin();
        })
    })
};

addRole = () => {
    connection.query(`SELECT * FROM employeeRole`, (err, res) =>{
        if (err) throw err;
        let dept = res.map(department=>({
            name: department.name,
            value: department.id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What role are you adding?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?'
            },
            {
                type: 'rawlist',
                name: 'department',
                message: 'What department are you adding this role to?',
                choices: dept,
            },
        ]).then((answers)=>{
            connection.query(`INSERT INTO employeeRole SET ?`, {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department
            }, (err) => {
                if (err) throw err;
                console.log(`${answers.title} added to database`);
                begin();
            }
            )
        })
    })
};

updateEmployeeRole = () =>{
    connection.query(`SELECT * FROM employeeRole`, (err, res)=>{
        if (err) throw err;
        let updateRole = res.map(employeeRole => ({name: employeeRole.title, value: employeeRole.id}));
    connection.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        let selectEmployee = res.map(employee =>({name: employee.first_name + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employee',
                message: 'Which employee are you updating?',
                choices: selectEmployee
            },
            {
                type: 'rawlist',
                name: 'updatedRole',
                message: "What is the employee's new role?",
                choices: updateRole
            },
        ]).then((answers) =>{
            connection.query(`UPDATE employee SET ? WHERE ?`, {
                role_id: answers.updatedRole},
                {
                employee_id: answers.employee},
            ); (err) =>{
                if (err) throw err;
                console.log('Employee updated in database');
                begin();
            } 
        })
        
    })
       
    })
}



  

