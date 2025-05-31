// Établit une connexion à une base de données MongoDB

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connectée avec succès");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error.message);
    process.exit(1); // Sortie du processus avec un code d'erreur
  }
};

export default connectDB;