function getNext() {
    function hailstone(n) {
        var seq = [n];
        while (n > 1) {
            n = n % 2 ? 3 * n + 1 : n / 2;
            seq.push(n);
        }
        return seq.join(" ");
    }

    let startingNumber = document.getElementById("num").value;
    let resultElement = document.getElementById("result");
    resultElement.textContent = hailstone(startingNumber) + " ";
}