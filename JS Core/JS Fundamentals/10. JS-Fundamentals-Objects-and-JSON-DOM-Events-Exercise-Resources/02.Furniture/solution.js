function solve() {
    let textAreaList = document.getElementsByTagName("textarea")[0];

    //textAreaList.value = "[{\"name\": \"Sofa\", \"img\": \"https://res.cloudinary.com/maisonsdumonde/image/upload/q_auto,f_auto/w_200/img/grey-3-seater-sofa-bed-200-13-0-175521_9.jpg\", \"price\": 150, \"decFactor\": 1.2}]";

    function generateOnClick() {
        let specifications = textAreaList.value;
        let specificationsObjs = JSON.parse(specifications);

        for (let i = 0; specificationsObjs.length > i; i++) {
            let specificationsObj = specificationsObjs[i];
            let furnitureListElement = document.getElementById("furniture-list");
            let newFurnitureElement = document.createElement("div");
            newFurnitureElement.className = "furniture";
            let nameElement = document.createElement("p");
            nameElement.textContent = `Name: ${specificationsObj["name"]}`;
            let pictureElement = document.createElement("img");
            pictureElement.src = specificationsObj["img"];
            let priceElement = document.createElement("p");
            priceElement.textContent = `Price: ${specificationsObj["price"]}`;
            let decorationFactorElement = document.createElement("p");
            decorationFactorElement.textContent = `Decoration factor: ${specificationsObj["decFactor"]}`;
            let checkBoxElement = document.createElement("input");
            checkBoxElement.setAttribute("type", "checkbox");
            newFurnitureElement.appendChild(nameElement);
            newFurnitureElement.appendChild(pictureElement);
            newFurnitureElement.appendChild(priceElement);
            newFurnitureElement.appendChild(decorationFactorElement);
            newFurnitureElement.appendChild(checkBoxElement);
            furnitureListElement.appendChild(newFurnitureElement);
        }
    }

    function buyOnClick() {
        let boughtFurniture = Array.from(document.getElementsByClassName("furniture"))
            .filter(function (el) {
                if (el.getElementsByTagName("input")[0].checked) {
                    return el
                }
            });

        let goods = boughtFurniture.map(function (good) {
            return good.getElementsByTagName("p")[0].textContent.replace("Name: ", "");
        });

        let totalPrice = 0;
        boughtFurniture.map(el => totalPrice += Number(el
            .getElementsByTagName("p")[1]
            .textContent
            .replace("Price: ", "")));

        let avgDecorationFactor = 0;
        boughtFurniture.map(el => avgDecorationFactor += Number(el
            .getElementsByTagName("p")[2]
            .textContent
            .replace("Decoration factor: ", "")));

        avgDecorationFactor /= boughtFurniture.length;

        let textAreaList = document.getElementsByTagName("textarea")[1];
        textAreaList.value += `Bought furniture: ${goods.join(", ")}\n`;
        textAreaList.value += `Total price: ${totalPrice.toFixed(2)}\n`;
        textAreaList.value += `Average decoration factor: ${avgDecorationFactor}`;
    }

    document.getElementsByTagName("button")[0]
        .addEventListener("click", generateOnClick);

    document.getElementsByTagName("button")[1]
        .addEventListener("click", buyOnClick);

}