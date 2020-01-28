var express = require("express");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  start();
});


function start() {
    inquirer.prompt(
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'View employees by manager',
          'View all roles',
          'View all departments',
          'Update employee role',
          'Add employee',
          'Add role',
          'Add department',
          'Remove employee',
          'Remove role',
          'Remove department',
          'Exit'
        ]
      }
    ).then(answer => {
      const { action } = answer;
  
      switch (action) {
        case 'View all employees':
          connection.query(
            'SELECT * FROM employee',
            (err, result) => {
              if (err) throw err;
  
              console.log(table(toTableFormat(result)));
  
              start();
            });
          break;
  
        case 'View employees by manager':
          connection.query(
            'SELECT * FROM employee',
            (err, result) => {
              if (err) throw err;
  
              const managerNames = [];
              const managerIds = result
                .map(employee => employee.manager_id)
                .filter(id => typeof id === 'number');
  
              result.forEach(employee => {
                if (managerIds.includes(employee.id)) {
                  managerNames.push(employee.first_name + ' ' + employee.last_name);
                }
              });
  
              inquirer.prompt(
                {
                  type: 'list',
                  name: 'manager',
                  message: 'What is the manager\'s name?',
                  choices: managerNames
                }
              ).then(answer => {
                const [manager] = result.filter(employee => {
                  return employee.first_name + ' ' + employee.last_name === answer.manager;
                });
                const employees = result.filter(employee => {
                  return employee.manager_id === manager.id;
                });
  
                console.log(table(toTableFormat(employees)));
  
                start();
              });
            }
          );
          break;
  
  
        case 'Exit':
          connection.end();
          break;
      }
    });
  }
