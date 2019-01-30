function solve() {
    let inputElementValue = document.getElementById('input').textContent;
    let separatedSentences = inputElementValue.split(".").filter(function (el) {
        return el.length > 0;
    });

    let restoredDotSentences = separatedSentences.map(function (elDot) {
        return elDot.concat(".");
    });


    for (let i = 0; restoredDotSentences.length > i; i += 3) {
        let createdParagraph = document.createElement("p");
        let paragraph = "";
        for (let b = i; b < i + 3; b++) {
            paragraph += restoredDotSentences[b];
            if (b > restoredDotSentences.length - 2) {
                break;
            }
        }
        createdParagraph.textContent=paragraph;
        document.getElementById("output").appendChild(createdParagraph)
    }
}