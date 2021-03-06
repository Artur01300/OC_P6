const passwordValidator = require('password-validator');

const passSchema = new passwordValidator();//Create a schema

//Ajoutez-y des propriétés:  au moins une minuscule et majuscule, 8 caracter min et 100 max, 2 chiffre minimoume et pas d'espace
passSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().symbols(1)                               // Must have at lest 1 symbol
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = passSchema;