import { Router } from "express";
import MarkController from '../Controllers/MarkController.js';
import DatabaseMark from '../Models/DatabaseMark.js';
const route = Router();

const markRepository = new DatabaseMark();
const markController = new MarkController(markRepository);

route.post(`/register`, (req, res) => markController.insertMark(req, res));
route.get(`/view`, (req, res) => markController.viewMarks(req, res));
route.get(`/update/:name`, (req, res) => markController.getMark(req, res));
route.put(`/updateMark`, (req, res) => markController.updateMark(req, res));
route.delete(`/delete/:name`, (req, res) => markController.deleteMark(req, res));
route.delete(`/delete/method/:id`, (req, res) => markController.deleteMethod(req, res));

export default route;