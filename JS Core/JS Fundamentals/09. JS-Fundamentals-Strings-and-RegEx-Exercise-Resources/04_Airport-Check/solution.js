function solve() {
    let inputStrArr = document.getElementById("str").value.split(', ');
    let namePattern = /[ ]([A-Z]\w*[-]([A-Z]\w*[.][-])?[A-Z]\w*\b(?![.]))[ ]/g;
    let flightData = inputStrArr[0];
    let name = namePattern.exec(flightData)[1].replace('-', ' ');
    let airportsPattern = /[ ]([A-Z]{3}[\/][A-Z]{3})[ ]/g;
    let airports = airportsPattern.exec(flightData)[1].split("/");
    let homeAirport = airports[0];
    let destAirport = airports[1];
    let flightPattern = /[ ]([A-Z]{1,3}\d{1,5})[ ]/g;
    let flight = flightPattern.exec(flightData)[1];
    let airCompanyPattern = /(- )([A-Z]*\w*[*][A-Z]*\w*)[ ]/g;
    let airCompany = airCompanyPattern.exec(flightData)[2].replace('*', ' ');

    let resultElement = document.getElementById("result");
    let result = '';
    let printParam = inputStrArr[1];
    switch (printParam) {
        case 'name':
            result = `Mr/Ms, ${name}, have a nice flight!`;
            break;
        case 'flight':
            result = `Your flight number ${flight} is from ${homeAirport} to ${destAirport}.`;
            break;
        case 'company' :
            result = `Have a nice flight with ${airCompany}.`;
            break;
        case 'all':
            result = `Mr/Ms, ${name}, your flight number ${flight} is from ${homeAirport} to ${destAirport}. Have a nice flight with ${airCompany}.`;
            break;
    }

    resultElement.textContent = result;
}