import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";

const Container = styled.div`
  max-width: 1400px;
  margin: 2rem ;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;


const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 1400px;
`;

const Grid = styled.div`
 display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: 1.25rem;
margin-top: 1rem;

`;

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  // Charger les recettes
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

  // Filtrage
  const handleSearch = (e) => {
    const value = (e?.target?.value ?? search).toLowerCase();
    setSearch(value);
    setFiltered(recipes.filter((r) => r.name.toLowerCase().includes(value)));
  };

  // Ouverture du modal avant suppression
  const handleDeleteClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    try {
      await api.delete(`/recipes/${selectedRecipe.id}`);
      setFiltered(filtered.filter((r) => r.id !== selectedRecipe.id));
      setShowModal(false);
      toast.success(`Recette "${selectedRecipe.name}" supprimé avec succès !`);
    } catch (err) {
      console.error("Erreur de suppression :", err);
      toast.error("Erreur lors de la suppression ");
    }
  };

  return (
    <Container>
      <Header>


        <SearchRow>
          <Input
            type="text"
            placeholder="Recherche par nom..."
            value={search}
            onChange={handleSearch}
            style={{ maxWidth: '480px' }}
          />
        </SearchRow>
      </Header>

      <Grid>

        {filtered.length > 0 ? (
          filtered.map((r) => (
            <Card
              key={r.id}
              image={
                r.imageUrl
                  ? r.imageUrl.startsWith("http")
                    ? r.imageUrl
                    : `http://localhost:3000${r.imageUrl}`
                  : "/assets/placeholder.jpg"
              }
              title={r.name}
              text={r.category || "Sans catégorie"}
              onClick={() => navigate(`/recipes/${r.id}`)}
              buttons={[
                {
                  label: "Modifier",
                  type: "link",
                  href: `/recipes/edit/${r.id}`,
                  variant: "warning",
                },
                {
                  label: "Supprimer",
                  onClick: () => handleDeleteClick(r),
                  variant: "danger",
                },
              ]}
            />
          ))
        ) : (
          <p>Aucune recette trouvée</p>
        )}
      </Grid>

      {/*  Modal de confirmation */}
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Voulez-vous vraiment supprimer la recette "${selectedRecipe?.name}" ?`}
      />
    </Container>
  );
}
