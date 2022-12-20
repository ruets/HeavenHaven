class Island {
    name
    surface
    latitude
    country
    wildlife
    flora
    climate
    isConstructed


    constructor(name, surface, latitude, country, wildlife, flora, climate, isConstructed) {
        this._name = name;
        this._surface = surface;
        this._latitude = latitude;
        this._country = country;
        this._wildlife = wildlife;
        this._flora = flora;
        this._climate = climate;
        this._isConstructed = isConstructed;
    }

    /////////////////////////////////////////////////////////
    // Getters et Setters
    /////////////////////////////////////////////////////////
    //TODO : create constraints in the setter and add it to the constructor

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get surface() {
        return this._surface;
    }

    set surface(value) {
        this._surface = value;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }

    get country() {
        return this._country;
    }

    set country(value) {
        this._country = value;
    }

    get wildlife() {
        return this._wildlife;
    }

    set wildlife(value) {
        this._wildlife = value;
    }

    get flora() {
        return this._flora;
    }

    set flora(value) {
        this._flora = value;
    }

    get climate() {
        return this._climate;
    }

    set climate(value) {
        this._climate = value;
    }

    get isConstructed() {
        return this._isConstructed;
    }

    set isConstructed(value) {
        this._isConstructed = value;
    }
}