const assert = require('assert');
const except = require("except");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//TODO : the testing is weird : sometimes it works, sometimes not. We need to figure out why

//Testing on user model integrity
 describe("createUser", function () {
    
    //We try to create a new customer
    it("should create the customer into the database", function() {
       
       assert.doesNotThrow( async () => {
        
            //We create a customer and test if it is stored into the database
            //We do not care about constraints on this layer, it must be done either in the frontend, either in the controllers
            let user = await prisma.user.create({
                data: {
                    email: "email",
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
                            sponsorCode: "HHHHH",
                        }
                    }
                }
                
            });

        
        });
    }); 
});

describe("selectOneUser", function() {

      //When done, we check if we can find the user previously created
      it("Should return the created customer", async function() {

        let user = await prisma.user.findUnique({
            where: {
                email: "email"
            }
        });
        
        //We check if the first name fits
        assert.equal(user.firstName, "Francis");
    });
});

describe("updateOneUser", function() {

    it("Should update the customer", async function() {

        //The first name is supposed to be replaced
        let updateUser = await prisma.user.update({
            where: {
                email: "email"
            },
            data: {
                firstName: "Gontrand"
            }
        });

        //Updated user
        let user = await prisma.findUnique({
            where: {
                email: "email"
            }
        });

        assert.equal(user.firstName, "Gontrand");
    })
})

describe("deleteOneUser", function() {
    it("Should delete the created customer", async function() {

        //In order to delete a customer, we need to delete his sponsor code because the relation
        //is linked

        //We take the user
        let user = await prisma.user.findUnique({
            where: {
                email: "email"
            }
        });
        
        //We firstly delete the sponsor code
        const deleteCustomer = await prisma.customer.delete({
            where: {
                idUser: user.id
            }
        });

        //And after the user
        const deleteUser = await prisma.user.delete({
            where: {
                email: "email"
            }
        });

        //We can try to find the user again
        user = await prisma.user.findUnique({
            where: {
                email: "email"
            }
        });
        
        //We must find null
        assert.equal(user, null);

    });
})