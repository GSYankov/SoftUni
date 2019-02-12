function AddRemoveElements(ary) {
    let resultAry = [];
    for (let i = 0; ary.length > i; i++) {
        let command = ary[i];
        if (command === "add") {
            resultAry.push(i + 1);
        } else {
            resultAry.pop();
        }
    }

    if (resultAry.length === 0) {
        console.log("Empty");
    } else {
        resultAry.forEach((el) => console.log(el));
    }
}

AddRemoveElements(
    ['remove',
        'remove',
        'remove']
);

