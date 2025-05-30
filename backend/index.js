const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running!' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
}); 