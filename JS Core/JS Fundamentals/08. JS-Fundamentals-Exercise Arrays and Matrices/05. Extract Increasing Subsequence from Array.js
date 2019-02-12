function nonDecreasingSequence(ary) {
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let i = 0; ary.length > i; i++) {
        if (ary[i] >= maxValue) {
            maxValue = ary[i];
            console.log(ary[i]);
        }
    }
}

nonDecreasingSequence(
    [1,
        3,
        8,
        4,
        10,
        12,
        3,
        2,
        24]
);