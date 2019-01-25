function solve(dayOfweek, service, timeOfDay) {
    let price = 0;
    switch (dayOfweek) {
        case "Saturday":
        case "Sunday":
            switch (service) {
                case "Fitness": price = 8; break;
                case "Sauna": price = 7; break;
                case "Instructor":price = 15; break;
            }
            break;
        default:
            switch (service) {
                case "Fitness": price = (timeOfDay <= 15 ? 5 : 7.5); break;
                case "Sauna": price = (timeOfDay <= 15 ? 4 : 6.5); break;
                case "Instructor":price = (timeOfDay <= 15 ? 10 : 12.5); break;
            }
            break;
    }
    console.log(price);
}

solve('Monday', 'Fitness', 15.00);