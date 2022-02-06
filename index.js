const inquirer = require("inquirer");
const db = require("./db/connection");
const dbQuery = require("./dbQueries");

async function mainMenu() {
  const res = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: 1,
        },
        {
          name: "view Employees by Department",
          value: 2,
        },
        {
          name: "view Employees roles",
          value: 3,
        },

        {
          name: "Want to add Employee",

          value: 4,
        },
        {
          name: "Want to add department",

          value: 5,
        },

        {
          name: "Want to New Role",
          value: 6,
        },

        {
          name: "delete the specific Role",
          value: 7,
        },
        {
          name: "update Employee Role",
          value: 8,
        },
        {
          name: "View Employee by Deapartment",
          value: 9,
        },
        {
          name: "Quit",
          value: 10,
        },
      ],
    },
  ]);
  switch (res.choice) {
    case 1:
      await dbQuery.findAllEmployees();
      break;
    case 2:
      await dbQuery.viewDepartment();
      break;
    case 3:
      await dbQuery.viewRoles();
      break;
    case 4:
      await dbQuery.addNewEmployee();
      break;
    case 5:
      await dbQuery.addNewDepartment();
      break;
    case 6:
      await dbQuery.addNewRole();
      break;
    case 7:
      await dbQuery.deleteRole();
      break;
    case 8:
      await dbQuery.UpdateEmpRole();
      break;
    case 9:
      await dbQuery.employeeByDepartment();
      break;
    case 10:
      process.exit(0);
  }
  mainMenu();
}
mainMenu();
