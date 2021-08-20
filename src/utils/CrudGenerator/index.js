const createInsert = require('./createInsert');
const createSelectAll = require('./createSelectAll');
function createTable(table) {
    const columns = table.columns.map(column => `${column.name} ${column.type === 'VARCHAR' ? `VARCHAR(${column.size})` : `INTEGER`}${column.primaryKey ? ' PRIMARY KEY' : ''}`).join(', ');
    const createComand = `CREATE TABLE IF NOT EXISTS ${table.name} ( ${columns} );`;
    return `
    \tdb.transaction(tx => {
    \t    tx.executeSql('${createComand}');
    \t});`;
}
function filterCreateTable(create, type) {
    const createTable = type === 'object' ? `${create.split("executeSql('")[1].split("');")[0]}` : create;
    const completeCreate = createTable.split('(')[0].trim();
    const tableName = completeCreate.split(' ')[completeCreate.split(' ').length - 1];
    let columns = create.split(tableName, 100).slice(1, Infinity);
    columns = (columns.join(' ')).split(',');
    columns = columns.map(column => column.trim().replace("\n", ''));
    columns[0] = columns[0].replace('(', '').trim();
    columns[columns.length - 1] = columns[columns.length - 1].replace(');', '').trim();
    const columnsNameType = columns;
    const columnsName = columns.map(column => column.split(' ')[0]);
    return { columnsNameType, columnsName, tableName };
}
function createCrud(info) {
    const createTableString = typeof info === 'object' ? createTable(info) : info;
    const tableInfo = filterCreateTable(createTableString, typeof info === 'object' ? 'object' : 'string');
    const crud = `

        ${typeof info === 'object' ? createTableString : ''}
    
        ${createInsert(tableInfo)}
        
        ${createSelectAll(tableInfo)}
    
    `;
    return crud.trimEnd();
}
module.exports = createCrud;
//# sourceMappingURL=index.js.map