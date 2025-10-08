import { employeeData, employeeDataTesteUpdateDelete } from "../FakerDatas/employee.js";
import DatabaseEmployee from "../Models/DatabaseEmployee.js";
const dataBaseEmployee = new DatabaseEmployee();

const registerEmployee = async (req, res) => {
  try {
    await dataBaseEmployee.createEmployee(employeeData());
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400)
  }
}

const viewsEmployee = async (req, res) => {
  try {
    const employees = await dataBaseEmployee.readEmployees();
    res.send(employees);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

const updateEmployee = async (req, res) => {
  try {
    await dataBaseEmployee.updateEmployeeAndPhoneNumber(employeeDataTesteUpdateDelete());
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

const deleteEmployee = async (req, res) => {
  try {
    await dataBaseEmployee.deleteEmployee(employeeDataTesteUpdateDelete());
    res.sendStatus(200);
  } catch (error) {
    console.error(error)
    res.sendStatus(404);
  }
}

export default {
  registerEmployee,
  viewsEmployee,
  updateEmployee,
  deleteEmployee
}