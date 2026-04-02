const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recouvra+ API',
            version: '1.0.0',
            description: 'API de gestion du recouvrement de factures impayées',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // On indique à Swagger d'aller lire les commentaires dans tous les fichiers du dossier routes
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options );

// On exporte une fonction simple pour configurer l'app
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('📖 Documentation Swagger disponible sur http://localhost:3000/api-docs' );
};

module.exports = setupSwagger;
