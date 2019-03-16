class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.wishList = [];
        this.idNumber = this.generateIDNumber();
        if (creditCard) {
            this.creditCard = creditCard
        } else {
            this.creditCard = [1111, '', 111]
        }
    }


    get fullName() {
        return this._fullName;
    }

    set fullName(name) {
        if (name.length !== 3) {
            throw 'Name must include first name, middle name and last name'
        }

        name.forEach(n => {
            const regex = /^[A-Z]{1}[a-z]+$/gm;
            if (!regex.test(n)) {
                throw 'Invalid full name';
            }
        });

        let firstName = name[0];
        let middleName = name[1];
        let lastName = name[2];

        this._fullName = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName
        };
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(cardInfo) {
        if (cardInfo.length !== 3) {
            throw 'Missing credit card information';
        }

        let cardNumber = cardInfo[0];
        let expirationDate = cardInfo[1];
        let securityNumber = cardInfo[2];

        if (typeof cardNumber !== 'number' && securityNumber[2] !== 'number') {
            throw 'Invalid credit card details';
        }

        this._creditCard = {
            cardNumber,
            expirationDate,
            securityNumber
        }
    }


    generateIDNumber() {
        let vowels = ["a", "e", "o", "i", "u"];
        let lastNameEnd = this.fullName.lastName[this.fullName.lastName.length - 1];
        let isEndsInVowel = vowels.includes(lastNameEnd);
        let addition = isEndsInVowel ? 8 : 7;
        return 231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length + addition.toString();
    }

    addCreditCardInfo(input) {
        this.creditCard = input;
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw 'Destination already exists in wishlist';
        }

        this.wishList.push(destination);
        this.wishList.sort((a, b) => (a.length - b.length));
    }

    getVacationerInfo() {
        let wList;
        if (this.wishList.length === 0) {
            wList = 'empty'
        } else {
            wList = this.wishList.join(', ')
        }

        let firstName = this.fullName.firstName;
        let middleName = this.fullName.middleName;
        let lastName = this.fullName.lastName;
        let cardNumber = this.creditCard.cardNumber;
        let expirationDate = this.creditCard.expirationDate;
        let securityNumber = this.creditCard.securityNumber;

        return `Name: ${firstName} ${middleName} ${lastName}\nID Number: ${this.idNumber}\nWishlist:\n${wList}\nCredit Card:\nCard Number: ${cardNumber}\nExpiration Date: ${expirationDate}\nSecurity Number: ${securityNumber}`
    }
}

let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');
console.log(vacationer1.getVacationerInfo());