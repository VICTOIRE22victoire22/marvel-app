// Import du fichier css
import "./App.css"
// Import de react-router qui gère la navigation entre les pages
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Importe useState pour gérer les états du composant
import { useState } from "react";
// Import des composants
import Header from "./components/Header/Header";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import CharacterComics from "./pages/CharacterComics/CharacterComics";
import Favorites from "./pages/Favorites/Favorites"
import Cookies from "js-cookie";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// Déclaration du composant principal
function App() {
    // State qui indique si l'utilisateur est connecté ou non
  // Vérifie si un token est présent dans les cookies
    const [isConnected, setIsConnected] = useState(
  Cookies.get("userToken") ? true : false
);
  // Fonction pour gérer le token (connexion / déconnexion)
    const handleToken = (token) => {
          // Si un token est fourni → connexion
    if (token) {
      Cookies.set("userToken", token); // Enregistre le token dans les cookies
        setIsConnected(true); // Met à jour l'état connecté
      } else {
      // Sinon → déconnexion
        Cookies.remove("userToken");  // Supprime le token des cookies
        setIsConnected(false);  // Met à jour l'état déconnecté
    }
  };

  return (
    
    // Gère la navigation entre les pages
    <Router>
      <div className="container">
        {/* Composant affiché sur toutes les pages */} 
        <Header isConnected={isConnected} handleToken={handleToken} />
        <main>
          {/* Routes pour la navigation entre les pages */}
          <Routes>
            <Route path="/" element={<Navigate to="/Characters" />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/comics" element={<Comics />} />
            {/* Route pour afficher la liste des comics d'un personnages grâce à son id */}
            <Route path="/characters/:id" element={<CharacterComics />} />
            {/* // Route vers la page des favoris : */}
{/* - si l'utilisateur est connecté → affiche le composant Favorites */}
{/* - sinon → redirige vers la page de connexion (/login) */}
            <Route path="/favorites" element={isConnected ? <Favorites /> : <Navigate to="/login" />}/>
            {/* Route vers la page de connexion : */} 
            {/* - si l'utilisateur est déjà connecté → redirige vers /favorites */}
            {/* - sinon → affiche le composant Login en lui passant handleToken */}
            <Route path="/login" element={
                isConnected ? <Navigate to="/favorites" /> : <Login handleToken={handleToken} /> } />
            <Route path="/signup" element={<Signup
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              handleToken={handleToken}
            /> } />
            {/* Redirige vers la page d'accueil si l'URL n'existe pas */} 
            <Route path="*" element={
            <div className="container">Vous n'êtes pas censés être ici</div>
        } 
        />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Export du composant App
export default App;
