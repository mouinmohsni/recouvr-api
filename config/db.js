const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // L'URL de connexion utilise les identifiants définis dans votre docker-compose
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/recouvrement?authSource=admin', {

        });

        console.log(`MongoDB Connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion MongoDB : ${error.message}`);
        process.exit(1); // Arrête l'application en cas d'échec
    }
};

module.exports = connectDB;
