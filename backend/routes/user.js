//on a besoin l'express pour créer un routeur
const express = require('express');
const router = express.Router();//création du routeur

//on a besoin le contrôleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

//création de route poste avec la méthode signup et login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation de routeur pour importer dans l'app.js
module.exports = router;
