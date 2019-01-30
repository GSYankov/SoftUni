function solve() {
    function onCardClick(e) {
        let cardElement = e.target;
        let cardParentName = cardElement.parentNode.id;
        e.target.src = "images/whiteCard.jpg";
        let cardWeight = cardElement.name;

        let spanId = 0;
        if (cardParentName == "player2Div") {
            spanId = 2;
        }

        document.getElementsByTagName('span')[spanId].textContent = cardWeight;
        let scoreLeft = Number(document.getElementsByTagName('span')[0].textContent);
        let scoreRight = Number(document.getElementsByTagName('span')[2].textContent);

        if (scoreLeft && scoreRight) {
            if (scoreLeft > scoreRight) {
                document.querySelector("#player1Div")
                    .querySelector(`img[name="${scoreLeft}"]`)
                    .style.border = "2px solid green";
                document.querySelector("#player2Div")
                    .querySelector(`img[name="${scoreRight}"]`)
                    .style.border = "2px solid darkred";
            } else {
                document.querySelector("#player2Div")
                    .querySelector(`img[name="${scoreRight}"]`)
                    .style.border = "2px solid green";
                document.querySelector("#player1Div")
                    .querySelector(`img[name="${scoreLeft}"]`)
                    .style.border = "2px solid darkred";
            }

            document.getElementById("history").textContent += `[${scoreLeft} vs ${scoreRight}] `;


                document.getElementsByTagName('span')[0].textContent = "";
                document.getElementsByTagName('span')[2].textContent = "";

        }
    }

    Array.from(document.querySelectorAll('main div img'))
        .forEach((img) => img.addEventListener("click", onCardClick));
}