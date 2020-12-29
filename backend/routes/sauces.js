const express = require('express');//
const router = express.Router();//création un routeur Express.

const saucesCtrl = require('../controllers/sauces');

//permet protéter les routes en ajouter auth. exp. router.post('/', auth, saucesCtrl.createThing);
//avant la protéction des courte: router.post('/', saucesCtrl.createThing);
const auth = require('../middleware/auth');

//le fait qu'on a un multer middleware qui nous permet de gérer les fichiers entrants, il faut appliquer ce middleware aux routes concairné
const multer = require('../middleware/multer-config');//en ajoute le multer à la route poste. Attention ! mettre le multer après le auth
//si on met avant le ficier sera pas autentifier. donc on vérifi d'abord l'autontification et ensuit on traite le fichier image

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.post('/:id/like', auth, saucesCtrl.createLikes);

module.exports = router;