function printWithGivenDelimiter(inAry) {
    let delimiter = inAry.pop();
    console.log(inAry.join(delimiter));
}

printWithGivenDelimiter(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-']
)