const express = require("express");
const router = express.Router();

const auctionCtrl = require("../controllers/auction");
const auth = require("../middleware/auth");

router.post("/bid/:id", auth, auctionCtrl.bid);
router.get("/:id", auth, auctionCtrl.getOne);

module.exports = router;