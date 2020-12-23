const mongoose = require('mongoose');//Importation du mongoose

//Création du Schema des données 'thingSchema' en utilisant la fonction mongoose dans le quelle on vas passer un onbjet 
//qui vas dicter les différant chemps dant notre thing aurra besoin
const thingSchema = mongoose.Schema({
    id: {type: Object, required: true},//La clé du nome de cheme est 'title' et on crée un objet pour confiqurer le titre
    userId: {type: String, required: true},//required ture signifie sans userID on ne pourra pas enrégistrer un thing dans la base
    name: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: String, required: true},
    usersDisliked: {type: String, required: true},
});

//Nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express.
//Exprotation le modéle terminé(module.exports) et on export le mongouse.model.
//Le premier argument passé c'est le nom du type('Thing'), douzième argoument c'est le schéma qu'on va utiliser(thingSchema), qu'on a créé
module.exports = mongoose.model('Thing', thingSchema);