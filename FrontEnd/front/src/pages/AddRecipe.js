import { useState } from "react";
import styled from "styled-components";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";

const Container = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.2rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

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
    <Container>
      <Title>Ajouter une recette</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nom de la recette"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Textarea
          rows={4}
          placeholder="Ingrédients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <Textarea
          rows={4}
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Catégorie (ex: Italienne)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Image (URL)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button type="submit">Enrégistrer</Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  );
}

