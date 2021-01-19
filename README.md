### Contexte du projet "Piquante"

So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création
de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise
souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront
ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.


### Le back-end

A la racine de backend, créer un fichier `.env` (backend/.env), mettre les valeurs correctes pour se connecter à une base de donnée mongodb:

`DB_USER="username de la base de donnée mongodb"`  
`DB_PASS="password de la base de donnée mongodb"`
`PORT= 3000"`
`TOKEN= "`


## Technologies à utiliser
* framework : Express ;
* serveur : NodeJS ;
* base de données : MongoDB ;
* toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

## Procédure
1. Cloner le projet.
2. Installez @angular/cli globalement 
3. Exécutez npm install pour le backend et forntend.
4. Exécutez npm start pour le back-end.
5. Exécution de l’API sur http://localhost:3000.
6. Exécutez ng serve pour le front-end sur http://localhost:4200/.


### Le front-end

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

Pour accéder aux sauces: **créer un compte**, mettre un **mot de passe fort** (minimum 8 caractères avec des **majuscules**, **minuscules**, **deux chiffres** et **un symbole**).