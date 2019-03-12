let solution = (function () {
    const add = (vec1, vec2) =>
        [vec1[0] + vec2[0], vec1[1] + vec2[1]];

    const multiply = (vec, scalar) =>
        [vec[0] * scalar, vec[1] * scalar];

    const length = (vec) =>
        Math.sqrt((Math.pow(vec[0], 2) + Math.pow(vec[1], 2)));

    const dot = (vec1, vec2) =>
        vec1[0] * vec2[0] + vec1[1] * vec2[1];

    const cross = (vec1, vec2) =>
        vec1[0] * vec2[1] - vec2[0] * vec1[1];


    return {
        add, multiply, length, dot, cross
    }
})();

console.log(solution.dot([2, 3], [2, -1]));
