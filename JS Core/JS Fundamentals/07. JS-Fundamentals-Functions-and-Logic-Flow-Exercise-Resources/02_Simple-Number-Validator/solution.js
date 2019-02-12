function validate() {
    function CheckValidity() {
        let inputElement = document.getElementsByTagName("input")[0];
        let stingOfNums = inputElement.value;
        let weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
        let totalSum = 0;
        for (let i = 0; weights.length > i; i++) {
            totalSum += weights[i] * stingOfNums[i];
        }

        let resultElement =document.getElementById("response");
        let remainder = totalSum % 11 === 10 ? 0 : totalSum % 11;
        if (remainder==stingOfNums[9]){
            resultElement.textContent="This number is Valid!";
        }else {
            resultElement.textContent="This number is NOT Valid!";
        }
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", CheckValidity);
}