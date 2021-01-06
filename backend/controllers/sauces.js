const Sauce = require('../models/Sauces');

//Pour pouvoir accèder au sytème de fichier. fs = file systeme
const fs = require('fs');
const { timeStamp } = require('console');

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
    //danc mentent on a sur le core de la requette: req.body.sauce qui serra une chène de caractaire et qui sera un objet javascript sous form
    //de chène de caractaire. il vas faloir qu'on analise cet chène pour la trensforme en objet pour extraire l'objet json de sauce
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

exports.modifySauces = (req, res, next) => {

  //on teste si il y a une nouvelle image on aurra un req.file donc on saurra comment traiter.
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // On supprime l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlinkSync(`images/${filename}`)
    });
    sauceObject = {
      // On ajoute la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
  } else {
    // Si la modification ne contient pas de nouvelle image alors on modifie le cores de la requette
    sauceObject = { ...req.body }
  };

  Sauce.updateOne(
    // On applique les paramètre de sauceObject
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
  .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
  .catch((error) => res.status(400).json({ error }));

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

exports.createLikes = (req, res, next) => {
    const like = req.body.like;
    const user =  req.body.userId;

    Sauce.findOne({ _id: req.params.id }) // récuprération de la sauce
    .then(sauce => {

        if (sauce.usersLiked.includes(user)) { // Si le user aime deja la sauce et qu'il clic à nouveau sur le btn j'aime
        
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: user }, $inc: { likes: -1 } }) // alors je l'enleve des userLiked et je décrémente le compteur de like de 1
            .catch(error => res.status(400).json({ error }));
        }

        if (sauce.usersDisliked.includes(user)) { // Si le user n'aime deja pas la sauce et qu'il clic à nouveau sur le btn je n'aime pas 
            
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: user }, $inc: { dislikes: -1 } }) // alors je l'enleve des userDisliked et je décrémente le compteur de Dislike de 1
            .catch(error => res.status(400).json({ error }));
        }
    })
    .then(() => {
        if (like === 1) { // si le user aime la sauce

            Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: user }, $inc: { likes: 1 } }) // alors je met l'user dans le tableau des userLiked et j'incrémente le compteur de likes de 1
           
            .then(() => res.status(200).json({ message: user + " j'aime " }))
            .catch(error => res.status(400).json({ error }));
            
        } else if (like === -1) { // si le user n'aime pas la sauce

            Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: user }, $inc: { dislikes: 1 } }) // alors je met l'user dans le tableau des userDisliked et j'incrémente le compteur de Dislikes de 1
            
            .then(() => res.status(200).json({ message: user + " je n'aime pas " }))
            .catch(error => res.status(400).json({ error }));
        }

        if (like === 0) { // le user est neutre
            res.status(200).json({ message: user + " je suis neutre " })
        }

    }).catch(error => res.status(404).json({ error }));
};