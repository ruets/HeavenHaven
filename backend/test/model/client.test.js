
const except = require("except")
const assert = require("assert")
const User = require("../../model/user");
const Island = require("../../model/island");
const Auction = require("../../model/auction");

//Constrraints on the name
describe('Setname', function ()  {
    let user = new User("01", "ruet", "sebastien", "0602020202",
        "stephane.ruet@gmail.com");

    it("Should return a capitalized name", function () {
        assert.equal(user.name, "Ruet");
    })

    user.setName("RUET")

    it("The rest of the name must be lowercase", function () {
        assert.equal(user.name, "Ruet");
    })

})


//Constrraints on the  name
describe('SetSecondName', function ()  {
    let user = new User("01", "ruet", "sebastien", "0602020202",
        "stephane.ruet@gmail.com");

    it("Should return a capitalized second name", function () {
        assert.equal(user.secondName, "Sebastien");
    })

    user.setSecondName("SEBASTIEN")
    it("The rest of the second name must be lowercase", function () {
        assert.equal(user.secondName, "Sebastien");
    })

})

//Constraints on the phone number
describe('SetPhoneNumber', function ()  {

    it("Should return an error", function () {
        assert.throws(() => {
            let user = new User("01", "ruet",
                "sebastien", "Bonjour", "stephane.ruet@gmail.com");
        })

        assert.doesNotThrow(() => {
            let user = new User("01", "ruet", "sebastien", "0602020202",
                "stephane.ruet@gmail.com");
        })
    })

})

//Constraints on the email adress
describe('SetEmail', function ()  {

    //TODO : write better tests when email regex finished
    it("Should return an error", function () {

        assert.doesNotThrow(() => {
            let user = new User("01", "ruet", "sebastien", "0602020202",
                "stephane.ruet@gmail.com");
        })
    })

})

//Constraints on the password encryption
describe('SetPassword', function ()  {

    //TODO : testing password

})

describe('AddAuction', function () {

    let user = new User("01", "ruet", "sebastien", "0602020202",
        "stephane.ruet@gmail.com");

    //Creating a new auction
    let island = new Island("Island", 1000, 43.23, 34.32, "Snakes", "Trees", "Mediteranean", false)
    let auction = new Auction("001", 100000, "10-10-2022", "10-20-2022", "test",new Island(), user)

    it("should add an auction", function () {
        user.addAuction(auction)
        assert.equal(user._auctionsList.length, 1)

    })

    //TODO : better tests
})

//TODO : testing on sponsor code once it is written