import express from 'express'
import route from './routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(route)

app.listen(port, () => console.log("Servidor rodando"))