function eVenetka(carArray) {
    let mostProfitableCityAry = [];
    carArray.reduce(function (a, b) {
        return {Sofia: a.Sofia + b.Sofia};
    });


    //        let town = {town: el.town, profit: el.price, count: 1};
    //        mostProfitableCityAry.push(town);


    console.log(carArray);

}

eVenetka([{model: 'BMW', regNumber: 'B1234SM', town: 'Varna', price: 2},
    {model: 'BMW', regNumber: 'C5959CZ', town: 'Sofia', price: 8},
    {model: 'Tesla', regNumber: 'NIKOLA', town: 'Burgas', price: 9},
    {model: 'BMW', regNumber: 'A3423SM', town: 'Varna', price: 3},
    {model: 'Lada', regNumber: 'SJSCA', town: 'Sofia', price: 3}]
);

