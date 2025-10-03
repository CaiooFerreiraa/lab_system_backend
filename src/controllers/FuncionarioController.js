import DataBase from "../Models/Database.js"
import { funcionario } from "../FakerDatas/person.js";
const dataBase = new DataBase();

const registerFuncionario = async (req, res) => {
  await dataBase.registrarFuncionario(funcionario)
  res.sendStatus(200)
}

export default {
  registerFuncionario
}