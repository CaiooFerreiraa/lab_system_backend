import DatabaseMark from '../Models/DatabaseMark.js';
import MarkFacade from "../Facades/MarkFacade.js"
const databaseMark = new DatabaseMark();

const insertMark = async (req, res) => {
  try {
    MarkFacade.checkData(req.body);
    await databaseMark.createMark(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

const viewMarks = async (req, res) => {
  try {
    MarkFacade.checkData(req.body);
    const marks = await databaseMark.readMark(req.body);
    res.send(marks);
  } catch (error) {
    res.sendStatus(404);
  }
}

const updateMark = async (req, res) => {
  try {
    MarkFacade.checkData(req.body);
    await databaseMark.updateNameMark(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  } 
}

const deleteMark = async (req, res) => {
  try {
    MarkFacade.checkData(req.body);
    await databaseMark.deleteMark(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

export default {
  insertMark,
  viewMarks,
  updateMark,
  deleteMark
};
