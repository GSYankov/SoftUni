function binarySearch() {
    function binary_search_iterative(a, value) {
        let mid, lo = 0,
            hi = a.length - 1;

        while (lo <= hi) {
            mid = Math.floor((lo + hi) / 2);

            if (a[mid] > value) {
                hi = mid - 1;
            } else if (a[mid] < value) {
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return null;
    }

    let inputArray = document.getElementById("arr").value
        .split(', ').map(function (item) {
            return parseInt(item, 10);
        });

    let searchedNumber = Number(document.getElementById("num").value);

    var possition = binary_search_iterative(inputArray, searchedNumber);

    let resultElement = document.getElementById("result");
    console.log(possition);
    if (possition === null) {
        resultElement.textContent = `${searchedNumber} is not in the array`
    } else {
        resultElement.textContent = `Found ${searchedNumber} at index ${possition}`
    }
}