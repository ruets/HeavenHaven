const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signupAgent', userCtrl.signupAgent);
router.post('/validateSponsorship/:id', userCtrl.validateSponsorship);