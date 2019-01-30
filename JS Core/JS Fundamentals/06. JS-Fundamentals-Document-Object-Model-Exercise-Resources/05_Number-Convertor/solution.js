function solve() {
    let binOptionElement = document.createElement("option");
    binOptionElement.textContent = "Binary";
    binOptionElement.value = "binary";

    let hexOptionElement = document.createElement("option");
    hexOptionElement.textContent = "Hexadeicmal";
    hexOptionElement.value = "hexadecimal";

    let selectElementTo = document.getElementById("selectMenuTo");
    selectElementTo.appendChild(binOptionElement);
    selectElementTo.appendChild(hexOptionElement);

    function Convert() {
        let decValue = Number(document.getElementById("input").value);
        let targetType = document.getElementById("selectMenuTo").value;
        let resultValue = document.getElementById("result");
        if (targetType === "binary") {
            let binString = decValue.toString(2);
            result.value = binString;
        } else if (targetType === "hexadecimal") {
            let hexString = decValue.toString(16);
            result.value = hexString.toString().toUpperCase();
        }
    }

    let convertBtn = document.getElementsByTagName("button")[0];
    convertBtn.addEventListener("click", Convert)

}