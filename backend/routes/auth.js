const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const authCtrl = require('../controllers/auth');

router.post('/signup', multer.single("idCard"), authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;