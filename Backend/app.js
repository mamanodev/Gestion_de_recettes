import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import { sequelize } from './config/database.js';  
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

//Initialisation de l'application Express
const app = express();

//Configuration de CORS
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type, Authorization'],
};
//Les Middlewares
app.use(cors(corsOptions));
app.use(express.json());


//Les Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes',  recipeRoutes);


//Gestion des erreurs
app.use(notFound);
app.use(errorHandler);
//le port d'ecoute
const PORT = process.env.PORT || 3000;


//Synchronisation des modeles avec la base de donnees et demarrage du serveur


async function syncDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion réussie à la base MySQL !");
    await sequelize.sync(); 
    console.log("✅ Tables créées avec succès !");
    app.listen(PORT, () => console.log(`🤖 Le serveur est lancé sur  http://localhost:${PORT}`))
  } catch (error) {
    console.error("❌ Erreur :", error);
  }
//   } finally {
//     await sequelize.close();
//   }
}

syncDB();
