import User from "./user.js";
import Recipe from "./recipe.js";

//Définir les relations
User.hasMany(Recipe, {
  foreignKey: "userId",
  as: "recipes",
});

Recipe.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


// Exporter les modèles et la base
export { User, Recipe };
