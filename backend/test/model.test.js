const assert = require('assert');
const except = require("except");
const { PrismaClient } = require("@prisma/client");


//Testing on user model integrity
 describe("UserModel", function () {
    const prisma = new PrismaClient();

    it("should create the customer into the database", function() {
       
       assert.doesNotThrow( async () => {
        let user = await prisma.user.create({
            data: {
                email: "teste.test@test.test",
                password: "password",
                firstName: "Francis",
                lastName: "Boyd",
                phone: "0303030303",
        
                address: "51 St of the Test",
                apt: "91",
                city: "TestCity",
                zip: "029302882838",
                country: "Republic of Testing",
        

                customer : {
                    create: {
                        sponsorCode: "HH",
                    }
                }
            }

       });
        
    });
}); 
        it("Should return the created customer", async function() {
                let user = await prisma.user.findUnique({
                    where: {
                        email: "teste.test@test.test"
                    }
                });

                assert.equal(user.firstName, "Jeff");
        });
    
    
});