class SortedList {
    constructor() {
        this.listOfNumbers = [];
        this.size=0;
    }

    add(element) {
        this.listOfNumbers.push(element);
        this.size++;
        this.sortList();
    }

    remove(index) {
        if (this.listOfNumbers.length > index && index >= 0) {
            this.listOfNumbers.splice(index, 1);
            this.size--;
            this.sortList();
        }
    }

    get(index) {
        if (this.listOfNumbers.length > index && index >= 0) {
            return this.listOfNumbers[index];
        }
    }

    sortList() {
        this.listOfNumbers.sort((a, b) => a - b);
    }
}

var myList = new SortedList();
myList.add(5);
console.log(myList.get(0));