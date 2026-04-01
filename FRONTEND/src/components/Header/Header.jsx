// Importe le composant Link pour naviguer sans rechargement de la page
// et useNavigate pour effectuer une navigation
import { Link, useNavigate } from "react-router-dom";
// Import du logo Marvel
import logoMarvel from "../../assets/images/logo-marvel.jpg";
// Importe le fichier css du composant Header
import "./Header.css";

{/* Déclare le composant Header et récupère les props : */} 
{/* - isConnected (état de connexion) */} 
{/* - handleToken (fonction pour gérer le token) */} 
const Header = ({ isConnected, handleToken }) => {
    // Crée la fonction navigate pour effectuer des redirections
  const navigate = useNavigate();

  // Fonction appelée lors de la déconnexion de l'utilisateur
  const handleLogout = () => {
    handleToken(null); // Supprime le token → déconnecte l'utilisateur
    navigate("/login"); // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <header>
      <div>
        {/* Logo Marvel */}
        <img src={logoMarvel} alt="Logo Marvel" />
      </div>

      <div>
        <nav>
          {/* Lien vers la page des personnages */}
          <Link to="/characters" className="menu">
            Personnages
          </Link>
          {/* Lien vers la page des comics */}
          <Link to="/comics" className="menu">
            Comics
          </Link>
          {/* Lien vers la page des favoris */}
          <Link to="/favorites" className="menu">
            Favoris
          </Link>
          {/* Vérifie si l'utilisateur est connecté */} 
          {isConnected ? (
              // Si connecté → affiche le bouton de déconnexion
            <button onClick={handleLogout} className="logout">Se déconnecter</button>
          ) : (
              // Sinon (non connecté) → affiche les liens de connexion et d'inscription
            <>
              {/* Lien vers la page de connexion */}
              <Link to="/login" className="menu">
                Se connecter
              </Link>
              {/* Lien vers la page d'inscription */}
              <Link to="/signup" className="menu">
                S'inscrire
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Export du composant Header
export default Header;
