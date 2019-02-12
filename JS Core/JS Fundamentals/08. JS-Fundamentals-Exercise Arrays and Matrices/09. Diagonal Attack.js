function diagonalAttack(ary) {
    let matrix = [];
    for (let r = 0; ary.length > r; r++) {
        let row = ary[r].split(" ").map(n => Number(n));
        matrix.push(row);
    }

    let d1 = 0;
    for (let d = 0; matrix.length > d; d++) {
        d1 += matrix[d][d];
    }

    let d2 = 0;
    for (let d = matrix.length - 1; d >= 0; d--) {
        d2 += matrix[d][d];
    }

    if (d1 === d2) {
        let leftElement = 0;
        let rightElement = matrix.length - 1;

        for (let r = 0; matrix.length > r; r++) {
            for (let c = 0; matrix[r].length > c; c++) {
                if (c != leftElement && c != rightElement) {
                    matrix[r][c] = d1;
                }
            }
            leftElement++;
            rightElement--;
        }

    }

    for (let r = 0; matrix.length > r; r++) {
        console.log(matrix[r].join(" "));
    }
}

diagonalAttack(
    ['5 3 12 3 1',
        '11 4 23 2 5',
        '101 12 3 21 10',
        '1 4 5 2 2',
        '5 22 33 11 1']
);