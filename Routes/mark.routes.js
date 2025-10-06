import { Router } from "express";
import markController from '../src/Controllers/MarkController.js';
const route = Router();

route.get(`/register`, markController.insertMark);
route.get(`/view`, markController.viewMarks);
route.get(`/update`, markController.updateMark);
route.get(`/delete`, markController.deleteMark);

export default route;