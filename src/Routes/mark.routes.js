import { Router } from "express";
import markController from '../Controllers/MarkController.js';
const route = Router();

route.post(`/register`, markController.insertMark);
route.get(`/view`, markController.viewMarks);
route.post(`/update`, markController.updateMark);
route.post(`/delete`, markController.deleteMark);

export default route;