const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const { route } = require("./auth");

router.get("/getProfile", auth, userCtrl.getProfileInformations);
router.post("/changePassword", auth, userCtrl.changePassword);

router.get("/getIslands", auth, userCtrl.getIslands);
router.get("/getListings", auth, userCtrl.getListings);

router.get("/getWatchlist", auth, userCtrl.getWatchlist);
router.post("/addToWatchlist", auth, userCtrl.addToWatchlist);
router.post("/removeFromWatchlist", auth, userCtrl.removeFromWatchlist);

// router.post('/signupAgent', auth, userCtrl.signupAgent);
// router.post('/validateSponsorship/:id', userCtrl.validateSponsorship);

module.exports = router;
