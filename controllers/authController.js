
const {registerUser,generateToken ,loginUser} = require("../services/authService");

/**
 * @desc    S'inscrire (Créer un nouvel utilisateur)
 * @route   POST /api/auth/register
 */
exports.register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        const token = generateToken(user._id);


        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Se connecter
 * @route   POST /api/auth/login
 */
exports.login = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        const token = generateToken(user._id);

            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: token
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

