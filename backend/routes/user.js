//on a besoin l'express pour créer un routeur
const express = require('express');
const router = express.Router();//création du routeur

//on a besoin le contrôleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/password');
const verifyEmail = require('../middleware/email');

//création de route poste avec la méthode signup et login
router.post('/signup', verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation de routeur pour importer dans l'app.js
module.exports = router;