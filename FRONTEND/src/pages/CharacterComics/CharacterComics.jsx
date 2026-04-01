// Importe useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useEffect, useState } from "react";
// Importe useParams pour récupérer l'id dans l'URL
import{ useParams } from "react-router-dom";
// Importe le fichier css du composant CharacterComics
import "../CharacterComics/CharacterComics.css";
// importe axios pour faire des requêtes HTTP vers une API
import axios from "axios";

// Déclare le composant CharacterComics
function CharacterComics() {
  // Crée un state pour stocker les comics liés au personnage
  const [characterComics, setCharacterComics] = useState([]);
  // Récupère l'id du personnage grâce à l'URL
  const {id} = useParams();

  // S'exécute au chargement du composant puis à chaque changement de la recherche
  useEffect(() => {
    // Fonction asynchrone qui récupère les comics des personnages depuis l'API
    const fetchCharacterComics = async () => {
      // Gère les erreurs avec try/catch
      try {
        // Envoie la requête et attend la réponse
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        // Récupère les données renvoyées par l'API
        const data = response.data;
        console.log(data);
        // Met à jour le state avec les comics liés au personnage récupérés
        setCharacterComics(data.comics);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    // Exécute la fonction de récupération des comics liés au personnage
    fetchCharacterComics();
  }, [id]);

  return (
    <div className="container-characterComics">

    <div className="section">
      {/* Titre principal*/}
      <h1>Liste des comics liés au personnage</h1>
    </div>

    {/* Affichage des comics liés au personnage (image, titre et description) */}
    <div className="section">
        {characterComics?.map((characterComic) => (
            // Carte affichant les données d'un comic lié au personnage avec une clé unique
            <div className="card" key={characterComic._id}>
                <div className="characterComics">
                {/* Image du comic lié au personnage affichée à partir de l'API */}
                <img
              src={`${characterComic.thumbnail.path}/portrait_xlarge.${characterComic.thumbnail.extension}`}
              alt={characterComic.title}
            />
            {/* Titre du comic lié au personnage */}
            <h2 className="characterComicTitle">{characterComic.title}</h2>
            {/* Description du comic lié au personnage */}
            <p className="characterComicDescription">{characterComic.description}</p>
          </div>
            </div>
 
         ))}
            </div>
            </div>
          );
          }

// Export du composant CharacterComics pour pouvoir l'utiliser ailleurs
export default CharacterComics;
