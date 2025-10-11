import { markDataRandom } from '../FakerDatas/markFake.js';
import DatabaseMark from '../Models/DatabaseMark.js';
const databaseMark = new DatabaseMark();

const insertMark = async (req, res) => {
  try {
    await databaseMark.createMark(markDataRandom());
    res.sendStatus(200);
  } catch (error) {
    console.error(error)
    res.sendStatus(400);
  }
}

const viewMarks = async (req, res) => {
  try {
    const marks = await databaseMark.readMark(markDataRandom())
    res.send(marks)
  } catch (error) {
    console.log(error)
    res.sendStatus(404);
  }
}

const updateMark = async (req, res) => {
  try {
    await databaseMark.updateNameMark(markDataRandom());
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  } 
}

const deleteMark = async (req, res) => {
  try {
    await databaseMark.deleteMark(markDataRandom());
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
}

export default {
  insertMark,
  viewMarks,
  updateMark,
  deleteMark
}