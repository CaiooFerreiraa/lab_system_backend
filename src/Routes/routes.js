import { Router } from "express";
import employeeRoute from './employee.routes.js';
import markRoute from './mark.routes.js';
import productRoute from './product.routes.js';
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)});
route.use('/employee', employeeRoute);
route.use('/mark', markRoute);
route.use('/product', productRoute)

export default route;