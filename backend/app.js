const express = require('express');//Importation d'express
const bodyParser = require('body-parser');//Imortation de body-parser
const mongoose = require('mongoose');

const path = require('path');//donne accès au chemin de note systeme de fichiers

//Importation de router pour enrégistrer ensuit notre routeur pour toutes les demandes effectuées vers /api/stuff. 
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//Connection l'appliquation à mon cluster à l'aide des pilotes natifs de MonogDB
mongoose.connect('mongodb+srv://Boblesponge:Bob123@cluster0.nz8on.mongodb.net/<dbname>?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true })
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

//Pour dire à notre applliquation express de servire le dosier image(backend/images), quand on faira requette à  /images
//Création d'un middelware(app.uss) qui vas réponsre au requette envoyer ('/images'), ici on veut il serve le dossier statique (backend/images)
//Pour servir un dossier statique on utilise express.static(au quelle on passe __dirname qui est le nom de dossier dans le quelle on vas se tourver
// au quelle on va ajouter l'image) 
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());//Il va trensformer le core de la requette en l'objet JS

//On va remettr le début la route et on va dir pour cet route là, on utilise le routeur qui est exposé par stuffRoutes
app.use('/api/sauces', saucesRoutes);

//enrégiste les routes ici(app.use) et la court attantu par le frontend c'est ('/api/auth')
//auth ça serra la racine de tousse qui est route lier les authentifications 
//et on passe les userRoutes
app.use('/api/auth', userRoutes);


module.exports = app;//On éxporte cet appliquation pour qu'on puisse accedès depuis un autre fichier dans notre projet