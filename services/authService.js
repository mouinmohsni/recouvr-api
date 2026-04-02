const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.registerUser = async (userData) => {
    const { username, password, role } = userData;

    const userExists = await User.findOne({ username });
    if (userExists) {
        throw new Error("Cet utilisateur existe déjà");
    }

    const user = await User.create({ username, password, role });
    return user;
};

exports.loginUser =async (userData)=>{
    const { username, password } = userData;

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
    }else{
        const isPasswordCorrect = await user.matchPassword(password);

        if (isPasswordCorrect) {
            return user
        }else{
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }
    }
}

exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};