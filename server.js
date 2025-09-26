import express from 'express'
import route from './router.js'

const app = express()
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./public"))
app.use(route)

app.listen(port, () => console.log("Servidor rodando"))