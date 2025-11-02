import { Sequelize } from "sequelize";
import Recipe from "../models/recipe.js";

export const seedDatabaseIfEmpty = async () => {
    try {
        const count = await Recipe.count();

        if (count === 0) {
            console.log("⚙️ Base vide : insertion des recettes initiales...");

            await Recipe.bulkCreate([
                {
                    name: "Pate Kòde (Fried Haitian Patties)",
                    ingredients: "tytyty",
                    instructions: "ytyt",
                    category: "Haïti",
                    imageUrl:
                        "https://i.ytimg.com/vi/bfUOGtbGemg/maxresdefault.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Spaghetti Bolognese",
                    ingredients:
                        "Ragù alla Bolognese is a traditional Italian meat sauce hailing from Bologna...",
                    instructions:
                        "GROUND BEEF 300g, PANCETTA 150g, TOMATO PASSATA 300g, ...",
                    category: "Italien",
                    imageUrl:
                        "https://static.fanpage.it/wp-content/uploads/sites/22/2021/06/spaghetti-bolognese.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Haitian Griot and Pikliz",
                    ingredients: "hfh",
                    instructions: "fdhgfdh",
                    category: "Fritay",
                    imageUrl:
                        "https://i.ytimg.com/vi/GjpnsqYOv_g/maxresdefault.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Poisson et Plantain",
                    ingredients: "dfghghd",
                    instructions: "gfdg",
                    category: "Plat Haïtien",
                    imageUrl:
                        "https://i.pinimg.com/originals/71/14/d9/7114d90d509d311070e0e88f5a5456df.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Pizza",
                    ingredients:
                        "With a good whole grain crust and lots of veggie toppings, homemade pizza is a filling meal...",
                    instructions:
                        "Summer Corn Salad – Save some peaches, basil, and red peppers! Orzo Salad – Save some basil and mint...",
                    category: "Italien",
                    imageUrl:
                        "https://images7.alphacoders.com/596/thumb-1920-596343.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Tagliatelle",
                    ingredients:
                        "Tagliatelle with vegetables with Boursin® Cuisine Garlic & Fine Herbs",
                    instructions:
                        "400g of fresh tagliatelle, 100g of spinach shoots, 200g of mushrooms, 15 cherry tomatoes...",
                    category: "Cuisine Garlic & Fine Herbs",
                    imageUrl:
                        "https://www.boursin.ca/wp-content/uploads/2023/02/Brs-Pates_banner.png",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Riz Djondjon Haïtien",
                    ingredients:
                        "1½ tasse de djon djon, 1 tasse de riz, 2 tasses d’eau, 1 tasse de petit pois de lima...",
                    instructions:
                        "ÉTAPE 1 – Préparer et nettoyer le Djondjon... ÉTAPE 2 – Laisser tremper... ÉTAPE 3 – Recueillir l’eau de Djondjon...",
                    category: "Plat Haïtien",
                    imageUrl:
                        "https://gleepad.com/wp-content/uploads/2024/02/riz-djondjon-768x768.png",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Fritay Friday",
                    ingredients: "Platain, Acra, Griot, Pikliz",
                    instructions:
                        "It’s Fritay Friday!! Come try a plate or a platter to share. To Go only.",
                    category: "Caribbean",
                    imageUrl:
                        "https://i.pinimg.com/originals/ec/1f/14/ec1f1403188d1fffc5a7bc033d985005.jpg",
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);

            console.log("✅ Recettes initiales insérées !");
        } else {
            console.log("✅ La base contient déjà des recettes, seed ignoré.");
        }
    } catch (err) {
        console.error("❌ Erreur lors du seed :", err);
    }
};
