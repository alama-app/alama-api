// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// // Basic Meta Information about our API
// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Alama App API',
//             version: '1.0.0',
//             description: 'API documentation for the Alama App API',
//         },
//         servers: [
//             {
//                 // url: 'http://localhost:4000/',
//                 url: 'https://alama-api.vercel.app/',
//             },
//         ],
//     },
//     apis: ['./routes/*.js', './models/*.js'], 
// };

// const swaggerSpec = swaggerJSDoc(options);

// const setupSwagger = (app) => {
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

// module.exports = setupSwagger;






const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerUiDist = require('swagger-ui-dist');
const path = require('path');


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
                url: 'https://alama-api.vercel.app/',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            url: '/swagger.json' 
        },
        customCssUrl: `${swaggerUiDist.getAbsoluteFSPath()}/swagger-ui.css`,
        customJsUrl: `${swaggerUiDist.getAbsoluteFSPath()}/swagger-ui-bundle.js`,
    }));
};

module.exports = setupSwagger;
