import { Router } from "express";

const route = Router();

route.get('/', (req, res) => {
  res.sendStatus(200)
})

route.get("/teste", (req, res) => {
  res.send("Olá Kauan, tudo joia?");
})

export default route;