const { Sequelize } = require('sequelize');

// Create a new Sequelize instance and connect to the database
const sequelize = new Sequelize('user', 'root', 'P&h@1927', {
    host: 'localhost',
    dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;