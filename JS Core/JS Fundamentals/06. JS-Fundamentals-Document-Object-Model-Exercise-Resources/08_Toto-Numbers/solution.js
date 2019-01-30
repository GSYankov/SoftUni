function solve() {
    function GetMyNumbers() {
        let inputElement = document.getElementsByTagName("input")[0];
        let inputNumbers = inputElement.value;
        let numbers = inputNumbers.split(" ");
        var filteredNums = numbers.filter(function (el) {
            return (Number(el) > 0 && Number(el) < 50);
        });

        let numbersElement = document.getElementById("allNumbers");

        if (filteredNums.length === 6) {
            for (let i = 1; i <= 49; i++) {
                let divElement = document.createElement("div");
                divElement.className = "numbers";
                divElement.textContent = i;
                if (filteredNums.includes(String(i))) {
                    divElement.style = "background-color:orange";
                }
                numbersElement.appendChild(divElement);
            }
        }
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", GetMyNumbers);
}