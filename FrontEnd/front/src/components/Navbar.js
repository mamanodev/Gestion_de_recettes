import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CircleUserRound } from 'lucide-react';



export default function Navbar() {
  const { token, logout, user } = useContext(AuthContext); // 👈 récupère l'utilisateur
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-2">

        <Link to="/recipes" className="text-decoration-none">
          <span className="navbar-brand mb-0 h1 fw-bold fs-4">
            <span className="text-warning">RECETTE</span>APP
          </span>
        </Link>


        <div className="d-flex align-items-center gap-3">
          {token && (
            <>
              <Link to="/recipes" className="text-decoration-none text-dark ">
                Recettes
              </Link>
              <Link to="/recipes/add" className="text-decoration-none text-dark ">
                Ajouter recette
              </Link>


              {user && (
                <div className="d-flex align-items-center ms-5 text-secondary">
                  <CircleUserRound />
                  <span className="fw-semibold text-secondary">{user.username}</span>
                </div>
              )}


              <button
                onClick={handleLogout}
                className="btn btn-outline-primary btn-sm ms-2"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
