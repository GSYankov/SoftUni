function PrintEveryNthElement(ary) {
    let step = Number(ary.pop());
    for (let i = 0; ary.length > i; i += step) {
        if (i >= ary.length) {
            break;
        }
        console.log(ary[i])
    }
}

PrintEveryNthElement(
    ['1',
        '2',
        '3',
        '4',
        '5',
        '6']
)