const emailSchema = require('validator');

module.exports = (req, res, next) => {

  if (!emailSchema.isEmail(req.body.email)) {

    return res.status(400).json({ error: 'Veuillez rentrer un email valide !'});
    
  } else {
    next();
  }
};