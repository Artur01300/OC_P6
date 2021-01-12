const express = require('express');
const router = express.Router();//création du routeur

//on a besoin le contrôleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

//Ne pas permettre à un utilisateur de faire de multiples requêtes en même temps
const rateLimit = require('express-rate-limit');

const verifyPassword = require('../middleware/password');
const verifyEmail = require('../middleware/email');


const createAcountLimiter = rateLimit({
    windowMs: 1 * 50 * 1000, //1 minutes
    max: 3, // limite chaque IP à 100 requêtes par fenêtre
    message: "Pour la création d'un compte, veuillez réessayer dans 50 minutes"
});

const tryLoginLimiter = rateLimit({
    windowMs: 0 * 10 * 1000, 
    max: 3, 
    message: "Réessayez dans 10 minutes"
});

//création de route poste avec la méthode signup et login
router.post('/signup', createAcountLimiter, verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login', tryLoginLimiter, userCtrl.login);

//exportation de routeur pour importer dans l'app.js
module.exports = router;