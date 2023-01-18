const assert = require('assert');
const expect = require('chai').expect;
const { PrismaClient } = require("@prisma/client");
const except = require('except');

/////////////////////////////////////////////////////////////////////////////////////////////
/////////                                   AUCTION CRUD                               //////
/////////////////////////////////////////////////////////////////////////////////////////////

describe("Create an auction", function() {
    const prisma = new PrismaClient();
    it("Should create a new auction", async function() {
        const createAuction = await prisma.auction.create({
            data: {
                reservePrice: 50000,
                startDate: '2022-01-02',
                endDate: '2023-01-02',
                status: 'pending',

                island: {
                    create: {
                        name:'test',
                        area: 1000,
                        latitude: 0,
                        longitude: 0,
                        country: 'France',
                        continent: 'Europe',

                        weatherImg: "img1",
                        wildlifeImg: 'img2',
                        activitiesImg: 'img3',
                        mainImg: 'img4',
                        document: 'img5'
                    }
                },
                initiator: {
                    connect: {
                        idUser: 14
                    }
                }
            }
        });

        const findInitiator = await prisma.customer.findUnique({
            where: {
                idUser: 14
            }
        });

        const findAuction = await prisma.auction.findUnique({
            where: {
                initiator: findInitiator
            }
        });

        assert.equal(findAuction.price, 50000);
    })
})