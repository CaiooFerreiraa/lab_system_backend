import { Router } from "express";
import dataBase from "./src/controllers/BDcontroller.js";
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)})
route.get('/testbd', dataBase.firstSelect)
route.get('/funcionario', dataBase.selectFuncionario)

route.get("/teste", (req, res) => {
  res.send("Olá Kauan, tudo joia?");
})

export default route;