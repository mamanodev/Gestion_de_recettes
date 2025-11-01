import{ Recipe } from '../models/index.js';
export const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category, imageUrl } = req.body;
    if (!name?.trim() || !ingredients?.trim() || !instructions?.trim())
      return res.status(400).json({ message: 'Champs requis manquants' });

    const recipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      category: category || null,
      imageUrl: imageUrl || null,
      userId: req.user.id
    });

    res.status(201).json(recipe);
  } catch (e) {
    next(e);
  }
};

// Liste des recettes DU user connecté
export const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({ where: { userId: req.user.id }, order: [['id', 'DESC']] });
    res.json(recipes);
  } catch (e) {
    next(e);
  }
};

export const getRecipeByIdForOwner = async (req, res) => {
  // req.recipe est injectée par ensureRecipeOwner
  res.json(req.recipe);
};

export const updateRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category, imageUrl } = req.body;
    await req.recipe.update({
      name: name ?? req.recipe.name,
      ingredients: ingredients ?? req.recipe.ingredients,
      instructions: instructions ?? req.recipe.instructions,
      category: category ?? req.recipe.category,
      imageUrl: imageUrl ?? req.recipe.imageUrl
    });
    res.json(req.recipe);
  } catch (e) {
    next(e);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    await req.recipe.destroy();
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
