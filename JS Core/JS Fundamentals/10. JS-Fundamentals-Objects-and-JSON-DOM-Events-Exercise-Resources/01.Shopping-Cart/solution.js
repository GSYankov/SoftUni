function solve() {
    let cart = {};
    function onButtonClick(e) {
        let textAreaElement = document.querySelector("#exercise textarea");
        if (e.target.textContent === "Add to cart") {
            let priceAndProductElements = e.target.parentElement
                .getElementsByTagName("p");
            let productName = priceAndProductElements[0].textContent;
            let price = priceAndProductElements[1].textContent.replace("Price: ", "");

            if (cart.hasOwnProperty(productName)) {
                console.log(price);
                cart[productName] += Number(price);
            } else {
                cart[productName] = Number(price);
            }
            textAreaElement.value += `Added ${productName} for ${price} to the cart.\n`;
        } else if (e.target.textContent === "Buy") {
            let list = Object.keys(cart).join(", ");
            let totalPrice = Object.values(cart).reduce((a, b) => a + b, 0).toFixed(2);
            textAreaElement.value += `You bought ${list} for ${totalPrice}.\n`;
        }
    }



    Array.from(document.getElementsByTagName("button"))
        .forEach(el => el.addEventListener("click", onButtonClick));
}