// // const swaggerJSDoc = require('swagger-jsdoc');
// // const swaggerUi = require('swagger-ui-express');

// // // Basic Meta Information about our API
// // const options = {
// //     definition: {
// //         openapi: '3.0.0',
// //         info: {
// //             title: 'Alama App API',
// //             version: '1.0.0',
// //             description: 'API documentation for the Alama App API',
// //         },
// //         servers: [
// //             {
// //                 // url: 'http://localhost:4000/',
// //                 url: 'https://alama-api.vercel.app/',
// //             },
// //         ],
// //     },
// //     apis: ['./routes/*.js', './models/*.js'], 
// // };

// // const swaggerSpec = swaggerJSDoc(options);

// // const setupSwagger = (app) => {
// //     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// // };

// // module.exports = setupSwagger;






// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import swaggerUiDist from 'swagger-ui-dist';
// import path from 'path';


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
//                 url: 'https://alama-api.vercel.app/',
//                 description: "My API Documentation",
//             },
//         ],
//     },
//     // apis: ['./routes/*.js', './models/*.js'], 
//     apis: ["src/**/*.js"],
// };

// const swaggerSpec = swaggerJSDoc(options);

// // const setupSwagger = (app) => {
// //     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
// //         swaggerOptions: {
// //             url: '/swagger.json' 
// //         },
// //         customCssUrl: `${swaggerUiDist.getAbsoluteFSPath()}/swagger-ui.css`,
// //         customJsUrl: `${swaggerUiDist.getAbsoluteFSPath()}/swagger-ui-bundle.js`,
// //     }));
// // };

// const setupSwagger = (app) => {
//     const specs = swaggerJSDoc(options);
//     app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }));

//     app.get('/swagger.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(specs);
//     });
// };

// export default setupSwagger;







// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express'); // Import swagger-ui-express

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "API Documentation",
//             version: "1.0.0",
//             description: "API Documentation for Alama App",
//         },
//         servers: [
//             {
//                 url: "http://localhost:4000",
//             },
//         ],
//     },
//     apis: ["./routes/*.js"], // Path to the API docs
// };

// const swaggerSpec = swaggerJsDoc(options);

// function setupSwagger(app) {
//     app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//     app.get('/swagger.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(swaggerSpec);
//     });
// }

// module.exports = setupSwagger;












const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Documentation for Alama App",
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL || "http://localhost:4000",
            },
        ],
    },
    apis: [path.join(__dirname, 'routes/*.js')], // Adjust path as necessary
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = setupSwagger;
