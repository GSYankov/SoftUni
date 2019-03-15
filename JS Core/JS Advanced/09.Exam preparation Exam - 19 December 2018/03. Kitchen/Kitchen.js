class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(productInput) {
        productInput.forEach(pqp => {
            let separatedPqp = pqp.split(' ');
            let product = separatedPqp[0];
            let quantity = separatedPqp[1];
            let price = separatedPqp[2];
            let orderPrice = quantity * price;

            if (this.budget - orderPrice > 0) {
                if (this.productsInStock.hasOwnProperty(product) === false) {
                    this.productsInStock[product] = +quantity;
                } else {
                    this.productsInStock[product] += +quantity;
                }

                this.budget -= orderPrice;
                this.actionsHistory.push(`Successfully loaded ${quantity} ${product}`);
            } else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${product}`);
            }
        });
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu.hasOwnProperty(meal)) {
            let newMeal = {neededProducts, price};
            this.menu[meal] = newMeal;
            let countOfMeals = Object.keys(this.menu).length;

            return `Great idea! Now with the ${meal} we have ${countOfMeals} meals in the menu, other ideas?`
        } else {
            return `The ${meal} is already in the our menu, try something different.`
        }
    }

    showTheMenu() {
        let countOfMeals = Object.keys(this.menu).length;
        let ourMenu = "";
        if (countOfMeals !== 0) {
            Object.keys(this.menu).forEach(meal => {
                let price = this.menu[meal]['price'];

                ourMenu += `${meal} - $ ${price}\n`
            });
            return ourMenu.trim();
        } else {
            return "Our menu is not ready yet, please come later...";
        }
    }

    makeTheOrder(meal) {
        if (this.menu.hasOwnProperty(meal)) {
            let areProdsAvailable = true;
            let productsNeeded = this.menu[meal]['neededProducts'];
            productsNeeded.forEach(p => {
                let productQuantity = p.split(" ");
                let product = productQuantity[0];
                let quantity = productQuantity[1];

                if (this.productsInStock.product - quantity < 0 || this.productsInStock.product === undefined) {
                    areProdsAvailable = false;
                }

            });

            if (areProdsAvailable) {
                let price = this.menu[meal]['price'];
                return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${price}`;
            } else {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }

        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }
    }
}

const kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder('Pizza'));;