//Ce middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.
const jwt = require('jsonwebtoken');//pour vérifier let token

//On utilise des bloques try et catch car il y a plusieurs éléments qui peuvent poser problème dant ce qu'on va faire dans le block try. Si il y a moindre
//erreur sur les moindre ligne on va porvoir les gèrer dans le block catch

//Dans le block try le 1er chause à  faire c'est récupérer le token dans le header autorisation(const token = req.headers...), on split autour de l'espase
//et ça va retourner un tableau avec 'Bearer' en 1er élément et Token en 2em élémént danc on récupére le 2em élément danc [1] 
//de ce tabeau(voir nettwork/dérnier stuff /headers/Authorization: Bearer). Donc cet 1er ligne: const token = req.headers... c'est le premer cas qu'on peut avair 
//une érreur: par ce que, si jamai le headers n'existe pas ou si il n'ya pas de mot ou si le splite retourn une error etc et pour que ça pent pas la requette
//on veux syplement ça renvoie vers notre catch: (catch (error))

//2em étap c'est de décoder le Token (const decodedToken = jwt.verify(token, 'RADOM_TOKEN_SECRET')) qui utilise le package 'jsonwebtoken' et la function 'verify'
//donc on ve verifier le token et le 2em argument la clé secréte qu'on a créer qui se trouve controllers/user.js/login,('RADOM_TOKEN_SECRET').
//Attention ! la clé controllers/user.js/login,('RADOM_TOKEN_SECRET') doit etre le même de selui de ici:  const decodedToken = jwt.verify(token, 'RADOM_TOKEN_SECRET');
//si la véification échoue sour ici alors on renvoie vers notre catch.

//3em étap récupération du user id qui ce trouve dans decodedToken(const userId = decodedToken.userId;)

//après de ces vérification si tout vas bein, donc il n'y a pas d'error, on appelle next c'est à dire on peut passer la requette au prochin middelwar
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SEC-(*/#{~é&2REksfqqsdfk[]*-/@£$¤*ù%µT');
    const userId = decodedToken.userId;
    //on vérifi si jamais il y a user id avec la requette qui correspond bien à cel de token:
    //si jamais on a userId dans le core de la requête(req.body.userId) et que selui si est différant de userId
    if (req.body.userId && req.body.userId !== userId) {

      throw 'Invalid user ID';//on retourne l'error

    } else {//si tout va bien on vas symplement appeller next
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authenifiée !'});//si on reçoie une error on veux l'envoyer(error: error) sinon | on va symplement dire 'Requête non authenifiée !
  }
};