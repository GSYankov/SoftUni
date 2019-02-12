function tableFilter(table, commandString) {
    function printTable(table) {
        for (r = 0; r < table.length; r++) {
            console.log(table[r].join(" | "));
        }
    }

    let commandSet = commandString.split(" ");
    let command = commandSet[0];
    let header = commandSet[1];

    switch (command) {
        case "hide":
            let colToHide = table[0].indexOf(header);
            for (let r = 0; r < table.length; r++) {
                table[r].splice(colToHide, 1);
            }
            printTable(table);
            break;

        case "sort":
            let colToSort = table[0].indexOf(header);
            let headerRow = table[0];
            table.splice(0, 1);
            table.sort(function sortFunction(a, b) {
                if (a[colToSort] === b[colToSort]) {
                    return 0;
                } else {
                    return (a[colToSort] < b[colToSort]) ? -1 : 1;
                }
            });
            table.unshift(headerRow);

            printTable(table);
            break;

        case "filter":
            let value = commandSet[2];
            let colToFilter = table[0].indexOf(header);
            let tableLen = table.length;
            let resultTable = [];
            resultTable.push(table[0]);
            for (let r = 1; r < tableLen; r++) {
                if (table[r][colToFilter] === value) {
                    resultTable.push(table[r]);
                }
            }
            printTable(resultTable);
    }
}

console.log(tableFilter([['name', 'age', 'grade'],
        ['Peter', '25', '5.00'],
        ['George', '34', '6.00'],
        ['Marry', '28', '5.49']],
    'sort name'
));