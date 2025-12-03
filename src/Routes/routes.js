import { Router } from "express";
import employeeRoute from './employee.routes.js';
import markRoute from './mark.routes.js';
import productRoute from './product.routes.js';
import sectorRoute from './sector.route.js';
import modelRoute from './model.route.js';
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)});
route.use('/employee', employeeRoute);
route.use('/mark', markRoute);
route.use('/product', productRoute);
route.use('/sector', sectorRoute);
route.use('/model', modelRoute);

export default route;