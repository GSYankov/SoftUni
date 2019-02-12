function solve() {
    function CardToWeight(card) {
        switch (card) {
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":
                return 14;
            default:
                return card;
        }
    }

    function WeightToCard(card) {
        switch (card) {
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
            case 14:
                return "A";
            default:
                return card;
        }
    }

    function GetCardDiv(card, suitChar) {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";
        let suitParagraphUp = document.createElement("p");
        suitParagraphUp.textContent = suitChar;
        let suitParagraphDown = document.createElement("p");
        suitParagraphDown.textContent = suitChar;
        let cardParagraph = document.createElement("p");
        cardParagraph.textContent = WeightToCard(card);
        cardDiv.appendChild(suitParagraphUp);
        cardDiv.appendChild(cardParagraph);
        cardDiv.appendChild(suitParagraphDown);

        return cardDiv;
    }

    function GetCards() {
        let fromValue = Number(CardToWeight(document.getElementById("from").value));
        let toValue = Number(CardToWeight(document.getElementById("to").value));
        let suitSelectElement = document.getElementsByTagName("select")[0];
        let suit = suitSelectElement.options[suitSelectElement.selectedIndex].textContent;
        let suitChar = suit[suit.length - 1];
        let listOfCards = [];

        if (fromValue <= toValue
            && fromValue >= 2 && fromValue <= 14
            && toValue >= 2 && toValue <= 14) {
            for (let i = fromValue; i <= toValue; i++) {
                listOfCards.push(i);
            }
            console.log(listOfCards);
        }

        let handElement = document.getElementById("cards");

        listOfCards.forEach(card => handElement.appendChild(GetCardDiv(card, suitChar)));

        console.log(fromValue);
        console.log(toValue);


    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", GetCards);
}