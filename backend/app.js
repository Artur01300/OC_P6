const express = require('express');//Importation d'express
const mongoose = require('mongoose');

//Connection l'appliquation à mon cluster à l'aide des pilotes natifs de MonogDB
mongoose.connect('mongodb+srv://Boblesponge:Bob123@cluster0.nz8on.mongodb.net/<dbname>?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();//Il serra notre appliquation

//Pour éviter l'erreurs de CORS le middleware ajouté avant la route d'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//d'envoyer des requêtes avec les méthodes mentionnées ( GET, POST, etc.).
    next();//Qui permet de passer l'execution au middlwar d'apret
});

module.exports = app;//On éxporte cet appliquation pour qu'on puisse accedès depuis un autre fichier dans notre projet