const assert = require('assert');
const expect = require('chai').expect;
const { PrismaClient } = require("@prisma/client");
const except = require('except');



/////////////////////////////////////////////////////////////////////////////////////////////
/////////                                   ISLAND CRUD                                //////
/////////////////////////////////////////////////////////////////////////////////////////////

describe("Create an island", function() {
    const prisma = new PrismaClient();

    it("Should create a new island", async function(done) {

        const selectIsland = await prisma.island.findUnique({
            where: {
                name: "testIsland"
            }
        });

        if(selectIsland === null) {
            const island = await prisma.island.create({
                data: {
                    name: "testIsland",
                    area: 1500,
                    latitude: 43.231,
                    longitude: -21.54,
                    country: "TestLand",
                    continent: "Africa",

                    weatherImg: "img0",
                    wildlifeImg: "img1",
                    activitiesImg: "img2",
                    mainImg: "img3",
                    document: "img4"
                }
            });
        }
        
        const test = await prisma.island.findUnique({
            where: {
                name: "testIsland"
            }
        });
       
        assert.equal(selectIsland.area, 1500);
        //expect(selectIsland.continent).to.equal("Africa");

        done();
    });


});


describe("Update an island", function() {

    const prisma = new PrismaClient();
    it("Should update the island", async function(done) {

        const updateIsland = await prisma.island.update({
            where: {
                name: "testIsland"
            }, 
            data: {
                area: 3000,
                continent: "TestContinent"
            }
        });

        const selectIsland = await prisma.island.findUnique({
            where: {
                name: "testIsland"
            }
        });

        assert.equal(selectIsland.area, 3000);
        
        // except(selectIsland.country).to.equal("TestLand");
        // except(selectIsland.continent).to.equal("TestContinent");

        done();
    });
});