import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';  


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
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//le port d'ecoute
const PORT = process.env.PORT || 3000;


//Connexion a la base de donnees et demarrage du serveur
(async()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('👌 La connection a la base de donnees reussie.');
        app.listen(PORT, () => console.log(`Le serveur est lancé sur  http://localhost:${PORT}`))
    } catch (error) {
       console.error('❌ Unable to connect to the database:', error);  
       process.exit(1); 
    }
})();