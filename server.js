import express from 'express'
import route from './routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Aqui ficara o middleware de verificação se é o admin do sistema que está fazendo essas inserções
app.use(route)

app.listen(port, () => console.log("Servidor rodando"))