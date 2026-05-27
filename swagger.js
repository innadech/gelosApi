// ============================================================
// swagger.js — Session 5: API Documentation Configuration
// ============================================================
// Swagger/OpenAPI generates INTERACTIVE documentation for your API.
// Instead of writing docs by hand, we use comments in our code
// and Swagger auto-generates a web page where users can:
//   - See all endpoints
//   - Read what each endpoint does
//   - Try endpoints directly in the browser (!)
//
// TWO PACKAGES WORK TOGETHER:
//   swagger-jsdoc  → reads JSDoc comments from your route files
//                     and builds an OpenAPI specification object
//   swagger-ui-express → takes that spec and renders a web page
//
// The result: visit http://localhost:3000/api-docs and you get
// a full interactive API explorer.

const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    // OpenAPI version (3.0.0 is current standard)
    openapi: '3.0.0',

    // API metadata — shows at the top of the docs page
    info: {
      title: 'Gelos Grocery API',
      version: '1.0.0',
      description:
        'REST API for Gelos Enterprise Grocery Management System. ' +
        'Provides CRUD operations for the orders collection with JWT authentication.',
    },

    // Server URL — where the API is running
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
    ],

    // Security scheme — tells Swagger about our JWT setup
    // This adds an "Authorize" button to the docs page
    // Users can paste their JWT token and test protected endpoints
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token (from POST /api/auth/login)',
        },
      },
    },
  },

  // WHERE to find JSDoc annotations
  // swagger-jsdoc scans these files for /** @swagger ... */ comments
  apis: ['./routes/*.js'],
}

// Build the specification and export it
module.exports = swaggerJsdoc(options)
