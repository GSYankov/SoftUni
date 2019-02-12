function solve() {
    function dot_product(ary1, ary2) {
        if (ary1.length != ary2.length)
            throw "can't find dot product: arrays have different lengths";
        let dotprod = 0;
        for (var i = 0; i < ary1.length; i++)
            dotprod += ary1[i] * ary2[i];
        return dotprod;
    }

    let firstMatrix = document.getElementById("mat1").value;
    firstMatrix = JSON.parse(firstMatrix);
    let secondMatrix = document.getElementById("mat2").value;
    secondMatrix = JSON.parse(secondMatrix);

    let resultMatrix = [];
    for (let i = 0; firstMatrix.length > i; i++) {
        let tempMatrix = [];
        for (let m = 0; secondMatrix.length > m; m++) {
            let dotProd = dot_product(firstMatrix[i], secondMatrix[m]);
            tempMatrix.push(dotProd);
        }
        resultMatrix.push(tempMatrix);
    }

    let resultElement = document.getElementById("result");

    for (let m = 0; resultMatrix.length > m; m++) {
        let row = resultMatrix[m].join(", ");
        let rowParagraph = document.createElement("p");
        rowParagraph.textContent = row;
        resultElement.appendChild(rowParagraph);
    }
}

function hideSu() {
    document.getElementById("softUni-person-img").style.visibility = "hidden";
    document.getElementById("logo-img").style.visibility = "hidden";
}