function solve(radius) {
    let inputType = typeof (radius);
    if (typeof (radius) == "number") {
        let result = Math.pow(radius,2)*Math.PI;

        return console.log(result.toFixed(2));
    }

    return console.log(`We can not calculate the circle area, because we receive a ${inputType}.`);
}

solve("dasd");

