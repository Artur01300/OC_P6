const Sauce = require('../models/Sauce');

//Pour pouvoir accèder au sytème de fichier. fs = file systeme
const fs = require('fs');


//and point(url visé par l'application /api/sauce). L'application frontend va essayer de fair une requête à l'api, à cet URL
//méthode finde() qui retourne une promis
//dans le then on va récoupérer le tableau de tout les things rétournées par la base et on va les envoye en résponse
exports.getAllSauces = (req, res, next)=>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//méthode get() pour répondre uniquement aux demandes GET à cet endpoint
//l'utilisation en face du segment dynamique de la route pour la rendre accessible en tant que paramètre(/api/sauce/:id')
//méthode findOne() dans notre modèle Sauce pour trouver le Sauce unique ayant le même _id que le paramètre de la requête ce Sauce est ensuite retourné dans 
//une Promise et envoyé au front-end si aucun Sauce n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
exports.getOneSauces = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

//Traite les requêtes post
//delete retire le chemps _id avant copier l'objet, l'id ne serra pas le bon car il vas être générer automatiquement par mongoDB
//Création de nouvelle instance de notre Sauce (new Sauce) au quelle on va passer un objet qui va contenir toutes les infos qu'on a besoin(userid, name, désciption etc.)
//( title: req.body.title) ou avec l'opérateur spread: ...req.body.//il va copier les chemps qu'il y a dans la body de la request(dans le core de la requette) et il va détiller le titre, description etc.
//la méthode save() enregistre simplement le Sauce dans la base de données
exports.createSauces = (req, res, next) => {

    //ici on mofifie de la création d'objet dans la base de donnée car le format de la requette à été oubligatoirement changé pour pourvoir
    //envoyer un fichier avec un requette, c'est a dire pour que lutilisateur puisse ajouter une image
    //danc mentent on a sur le core de la requette: req.body.thing qui serra une chène de caractaire et qui sera un objet javascript sous form
    //de chène de caractaire. il vas faloir qu'on analise cet chène pour la trensforme en objet pour extraire l'objet json de thing
    const saucesObject = JSON.parse(req.body.sauce);

    delete saucesObject._id;//au lieu d'enlever  req.body._id en enlève sauceObjet._id(avant il été comme  ça: delete req.body._id)
    const sauce = new Sauce({
        //au lieu d'enlever  req.body en enlève sauceObjet (avant il été comme  ça: req.body) en ajoutent un élément car le frontend
        //ne sait pas quelle est l'URL d'image mentenent car c'est middelwar multer qui a génèré ce fichier
        ...saucesObject,
        //on modifie l'URL d'image: le protocle (${req.protocol}), le nom dot (${req.get('host')}), slache images slache et le nom du fichier (${req.file.filename})
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));//on peut écrire avec le racoucie: json({ error }) ou json({ error: error})
};

//updateOne permet de mettre à jour le Thing dans la base des données
//le 1er argument, du updateOne, c'est l'objet de comparaison pour savoir objet on modifie(celui dant l'id est = à l'id qui est envoyé dans les paramètre). Le 2em argument c'est le nouvelle objet
//on récupair le core de la requette (.req.body) et on dit l'id correspond à celui des paramètre 
exports.modifySauces = (req, res, next)=>{
    
    //ici il y a 2 situation à prendre en compt: la 1er situation, c'est que lutilisateur a modifié symplement des informations de son objet sans
    //rajouter une nouvelle image, 2em situation, il ajoute une image car les format des requette ne serront pas les même
    //on teste si il y a une nouvelle image on aurra un req.file donc on saurra comment traiter. Si on a pas une nouvelle image, on poura treter
    //symplement la requette comme objet directement
    //on créer un tingObjet et avce l'operateur ternaire ? on veus savoir si req.file exicte si il exist on aura un type d'objet { } si n'existe pas:
    // on aura un autre type d'objet {}. Exeple {} : {}
    const sauceObject = req.file ?
    {
        //si le fichier exist on récuper avec json.parse toute les information sur l'objet qui sont dans cette partie de la requette
        //et on générer une nouvelle image d'Url
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//on générer une nouvelle image d'Url
    } : {...req.body};//ici il existe pas et on prond le core de la requette 

    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})//au leiu metre ...req.body on met ...sauceObject 
    .then(() => res.status(200).json({message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//méthode get() pour répondre uniquement aux demandes GET à cet endpoint
//l'utilisation en face du segment dynamique de la route pour la rendre accessible en tant que paramètre(/api/sauce/:id')
//méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ce Thing est ensuite retourné dans 
//une Promise et envoyé au front-end si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
exports.deleteSauces = (req, res, next)=>{

    //on va aller cherche l'url de l'image qui va nous permetre accèser au nom de fichier et on pourra supprimer ce fichier
    //on veut touver ce qui a _id qui corespond à celui dans les paramètres de la requette (findOne({ _id: req.params.id })
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

        //on récupère le thing et avec ce thing on veux récupérer non pas just l'url de l'image, on veut le nom de fichier précisément
        //pour extrère ce fichier, on créer filename avec ce nom de fichier on vas appeller une function du packege fs donc fs.unlink() pour supprimer
        //un fichier le premier argument (`images/${filename}`) qui correspond au chemin du fichier, le 2em argument c'est le collback (() =>),
        //ce qu'il faut faire une fois le fichier supprimer. Donc on veut supprimer le Thing dans la base de donnée( le fichier) 
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};