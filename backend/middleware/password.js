const passSchema = require('../models/Password');

module.exports = (req, res, next) => {
  if(!passSchema.validate(req.body.password)){

    return res.status(400).json({error: 
      'Password is not strong !' 
      + 
      passSchema.validate('try again', {list: true})
    })

  }else{
    next();
  }
};