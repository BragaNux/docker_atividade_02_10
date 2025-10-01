import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const { Pool } = pg;


export const pool = new Pool({
host: process.env.POSTGRES_HOST,
port: process.env.POSTGRES_PORT,
user: process.env.POSTGRES_USER,
password: process.env.POSTGRES_PASSWORD,
database: process.env.POSTGRES_DB,
max: 10
});


export async function healthDB() {
const r = await pool.query('SELECT 1');
return r.rowCount === 1;
}