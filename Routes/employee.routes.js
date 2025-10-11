import { Router } from "express";
import employeeController from '../controllers/EmployeeController.js'
const route = Router();

route.get(`/register`, employeeController.registerEmployee);
route.get(`/view`, employeeController.viewsEmployee);
route.get(`/update`, employeeController.updateEmployee);
route.get(`/delete`, employeeController.deleteEmployee);

export default route;