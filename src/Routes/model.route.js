import { Router } from "express";
import ModelController from "../Controllers/ModelController.js"
import DatasebaseModel from "../Models/DatabaseModel.js"
import db from "../../bd.js";
const route = Router();

const database = new DatasebaseModel(db);
const modelController = new ModelController(database);

route.get('/read', (req, res) => modelController.readAll(req, res))
route.post('/register', (req, res) => modelController.register(req, res))
route.get('/search/:uuid', (req, res) => modelController.search(req, res));
route.put('/edit', (req, res) => modelController.edit(req, res))
route.delete('/delete', (req, res) => modelController.delete(req, res))

export default route;
