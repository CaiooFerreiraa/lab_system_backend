import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import DatabaseProduct from "../Models/DatabaseProduct.js";
import db from '../../bd.js';
const route = Router();

const productReporitory = new DatabaseProduct(db);
const productController = new ProductController(productReporitory);

route.post('/register', (req, res) => productController.register(req, res));
route.get('/search/:uuid', (req, res) => productController.search(req, res));
route.put('/edit', (req, res) => productController.edit(req, res));
route.delete('/delete', (req, res) => productController.delete(req, res));
route.get('/read', (req, res) => productController.readAll(req, res));

export default route;