function solve(steps, metersPerStep, speedKilometersPerHour) {
    let speedMetersPerSecond = speedKilometersPerHour / 3.6;
    let distanceInMeters = steps * metersPerStep;
    let timeInSeconds = distanceInMeters / speedMetersPerSecond;
    let restsInSeconds = Math.floor(distanceInMeters / 500) * 60;
    let totalSeconds = timeInSeconds + restsInSeconds + 1;

    let time = new Date(totalSeconds * 1000)
        .toISOString()
        .substring(11, 19);

    console.log(time);
}

solve(2564, 0.70, 5.5)