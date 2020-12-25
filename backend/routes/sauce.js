const express = require('express');//
const router = express.Router();//création un routeur Express.

const stuffCtrl = require('../controllers/sauce');

//permet protéter les routes en ajouter auth. exp. router.post('/', auth, stuffCtrl.createThing);
//avant la protéction des courte: router.post('/', stuffCtrl.createThing);
const auth = require('../middleware/auth');

//le fait qu'on a un multer middleware qui nous permet de gérer les fichiers entrants, il faut appliquer ce middleware aux routes concairné
const multer = require('../middleware/multer-config');//en ajoute le multer à la route poste. Attention ! mettre le multer après le auth
//si on met avant le ficier sera pas autentifier. donc on vérifi d'abord l'autontification et ensuit on traite le fichier image

router.get('/', auth, stuffCtrl.getAllSauces);
router.get('/:id', auth, stuffCtrl.getOneSauces);
router.post('/', auth, multer, stuffCtrl.createSauces);
router.put('/:id', auth, multer, stuffCtrl.modifySauces);
router.delete('/:id', auth, stuffCtrl.deleteSauces);
// router.post('/:id/like', auth, multer, stuffCtrl.createLikes);

module.exports = router;