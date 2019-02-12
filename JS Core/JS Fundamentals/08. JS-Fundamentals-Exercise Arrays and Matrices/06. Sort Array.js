function sortAry(ary) {
    ary.sort(function compByLength(a, b) {
        if (a.length < b.length) {
            return -1;
        }
        if (a.length > b.length) {
            return 1;
        }
        // a.length must be equal to b.length

        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }

        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });

    ary.forEach(el=>console.log(el));
}

sortAry(['test',
    'Deny',
    'omen',
    'Default']
);