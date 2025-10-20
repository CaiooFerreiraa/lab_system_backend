import express from 'express';
import route from './src/Routes/routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: [
    'https://lab-system-frontend-roan.vercel.app',
    process.env.LOCALHOST
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.urlencoded({extended: true}));
app.use(route);

app.listen(port, () => console.log("Servidor rodando"));