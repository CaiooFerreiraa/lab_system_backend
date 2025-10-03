import { employeeData } from "../FakerDatas/person.js";
import DatabaseFuncionario from "../Models/DatabaseFuncionario.js";
const dataBase = new DatabaseFuncionario();

const registerEmployee = async (req, res) => {
  await dataBase.createEmployee(employeeData)
  res.sendStatus(200)
}

export default {
  registerEmployee
}