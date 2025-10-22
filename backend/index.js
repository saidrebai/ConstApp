// backend/server.js
require("dotenv").config(); // Pour charger les variables d'environnement
const express = require("express");
const connection = require("./db");
const cors = require("cors");
const medecinRoutes = require("./routes/medecinRouters");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080; // Définir un port (ex: 5000)

//database connection
connection();

// Middleware
app.use(cors());
app.use(express.json()); // Pour analyser les requêtes JSON
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/medecinRouters", medecinRoutes);
// Route de base (Test)
app.get("/api", (req, res) => {
  res.send("API Node.js/Express fonctionne !");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
