import { Pool } from "pg";

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
} = process.env;

console.info('Creating a Postgres Pool ...');
const pool = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    max: 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
console.info('Postgres Pool created.');

const db = await pool.connect();
const result = await db.query(`insert into manager.ger_daniel_teste values ('daniel') returning nome`);
db.release();

console.log(result.rows)

