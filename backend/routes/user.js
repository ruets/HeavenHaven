const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const { route } = require('./auth');

// router.post('/signupAgent', userCtrl.signupAgent);
// router.post('/validateSponsorship/:id', userCtrl.validateSponsorship);
router.get('/getProfile', auth, userCtrl.getProfileInformations);
router.get('/getWatchlist', auth, userCtrl.getWatchlist);
router.post('/addToWatchlist', auth, userCtrl.addToWatchlist);

module.exports = router;    