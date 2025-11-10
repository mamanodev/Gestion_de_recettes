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
                        "https://i.ytimg.com/vi/q-tDCe3GYSc/maxresdefault.jpg",
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
                        "https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
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
                        "https://res.cloudinary.com/htt8g4cd/image/upload/w_1920,h_1280,c_lfill,ar_3:2,g_center,f_auto,q_auto/wp/04_24_griot_with_pikliz_hero_photo_nicoschinco_1920x1280",
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
                        "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=90/media/photosV2/ca402aaa-f9c5-4a0b-9097-138490b45a3b-retina-large.jpg",
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
                        "https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/sacks/Margherita-Pizza/Pizza%20Margaretha%20(Recipe%20Page).jpg",
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
                        "https://files.mob-cdn.co.uk/recipes/2024/09/Tagliatelle-Bolognese-Recipe.jpg",
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
                        "https://www.lunionsuite.com/wp-content/uploads/2017/01/a54a2c36691f6179a9530271c18d9fca.jpg",
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
                        "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=90/media/photosV2/04bdf78f-f3f6-4db4-9e7c-489ad76d14da-retina-large.jpg",
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
