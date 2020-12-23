const multer = require('multer');

//en utilisant les MIME_TYPES, on génère les extensions du fichier en préparant un dictionniair ice: const MIME_TYPES qui sera un objet
//les 3 différant MIME_TYPES sont: 'image/jpg': 'jpg', 'image/jpeg': 'jpg', 'image/png': 'png'
const MIME_TYPES = {
    'image/jpg': 'jpg', //image/jpg on traduit en jpg etc. pour les 2 autres
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Création d'un objet de configuration pour multer pour enregistrer sur le disque
//Lobjet de configuration qu'on passe à diskStorage a besoin de 2 éléments: destination qui sera une function qui va retourner, qui va expliquer
//molter dans quel dossier ongrégistre les fichier et filename qui va expliquer à muter quel fichier utilisé car on ne peut pas se permettre
//d'utiliser le fichier origine, sinon, on risquerait d'avoir de problème lorsque les 2 fichiers aurrets le même nom par exemple
const storage = multer.diskStorage({//diskStorage est un function de multer
    destination: (req, file, callback) => {
        //on appelle le collback. promier argument(nulle) pour dire qu'il n'y a pas eu d'erreur à ce niveau-là et en passant le nom de dossier 
        //en 2em argument, danc le dossier qu'on a créer dans le backend
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //Ici on va générer un nouveau nom pour les fichiers

        //création le nom de fichier. On utilise le nom d'origin du fichier (file.originalname)
        //Il est possible sous pluseur OS d'avoir d'espase, d'avoir 'white space' dans un nom de fichier, mais ça peut 
        //posser des problème de côté server. Pour éliminer ses espaces et on va les remplacer par des underscores en utilisant la méthode split() qui
        //vas créer un tableau (' ') avec les différents mots du nom de fichier et en appellant .join et en rejoignant ce tableau en un sole string 
        //('_') avec les underscore à la place des espaces qui nous permet de l'éliminer le problème des espaces
        const name = file.originalname.split(' ').join('_');

        //On applique une extention au ficier qui serra l'élément de notre dictionnaire: MIME_TYPES qui correspond [file.mimetype] au mimetypes du fichier
        //envoyé par le frontend
        const extension = MIME_TYPES[file.mimetype];

        //on appelle le collback, ()on passe le 1e argument nulle pour dire il n'ya pas d'erreur, et on va créer le file name entier,
        //ça sera le name qu'on a créer au desue(const name = file.originalname.split(' ').join('_')) au quelle on va ajouté un timestamp, pour
        //rendre le plus unique possible (Date.naw(), on ajoute également un point '.' et l'extention du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

// //on exporte le middelwar multer en appelant le multer à la quelle on passe notre objet storage et on  apelle la méthode single pour dire
// //il sagie un fichier unique et on explique à multer qu'il sagie le fichier image uniquement
module.exports = multer({storage: storage}).single('image');