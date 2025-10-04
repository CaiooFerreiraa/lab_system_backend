import { Router } from "express";
import managerEmployees from './src/controllers/FuncionarioController.js';
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)});
route.get('/register', managerEmployees.registerEmployee);
route.get('/view', managerEmployees.viewsEmployee);
route.get('/update', managerEmployees.updateEmployee);
route.get('/delete', managerEmployees.deleteEmployee)

export default route;