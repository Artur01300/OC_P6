const express = require('express');//
const router = express.Router();//création un routeur Express.

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllThing);
router.get('/:id', stuffCtrl.getOneThing);
router.post('/', stuffCtrl.createThing);

module.exports = router;