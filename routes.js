import { Router } from "express";
import managerEmployees from './src/Controllers/FuncionarioController.js';
import managerMarks from './src/Controllers/MarkController.js'
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)});
route.get('/registerEmployee', managerEmployees.registerEmployee);
route.get('/viewEmployee', managerEmployees.viewsEmployee);
route.get('/updateEmployee', managerEmployees.updateEmployee);
route.get('/deleteEmployee', managerEmployees.deleteEmployee);

route.get('/registerMark', managerMarks.insertMark);
route.get('/viewMark', managerMarks.viewMarks);
route.get('/updateMark', managerMarks.updateMark);
route.get('/deleteMark', managerMarks.deleteMark);

export default route;