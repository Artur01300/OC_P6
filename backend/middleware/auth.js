const jwt = require('jsonwebtoken');//pour vérifier let token

//rocupération le token dans le header, ls split[1] récupère la 2em élément du tableau
//2em étap décode le token, 3em étap on récupère userid qui est dans le tocken
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SEC-(*/#{~é&2REksfqqsdfk[]*-/@£$¤*ù%µT');
    const userId = decodedToken.userId;
    //on vérifi si jamais il y a user id avec la requette qui correspond bien à cel de token
    if (req.body.userId && req.body.userId !== userId) {

      throw 'Invalid user ID';//on retourne l'error

    } else {//si tout va bien on vas symplement appeller next
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authenifiée !'});//si on reçoie une error on veux l'envoyer(error: error) sinon | on va symplement dire 'Requête non authenifiée !
  }
};