import (User)
class Client extends User {

    sponsorCode
    sponsorCodeUses

    constructor(userId, name, secondName, phoneNb, email, password, sponsorCode, sponsorCodeUses) {
        super(userId, name, secondName, phoneNb, email, password);
        this._sponsorCode = sponsorCode;
        this._sponsorCodeUses = sponsorCodeUses;
    }

    generateSponsorCode() {
        //TODO : create sponsor code generation
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor


    get sponsorCode() {
        return this._sponsorCode;
    }

    set sponsorCode(value) {
        this._sponsorCode = value;
    }

    get sponsorCodeUses() {
        return this._sponsorCodeUses;
    }

    set sponsorCodeUses(value) {
        this._sponsorCodeUses = value;
    }
}