const mongoose = require('mongoose');//Importation du mongoose

//Création du Schema des données 'saucesSchema' en utilisant la fonction mongoose dans le quelle on vas passer un onbjet 
//qui vas dicter les différant chemps dant notre sauce aurra besoin
const saucesSchema = mongoose.Schema({
    userId: {type: String, required: true},//La clé du nome de chemps est 'userId' et on crée un objet pour confiqurer le id
    name: {type: String, required: true},//required ture signifie sans name on ne pourra pas enrégistrer un sauce dans la base
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number},
    likes: {type: Number, default: 0},//défault: pour affiche ne nombre like par défaut 0, si non ça créé une érreur 'NON'
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]},
});


//Nous exportons ce schéma en tant que modèle Mongoose appelé « Sauce », le rendant par là même disponible pour notre application Express.
//Exprotation le modéle terminé(module.exports) et on export le mongouse.model.
//Le premier argument passé c'est le nom du type('Sauces'), douzième argoument c'est le schéma qu'on va utiliser(saucesSchema), qu'on a créé
module.exports = mongoose.model('Sauces', saucesSchema);