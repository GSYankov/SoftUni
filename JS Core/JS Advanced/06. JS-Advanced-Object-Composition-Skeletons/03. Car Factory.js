function carFactory(car) {
    let engineTypes =
        {
            SmallEngine: {power: 90, volume: 1800},
            NormalEngine: {power: 120, volume: 2400},
            MonsterEngine: {power: 200, volume: 3500}
        };

    let carriages =
        {
            hatchback: {type: 'hatchback', color: false},
            coupe: {type: 'coupe', color: false}
        };


    let carEngine;
    for (engine in engineTypes) {
        if (car.power <= engineTypes[engine].power) {
            carEngine = engineTypes[engine];
            break;
        }
    }

    let carCarriage = carriages[car.carriage];
    carCarriage.color = car.color;

    let wheels = [];
    if (car.wheelsize % 2 === 0) {
        car.wheelsize--;
    }

    for (let i = 0; i < 4; i++) {
        wheels.push(car.wheelsize)
    }


    let producedCar = {
        model: car.model,
        engine: carEngine,
        carriage: carCarriage,
        wheels: wheels
    };

    return producedCar;
}


let car0 = {
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
};

let car1 = { model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17 };

console.log(carFactory(car1));


