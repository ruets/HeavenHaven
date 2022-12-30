class User {
    _userId
    _name
    _secondName
    _phoneNb
    _email
    _password
    _auctionsList

    constructor(userId,name, secondName, phoneNb, email, password) {
        this._userId = userId
        this.setName(name)
        this.setSecondName(secondName)
        this.setPhoneNb(phoneNb)
        this.setEmail(email)
        this.setPassword(password)
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

    setName(name) {
        //The name must be capitalized
        this._name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
    }

    setSecondName(secondName) {
        //The second name must be capitalized
        this._secondName = secondName.charAt(0).toUpperCase() + secondName.slice(1).toLowerCase()
    }

    setPhoneNb(phoneNb) {
        //The phone number must be valid, so we define a regex format
        const regex = new RegExp('\\d{10}')
        const match = phoneNb.match(regex)
        if(match==null) {
            //If the format is wrong, we throw an error
            throw Error("Wrong phone number format")
        } else {
            //Otherwise, we set the value
            this._phoneNb = phoneNb
        }

    }

    setEmail(email) {
        /*
        * We must provide a valid email adress. The following regex seems extremly complex.
        * It is a standard regex for email validation (RFC 5322 Official Standard)
        * See more at : https://emailregex.com/
        */
        //TODO : set a valid regex
        const regex = new RegExp("")

        if(!email.match(regex)) {
            //If the format is wrong, we throw an error
            throw new Error("Wrong phone number format")
        } else {
            //Otherwise, we set the value
            this._phoneNb = email
        }
        this._email = email
    }

    setPassword(password) {
        //TODO : password encryption constraint
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
module.exports = User
