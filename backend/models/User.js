const mongoose = require('mongoose');//Importation du mongoose

//On ajoute ce validateur comme plug-in à nontre schéma une fois plugins installé (npm i-save mongoose unique validateur)
const uniqueValidator = require('mongoose-unique-validator');

//Création de notre schèma en utilisant la function schéma de mongoose
//On stoque les informations comme email est le mot de passe de l'utilisateur
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},//unique:true signifie que ça ne sera pas possible de s'inscrire plusieurs fois avec même adresse mail
    password: {type: String, required: true}
});

//pour le validateur (uniqueValidator) on aplique un shcéma avant d'en faire un modèle
//qui nous permet de ne pas avoir plusieurs utilisateurs avec même adress mail
userSchema.plugin(uniqueValidator);

//On exporte ce schéma sous forme modèle 
module.exports = mongoose.model('User', userSchema);