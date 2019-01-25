function solve(inputArray) {
    let couples = inputArray;
    let outputObj = new Array();

    let pointer = 0;
    for (let i = 0; inputArray.length > i; i += 2) {
        outputObj[pointer] = ` ${inputArray[i]}: ${inputArray[i + 1]}`;
        pointer++;
    }

    console.log(`{${outputObj.toString()} }`);
}

solve(['Yoghurt', 48, 'Rise', 138, 'Apple', 52]);