// Définit un modèle Mongoose pour un itilisateur dans une apllication LinkTree 

import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    label: String,
    url: String,
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user '},
    description: { type: String, default: '' },
    links: [linkSchema],
    avatar: { type: String, default: '' },
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt automatiquement

export default mongoose.model('User', userSchema); // Exporte le modèle User
