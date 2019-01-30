function solve() {
    function EncodeMessage() {
        let message = document.querySelectorAll("textarea")[0].value;
        let encodedMessage = "";

        for (let i = 0; message.length > i; i++) {
            let encodedChar = message.charCodeAt(i) + 1;
            encodedMessage += String.fromCharCode(encodedChar);
        }

        document.querySelectorAll("textarea")[0].value = "";
        document.querySelectorAll("textarea")[1].value = encodedMessage;
    }

    function DecodeMessage() {
    let message = document.querySelectorAll("textarea")[1].value;
    let decodedMessage = "";

        for (let i = 0; message.length > i; i++) {
            let decodedChar = message.charCodeAt(i) - 1;
            decodedMessage += String.fromCharCode(decodedChar);
        }

        document.querySelectorAll("textarea")[1].value="";
        document.querySelectorAll("textarea")[1].value = decodedMessage;
    }


    document.querySelectorAll("button")[0]
        .addEventListener("click", EncodeMessage);
    document.querySelectorAll("button")[1]
        .addEventListener("click", DecodeMessage);
}