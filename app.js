const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./models'); // Sequelize instance
const User = require('./models/User'); // User model

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Sync Sequelize models with the database
sequelize.sync().then(() => console.log('Database synced successfully'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission (Create a new user)
app.post('/appointmentData', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle user deletion
app.delete('/appointmentData/:email', async (req, res) => {
    try {
        const email = req.params.email;
        await User.destroy({ where: { email } });
        res.sendStatus(204);
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle user update
app.put('/appointmentData/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedUser = await User.update(req.body, { where: { email } });
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch all users
app.get('/appointmentData', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});