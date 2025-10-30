import { Router } from "express";
import EmployeeController from '../Controllers/EmployeeController.js'
import DatabaseEmployee from '../Models/DatabaseEmployee.js'
const route = Router();

const employeeRepository = new DatabaseEmployee()
const employeeController = new EmployeeController(employeeRepository)

// Jocielle, Eick, Douglas
route.post(`/register`, (req, res) => employeeController.registerEmployee(req, res));

// Kauan
route.get(`/view`, (req, res) => employeeController.viewsAllEmployee(req, res));
route.put(`/update`, (req, res) => employeeController.updateEmployee(req, res));

// Caio
route.delete(`/delete/:registration`, (req, res) => employeeController.deleteEmployee(req, res));
route.get('/resgater/:registration', (req, res) => employeeController.viewEmployee(req, res))

export default route;