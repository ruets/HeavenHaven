const express = require("express");
const router = express.Router();

const islandsCtrl = require("../controllers/islands");
const auth = require("../middleware/auth");

router.get('/', islandsCtrl.getAll);
router.get('/:id', islandsCtrl.getOne);
router.get("/trends", islandsCtrl.getTrends);

module.exports = router;
