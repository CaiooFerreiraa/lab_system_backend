import { Router } from "express";
import SectorController from "../Controllers/SectorController.js";
import DatabaseSector from "../Models/DatabaseSector.js";
import db from '../../bd.js';
const route = Router();

const sectorReporitory = new DatabaseSector(db);
const sectorController = new SectorController(sectorReporitory);

route.post('/register', (req, res) => sectorController.register(req, res));
route.get('/search/:uuid', (req, res) => sectorController.search(req, res));
route.put('/edit', (req, res) => sectorController.edit(req, res));
route.delete('/delete', (req, res) => sectorController.delete(req, res));
route.get('/read', (req, res) => sectorController.readAll(req, res));

export default route;