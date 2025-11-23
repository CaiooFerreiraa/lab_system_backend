import { Router } from "express";
import MarkController from '../Controllers/MarkController.js';
import DatabaseMark from '../Models/DatabaseMark.js';
import db from "../../bd.js";
const route = Router();

const markRepository = new DatabaseMark(db);
const markController = new MarkController(markRepository);

// Jocielle e Caio
route.post(`/register`, (req, res) => markController.insertMark(req, res));
route.get(`/view`, (req, res) => markController.viewMarks(req, res));

//Douglas e Kauan
route.get(`/update/:name`, (req, res) => markController.getMark(req, res));
route.put(`/updateMark`, (req, res) => markController.updateMark(req, res));

// Erick e Caio
route.delete(`/delete/:name`, (req, res) => markController.deleteMark(req, res));
route.delete(`/delete/method/:id`, (req, res) => markController.deleteMethod(req, res));

export default route;