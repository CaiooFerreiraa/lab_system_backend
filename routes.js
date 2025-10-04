import { Router } from "express";
import func from './src/controllers/FuncionarioController.js';
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)});
route.get('/register', func.registerEmployee);
route.get('/view', func.viewsEmployee);
route.get('/update', func.updateEmployee);
route.get('/delete', func.deleteEmployee)

export default route;