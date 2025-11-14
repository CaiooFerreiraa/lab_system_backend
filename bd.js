import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
dotenv.config();

const connectString = process.env.DATABASE_URL;
const sql = neon(connectString);

export default sql;