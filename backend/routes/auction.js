const express = require('express');
const router = express.Router();

const auctionCtrl = require('../controllers/auction');
const auth = require('../middleware/auth');

router.post('/:id', auctionCtrl.getOne);
router.post('/:id/bid', auth, auctionCtrl.bid);

module.exports = router;