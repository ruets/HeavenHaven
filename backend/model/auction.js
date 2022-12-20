class Auction {
    auctionId
    baseAmount
    beginDate
    endDate
    cautionState
    island
    seller
    rises


    constructor(auctionId, baseAmount, beginDate, endDate, cautionState,island, seller) {
        this.auctionId = auctionId
        this.baseAmount = baseAmount
        this.beginDate = beginDate
        this.endDate = endDate
        this.cautionState = cautionState
        this.island = island
        this.seller = seller
        this.rises = new Array();
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor


    get baseAmount() {
        return this._baseAmount;
    }

    set baseAmount(value) {
        this._baseAmount = value;
    }

    get beginDate() {
        return this._beginDate;
    }

    set beginDate(value) {
        this._beginDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    get cautionState() {
        return this._cautionState;
    }

    set cautionState(value) {
        this._cautionState = value;
    }

    get seller() {
        return this._seller;
    }

    set seller(value) {
        this._seller = value;
    }


    get auctionId() {
        return this._auctionId;
    }

    set auctionId(value) {
        this._auctionId = value;
    }
}