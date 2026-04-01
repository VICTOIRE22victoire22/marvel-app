// Importe le composant Link pour naviguer sans rechargement de la page
// et useNavigate pour effectuer une navigation
import { Link, useNavigate } from "react-router-dom";
// Importe useState pour gérer les états du composant
import { useState } from "react";
// importe axios pour faire des requêtes HTTP vers une API
import axios from "axios";
// Importe le fichier css du composant Login
import "./Login.css";

// Déclare le composant Login et récupère la fonction handleToken en props
const Login = ({ handleToken }) => {
  // Crée la fonction navigate pour rediriger vers une autre page
  const navigate = useNavigate();

  // State pour stocker l'email saisi
  const [email, setEmail] = useState("");
  // State pour stocker le mot de passe saisi
  const [password, setPassword] = useState("");
  // State pour stocker un message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction appelée lorsque l'utilisateur modifie l'email
  const handleEmailChange = (event) => {
    const value = event.target.value; // Récupère la valeur du champ
    setEmail(value); // Met à jour le state email
  };

  // Fonction appelée lorsque l'utilisateur modifie le mot de passe
  const handlePasswordChange = (event) => {
    const value = event.target.value; // Récupère la valeur du champ
    setPassword(value); // Met à jour le state password
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoie une requête POST à l'API avec email et password
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
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
    <div className="container">
      {/* Titre de la page */}
      <h1>Connexion</h1>
      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
        <label htmlFor="email">Email</label>
        <input
          placeholder="Saisir votre email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {/* Champ mot de passe */}
        <label htmlFor="password">Mot de passe</label>
        <input
          placeholder="Saisir votre mot de passe"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* Bouton de soumission */}
        <button type="submit">Se connecter</button>
        {/* Lien vers la page d'inscription */}
        <Link to="/signup">
          Vous n'êtes pas encore inscrit ? Remplissez le formulaire
          d'inscription{" "}
        </Link>
      </form>
      {/* Affiche le message d'erreur s'il existe */}
      {errorMessage && <p className="error">{errorMessage}</p>}
</div>
  );
};

// Export du composant Login pour pouvoir l'utiliser ailleurs
export default Login;
