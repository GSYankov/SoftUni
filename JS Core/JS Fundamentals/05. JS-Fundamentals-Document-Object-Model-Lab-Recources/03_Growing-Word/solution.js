function solve() {
    function clickButton() {
        let growingWord = document.querySelector("main div p");
        let fontSize = window.getComputedStyle(growingWord, null).getPropertyValue('font-size');
        let currentSize = parseFloat(fontSize);
        let newSize = currentSize + 2;
        growingWord.style.fontSize = newSize + "px";

        let growingWordColour = growingWord.style.color;
        console.log(growingWordColour);
        switch (growingWordColour) {
            case "blue":
                growingWord.style.color = "green";
                break;
            case "green":
                growingWord.style.color = "red";
                break;
            case "":
            case "red":
                growingWord.style.color = "blue";
                break;
        }
    }

    document.querySelector("div button").addEventListener("click", clickButton)
}