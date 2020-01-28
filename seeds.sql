
INSERT INTO department(name) VALUES ("Operations");
INSERT INTO department(name) VALUES ("Engineering");
INSERT INTO department(name) VALUES ("Marketing");
INSERT INTO department(name) VALUES ("Finance");
INSERT INTO department(name) VALUES ("Human Resources");



INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Johnny", "Depp", 1, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Chris", "Hemsworth", 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Bradley", "Cooper", 4, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Matt", "Matt", 3, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Will", "Smith", 5, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Leonardo", "Leonardo", 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Dwayne", "Dwayne", 3, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Tom", "Tom", 1, 1 );
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Jeniffer", "Lawrence", 1, 1);

INSERT INTO role(title, salary, department_id) VALUES ("CEO", 259000.00, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Recruiter", 59000.00, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Software Developer", 55000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Senior Engineer", 85000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Marketing Manager", 77000.00, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Web Developer", 60000.00, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Accountant", 55000.00, 4);
INSERT INTO role(title, salary, department_id) VALUES ("CFO", 60000.00, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Facility Manager", 65000.00, 5);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Executive", 20000.00, 5);
INSERT INTO role(title, salary, department_id) VALUES ("HR Manager", 75000.00, 1);