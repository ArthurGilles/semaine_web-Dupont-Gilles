# Projet Semaine Web

Fait dans le cadre de la Semaine Web du Dep' Info N23, ce dépôt héberge le projet du binôme Arthur GILLES - Jules DUPONT.

### Description

À travers ce projet, notre but a été de proposer un bref dashboard résumant - au moyen de plusieurs appels API - diverses informations concernant les modes de transport économiques et écologiques qu'un étudiant peut utiliser depuis le Campus ARTEM.

### Lancer le projet

Une solution simple pour faire tourner ce projet local est l'utilisation d'un serveur web Python. Dans un terminal à la racine du projet, lancer:
```
python3 -m http.server 8000
```
Puis ouvrir `localhost:8000` sur son navigateur.

### Fait avec
Ce projet a été réalisé avec l'aide de plusieurs technologies présentées au cours de la Semaine Web, notamment [Lit](https://lit.dev).

Pour les données temps-réel, nous faisons appel à deux API différentes:
- l'[API JCDecaux](https://developer.jcdecaux.com/#/opendata/vls?page=getstarted), qui nous permet de récupérer des données temps-réel sur la station VélOstan'lib (vélos en location libre-service) du campus.
- l'[API Openweathermap](https://openweathermap.org/api), qui nous permet d'obtenir la météo en temps-réel sur le campus.

### Roadmap
À cette heure, la carte "À BUS" est vide. Nous peinons en effet à récupèrer des données concernant le prochain passage de bus à la station Campus ARTEM, puisque l'exploitant du réseau STAN ne propose pas d'API public. Une première piste a été d'utiliser [ce projet](https://github.com/maelgangloff/stan-api), mais il ne semble plus à jour. Une seconde piste a été de scrapper nous-même [le site de l'exploitant](https://www.reseau-stan.com). Arthur y a passé un certain temps, mais s'est notamment heurté à des restrictions de la part du site.

Bien d'autres fonctionnalités peuvent être imaginées pour ce début de dashboard; par exemple, nous avons pensé à nous connecter à l'API Google Maps (ou similaire) pour proposer de calculer des itinéraires au départ d'ARTEM.

### Remerciements

Nous remercions les intervenants de cette Semaine Web, Martin Pierret et Julien Blatecky, pour nous avoir transmis leur expertise dans ce domaine.