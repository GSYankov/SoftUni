function solve() {
    let inputElement = document.getElementById("arr");

    //inputElement.value = `["specialKey",
    //    "In this text the specialKey HELLOWORLD! is correct, but",
    //    "the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while",
    //    "SpeCIaLkeY SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!"]`;

    let inputAry = inputElement.value;
    let separatedAry = JSON.parse(inputAry);
    let key = separatedAry[0];
    let keyReplacePattern = new RegExp(key, "ig");
    let codeWordPattern = new RegExp(`\(\\s+|^)(${key.toLowerCase()})\\s+([A-Z!%$#]+)\\W`, "gm");
    let resultElement = document.getElementById("result");

    for (let i = 1; separatedAry.length > i; i++) {
        let newLine = separatedAry[i]
            .replace(keyReplacePattern, key.toLowerCase());
        while ((m = codeWordPattern.exec(newLine)) !== null) {
            let codeWord = m[3];
            let decodedWord = "";
            for (let c = 0; codeWord.length > c; c++) {
                let currChar = codeWord[c];
                let decodedChar;
                switch (codeWord[c]) {
                    case "!":
                        decodedChar = 1;
                        break;
                    case "%":
                        decodedChar = 2;
                        break;
                    case "#":
                        decodedChar = 3;
                        break;
                    case "$":
                        decodedChar = 4;
                        break;
                    default:
                        decodedChar = currChar.toLowerCase();
                        break;
                }
                decodedWord += decodedChar;
            }
            separatedAry[i] = separatedAry[i].replace(codeWord, decodedWord);
        }//
        let newParagraph = document.createElement("p");
        newParagraph.textContent = separatedAry[i];
        resultElement.appendChild(newParagraph);
    }
}
