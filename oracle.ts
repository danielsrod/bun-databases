import oracledb, { 
    BindParameters, 
    ExecuteOptions, 
    BIND_IN, 
    STRING, 
    NUMBER, 
    PoolAttributes, 
    OUT_FORMAT_OBJECT, 
    BIND_OUT, 
    Pool, 
    Connection,
    Result,
    createPool,
    getConnection,
} from 'oracledb';

const {
    ORACLE_USER,
    ORACLE_PASSWORD,
    ORACLE_CONNECTIONSTRING
} = process.env;

const options: PoolAttributes = {
    user: ORACLE_USER,
    password: ORACLE_PASSWORD,
    connectionString: ORACLE_CONNECTIONSTRING,
};

const connection: Pool = await createPool(options);
const db: Connection = await getConnection(options);

const sql: string = `
    insert into daniel.daniel values ('daniel', 24)
    returning name into :name, idade into :idade
`;

const binds: BindParameters = {
    name: {
        dir: BIND_OUT,
        type: STRING,
    },
    idade: {
        dir: BIND_OUT,
        type: NUMBER,
    },
    // cd_pessoa_fisica: {
    //     dir: BIND_IN,
    //     type: STRING,
    //     val: String('713903')
    // }
}

const execOptions: ExecuteOptions = {
    autoCommit: true,
    outFormat: OUT_FORMAT_OBJECT,
};

const result: Result<unknown> = await db.execute(sql, binds, execOptions);

// console.log('rows: ', result.rows)
// console.log('fields: ', result.metaData?.map(({name}) => name))
// console.log('rowCount: ', result.rowsAffected)
console.log(result)

await db.close();