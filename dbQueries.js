const inquirer = require("inquirer");
const connection = require("./db/connection");

async function findAllEmployees() {
  const res = await connection.promise().query("select * from employee");
  console.table(res[0]);
}

async function viewDepartment() {
  const res = await connection.promise().query("select * from department");
  console.table(res[0]);
}

async function viewRoles() {
  const res = await connection.promise().query("select * from employeeRole");
  console.table(res[0]);
}

async function addNewEmployee() {
  const res = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "enter first name.",
    },
    {
      name: "lastName",
      type: "input",
      message: "enter last name.",
    },
    {
      name: "Role_id",
      type: "input",
      message: "enter role_id.",
    },
  ]);
  connection.query(
    `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${res.firstName}", "${res.lastName}", "${res.Role_id}");`
  );
  console.table("you did!");
}
async function addNewDepartment() {
  const res = await inquirer.prompt([
    {
      name: "department_Name",
      type: "input",
      message: "enter department.",
    },
  ]);
  connection.query(
    `INSERT INTO department (name) VALUES ("${res.department_Name}")`
  );
  console.table("you added new department!");
}

async function addNewRole() {
  await inquirer
    .prompt([
      {
        name: "empRole",
        type: "input",
        message: "enter title.",
      },
      {
        name: "salary",
        type: "input",
        message: "enter salary.",
      },
      {
        name: "depart_id",
        type: "input",
        message: "enter department id.",
      },
    ])
    .then((ans) => {
      connection.query(
        `INSERT INTO employeeRole (title, salary, department_id) VALUES ("${ans.empRole}", "${ans.salary}", "${ans.depart_id}")`
      );
      console.table("you added new Role!");
    });
}
async function deleteRole() {
  const res = await inquirer.prompt([
    {
      name: "delRole",
      type: "input",
      message: "enter title.",
    },
  ]);

  connection.query(
    `DELETE FROM employeeRole WHERE title = '${res.delRole}'`
  );
  console.table("you delete the Role!");
}
async function UpdateEmpRole() {
  const selectedEmployees = await connection
    .promise()
    .query(
      `SELECT CONCAT(first_name, " ", last_name) AS fullName FROM employee;`
    );
  let selectedEmployee = selectedEmployees[0].map((person) => person.fullName);
  await updateEmpRolePrompt(selectedEmployee);
}
async function updateEmpRolePrompt(employees) {
  await inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Which employee want to update?",
        choices: employees,
      },
      {
        name: "choice2",
        type: "list",
        message: "Pick Role_id",
        choices: [1, 2, 3, 4, 5, 6, 7],
      },
    ])
    .then(({ choice, choice2 }) => {
     connection.query(
        `UPDATE employee SET role_id = "${choice2} " WHERE first_name  = "${
          choice.split(" ")[0]
        }"`
      );
      console.table("you Updated Employee Role!");
    });
}
async function employeeByDepartment() {
  const res = await connection
    .promise()
    .query(
      `SELECT employee.role_id , employeeRole.title , employee.first_name , employee.last_name FROM employeeRole INNER JOIN employee ON employeeRole.department_id = employee.role_id;`
    );
  console.table(res[0]);
}

module.exports = {
  findAllEmployees,
  viewDepartment,
  viewRoles,
  addNewEmployee,
  addNewDepartment,
  addNewRole,
  deleteRole,
  UpdateEmpRole,
  employeeByDepartment,
};
