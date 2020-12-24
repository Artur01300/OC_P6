const express = require('express');//
const router = express.Router();//création un routeur Express.

const stuffCtrl = require('../controllers/stuff');

//permet protéter les routes en ajouter auth. exp. router.post('/', auth, stuffCtrl.createThing);
//avant la protéction des courte: router.post('/', stuffCtrl.createThing);
const auth = require('../middleware/auth');

//le fait qu'on a un multer middleware qui nous permet de gérer les fichiers entrants, il faut appliquer ce middleware aux routes concairné
const multer = require('../middleware/multer-config');//en ajoute le multer à la route poste. Attention ! mettre le multer après le auth
//si on met avant le ficier sera pas autentifier. donc on vérifi d'abord l'autontification et ensuit on traite le fichier image

router.get('/', auth, stuffCtrl.getAllThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;