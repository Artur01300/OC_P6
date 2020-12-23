//on a besoin du paquage du cryptage pour les mode passe (--save bcrypt)
const bcrypt = require('bcrypt');

//Ce controleur a besoin 2 midlewar: la function signup et login
exports.signup = (req, res, next) => {//Permet d'enrégister de ouveau users
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisatur créé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error}));
}
exports.login = (req, res, next) => {//Permet de connécter les users existant

}
