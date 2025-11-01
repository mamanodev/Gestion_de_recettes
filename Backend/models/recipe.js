import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class Recipe extends Model {}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    instructions: {
        type: DataTypes.TEXT,   
        allowNull: false,
    },
    category:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: true,
});


User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes', onDelete: 'CASCADE' });
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'user' });