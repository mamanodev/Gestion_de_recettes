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

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="w-50">
          <img
            src="/assets/login.jpg"
            alt="Signup"
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="d-flex flex-column  w-50 ms-4 px-4 pb-5 pt-3 rounded">
          <span className=" mb-0 h1 fw-bold fs-1">
            <span className="text-warning">RECETTE</span>APP
          </span>

          <h4 className="mt-5">S'inscrire</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              S'inscrire
            </button>
          </form>

          <p className="text-danger">{message}</p>
          <p className="pb-2">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
