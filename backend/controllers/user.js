const { PrismaClient, prisma } = require("@prisma/client");
const e = require("express");
const { json } = require("express");

///////////////////////////////////////////////////////////
//                      User informations                //
///////////////////////////////////////////////////////////

/**
 * This functions returns the profile informations of the authentified user
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getProfileInformations = async(req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The connected user has an id
    const id = req.auth.userId;

    try{

        try {

            //We find the user profile from the id
            const connectedUser = await prisma.user.findUnique({
                where:{
                    userId: id
                }
            });
            if(connectedUser) {
                res.status(200).json(connectedUser);
            } else {
                res.status(400).json({message: "User not found"});
            }

        } catch(error) {
            res.status(400).json({error: error});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
    


}


///////////////////////////////////////////////////////////
//                      Watchlist                        //
///////////////////////////////////////////////////////////


//Normalement cette méthode est complète mais pas testée

exports.getWatchlist = async(req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The watchlist is a list of auctions contained in an user. We need to get the connected user ID
    const userId = req.auth.userId;
    
    try {
        try {

            //We use our iser id to get the current user
            const connectedUser = await prisma.findUnique({
                where: {
                    id: userId
                }
            });
    
            //We create an empty watchlist as a json object
            const watchlist = json();
    
            if(connectedUser) {
                //If the user is gotten, we get the watchlist
                const watchlist = connectedUser.watchlist;
            } 
            res.status(200).json(watchlist);
    
        } catch(error) {
            res.status(400).json({error});
        }

    } catch(error) {
        res.status(500).json({error: error});
    }

}

//Normalement cette méthode est complète mais pas testée
exports.addToWatchlist =  async(req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The watchlist is a list of auctions contained in an user. We need to get the connected user ID
    const userId = req.auth.userId;

    try {
        try {
            //We need to update the user by connecting a new entry to the watchlist 
           const updateUser = await prisma.User.update({
                where: {
                    //We need the user corresponding to the connected user
                    id: userId
                },
                data: {
                    //We add a new entry in watchlist
                    watchlistedAuctions: {
                        connect: {
                            //We add the island specified in the watchlist into the watchlist
                            id: req.body.island
                        }
                    }
                }
           });
           res.status(200).json(updateUser);
             

        } catch(error) {
            res.status(400).json({error: error});
        }
    } catch(error) {
        res.status(500).json({error : error});
    }
};

//Pour l'instant pas fini
exports.removeFromWatchlist = async(req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    const userId = req.auth.userId;

    try {
        try {

            //TODO: continue
            //const removeUser = await prisma.User.

        } catch(error) {
            res.status(400).json({error: error});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }

}