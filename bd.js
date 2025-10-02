import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config();

const connectString = process.env.DATABASE_URL;
const sql = postgres(connectString);

export default sql;