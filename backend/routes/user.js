const express = require('express');
const router = express.Router();//création du routeur

//on a besoin le contrôleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

//Ne pas permettre à un utilisateur de faire de multiples requêtes en même temps
const rateLimit = require('../middleware/limiter');

const verifyPassword = require('../middleware/password');

const verifyEmail = require('../middleware/email');

//création de route poste avec la méthode signup et login
router.post('/signup', rateLimit, verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

//exportation de routeur pour importer dans l'app.js
module.exports = router;