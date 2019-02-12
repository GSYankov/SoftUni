function RotateArray(ary) {
    let rotations = ary.pop();
    for (let r = 0; rotations % ary.length > r; r++) {
        let mem = ary[ary.length - 1];
        for (let i = ary.length - 1; 0 < i; i--) {
            ary[i] = ary[i - 1];
        }
        ary[0] = mem;
    }
    result = "";
    ary.forEach(el => result += el + " ");
    console.log(result);
}

RotateArray(
    ['Banana',
        'Orange',
        'Coconut',
        'Apple',
        '15']
);