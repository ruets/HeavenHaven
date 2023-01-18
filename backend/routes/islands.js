const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-configs/islands");

const islandsCtrl = require("../controllers/islands");
const auth = require("../middleware/auth");

router.get("/trends", islandsCtrl.getTrends);
router.get('/:id', islandsCtrl.getOne);
router.get('/', islandsCtrl.getAll);

router.post("/sell", auth, multer, islandsCtrl.sell);

module.exports = router;
