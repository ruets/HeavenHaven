const express = require('express');
const router = express.Router();

const auctionCtrl = require('../controllers/auction');
const authCtrl = require('../controllers/auth');

router.post('/bid', auth, authCtrl.bid);
router.post('/report', auth, authCtrl.report);