
INSERT INTO department(name) VALUES ("Operationss");
INSERT INTO department(name) VALUES ("Engineering");
INSERT INTO department(name) VALUES ("Marketing");
INSERT INTO department(name) VALUES ("Finance");
INSERT INTO department(name) VALUES ("Human Resources");


INSERT INTO role(title, salary, department_id) VALUES ("Recruiter", 59000.00, 5);
INSERT INTO role(title, salary, department_id) VALUES ("Software Developer", 55000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Senior Engineer", 85000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Marketing Manager", 77000.00, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Web Developer", 60000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Accountant", 55000.00, 4);
INSERT INTO role(title, salary, department_id) VALUES ("CFO", 60000.00, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Facility Manager", 65000.00, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Executive", 20000.00, 5);
INSERT INTO role(title, salary, department_id) VALUES ("HR Director", 100000.00, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Johnny", "Depp", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Chris", "Hemsworth", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bradley", "Cooper", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Matt", "Matt", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Will", "Smith", 5, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Leonardo", "DiCaprio", 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Dwayne", "Johnson", 3, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sean", "Connery", 1, 3 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jeniffer", "Lawrence", 1, 2);


select d.name, SUM(r.salary) "Total_Salary" from role r JOIN department d JOIN employee e where r.role_id = e.role_id and r.department_id = d.department_id
group by r.department_id; 

select concat(e.first_name,' ', e.last_name) "Manager Name", SUM(r.salary) "Total_Salary" from role r JOIN department d JOIN employee e where r.role_id = e.role_id and r.department_id = d.department_id
group by e.manager_id; 

