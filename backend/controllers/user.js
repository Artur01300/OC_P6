//on a besoin du paquage du cryptage pour les mode passe (--save bcrypt)
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');//on importe jsonwebtoken

//on a besoin  de notre model user car on va enrégister et lire des user dans ce middlwar
const User = require('../models/User');

//Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 caractère spécial, une longeur d'un moins 10
const regex = {
    password: /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/ 
};

//Ce contrôleur a besoin 2 middlwars: la function signup et login
//on hache le mode de passe avec une function(bcrypt.hash()) ansachon 
//avec la hache créé par bcrypt on va ensuite enregistrer l'user dans la base de données
//on lui passe le password du core de la requette qui serra passer par le frontend
//le solde(10) combien de l'algoritme de hachage c'est à dire 10 tour qui est suffisent de créer un mot de passe sécurisé
//le .then récupère le hache de mot de passe et en suit on vas engrégistrer dans un nouveau user(const user = new User) dans la base de donnée
exports.signup = (req, res, next) => {//Permet d'enrégister de nouveau users(req.body.password)

    bcrypt.hash(req.body.password, 10)
    .then(hach => {//on récupère le hache de mot de passe et en suit on enrégistre dans nouveau user(new User) et ensuit on onrégistre dans la basse de donné
        const user = new User({//créatio de notre nouvelle outilisateur avec le modèle mongoose
            email: req.body.email,//en passe l'adresse quie fournie dans le core de la requette
            password: hach//on enrégisre le hache qui est crée 2 ligne à haut(.then(hach =>{)
        });
        user
        .save()//On enrégistre dans la base de donnée
        .then(()=>res.status(201).json({message: 'Utilisateur créé !'}))//en envoie 201 pour la création de reçource et renvoie le message
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));//error server(500) qu'on voie dans un objet
}

//Login permet de connecter aux users exictent 
//En premier temps on va commencer de trouver les utilisateurs dans la base de données qui correspond à l'adresse email entré par lutilisateur de l'application 
//et si jamais l'utilisateur n'existe pas en envoir une erreur
//La méthode findeOne permet de trouver un  seul utilisateur dans la base de données et que l'adresse me il est unique et on compart ({email: req.body.email})
//on veut que ce soit l'utilisateur pour qui l'adresse mail correspond à l'adresse mail envoyée dans la requête
//findOne est un function ansycron
//on va utiliser le bcrypt pour comparer le mot de passe envoyé par l'utilisateur avec l'hach qui est enregistré avec l'user qu'ont ici (.then(user=> if...))
//on utilise la fonction compart(bcrypt.copare) pour comparer. on compart le mot de passe envoyé avec la requête (req.body.password,) et avec le hach (user.password)
//qui est enregistré dans notre user, dans notre document user
//** token
//on appelle le function sign(jwt.sign()), qui est le fonction de jsonwebtoken, qui prond quelque arguments:
//1er argument c'est les données qu'on veux encoder(c'est qu'on appelle le payload)
exports.login = (req, res, next) => {//Permet de connécter les users existant 
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
                //création d'objet avec user id(userId), qui serra l'identifiant d'utilisateur du user(user._id).
                //qui doit être le mème comme ce lui de 1em ligne de suppérieur de tocken:jwt.sign, cet à dire '.json({serId: user._id'
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