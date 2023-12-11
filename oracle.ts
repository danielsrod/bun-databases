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
    select
        cd_pessoa_fisica,
        nm_pessoa_fisica,
        nr_cpf
    from tasy.pessoa_fisica
    where cd_pessoa_fisica = :cd_pessoa_fisica
`;

const binds: BindParameters = {
    cd_pessoa_fisica: '713903'
}

const execOptions: ExecuteOptions = {
    autoCommit: true,
    outFormat: OUT_FORMAT_OBJECT,
};

const result: Result<unknown> = await db.execute(sql, binds, execOptions);
console.log(result.rows);