/* jshint esversion: 11 */

require('dotenv').config(); // Load environment variables from .env file
require("app-module-path").addPath(__dirname);

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const cors = require('cors');

// const { authenticate } = require('src/middlewares/authMiddleware');
const userSchema = require('src/schemas/user-schema.js');
const userResolver = require('src/resolvers/user-resolver.js');
const db = require('src/config/db');

const app = express();

// Middleware: Parse incoming requests
app.use(bodyParser.json());

app.use(cors());

// Test Database Connection
db.getConnection()
    .then(() => console.log('Connected to MySQL database'))
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit if DB connection fails
    });

// GraphQL Schema and Resolvers
const schema = makeExecutableSchema({
    typeDefs: userSchema,
    resolvers: userResolver,
});

// Authentication Middleware (Optional for Public APIs)
// app.use('/graphql', authenticate);

// app.use((req, res, next) => {
//     console.log("🚀 ~ app.use ~ req:", req.body)
    // next()
// })

// GraphQL Endpoint
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true, // Enable GraphiQL in development
    })
);

// Health Check Endpoint
app.get('/', (req, res) => {
    res.status(200).send('User Management Service is up and running!');
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;