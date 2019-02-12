function solve(num) {
    let numberAsString = num.toString();
    let sumOfDigits = Number(numberAsString.charAt(numberAsString.length - 1));
    let AreEqual = true;
    for (let i = 1; numberAsString.length > i; i++) {
        let currentDigit = numberAsString.charAt(numberAsString.length - i);
        let nextDigit = numberAsString.charAt(numberAsString.length - i - 1);
        sumOfDigits += Number(nextDigit);

        if (currentDigit != nextDigit) {
            AreEqual = false;
        }
    }

    console.log(AreEqual);
    console.log(sumOfDigits);
}

solve(1234);