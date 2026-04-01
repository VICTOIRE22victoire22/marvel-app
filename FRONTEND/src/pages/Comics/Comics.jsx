// Importe useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useEffect, useState } from "react";
// Importe le composant useNavigate pour effectuer une navigation
import {useNavigate} from "react-router-dom";
// Importe le fichier css du composant Comics
import "../Comics/Comics.css";
// importe axios pour faire des requêtes HTTP vers une API
import axios from "axios";

// Déclare le composant Comics
function Comics(isConnected) {
  // Crée la fonction navigate pour permettre la navigation vers une autre page
  const navigate = useNavigate();
  // Crée un state pour stocker les comics
  const [comics, setComics] = useState([]);
  // Crée un state pour stocker la valeur du champ de recherche
  const [search, setSearch] = useState("");
  // Crée un state pour stocker les différents choix de la recherche
  const [choices, setChoices] = useState([]);

  // Crée un state pour stocker les comics favoris
  const [favoritesComics, setFavoritesComics] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritesComics")) || [];
  });

  // S'exécute au chargement du composant puis à chaque changement de la recherche
  useEffect(() => {
    // Fonction asynchrone qui récupère les comics depuis l'API
    const fetchComics = async () => {
      // Gère les erreurs avec try/catch
      try {
        // Construit une URL selon la recherche
        const url = search.length > 0 
        ? `http://localhost:3000/comics?title=${search}`
        : "http://localhost:3000/comics";

        console.log("URL envoyée :", url);

        // Envoie la requête et attend la réponse
        const response = await axios.get(url);
        // Récupère les données renvoyées par l'API
        const data = response.data;
        // Met à jour le state avec les comics récupérés
        setComics(data.results);

          // Si on fait une recherche, les éléments affichés sont limités à 5 résultats,
          // sinon, le tableau est vide
          if (search.length > 0) {
          setChoices(data.results.slice(0, 5));
        } else {
          setChoices([]);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setComics([]);
        setChoices([]);
      }
    };
    // Exécute la fonction de récupération des comics
    fetchComics();
  }, [search]);

  // Ajoute un comic aux favoris si il n'y est pas déjà, sinon affiche un message d'alerte
  const addToFavoritesComics = (comic) => {
    if (!isConnected) {
      navigate("/login");
      return;
    }
    if (favoritesComics.some((fav) => fav._id === comic._id)) {
      return alert("Ce comic est déjà dans vos favoris");
    }
    setFavoritesComics([...favoritesComics, comic]);
  };


  // Supprime un comic des favoris à partir de son id
  // et met à jour la liste des favoris
  const removeFromFavoritesComics = (comicId) => {
    if (!isConnected) {
      navigate("/login");
      return;
    }
    setFavoritesComics(favoritesComics.filter((fav) => fav._id !== comicId));
  };


// Sauvegarde la liste des favoris dans le localStorage à chaque changement
useEffect(() => {
  localStorage.setItem("favoritesComics", JSON.stringify(favoritesComics));
}, [favoritesComics]);

  return (
    <div className="container-comics">

      <div className="section">
        <div className="searchText">
              {/* Champ texte de la recherche, met à jour "search" à chaque saisie */}
              <input
              type="text"
              value={search}
              placeholder="Recherche du comic"
              onChange={(e) => setSearch(e.target.value)}
              className="input-recherche"
              />
              {/* Affiche les différents choix de la recherche si la liste contient au moins un élément */}
              {choices.length > 0 && (
                <ul className="choicesList">
                  {/* Parcourt les choix pour afficher chaque comic*/}
                  {choices.map((comic) => (
                    <li key={comic._id} onClick={() => {
                      // Remplit le champ de recherche avec le titre sélectionné
                      setSearch(comic.title);
                      // Vide les différents choix après avoir cliqué sur l'un d'entre eux
                      setChoices([]);
                    }}>
                      {/* Affiche le titre du comic dans les différents choix*/}
                      {comic.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
        {/* Titre principal */}
        <h1>Liste des comics</h1>
      </div>

      {/* Affichage des comics (image, titre et description) */}
      <div className="section">
        {comics.length > 0 ? (
        comics.map((comic) => {
          // Vérifie si le comic est déjà dans les favoris
          const isFavorite = favoritesComics.some(
            (fav) => fav._id === comic._id
          );

          return (
          // Carte affichant les données d'un comic avec une clé unique
          <div className="card" key={comic._id}>
              {/* Lien vers la page des comics grâce à son id */}
                <div className="comics">
                  {/* Image du comic affichée à partir de l'API */}
                  <img
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  {/* Titre du comic*/}
                  <h2 className="comicTitle">{comic.title}</h2>
                  {/* Description du comic*/}
                  <p className="comicDescription">
                    {comic.description}
                  </p>
                  </div>
                  {/* Si le comic est dans les favoris, on affiche le bouton "Supprimer des favoris" 
                  sinon, on affiche le bouton "Ajouter aux favoris" */}
                  {isFavorite ? (
                  <button className="btnRemove" onClick={() => removeFromFavoritesComics(comic._id)}>Supprimer des favoris</button>
                  ) : (
                  <button className="btnAdd" onClick={() => addToFavoritesComics(comic)}>Ajouter aux favoris</button>
                  )}
          </div>
        );
        })
      ) : (
        // Si aucun comic ne correspond à la recherche, on affiche un message
        search.length > 0 && <p>Aucun comic trouvé</p>
        )}
      </div>
    </div>
  );
}

// Export du composant Comics pour pouvoir l'utiliser ailleurs
export default Comics;
