class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;


    }

    set clientId(clientId) {
        console.log(clientId);
        if (!(Number.isInteger(+clientId) && clientId.length === 6)) {
            throw new TypeError("Client ID must be a 6-digit number");
        }

         this._clientId = clientId;
    }

    get clientId() {
        return this._clientId;
    }

    set email(value) {
        if (!(/[\w]+@[A-Za-z.]+/gm).test(value)) {
            throw new TypeError("Invalid e-mail")
        }

        this._email = value;
    }

    set firstName(value) {
        let nameLength = value.length >= 3 && value.length <= 20;
        let latinLettersValidation = (/^([A-Za-z]+)$/gm).test(value);

        if (!nameLength) {
            throw new TypeError("First name must be between 3 and 20 characters long");
        }

        if (!latinLettersValidation) {
            throw new TypeError("First name must contain only Latin characters")
        }

        this._firstName = value;
    }

    set lastName(value) {
        let nameLength = value.length >= 3 && value.length <= 20;
        let latinLettersValidation = (/^([A-Za-z]+)$/gm).test(value);

        if (!nameLength) {
            throw new TypeError("Last name must be between 3 and 20 characters long")
        }

        if (!latinLettersValidation) {
            throw new TypeError("Last name must contain only Latin characters")
        }

        this._lastName = value;

    }
}

//let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov')
//let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov')