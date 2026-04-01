// Importe useState pour gérer les états du composant
import { useState } from "react";
// Importe le composant useNavigate pour effectuer une navigation
import { useNavigate } from "react-router-dom";
// importe axios pour faire des requêtes HTTP vers une API
import axios from "axios";
// Importe le fichier css du composant Signup
import "./Signup.css";

// Déclare le composant Signup et récupère la fonction handleToken en props
const Signup = ({ handleToken}) => {
  // Crée la fonction navigate pour rediriger vers une autre page
  const navigate = useNavigate();

  // State pour stocker l'email saisi
  const [email, setEmail] = useState("");
  // State pour stocker le nom d'utilisateur saisi
  const [username, setUserName] = useState("");
  // State pour stocker le mot de passe saisi
  const [password, setPassword] = useState("");
  // State pour stocker un message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  // Fonction appelée lorsque l'utilisateur modifie l'email
  const handleEmailChange = event => {
    const value = event.target.value; // Récupère la valeur du champ
    setEmail(value); // Met à jour le state email
  };

  // Fonction appelée lorsque l'utilisateur modifie le nom
  const handleUsernameChange = event => {
    const value = event.target.value; // Récupère la valeur du champ
    setUserName(value); // Met à jour le state userName
  };

  // Fonction appelée lorsque l'utilisateur modifie le mot de passe
  const handlePasswordChange = event => {
  const value = event.target.value; // Récupère la valeur du champ
  setPassword(value); // Met à jour le state password
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault(); // Empêche le rechargement de la page
        try {
              // Envoie une requête POST à l'API avec email, userName et password
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                }
            );
      // Si un token est renvoyé
if (response.data.token) {
  handleToken(response.data.token); // Sauvegarde le token (connexion)
  navigate("/favorites"); // Redirige vers la page favoris
}
                          } catch (error) {
                                  // Si l'erreur vient du serveur
              if (error.response) {
                setErrorMessage(error.response.data.message); // Affiche le message d'erreur
              } else {
                console.log(error); // Sinon affiche l'erreur dans la console
              }
            }  
};

  return (
    <div className="container-signup">
            {/* Titre de la page */}
      <h1>Inscription</h1>
            {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit}>
                {/* Champ email */}
        <label htmlFor="email">Email</label>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
                {/* Champ nom d'utilisateur */}
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
                {/* Champ mot de passe */}
        <label htmlFor="password">Mot de passe</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
                {/* Bouton de soumission */}
        <button type="submit">S'inscrire</button>
      </form>
      {/* Affiche un message d'erreur uniquement si errorMessage contient une valeur */}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

// Export du composant Signup pour pouvoir l'utiliser ailleurs
export default Signup;
