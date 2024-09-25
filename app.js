const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://frontend_domain'],  // Allow requests from array of domains
    // credentials: true,                // Enable sending cookies with requests
};

app.use(cors(corsOptions));  // Use the CORS middleware

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Product Management API",
            version: "1.0.0",
            description: "API for product management application",
        },
        tags: [
            {
                name: "Auth",
            },
            {
                name: "Users",
            },
            {
                name: "Products",
            },
            {
                name: "Categories",
            },
            {
                name: "Wishlist",
            },
        ],
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
