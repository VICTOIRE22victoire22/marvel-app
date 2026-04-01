// Importe useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useState, useEffect } from "react";
// Importe le fichier css du composant Favorites
import "./Favorites.css";

// Charge les personnages favoris depuis le localStorage ou crée une liste vide
const Favorites = () => {
  const [favoritesCharacters, setFavoritesCharacters] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
  });

// Charge les comics favoris depuis le localStorage ou crée une liste vide
  const [favoritesComics, setFavoritesComics] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritesComics")) || [];
  });

  // Met à jour les personnages favoris dans le localStorage
  useEffect(() => {
    localStorage.setItem("favoritesCharacters", JSON.stringify(favoritesCharacters));
  }, [favoritesCharacters]);

  // Met à jour les comics favoris dans le localStorage
  useEffect(() => {
    localStorage.setItem("favoritesComics", JSON.stringify(favoritesComics));
  }, [favoritesComics]);

  // Supprime un personnage des favoris à partir de son id
  const removeFromFavoritesCharacters = (characterId) => {
    const updatedFavoritesCharacters = favoritesCharacters.filter((fav) => fav._id !== characterId);
    setFavoritesCharacters(updatedFavoritesCharacters);
  };

  // Supprime un comic des favoris à partir de son id
  const removeFromFavoritesComics = (comicId) => {
    const updatedFavoritesComics = favoritesComics.filter((fav) => fav._id !== comicId);
    setFavoritesComics(updatedFavoritesComics);
  };

  return (   // Affiche le contenu du composant Favorites

    <div className="favorites">
             {/*Titre principal */}
      <h1>Liste des favoris</h1>

        <div className="favoritesList">
          {/* Parcourt la liste des favoris pour afficher chaque personnage favori */} 
          {favoritesCharacters.map((character) => (
            // Card d'un personnage favori
            <div key={character._id} className="card">
              <div className="characters">
              {/* Image d'un personnage */}
              <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`} alt={character.name} /> {/* Image du personnage */}
              {/* Nom du personnage*/}
              <h2>{character.name}</h2>
              {/* Description du personnage*/}
              <p>{character.description}</p>
            </div>
              {/* Bouton pour supprimer un personnage des favoris */}
              <button className="btnRemove" onClick={() => removeFromFavoritesCharacters(character._id)}>
                Retirer des favoris
              </button>
          </div>))}


          {/* Parcourt la liste des favoris pour afficher chaque comic favori */} 
          {favoritesComics.map((comic) => (
            // Card d'un comic favori
            <div key={comic._id} className="card">
              <div className="comics">
              {/* Image d'un comic */}
              <img src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`} alt={comic.name} />
              {/* Titre du comic*/}
              <h3>{comic.title}</h3>
              {/* Description du comic*/}
              <p>{comic.description}</p>
              </div>
              {/* Bouton pour supprimer un comic des favoris */}
              <button className="btnRemove" onClick={() => removeFromFavoritesComics(comic._id)}>
                Retirer des favoris
              </button>
        </div>
                  ))}
 </div>

    </div>
                    
  );
};

// Export du composant Favorites pour pouvoir l'utiliser ailleurs
export default Favorites;
