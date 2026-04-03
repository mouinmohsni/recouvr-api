const clientService = require('../services/clientService');

/**
 * @desc    Créer un nouveau client
 * @route   POST /api/clients
 */
exports.createClient = async (req, res) => {
    try {
        const client = await clientService.createClient(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Lister tous les clients (non supprimés)
 * @route   GET /api/clients
 */
exports.getClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Obtenir un client par ID
 * @route   GET /api/clients/:id
 */
exports.getClient = async (req, res) => {
    try {
        const client = await clientService.getClientById(req.params.id);
        res.json(client);
    } catch (error) {
        if (error.name === 'CastError' || error.message === "Client non trouvé") {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

/**
 * @desc    Modifier un client
 * @route   PUT /api/clients/:id
 */
exports.updateClient = async (req, res) => {
    try {
        const client = await clientService.updateClientById(req.params.id, req.body);
        res.json(client);
    } catch (error) {
        const statusCode = error.message === "Client non trouvé" ? 404 : 400;
        res.status(statusCode).json({ message: error.message });
    }
};

/**
 * @desc    Suppression logique (Soft Delete)
 * @route   PATCH /api/clients/:id/soft-delete
 */
exports.softDeleteClient = async (req, res) => {
    try {
        const result = await clientService.softDeleteClientById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * @desc    Suppression définitive (Hard Delete) - Réservé aux Admins normalement
 * @route   DELETE /api/clients/:id
 */
exports.deleteClient = async (req, res) => {
    try {
        const result = await clientService.deleteClientById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};