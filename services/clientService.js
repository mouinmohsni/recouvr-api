const Client = require('../models/Client');
const Invoice = require('../models/Invoice');
const { updateClientSchema,createClientSchema } = require('../validations/clientValidation');

/**
 * Créer un nouveau client
 */
exports.createClient = async (clientData) => {

    const { error, value } = createClientSchema.validate(clientData);
    if (error) {
        throw new Error(`Données invalides : ${error.details[0].message}`);
    }
    const { email } = value;

    // Vérifier si le client existe déjà avec cet email
    const clientExists = await Client.findOne({ email });
    if (clientExists) {
        throw new Error("Un client avec cet email existe déjà");
    }

    const client = await Client.create(value);
    return client;
};

/**
 * Récupérer tous les clients
 */
exports.getAllClients = async () => {
    return Client.find({ isDeleted: false }).sort({ createdAt: -1 });
};

/**
 * Récupérer un client par son ID
 */
exports.getClientById = async (id) => {
    const client = await Client.findById(id);
    if (!client) {
        throw new Error("Client non trouvé");
    }
    return client;
};

/**
 * modifier les information du client
 */
exports.updateClientById = async (id , data) => {

    const { error, value } = updateClientSchema.validate(data);
    if (error) {
        throw new Error(`Données invalides : ${error.details[0].message}`);
    }

    const client = await Client.findById(id);
    if (!client) {
        throw new Error("Client non trouvé");
    }
        const updatedClient = await Client.findByIdAndUpdate(id, value, {
            new: true,
            runValidators: true
        });

        return updatedClient;
};

/**
 * delete le client par id
 */
exports.deleteClientById = async (id) => {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
        throw new Error("Client non trouvé");
    }
    await Invoice.deleteMany({ client: id })



    return { message: "Client supprimé avec succès" };

};

/**
 * delete soft le client par id
 */
exports.softDeleteClientById = async (id) => {

    const client = await Client.findById(id);
    if (!client || client.isDeleted) {
        throw new Error("Client non trouvé");
    }

    client.isDeleted = true;
    client.deletedAt = new Date();
    await client.save();

    // On met à jour toutes les factures de ce client
    await Invoice.updateMany(
        { client: id },
        { isDeleted: true, deletedAt: new Date() }
    );

    return { message: "Client et ses factures supprimés (Soft Delete)" };
};
