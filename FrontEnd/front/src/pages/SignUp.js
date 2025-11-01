import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", { username, password });
      login(res.data.token, res.data.user);
      navigate("/recipes");
    } catch (err) {
      setMessage("Erreur : utilisateur déjà existant ou invalide.");
    }
  };

  return (<div className="auth-page">
    <div className="auth-container">
         <div>
  <img
    src="/assets/login.jpg"
    alt="Login Illustration"
    style={{ maxWidth: "300px", marginBottom: "1rem" }}
  />
</div>
<div>
       <h1><span>Recette</span>App</h1> 
      <h2>S'incrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>{message}</p>
      <p>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
    </div>
    </div>
  );
}
