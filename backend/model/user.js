class User {
    userId
    name
    secondName
    phoneNb
    email
    password
    auctionsList

    constructor(userId,name, secondName, phoneNb, email, password) {
        this._userId = userId
        this._name = name
        this._secondName = secondName
        this._phoneNb = phoneNb
        this._email = email
        this._password = password
        this._auctionsList = new Array()
    }

    //TODO : create auctions list methods

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get secondName() {
        return this._secondName;
    }

    set secondName(value) {
        this._secondName = value;
    }

    get phoneNb() {
        return this._phoneNb;
    }

    set phoneNb(value) {
        this._phoneNb = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}