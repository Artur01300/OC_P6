//on a besoin du paquage du cryptage pour les mode passe
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const password = require('../middleware/password');

//on a besoin  de notre model user car on va enrégister et lire des user dans ce middlwar
const User = require('../models/User');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hach => {

        const user = new User({
            email: req.body.email,//en passe l'adresse quie fournie dans le core de la requette
            password: hach//on enrégisre le hache qui est crée 2 ligne à haut(.then(hach =>{)
        });

        user
        .save()
        .then(()=>res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));
}

//Login permet de connecter aux users exictent 

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){//si on n'a pas trouver les user on envoie le 401 pour dire non autorisé
            return res.status(401).json({error: 'Utilisateur non trouvé !'});
        }
        //si user est bon alors on cript le mot de passe
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid){//il reçoit le boolean, c'est-à-dire, si le mot de passe n'est pas valable
                return res.status(401).json({error: 'Mot de passe incorrect !'});
            }
            //si on arrive ici alors la comparaison est true. dans ce cas-là on renvoie la bonne connexion et l'objet json qui contient id d'user dans la base
            //et on envoe la token
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                //création d'objet avec user id(userId), qui serra l'identifiant d'utilisateur du user(user._id)
                    {userId: user._id},
                    'RANDOM_TOKEN_SEC-(*/#{~é&2REksfqqsdfk[]*-/@£$¤*ù%µT',//ce 2em argument c'est la clé secré d'encodage
                    {expiresIn: '24h'}//3em argument c'est un argument de configuration où on applique une expiration de notre token dans 24h
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}