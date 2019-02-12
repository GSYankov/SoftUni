function solve() {
    function OnBtnClick(e) {
        let displayElement = document.getElementById("output");
        let inputValue = document.getElementsByTagName("input")[0].value || 0;
        let outputElement = document.getElementById("output");
        let cookedValue = outputElement.textContent || inputValue;
        let operation = e.target.textContent;

        switch (operation) {
            case "Chop":
                cookedValue /= 2;
                break;
            case "Dice":
                cookedValue = Math.sqrt(cookedValue);
                break;
            case "Spice":
                cookedValue++;
                break;
            case "Bake":
                cookedValue *= 3;
                break;
            case "Fillet":
                cookedValue *= 0.8;
                break;
        }

        outputElement.textContent = cookedValue;
    }

    Array.from(document.getElementsByTagName("button"))
        .forEach(btn => btn.addEventListener("click", OnBtnClick));
}
