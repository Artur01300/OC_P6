const rateLimit = require('express-rate-limit');

const createLimiter = rateLimit({
    windowMs: 1 * 10 * 1000, //1 minutes
    max: 10, // limite chaque IP à 10 requêtes par fenêtre
    message: "Veuillez réessayer dans une minutes"
});

module.exports = createLimiter;