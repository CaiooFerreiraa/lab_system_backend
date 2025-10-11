import { employeeDataRandom, employeeDataTesteUpdateDelete } from "../FakerDatas/employeeFake.js";
import DatabaseEmployee from "../Models/DatabaseEmployee.js";
import EmployeeFacade from "../Facades/EmployeeFacade.js"
const dataBaseEmployee = new DatabaseEmployee();

const registerEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(employeeDataRandom());
    await dataBaseEmployee.createEmployee(employeeDataRandom());
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewsEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(employeeDataRandom());
    const employees = await dataBaseEmployee.readEmployees();
    res.send(employees);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const updateEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(employeeDataTesteUpdateDelete());
    await dataBaseEmployee.updateEmployeeAndPhoneNumber(employeeDataTesteUpdateDelete());
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

const deleteEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(employeeDataTesteUpdateDelete());
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