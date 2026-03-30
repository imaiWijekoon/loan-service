const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Loan Service API',
      version: '1.0.0',
      description: 'API documentation for the Library Loan Service',
    },
    servers: [
      {
        url: 'http://localhost:8083',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
