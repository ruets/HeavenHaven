const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-configs/idCard');

const authCtrl = require('../controllers/auth');

router.post('/signup', multer, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;