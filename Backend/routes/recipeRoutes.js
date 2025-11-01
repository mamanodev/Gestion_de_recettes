import { Router } from 'express';
import {
  createRecipe,
  getMyRecipes,
  getRecipeByIdForOwner,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';
import { protect, ensureRecipeOwner } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect); // tout est protégé

router.get('/', getMyRecipes);
router.post('/', createRecipe);
router.get('/:id', ensureRecipeOwner, getRecipeByIdForOwner);
router.put('/:id', ensureRecipeOwner, updateRecipe);
router.delete('/:id', ensureRecipeOwner, deleteRecipe);

export default router;
