import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes");
        setRecipes(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  // Filtrage local par nom ou catégorie
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredData = recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(value) 
    );
    setFiltered(filteredData);
  };

  return (
    <div className="page-container">
      <h2>Mes Recettes</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher une recette par nom..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Liste en grille */}
      <div className="recipe-grid">
        {filtered.map((r) => (
          <div key={r.id} className="recipe-card">
            {r.imageUrl && (
              <img
                src={
                  r.imageUrl.startsWith("http")
                    ? r.imageUrl
                    : `http://localhost:3000${r.imageUrl}`
                }
                alt={r.name}
                className="recipe-img"
              />
            )}
            <div className="recipe-info">
              <h3>{r.name}</h3>
              <p className="category">{r.category}</p>
              <div className="actions">
                <Link to={`/recipes/${r.id}`} className="view-btn">
                  Voir
                </Link>
                <Link to={`/recipes/edit/${r.id}`} className="edit-btn">
                  Éditer
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p style={{ gridColumn: "1 / -1" }}>Aucune recette trouvée 🍳</p>
        )}
      </div>
    </div>
  );
}
