import DatabaseEmployee from "../Models/DatabaseEmployee.js";
import EmployeeFacade from "../Facades/EmployeeFacade.js"
const dataBaseEmployee = new DatabaseEmployee();

const registerEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(req.body);
    await dataBaseEmployee.createEmployee(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao criar funcionário:", err);
    res.sendStatus(400);
  }
};

const registerTestEmployee = async (req, res) => {
  try {
    await dataBaseEmployee.createEmployee(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao criar funcionário:", err);
    res.sendStatus(400);
  }
};

const viewsEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(req.body);
    const employees = await dataBaseEmployee.readEmployees();
    res.send(employees);
  } catch (err) {
    res.sendStatus(404);
  }
};

const updateEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(req.body);
    await dataBaseEmployee.updateEmployeeAndPhoneNumber(req.body);
    res.sendStatus(200);
  } catch (error) {;
    res.sendStatus(400);
  }
}

const deleteEmployee = async (req, res) => {
  try {
    EmployeeFacade.checkData(req.body);
    await dataBaseEmployee.deleteEmployee(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

export default {
  registerEmployee,
  viewsEmployee,
  updateEmployee,
  deleteEmployee,
  registerTestEmployee
}