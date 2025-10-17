import { Router } from "express";
import employeeController from '../Controllers/EmployeeController.js'
const route = Router();

route.post(`/register`, employeeController.registerEmployee);
route.get(`/view`, employeeController.viewsEmployee);
route.post(`/update`, employeeController.updateEmployee);
route.post(`/delete`, employeeController.deleteEmployee);

export default route;