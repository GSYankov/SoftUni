function solve(fruit, kilos, pricePerKilo) {
    let weight = kilos / 1000;
    let price = weight * pricePerKilo;
    return console.log(`I need ${price.toFixed(2)} leva to buy ${weight.toFixed(2)} kilograms ${fruit}.`)
}

solve('orange', 2500, 1.80);