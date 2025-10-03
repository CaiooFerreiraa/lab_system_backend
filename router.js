import { Router } from "express";
import func from './src/controllers/FuncionarioController.js';
const route = Router();

route.get('/', (req, res) => {res.sendStatus(200)})
route.get('/registerFuncionario', func.registerFuncionario)

route.get("/teste", (req, res) => {
  res.send("Olá Kauan, tudo joia?");
})

export default route;