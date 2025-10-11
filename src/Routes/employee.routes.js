import { Router } from "express";
import employeeController from '../Controllers/EmployeeController.js'
const route = Router();

route.post(`/register`, employeeController.registerEmployee);
route.get(`/view`, employeeController.viewsEmployee);
route.get(`/update`, employeeController.updateEmployee);
route.get(`/delete`, employeeController.deleteEmployee);

export default route;