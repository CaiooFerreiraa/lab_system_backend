import { Router } from "express";

const route = Router();

route.get('/', (req, res) => {
  res.sendStatus(200)
})

export default route;