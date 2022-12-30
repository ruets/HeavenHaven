class Selling {
    purchaser
    seller
    amount
    state


    constructor(purchaser, seller, amount, state) {
        this._purchaser = purchaser;
        this._seller = seller;
        this._amount = amount;
        this._state = state;
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor


    get purchaser() {
        return this._purchaser;
    }

    set purchaser(value) {
        this._purchaser = value;
    }

    get seller() {
        return this._seller;
    }

    set seller(value) {
        this._seller = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }
}