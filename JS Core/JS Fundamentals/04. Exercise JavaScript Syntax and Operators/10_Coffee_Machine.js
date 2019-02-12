function solve(inputArray) {
    let totalMoney = 0;
    for (let i = 0; inputArray.length > i; i++) {

        let inputArgs = inputArray[i].toString().split(",").map(Function.prototype.call, String.prototype.trim);
        let coinsInserted = Number(inputArgs[0]);
        let price = 0.8;

        switch (inputArgs[2]) {
            case "decaf":
                price += 0.1;
                break;
            case "milk":
                price += 0.1;
                break;
        }

        switch (inputArgs[3]) {
            case "milk":
                price += 0.1;
            case "":
                if (inputArgs[4] > 0) {
                    price += 0.1;
                }
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
                price += 0.1;
                break;
        }

        let drink = inputArgs[1];
        if (price > coinsInserted) {
            let moneyNeeded = price - coinsInserted;
            console.log(`Not enough money for ${drink}. Need ${moneyNeeded.toFixed(2)}$ more.`)
        } else {
            let change = coinsInserted - price;
            console.log(`You ordered ${drink}. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
            totalMoney += price;
        }
    }

    console.log(`Income Report: ${totalMoney.toFixed(2)}$`);
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']
);