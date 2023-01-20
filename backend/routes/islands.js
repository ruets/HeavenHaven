const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-configs/islands");

const islandsCtrl = require("../controllers/islands");
const auth = require("../middleware/auth");

router.get("/trends", islandsCtrl.getTrends);
router.get('/:id', islandsCtrl.getOne);
router.get('/search/:pattern', islandsCtrl.getWithFilter);
router.get('/', islandsCtrl.getAll);

router.post("/sell", auth, multer, islandsCtrl.sell);
router.delete("/delete/", auth, islandsCtrl.deleteIsland);

module.exports = router;
