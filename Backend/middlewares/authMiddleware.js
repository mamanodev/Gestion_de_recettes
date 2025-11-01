import jwt from 'jsonwebtoken';
import { User, Recipe } from '../models/index.js';

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // on a besoin du password seulement pour la vérif (pas ici), donc scope par défaut suffit
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur invalide' });

    req.user = user; // attach user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
};

// Vérifie que la recette appartient au user connecté
export const ensureRecipeOwner = async (req, res, next) => {
  try {
    const { id } = req.params; // id de la recette
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: 'Recette introuvable' });
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé (propriété)' });
    }
    req.recipe = recipe;
    next();
  } catch (e) {
    next(e);
  }
};
