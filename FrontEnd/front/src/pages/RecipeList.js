import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import { Trash2, SquarePen, Search } from 'lucide-react';




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
    const value = e.target.value.toLowerCase();
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
      toast.success(`Recette "${selectedRecipe.name}" supprimée avec succès 🗑️`);
    } catch (err) {
      console.error("Erreur de suppression :", err);
      toast.error("Erreur lors de la suppression ");
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="d-flex flex-column justify-content-start gap-3 align-items-center mb-3">
        <span className="text-warning fw-semibold h4">MES RECETTES </span>
        <div className="d-flex align-items-center justify-content-center w-75 gap-3">
          <input
            type="text"
            placeholder="Recherche par nom..."
            value={search}
            onChange={handleSearch}
            className="form-control w-50"
          />
          <button className="btn btn-primary" onClick={handleSearch}><Search /></button></div>
      </div>

      {/* Grille responsive */}
      <div className="row g-4 mt-5">
        {filtered.length > 0 ? (
          filtered.map((r) => (
            <div key={r.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Card
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
                    label: <SquarePen />,
                    type: "link",
                    href: `/recipes/edit/${r.id}`,
                    variant: "warning",
                  },
                  {
                    label: <Trash2 />,
                    onClick: () => handleDeleteClick(r),
                    variant: "danger",
                  },
                ]}
              />
            </div>
          ))
        ) : (
          <p className="text-center">Aucune recette trouvée 🍳</p>
        )}
      </div>

      {/*  Modal de confirmation */}
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Voulez-vous vraiment supprimer la recette "${selectedRecipe?.name}" ?`}
      />
    </div>
  );
}
