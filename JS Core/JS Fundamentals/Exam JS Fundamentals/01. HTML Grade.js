function htmlGrade(examPoints, hwCompleted, hwTotal) {
    let maxPoints = 100;
    let maxExamPoints = 400;
    let totalPoints = 0;
    let grade = 0;

    if (examPoints === 400) {
        grade = 6;
        return grade.toFixed(2)
    }

    let calcExamPoints = examPoints / maxExamPoints * 100 * 0.9;
    totalPoints += calcExamPoints;
    let calcHwPoints = hwCompleted / hwTotal * 100 * 0.1;
    totalPoints += calcHwPoints;
    grade = 3 + 2 * (totalPoints - maxPoints / 5) / (maxPoints / 2);

    if (grade < 3) {
        grade = 2;
        return grade.toFixed(2)
    }

    if (grade > 6) {
        grade = 6;
        return grade.toFixed(2)
    }

    return grade.toFixed(2)
}

console.log(htmlGrade(200, 5, 5));