// const all = () => {
//     return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 "SELECT * FROM tb_destinatarios ORDER BY ordem ASC;",
//                 [],
//                 (_, { rows }) => {
//                     resolve(rows);
//                 },
//                 (_, error) => reject("Erro no all da tbDestinatarios") // erro interno em tx.executeSql
//             );
//         });
//     });
// };
function structureAllFunction(tableInfo) {
    return `
        const all = () => {
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM ${tableInfo.tableName};",
                        [],
                        (_, { rows }) => {
                            resolve(rows);
                        },
                        (_, error) => reject("Erro no all da ${tableInfo.tableName}")
                    );
                });
            });
        };
    `;
}
module.exports = structureAllFunction;
//# sourceMappingURL=createSelectAll.js.map