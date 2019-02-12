function orbit(params) {
    function createMatrix(rows, cols) {
        let ary = [];
        for (let r = 0; rows > r; r++) {
            let row = [];
            for (let c = 0; cols > c; c++) {
                row.push(0);
            }
            ary.push(row);
        }
        return ary;
    }

    let rows = params[0];
    let cols = params[1];
    let x = params[2];
    let y = params[3];
    let matrix = createMatrix(rows, cols);
    let initialStart = 1;
    matrix[x][y] = initialStart;

    for (let r = 0; rows > r; r++) {
        for (let c = 0; cols > c; c++) {
            matrix[r][c] = Math.max(Math.abs(x - r) + initialStart, Math.abs(y - c) + initialStart);
        }
    }

    for (let r = 0; matrix.length > r; r++) {
        console.log(matrix[r].join(" "));
    }
}

orbit([4, 4, 0, 0]);