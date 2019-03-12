function constructionCrew(worker) {
    if (worker.handsShaking === true) {
        worker.bloodAlcoholLevel += worker.weight * 0.1 * worker.experience;
        worker.handsShaking = false;
    }

    return worker;
}

let worker0 = {
    weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true
};

let worker1 = {
    weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true
};

let worker2 = {
    weight: 95,
    experience: 3,
    bloodAlcoholLevel: 0,
    handsShaking: false
};


console.log(constructionCrew(worker2));
