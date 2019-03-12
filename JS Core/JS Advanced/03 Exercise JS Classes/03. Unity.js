class Rat {
    constructor(namee) {
        this.name = namee;
        this.unitedRats = [];
    };

    toString() {
        let output = this.name;
        if (this.unitedRats.length > 0) {
            this.unitedRats.forEach(r => output += `\n##${r.name}`);
        }

        return output;
    }

    unite(ratToUnite) {
        if (ratToUnite.constructor.name==="Rat") {
            this.unitedRats.push(ratToUnite);
        }
    }

    getRats() {
        return this.unitedRats;
    }
}


let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho
