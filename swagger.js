const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Meta Information about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Alama App API',
            version: '1.0.0',
            description: 'API documentation for the Alama App API',
        },
        servers: [
            {
                url: 'http://localhost:4000/',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
