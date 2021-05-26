### Contexte du projet "Piquante"

Dans cet application web les utilisateurs pourront
ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.


### Le back-end

A la racine de backend, créez un fichiez `.env` (backend/.env), mettrez les valeurs correctes pour se connecter à une base de donnée mongodb:

`DB_USER="username de la base de donnée mongodb"`  
`DB_PASS="password de la base de donnée mongodb"`
`PORT= " "`
`TOKEN= " "`


## Technologies à utilisées
* framework : Express ;
* serveur : NodeJS ;
* base de données : MongoDB Atlas;
* toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

## Procédure
1. Clonez le projet.
2. Installez @angular/cli globalement 
3. Exécutez npm install pour le backend et forntend.
4. Exécutez npm start pour le back-end.
5. Exécution de l’API sur http://localhost:3000.
6. Exécutez ng serve pour le front-end sur http://localhost:4200/.


### Le front-end

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

Pour accéder aux sauces: **créez un compte**, mettez un **mot de passe fort** (minimum 8 caractères avec des **majuscules**, **minuscules**, **deux chiffres** et **un symbole**).
