// src/pages/AddRecipe.js
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recipes", {
        name,
        ingredients,
        instructions,
        category,
        imageUrl,
      });
      navigate("/recipes");
    } catch (err) {
      setMessage("Erreur lors de l'ajout de la recette");
    }
  };

  return (
    <div className="page-container">
      <h2>Ajouter une recette</h2>
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
          placeholder="Catégorie (ex: Italienne)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image (URL)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Enregistrer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
