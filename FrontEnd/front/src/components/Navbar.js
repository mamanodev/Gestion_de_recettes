import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/recipes" className="logo">
       <h1><span>Recette</span>App</h1> 
        </Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <Link to="/recipes">Recettes</Link>
            <Link to="/recipes/add">Ajouter recette</Link>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            {/* <Link to="/login">Connexion</Link>
            <Link to="/signup" className="primary-link">
              Inscription
            </Link> */}
          </>
        )}
      </div>
    </nav>
  );
}