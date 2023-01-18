const assert = require('assert');
const except = require("except");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//TODO : the testing is weird : sometimes it works, sometimes not. We need to figure out why

/////////////////////////////////////////////////////////////////////////////////////////////
/////////                           USER - CUSTOMER CRUD                               //////
/////////////////////////////////////////////////////////////////////////////////////////////

 describe("createUser", function () {
    
    //We try to create a new customer
    it("should create the customer into the database", function() {
       
       assert.doesNotThrow( async (done) => {
        
            //Firstly, we need to find if the record already exists
            let findUser = await prisma.user.findUnique({
                where: {
                    email: "email"
                }
            })
            //Then, if it does not exist
            if(findUser=== null) {
                //We create a customer and test if it is stored into the database
                //We do not care about constraints on this layer, it must be done either in the frontend, either in the controllers
                const user = await prisma.user.create({
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
            }
        });

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
        let user = await prisma.user.findUnique({
            where: {
                email: "email"
            }
        });

        assert.equal(user.firstName, "Gontrand");
    });
});

describe("selectOneUser", function() {

    //When done, we check if we can find the user previously created
    it("Should return the created customer", async function() {

      let user = await prisma.user.findUnique({
          where: {
              email: "email"
          }
      })

      //We check if the first name fits
      assert.equal(user.email, "email");

  });
});

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
});

/////////////////////////////////////////////////////////////////////////////////////////////
/////////                           USER - AGENT CRUD                                  //////
/////////////////////////////////////////////////////////////////////////////////////////////

describe("CreateAgent", function() {

    it("Should create a new agent user",async function() {

        assert.doesNotThrow(async () => {
            //An agent requires a customer to be created
        //So we first create a customer

        const customer = await prisma.user.findUnique({
            where: {
                email: "email2"
            }
        });

        if(customer === null) {
            const createCustomer = await prisma.customer.create({
                data: {
                    user: {
                        email: "email2",
                        password: "password",
                        firstName: "Francis",
                        lastName: "Boyd",
                        phone: "0303030303",
                
                        address: "51 St of the Test",
                        apt: "91",
                        city: "TestCity",
                        zip: "029302882838",
                        country: "Republic of Testing"
                    },
                    
                    sponsorCode: "WWWWW"
                }  
            });

            //After the customer is created, we can create the agent
            const agent = await prisma.agent.create({
                data: {
                    user: {
                        create: {
                           email: "agentemail",
                        password: "password",
                        firstName: "Xavier",
                        lastName: "Chanson",
                        phone: "0405060708"
                        }
                        
                    },
                    
                    customer: {
                        connect: {
                            idUser: createCustomer.idUser
                        }
                    }
                }
            });
            
        }});
    });
});

// describe("update one agent", function(){

//     it("Should update the agent user", async function() {

//         const updateAgent = await prisma.user.update({
//             where: {
//                 email: "agentemail"
//             },
//             data: {
//                 firstName: "Romuald"
//             }
//         });

//         const agentUser = await prisma.user.findUnique({
//             where: {
//                 email: "agentemail"
//             }
//         });

//         assert.equal(agentUser.firstName, "Romuald");
//     });

// });