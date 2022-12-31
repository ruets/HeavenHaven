class Rise {
    amount
    riseDate

    constructor(amount, riseDate) {
        this._amount = amount;
        this._riseDate = riseDate;
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor

    get payToBid() {
        return 0.05*this.amount;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get riseDate() {
        return this._riseDate;
    }

    set riseDate(value) {
        this._riseDate = value;
    }
}