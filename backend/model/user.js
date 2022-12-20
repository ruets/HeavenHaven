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

    addAuction(auction) {
        this._auctionsList.push(auction);
    }

    removeAuction(auction) {
        //We search the index of the auction
        const index = this._auctionsList.indexOf(auction);
        if(index > -1) {
            //If the index is found, we slice the array to remove the right element
            this._auctionsList.splice(index, 1)
        }
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////

    set name(name) {
        //The name must be capitalized
        this._name = name.charAt(0).toUpperCase() + name.slice(1)
    }

    set secondName(secondName) {
        //The second name must be capitalized
        this._secondName = secondName.charAt(0).toUpperCase() + secondName.slice(1)
    }

    set phoneNb(phoneNb) {
        //The phone number must be valid, so we define a regex format
        const regex = "/^\+91\d{10}$/"
        if(!phoneNb.matches(regex)) {
            //If the format is wrong, we throw an error
            throw new Error("Wrong phone number format")
        } else {
            //Otherwise, we set the value
            this._phoneNb = value
        }

    }

    set email(email) {
        /*
        * We must provide a valid email adress. The following regex seems extremly complex.
        * It is a standard regex for email validation (RFC 5322 Official Standard)
        * See more at : https://emailregex.com/
        */
        const regex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|" +
            "\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x" +
            "0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0" +
            "-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|" +
            "[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|" +
            "\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"

        if(!email.matches(regex)) {
            //If the format is wrong, we throw an error
            throw new Error("Wrong phone number format")
        } else {
            //Otherwise, we set the value
            this._phoneNb = email
        }
        this._email = email
    }

    set password(password) {
        this._password = password
    }

    get userId() {
        return this._userId
    }

    get name() {
        return this._name
    }

    set userId(id) {
        this._userId = id
    }

    get secondName() {
        return this._secondName
    }

    get phoneNb() {
        return this._phoneNb
    }

    get email() {
        return this._email
    }

    get password() {
        return this._password
    }

}