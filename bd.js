import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
dotenv.config();

const connectString = process.env.DATABASE_URL;
const db = neon(connectString);

export default db;