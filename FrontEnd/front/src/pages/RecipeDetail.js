import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  // Charger la recette par ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container mt-5">
      {/* Bouton Retour */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)} // 👈 Retour à la page précédente
        title="Retour"
      >
        ← Retour
      </button>

      {/* Contenu principal */}
      <div className="card shadow-sm p-4">
        {recipe.imageUrl && (
          <img
            src={
              recipe.imageUrl.startsWith("http")
                ? recipe.imageUrl
                : `http://localhost:3000${recipe.imageUrl}`
            }
            alt={recipe.name}
            className="card-img-top mb-4 rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}

        <h2 className="card-title mb-3">{recipe.name}</h2>
        <p className="text-muted mb-2">
          <strong>Catégorie :</strong> {recipe.category || "Non spécifiée"}
        </p>
        <p className="card-text">{recipe.description || "Aucune description disponible."}</p>

        {recipe.ingredients && (
          <>
            <h5 className="mt-4">Ingrédients</h5>
            <ul>
              {recipe.ingredients.split(",").map((ing, i) => (
                <li key={i}>{ing.trim()}</li>
              ))}
            </ul>
          </>
        )}

        {recipe.instructions && (
          <>
            <h5 className="mt-4">Préparation</h5>
            <p>{recipe.instructions}</p>
          </>
        )}
      </div>
    </div>
  );
}
