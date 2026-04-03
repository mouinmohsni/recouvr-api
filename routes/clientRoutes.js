const express = require('express');
const router = express.Router();
const {
    createClient,
    getClients,
    getClient,
    updateClient,
    softDeleteClient,
    deleteClient
} = require('../controllers/clientController');

/**
 * @swagger
 * tags:
 *   name : Clients
 *   description : Gestion des clients de l'entreprise
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *   get:
 *     summary: Lister tous les clients actifs
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste des clients récupérée
 */
router.route('/')
    .post(createClient)
    .get(getClients);

/**
 * @swagger
 * /api/clients/{id} :
 *   get:
 *     summary: Obtenir un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du client
 *       404:
 *         description: Client non trouvé
 *   put:
 *     summary: Modifier les informations d'un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client mis à jour
 *   delete:
 *     summary: Supprimer définitivement un client (Hard Delete)
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client supprimé définitivement
 */
router.route('/:id')
    .get(getClient)
    .put(updateClient)
    .delete(deleteClient);

/**
 * @swagger
 * /api/clients/{id}/soft-delete:
 *   patch:
 *     summary: Archiver un client (Soft Delete)
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client archivé avec succès
 */
router.patch('/:id/soft-delete', softDeleteClient);

module.exports = router;
