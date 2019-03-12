let manager = (function () {
    let ingredientsObj = {
        protein: 0, carbohydrate: 0, fat: 0, flavour: 0
    };

    let productsOdj = {
        apple: {protein: 0, carbohydrate: 1, fat: 0, flavour: 2},
        coke: {protein: 0, carbohydrate: 10, fat: 0, flavour: 20},
        burger: {protein: 0, carbohydrate: 5, fat: 7, flavour: 3},
        omelet: {protein: 5, carbohydrate: 0, fat: 1, flavour: 1},
        cheverme: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
    };


    return function (input) {
        let args = input.split(" ");
        let command = args[0];
        let prodElement = args[1];
        let quantity = args[2];

        switch (command) {
            case "restock":
                ingredientsObj[prodElement] += Number(quantity);
                return "Success";
            case "prepare":
                let product = productsOdj[prodElement];
                for (let i = 0; i < quantity; i++) {
                    for (let ingredient in product) {
                        ingredientsObj[ingredient] -= product[ingredient];
                        if (ingredientsObj[ingredient] < 0) {
                            return `Error: not enough ${ingredient} in stock`
                        }
                    }
                }
                return "Success";
            case "report":
                let result = [];
                for (let ingredient in ingredientsObj) {
                    result.push(`${ingredient}=${ingredientsObj[ingredient]}`)
                }
                return result.join(" ");
        }
    }
})();

