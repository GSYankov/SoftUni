function solve() {
    let inputStrElement = document.getElementById("str");
    let inputMsgElement = document.getElementById("text");

    let inputMsg = inputMsgElement.value;
    let northEastPattern = /(?:(east|north)).*?(?:(\d{2})).*?[,].*?(?:(\d{6}))/gi;

    let northLongitude = "";
    let eastLatitude = "";
    while ((m = northEastPattern.exec(inputMsg)) !== null) {
        let longitude = m[1];
        let deg = m[2];
        let secs = m[3];
        if (longitude.toLowerCase() === "north") {
            northLongitude = `${deg}.${secs} N`;
        } else {
            eastLatitude = `${deg}.${secs} E`;
        }
    }

    let inputStr = inputStrElement.value;
    let msgPattern = new RegExp(`${inputStr}(.*?)${inputStr}`,"g");
    let message = `Message: ${msgPattern.exec(inputMsg)[1]}`;

    let resultElement = document.getElementById("result");
    var paragraphNorthElement = document.createElement("p");
    paragraphNorthElement.textContent=northLongitude;
    resultElement.appendChild(paragraphNorthElement)
    var paragraphEastElement = document.createElement("p");
    paragraphEastElement.textContent=eastLatitude;
    resultElement.appendChild(paragraphEastElement)
    var paragraphMsgElement = document.createElement("p");
    paragraphMsgElement.textContent=message;
    resultElement.appendChild(paragraphMsgElement);
}