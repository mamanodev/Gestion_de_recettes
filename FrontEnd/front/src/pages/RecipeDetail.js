import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
`;

const BackButton = styled.button`
  border: 1px solid #cbd5e1;
  background: transparent;
  color: #334155;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.5rem;
`;

const Cover = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

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

  if (!recipe) return <p>Chargement...</p>;

  return (
    <Container>
      {/* Bouton Retour */}
      <BackButton
        onClick={() => navigate(-1)}
        title="Retour"
      >
        Retour
      </BackButton>

      {/* Contenu principal */}
      <Card>
        {recipe.imageUrl && (
          <Cover
            src={
              recipe.imageUrl.startsWith("http")
                ? recipe.imageUrl
                : `http://localhost:3000${recipe.imageUrl}`
            }
            alt={recipe.name}
          />
        )}

        <h2>{recipe.name}</h2>
        <p>
          <strong>Catégorie :</strong> {recipe.category || "Non spéccifiée"}
        </p>
        <p>{recipe.description || "Aucune description disponible."}</p>

        {recipe.ingredients && (
          <>
            <h5>Ingrédients</h5>
            <ul>
              {recipe.ingredients.split(",").map((ing, i) => (
                <li key={i}>{ing.trim()}</li>
              ))}
            </ul>
          </>
        )}

        {recipe.instructions && (
          <>
            <h5>Préparation</h5>
            <p>{recipe.instructions}</p>
          </>
        )}
      </Card>
    </Container>
  );
}
