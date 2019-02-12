function greatestCD() {
    function findGcd(num1, num2) {
        let remainder = 1;
        let a = Math.max(num1, num2);
        let b = Math.min(num1, num2);
        while (remainder != 0) {
            remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }

    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let resultElement = document.getElementById("result");
    resultElement.textContent = findGcd(num1, num2);
}