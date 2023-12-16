const outBind = {
    name: ["daniel", "daniel2"],
    idade: [24, 26],
}

const transformOutBindOracle = (outbind: object) => {

    const keys = Object.keys(outBind);
    const values = Object.values(outBind);

    type TanyObject = { [key: string]: any };

    if (values.length === 0) return [];

    const transformedData = values[0].map((_, index) => {
        const transformedObject: TanyObject = {};
        keys.forEach((key) => {
            transformedObject[key] = values[keys.indexOf(key)][index];
        });
        return transformedObject;
    });

    return transformedData;
}

console.log(transformOutBindOracle(outBind))