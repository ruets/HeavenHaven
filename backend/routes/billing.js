const express = require('express');
const router = express.Router();

const billingCtrl = require('../controllers/billing');
const auth = require('../middleware/auth');

router.post('/payToBid', auth, billingCtrl.payToBid);
router.post('/commission', auth, billingCtrl.commission);
router.post('/caution', auth, billingCtrl.caution);