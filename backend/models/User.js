const mongoose = require('mongoose');//Importation du mongoose

//Création de notre schèma en utilisant la function schéma de mongoose
//On stoque les informations comme email est le mot de passe de l'utilisateur
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},//unique:true signifie que ça ne sera pas possible de s'inscrire plusieurs fois avec même adresse mail
    password: {type: String, required: true}
});