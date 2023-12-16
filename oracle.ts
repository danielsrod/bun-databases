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
    returning name, idade into :name, :idade
`;
// const sql: string = `
//     select * from daniel.daniel
// `;

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
const rowsWithLowercaseKeys = result.rows?.map((row: any) => {
    const newRow: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(row)) {
        newRow[key.toLowerCase()] = value;
    }
    return newRow;
});

type TanyObject = { [key: string]: any };

const transformOutBindOracle = (outBind: TanyObject) => {

    const keys = Object.keys(outBind);
    const values = Object.values(outBind);

    

    if (values.length === 0) return [];

    const transformedData = values[0].map((_: any, index: number) => {
        const transformedObject: TanyObject = {};
        keys.forEach((key) => {
            transformedObject[key] = values[keys.indexOf(key)][index];
        });
        return transformedObject;
    });

    return transformedData;
}

console.log('rows: ', rowsWithLowercaseKeys)
console.log('fields: ', result.metaData?.map(({name}) => name.toLowerCase()))
console.log('rowCount: ', result.rowsAffected ? result.rowsAffected : result.rows?.length)
console.log('result.outBinds: ', transformOutBindOracle(result.outBinds ? result.outBinds : []))

await db.close();