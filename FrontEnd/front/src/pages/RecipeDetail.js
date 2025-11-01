// src/pages/RecipeDetail.js
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setMessage("Recette introuvable ou vous n'êtes pas propriétaire.");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette recette ?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      navigate("/recipes");
    } catch (err) {
      setMessage("Erreur lors de la suppression");
    }
  };

  if (!recipe) return <p>{message || "Chargement..."}</p>;

  return (
    <div className="page-container">
      <h2>{recipe.name}</h2>
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
      )}
      <p><strong>Catégorie :</strong> {recipe.category || "—"}</p>
      <h4>Ingrédients</h4>
      <p>{recipe.ingredients}</p>
      <h4>Instructions</h4>
      <p>{recipe.instructions}</p>

      <div style={{ marginTop: "1rem" }}>
        <Link to={`/recipes/edit/${recipe.id}`} className="btn-secondary">
          Modifier
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
          Supprimer
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
