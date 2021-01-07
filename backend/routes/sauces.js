const express = require('express');
const router = express.Router();//création un routeur Express.

const saucesCtrl = require('../controllers/sauces');

//permet protéger les routes
const auth = require('../middleware/auth');

//Attention ! mettre le multer après le auth
//si on met avant le ficier sera pas autentifier. donc on vérifi d'abord l'autontification et ensuit on traite le fichier image
const multer = require('../middleware/multer-config');

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.post('/:id/like', auth, saucesCtrl.createLikes);

module.exports = router;