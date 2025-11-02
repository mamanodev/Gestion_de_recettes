import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ import du toast
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Connecté avec succès ! Bienvenue 👋", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/recipes");
    } catch (err) {
      toast.error("Echec de la connexion ! ", {
        position: "top-right",
        autoClose: 3000,
      });
      setMessage("Nom d'utilisateur ou mot de passe incorrect.");

    }
  };
  return (
    <div className="auth-page">
      <div className="auth-container ">
        <div className="w-50">
          <img
            src="/assets/image.webp"
            alt="image1"
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="d-flex flex-column w-50  h-100 ms-4 px-4 pb-5 pt-3 rounded">
          <span className=" mb-0 h1 fw-bold fs-1">
            <span className="text-warning">RECETTE</span>APP
          </span>

          <h4 className="mt-5 ps-0 fw-semibold fs-5 text-muted">Connexion</h4>
          <form onSubmit={handleSubmit} className="">
            <div class="mb-2">
              <input type="text" class="form-control" id="username" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
          </form>
          <p className="text-danger">{message}</p>
          <p className="pb-3">
            Pas encore de compte ? <Link to="/signup">S'incrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
