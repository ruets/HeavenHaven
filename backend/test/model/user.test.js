
const except = require("except")
const assert = require("assert")
const User = require("../../model/user");

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

    it("Should return an error", function () {

        assert.doesNotThrow(() => {
            let user = new User("01", "ruet", "sebastien", "0602020202",
                "stephane.ruet@gmail.com");
        })
    })

})

//Constraints on the email adress
describe('SetPassword', function ()  {

    //TODO : testing password

})