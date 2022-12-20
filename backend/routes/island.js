const express = require('express');
const router = express.Router();

const islandCtrl = require('../controllers/island');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/', auth, islandCtrl.getAllisland);
router.post('/', auth, multer, islandCtrl.createThing);
router.get('/:id', auth, islandCtrl.getOneThing);
router.put('/:id', auth, multer, islandCtrl.modifyThing);
router.delete('/:id', auth, islandCtrl.deleteThing);

module.exports = router;