const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Le nom d'utilisateur est obligatoire"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['agent', 'manager', 'admin'],
        default: 'agent'
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Middleware pour hacher le mot de passe avant l'enregistrement
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe lors de la connexion
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
