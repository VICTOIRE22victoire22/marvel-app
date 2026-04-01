
// charge les variables d'environnement
require("dotenv").config();
// importe express pour créer le serveur
const express = require("express");
// importe cors pour les requêtes externes
const cors = require("cors");
// importe axios pour faire des requêtes HTTP vers une API
const axios = require("axios");
// créer une application express
const app = express();

// autorise les requêtes cross-origin
app.use(cors());
// le serveur peut lire le format JSON envoyé dans les requêtes
app.use(express.json());

// route principale pour tester si le serveur fonctionne
app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur le serveur marvel 🦸🦸🏽‍♀️");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les personnages : avec paramètres nom, skip, et limit
app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query); // { name: 'spider', limit: '50', page: '3' }

    // formule pagination :
    // skip = (page - 1) * limit

    // nombre d'éléments
    let limit = 100;
    // aucun élément à ignorer
    let skip = 0;
    // déterminer si on reçoit des paramètre query :
    let queries = "";
    // si le nom de la requête est donné, on l'ajoute
    if (req.query.name) {
      queries = queries + "&name=" + req.query.name;
    }
    // si une limite est donnée, ne pas tenir compte de la valeur limit de 100
    if (req.query.limit) {
      // changer la limit qui etait à 100 par défaut :
      limit = req.query.limit;
      // puis changer la requete :
      queries = queries + "&limit=" + req.query.limit;
    }
    // si une page est donnée, on calcule le skip
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    // envoyer la requête à l'API
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/characters?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    // renvoyer la réponse de la requête au front
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les comics liés à un personnage
app.get("/comics", async (req, res) => {
  try {
    // console.log(req.query); // { title: 'spider', page: '3', limit: '20' }
    let limit = 100;
    let skip = 0;
    // déterminer si on reçoit des paramètre query :
    let queries = "";
    // si un titre est donné, on l'ajoute
    if (req.query.title) {
      queries = queries + "&title=" + req.query.title;
    }
    // si une limite est donnée, ne pas tenir compte de la limit par défaut de 100
    if (req.query.limit) {
      // changer la limit qui etait à 100 par défaut :
      limit = req.query.limit;
      // puis changer la requete :
      queries = queries + "&limit=" + req.query.limit;
    }
    // si une page est donnée, on calcule le skip
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    // envoyer la requête à l'API
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/comics?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    // renvoyer la réponse de la requête au front
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les comics liés à un personnage : avec paramètres title, skip, et limit
app.get("/comics/:id", async (req, res) => {
  try {
    // console.log(req.params); // { id: '5fcf91fed8a2480017b91467' }
    // envoyer la requête :
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/comics/" +
        req.params.id +
        "?apiKey=" +
        process.env.MARVEL_API_KEY,
    );

    // renvoyer les données du comic
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
 // gérer les routes non trouvées
app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

// démarrer le serveur sur le port défini dans le fichier .env ou le port 3000 par défaut
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🔥🔥🔥🔥🔥");
});
