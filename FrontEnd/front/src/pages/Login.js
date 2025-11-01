import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { username, password });
      login(res.data.token, res.data.user);
      navigate("/recipes");
    } catch (err) {
      setMessage("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div>
          <img
            src="/assets/image.webp"
            alt="Login Illustration"
            style={{ maxWidth: "300px", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <h1>
            <span>Recette</span>App
          </h1>

          <h2>Connexion</h2>
          <form onSubmit={handleSubmit} className="">
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

            <button type="submit">Se connecter</button>
          </form>
          <p>{message}</p>
          <p>
            Pas encore de compte ? <Link to="/signup">S'incrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
