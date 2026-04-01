// Importe useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useEffect, useState } from "react";
// Importe le composant Link pour naviguer sans rechargement de la page
// et useNavigate pour effectuer une navigation
import { Link, useNavigate } from "react-router-dom";
// Importe le fichier css du composant Characters
import "../Characters/Characters.css";
// importe axios pour faire des requêtes HTTP vers une API
import axios from "axios";

// Déclare le composant Characters
function Characters( isConnected ) {
  // Crée la fonction navigate pour permettre la navigation vers une autre page
  const navigate = useNavigate();
  // Crée un state pour stocker les personnages
  const [characters, setCharacters] = useState([]);
  // Crée un state pour stocker la valeur du champ de recherche
  const [search, setSearch] = useState("");
  // Crée un state pour stocker les différents choix de la recherche
  const [choices, setChoices] = useState([]);

  // Crée un state pour stocker les personnages favoris
  const [favoritesCharacters, setFavoritesCharacters] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
  });

  // S'exécute au chargement du composant puis à chaque changement de la recherche
  useEffect(() => {
    // Fonction asynchrone qui récupère les personnages depuis l'API
    const fetchCharacters = async () => {
      // Gère les erreurs avec try/catch
      try {
        // Construit une URL selon la recherche
        const url =
          search.length > 0
            ? `http://localhost:3000/characters?name=${search}`
            : "http://localhost:3000/characters";

        console.log("URL envoyée :", url);

        // Envoie la requête et attend la réponse
        const response = await axios.get(url);
        // Récupère les données renvoyées par l'API
        const data = response.data;
        // Met à jour le state avec les personnages récupérés
        setCharacters(data.results);

        // Si on fait une recherche, les éléments affichés sont limités à 5 résultats,
        // sinon, le tableau est vide
        if (search.length > 0) {
          setChoices(data.results.slice(0, 5));
        } else {
          setChoices([]);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setCharacters([]);
        setChoices([]);
      }
    };

    // Exécute la fonction de récupération des personnages
    fetchCharacters();
  }, [search]);

  // Ajoute un personnage aux favoris si il n'y est pas déjà, sinon affiche un message d'alerte
  const addToFavoritesCharacters = (character) => {
    if (!isConnected) {
      navigate("/login");
      return;
    }
    if (favoritesCharacters.some((fav) => fav._id === character._id)) {
      return alert("Ce personnage est déjà dans vos favoris");
    }
    setFavoritesCharacters([...favoritesCharacters, character]);
  };

  // Supprime un personnage des favoris à partir de son id
  // et met à jour la liste des favoris
  const removeFromFavoritesCharacters = (characterId) => {
    if (!isConnected) {
      navigate("/login");
      return;
    }
    setFavoritesCharacters(
      favoritesCharacters.filter((fav) => fav._id !== characterId),
    );
  };

  // Sauvegarde la liste des favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(favoritesCharacters),
    );
  }, [favoritesCharacters]);

  return (
    <div className="container-characters">
      <div className="section">
        <div className="searchText">
          {/* Champ texte de la recherche, met à jour "search" à chaque saisie */}
          <input
            type="text"
            value={search}
            placeholder="Recherche du personnage"
            onChange={(e) => setSearch(e.target.value)}
            className="input-recherche"
          />
          {/* Affiche les différents choix de la recherche si la liste contient au moins un élément */}
          {choices.length > 0 && (
            <ul className="choicesList">
              {/* Parcourt les choix pour afficher chaque personnage*/}
              {choices.map((character) => (
                <li
                  key={character._id}
                  onClick={() => {
                    // Remplit le champ de recherche avec le nom sélectionné
                    setSearch(character.name);
                    // Vide les différents choix après avoir cliqué sur l'un d'entre eux
                    setChoices([]);
                  }}
                >
                  {/* Affiche le nom du personnage dans les différents choix*/}
                  {character.name}
                </li>
              ))}
            </ul>
          )}
        </div>
                {/* Titre principal */}
        <h1>Liste des personnages</h1>
      </div>

      {/* Affichage des personnages (image, nom et description) */}
      <div className="section">
        {characters.length > 0
          ? characters.map((character) => {
              // Vérifie si le personnage est déjà dans les favoris
              const isFavorite = favoritesCharacters.some(
                (fav) => fav._id === character._id,
              );

              return (
                // Carte affichant les données d'un personnage avec une clé unique
                <div className="card" key={character._id}>
                  {/* Lien vers la page de détail du personnage grâce à son id */}
                  <Link to={`/characters/${character._id}`}>
                    <div className="characters">
                      {/* Image du personnage affichée à partir de l'API */}
                      <img
                        src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      {/* Nom du personnage */}
                      <h2 className="characterName">{character.name}</h2>
                      {/* Description du personnage */}
                      <p className="characterDescription">
                        {character.description}
                      </p>
                    </div>
                  </Link>
                  {/* Si le personnage est dans les favoris, on affiche le bouton "Supprimer des favoris" 
              sinon, on affiche le bouton "Ajouter aux favoris" */}
                  {isFavorite ? (
                    <button
                      className="btnRemove"
                      onClick={() =>
                        removeFromFavoritesCharacters(character._id)
                      }
                    >
                      Supprimer des favoris
                    </button>
                  ) : (
                    <button
                      className="btnAdd"
                      onClick={() => addToFavoritesCharacters(character)}
                    >
                      Ajouter aux favoris
                    </button>
                  )}
                </div>
              );
            })
          : // Si aucun personnage ne correspond à la recherche, on affiche un message
            search.length > 0 && (
              <p>Aucun personnage trouvé</p>
            ) 
        }
      </div>
    </div>
  );
}

// Export du composant Characters pour pouvoir l'utiliser ailleurs
export default Characters;
