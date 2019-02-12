function solve() {
    function factors(num) {
        let n_factors = [], i;

        for (i = 1; i <= Math.floor(Math.sqrt(num)); i ++)
            if (num % i === 0) {
                n_factors.push(i);
                if (num / i !== i)
                    n_factors.push(num / i);
            }
        n_factors.sort(function (a, b) {
            return a - b;
        });  // numeric sort
        return n_factors;
    }

    let inputNumber = document.getElementById("num").value;

    let resultElement = document.getElementById("result");
    resultElement.textContent = factors(inputNumber).join(" ");
}