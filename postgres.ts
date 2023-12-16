import { Pool, QueryConfig } from "pg";

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
// const sql = `
//     insert into manager.daniel values ('daniel', 24)
//     returning name, idade
// `;
// const sql = `
//     update manager.daniel
//     set name = 'salve'
//     returning name
// `;
const sql = `
    select * from manager.daniel
`;
const result = await db.query(sql);


console.log('rows: ', result.rows)
console.log('fields: ', result.fields.map(({name}) => name));
console.log('rowCount: ', result.rowCount)
console.log('outBinds: ', result.rows)

db.release();

