function structureInsertFunction(create, option = 'COMPLETO') {
    const { columnsNameType, columnsName, tableName } = create;
    const objType = expectedObjType();
    const insertComand = createInsertComand();
    const paramList = columnsName.map(column => `obj.${column}`).join(', ');
    function createInsertComand() {
        const formatedColumnsName = columnsName.join(', ');
        const params = `${Array(columnsName.length).fill('?').join(',')}`;
        return `INSERT INTO ${tableName} (${formatedColumnsName}) values (${params});`;
    }
    function expectedObjType() {
        const objType = columnsNameType.map(column => {
            const name = column.split(' ')[0];
            return column.includes('INTEGER') ? `${name}: 'number'` : column.toLocaleUpperCase().includes('VARCHAR') || column.toLocaleUpperCase().includes('TEXT') ? `${name}: 'string'` : `${name}: 'any'`;
        }).join(',\n\t\t');
        return `
            const type = {
                ${objType}
            }
        `;
    }
    if (option === 'COMPLETO') {
        return `
        const insert = async (obj) => {

            ${objType}

            function verifyDest() {
        
                const keys = Object.keys(type);
                const values = Object.values(type);
        
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = values[i];
                    if (typeof obj[key] !== value) {
                        console.log(` + "`${key} must be ${value}`" + `);
                    }
                }
                
            }
        
            verifyDest();

            await db.transaction(tx => {
                tx.executeSql('${insertComand}', 
                [${paramList}], 
                () => console.log('Armazenado'), 
                (_, error) => console.log(error))
            })
        }`;
    }
    return `
    const insert = async (obj) => {
        await db.transaction(tx => {
            tx.executeSql('${insertComand}', 
            [${paramList}], 
            () => console.log('Armazenado'), 
            (_, error) => console.log(error))
        })
    }`;
}
module.exports = structureInsertFunction;
//# sourceMappingURL=createInsert.js.map