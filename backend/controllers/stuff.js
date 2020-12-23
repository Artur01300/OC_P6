const Thing = require('../models/Thing');


//and point(url visé par l'application /api/stuff). L'application frontend va essayer de fair une requête à l'api, à cet URL
//méthode finde() qui retourne une promis
//dans le then on va récoupérer le tableau de tout les things rétournées par la base et on va les envoye en résponse
exports.getAllThing = (req, res, next)=>{
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

//méthode get() pour répondre uniquement aux demandes GET à cet endpoint
//l'utilisation en face du segment dynamique de la route pour la rendre accessible en tant que paramètre(/api/stuff/:id')
//méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ce Thing est ensuite retourné dans 
//une Promise et envoyé au front-end si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

//Traite les requêtes post
//delete retire le chemps _id avant copier l'objet, l'id ne serra pas le bon car il vas être générer automatiquement par mongoDB
//Création de nouvelle instance de notre Thing (new Thing) au quelle on va passer un objet qui va contenir toutes les infos qu'on a besoin(title, désciption etc.)
//( title: req.body.title) ou avec l'opérateur spread: ...req.body.//il va copier les chemps qu'il y a dans la body de la request(dans le core de la requette) et il va détiller le titre, description etc.
//la méthode save() enregistre simplement le Thing dans la base de données
exports.createThing = (req, res, next) => {

    //ici on mofifie de la création d'objet dans la base de donnée car le format de la requette à été oubligatoirement changé pour pourvoir
    //envoyer un fichier avec un requette, c'est a dire pour que lutilisateur puisse ajouter une image
    //danc mentent on a sur le core de la requette: req.body.thing qui serra une chène de caractaire et qui sera un objet javascript sous form
    //de chène de caractaire. il vas faloir qu'on analise cet chène pour la trensforme en objet pour extraire l'objet json de thing
    const thingObject = JSON.parse(req.body.thing);

    delete thingObject._id;//au lieu d'enlever  req.body._id en enlève thingObjet._id(avant il été comme  ça: delete req.body._id)
    const thing = new Thing({
        //au lieu d'enlever  req.body en enlève thingObjet (avant il été comme  ça: req.body) en ajoutent un élément car le frontend
        //ne sait pas quelle est l'URL d'image mentenent car c'est middelwar multer qui a génèré ce fichier
        ...thingObject,
        //on modifie l'URL d'image: le protocle (${req.protocol}), le nom dot (${req.get('host')}), slache images slache et le nom du fichier (${req.file.filename})
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));//on peut écrire avec le racoucie: json({ error }) ou json({ error: error})
};