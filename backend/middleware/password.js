const passSchema = require('../models/Password');

module.exports = (req, res, next) => {
  if(!passSchema.validate(req.body.password)){

    return res.status(400).json({error: 
      'Minimum 8 caractères avec des majuscules, minuscules et deux chiffres !' 
      + 
      passSchema.validate('try again', {list: true})
    })

  }else{
    next();
  }
};