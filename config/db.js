// Établit une connexion à une base de données MongoDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/LinkTree", {
      useNewUrlParser: true, // Utilisation de l'URL de connexion de MongoDB
      useUnifiedTopology: true, // Utilisation de la nouvelle topologie de MongoDB
    });
    console.log("MongoDB connectée avec succès");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error.message);
    process.exit(1); // Sortie du processus avec un code d'erreur
  }
};

export default connectDB;