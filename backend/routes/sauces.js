const express = require('express');
const router = express.Router();//création un routeur Express.

const saucesCtrl = require('../controllers/sauces');

//Ne pas permettre à un utilisateur de faire de multiples requêtes en même temps
const rateLimit = require('../middleware/limiter');

//permet protéger les routes
const auth = require('../middleware/auth');

//Attention ! auth doit etre le premier
//si on met avant le ficier sera pas autentifier. donc on vérifi d'abord l'autontification et ensuit on traite le fichier image
const multer = require('../middleware/multer-config');

router.get('/', auth, rateLimit, saucesCtrl.getAllSauces);//Renvoie le tableau de toutes les sauces dans la base de données
router.get('/:id', auth,rateLimit, saucesCtrl.getOneSauce);//Renvoie la sauce avecl'ID fourni
router.post('/', auth, rateLimit, multer, saucesCtrl.createSauces);
router.put('/:id', auth, rateLimit, multer, saucesCtrl.modifySauces);//Met à jour la sauce avec l'identifiant fourni.
router.delete('/:id', auth, rateLimit, saucesCtrl.deleteSauces);//Supprime la sauce avec l'ID fourni.
router.post('/:id/like', auth, rateLimit, saucesCtrl.createLikes);//Définit le statut "j'aime" pour userID fourni. 

module.exports = router;