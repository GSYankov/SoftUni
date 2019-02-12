function solve() {
    function solve() {
        let encodedMsgElement = document.getElementById("str");

        function sumOfNums(digits) {
            let sum = 0;
            digits.toString().split('')
                .forEach(digit => sum += Number(digit));
            if ((sum + "").length > 1) {
                return sumOfNums(sum);
            }

            return sum;
        }

        function solveConsole(onesZeros) {
            let digitsToTrim = sumOfNums(onesZeros);
            let trimmedAry = onesZeros.slice(digitsToTrim, onesZeros.length - digitsToTrim);

            let charsArray = [];
            for (let i = 0; Math.floor(trimmedAry.length / 8) > i / 8; i += 8) {
                let byte = trimmedAry.slice(i, i + 8);
                let asciiCode = Number.parseInt(byte, 2);
                let char = String.fromCharCode(asciiCode);
                if (/[A-Za-z ]/g.test(char)) {
                    charsArray.push(char);
                }

            }

            let decodedMsg = "";
            charsArray.forEach(ch => decodedMsg += ch);

            return decodedMsg;
        }

        let encodedMsg = encodedMsgElement.value;
        let resultElement = document.getElementById("result");
        resultElement.textContent = solveConsole(encodedMsg).trim();
    }
}