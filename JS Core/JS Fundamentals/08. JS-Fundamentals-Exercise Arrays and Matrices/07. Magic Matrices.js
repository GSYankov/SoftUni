function magicMatrix(twoDarr) {
    let isMagic = true;

    let prevRow = 0;
    for (let r = 0; twoDarr.length > r; r++) {
        let rowSum = 0;
        for (let c = 0; twoDarr[r].length > c; c++) {
            rowSum += twoDarr[r][c];
        }

        if (r == 0) {
            prevRow = rowSum;
        }

        if (prevRow != rowSum) {
            isMagic = false;
            break;
        }
    }

    if (isMagic) {
        let prevCol = 0;
        for (let c = 0; twoDarr[0].length > c; c++) {
            let colSum = 0;
            for (let r = 0; twoDarr.length > r; r++) {
                colSum += twoDarr[r][c];
            }
            if (c == 0) {
                prevCol = colSum;
            }
            if (prevCol != colSum) {
                isMagic = false;
                break;
            }
        }
    }

    console.log(isMagic);
}


magicMatrix(
    [[4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]]
);