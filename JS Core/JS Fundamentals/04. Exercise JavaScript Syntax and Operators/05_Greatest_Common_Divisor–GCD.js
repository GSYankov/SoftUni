function solve(num1, num2) {
    let remainder = 1;
    let a = Math.max(num1, num2);
    let b = Math.min(num1, num2);
    while (remainder != 0) {
        remainder = a % b;
        a = b;
        b = remainder;
    }

    console.log(a)
}

solve(1701,3768);