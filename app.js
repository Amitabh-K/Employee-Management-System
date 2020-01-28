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
  
        case 'View all roles':
          connection.query(
            'SELECT * FROM role',
            (err, result) => {
              if (err) throw err;
  
              console.log(table(toTableFormat(result)));
  
              start();
            });
          break;
  
        case 'View all departments':
          connection.query(
            'SELECT * FROM department',
            (err, result) => {
              if (err) throw err;
  
              console.log(table(toTableFormat(result)));
  
              start();
            });
          break;
  
        case 'Update employee role':
          connection.query(
            'SELECT * FROM employee',
            (err, employeeResult) => {
              const employees = employeeResult.map(employee => {
                return employee.first_name + ' ' + employee.last_name;
              });
  
              connection.query(
                'SELECT * FROM role',
                (err, roleResult) => {
                  const roles = roleResult.map(role => {
                    return role.title;
                  });
  
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'employee',
                      message: 'Which employee\'s role would you like to update?',
                      choices: employees
                    },
                    {
                      type: 'list',
                      name: 'role',
                      message: 'What is the employee\'s new role?',
                      choices: roles
                    }
                  ]).then(answer => {
                    const id = employeeResult.filter(employee => {
                      return employee.first_name + ' ' + employee.last_name === answer.employee;
                    })[0].id;
                    const role_id = roleResult.filter(role => {
                      return role.title === answer.role;
                    })[0].id;
  
                    connection.query(
                      'UPDATE employee SET role_id = ? WHERE id = ?',
                      [role_id, id],
                      (err, result) => {
                        if (err) throw err;
  
                        console.log(`Role successfully updated.`);
  
                        start();
                      }
                    );
                  });
                }
              );
            }
          );
          break;
  
        case 'Add employee':
          connection.query(
            'SELECT * FROM employee',
            (err, employeeResult) => {
              const employees = employeeResult.map(employee => {
                return employee.first_name + ' ' + employee.last_name;
              });
  
              connection.query(
                'SELECT * FROM role',
                (err, roleResult) => {
                  const roles = roleResult.map(role => {
                    return role.title;
                  });
  
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'first_name',
                      message: 'What is the employee\'s first name?'
                    },
                    {
                      type: 'input',
                      name: 'last_name',
                      message: 'What is the employee\'s last name?'
                    },
                    {
                      type: 'list',
                      name: 'role',
                      message: 'What is the employee\'s role?',
                      choices: roles
                    },
                    {
                      type: 'list',
                      name: 'manager',
                      message: 'Who is the employee\'s manager?',
                      choices: employees.concat('None')
                    }
                  ]).then(answer => {
                    const { first_name, last_name } = answer;
                    const manager = employeeResult.filter(employee => {
                      return employee.first_name + ' ' + employee.last_name === answer.manager;
                    })[0];
                    const role_id = roleResult.filter(role => {
                      return role.title === answer.role;
                    })[0].id;
                    const manager_id = manager ? manager.id : null;
  
                    connection.query(
                      'INSERT INTO employee SET ?',
                      { first_name, last_name, role_id, manager_id },
                      (err, result) => {
                        if (err) throw err;
  
                        console.log(`${first_name} ${last_name} was successfully added to employees.`);
  
                        start();
                      }
                    );
                  });
                }
              );
            }
          );
          break;
  
      }
    });
  }
