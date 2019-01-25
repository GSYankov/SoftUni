function solve(num1, num2, num3) {
    let preResult = num1 > num2 ? num1 : num2;
    let result = preResult > num3 ? preResult : num3;

    console.log(`The largest number is ${result}.`)
}

solve(1, 10, 16);

