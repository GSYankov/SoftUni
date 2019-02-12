function solve(inputInfo) {
    let depArrv = inputInfo[0];
    let town = inputInfo[1];
    let flightNumber = inputInfo[3];
    let time = inputInfo[2];
    let gate = inputInfo[4];

    return console
        .log(`${depArrv}: Destination - ${town}, Flight - ${flightNumber}, Time - ${time}, Gate - ${gate}`)
}

solve(['Departures', 'London', '22:45', 'BR117', '42']);