// backend/server.js
require('dotenv').config(); // Pour charger les variables d'environnement
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Définir un port (ex: 5000)

// Middleware
app.use(cors());
app.use(express.json()); // Pour analyser les requêtes JSON

// Route de base (Test)
app.get('/api', (req, res) => {
    res.send('API Node.js/Express fonctionne !');
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});