// src/pages/EditRecipe.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        const r = res.data;
        setName(r.name);
        setIngredients(r.ingredients);
        setInstructions(r.instructions);
        setCategory(r.category || "");
        setImageUrl(r.imageUrl || "");
      } catch (err) {
        setMessage("Impossible de charger la recette");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/recipes/${id}`, {
        name,
        ingredients,
        instructions,
        category,
        imageUrl,
      });
      navigate("/recipes");
    } catch (err) {
      setMessage("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="page-container">
      <h2>Modifier la recette</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nom de la recette"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          rows={4}
          placeholder="Ingrédients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <textarea
          rows={4}
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image (URL)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Mettre à jour</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
