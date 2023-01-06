const express = require('express');
const router = express.Router();

const auctionCtrl = require('../controllers/auction');
const auth = require('../middleware/auth');

router.post('/bid', auth, auctionCtrl.bid);
router.post('/report', auth, auctionCtrl.report);