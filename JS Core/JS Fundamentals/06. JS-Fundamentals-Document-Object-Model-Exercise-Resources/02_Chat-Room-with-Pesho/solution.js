function solve() {
    function onBtnClick(e) {
        let buttonElementName = e.target.name;
        let textAlignment = "right";
        let sender = "Pesho";
        let message = document.getElementById("peshoChatBox").value;
        document.getElementById("peshoChatBox").value="";

        if (buttonElementName === "myBtn") {
            textAlignment = "left";
            sender = "Me"
            message = document.getElementById("myChatBox").value;
            document.getElementById("myChatBox").value="";
        }

        let spanElement = document.createElement("span");
        spanElement.textContent = sender;
        let paragraphElement = document.createElement("p");
        paragraphElement.textContent = message;
        let divElement = document.createElement("div");
        divElement.style.textAlign = textAlignment;
        divElement.appendChild(spanElement);
        divElement.appendChild(paragraphElement);
        document.getElementById("chatChronology").appendChild(divElement);


    }


    Array.from(document.getElementsByTagName("button"))
        .forEach((btn) => btn.addEventListener("click", onBtnClick));
}