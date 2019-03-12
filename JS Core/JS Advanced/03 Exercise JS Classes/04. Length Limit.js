class Stringer {
    constructor(string, lenght) {
        this.innerString = string;
        this.innerLength = lenght;
    }

    increase(lenght) {
        this.innerLength += lenght;
    }

    decrease(lenght) {
        if (this.innerLength - lenght < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength -= lenght;
        }
    }

    toString() {
        if (this.innerString.length > this.innerLength) {
            return this.innerString.substring(0, this.innerLength) + '...';
        }

        return this.innerString;
    }
}


let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test
