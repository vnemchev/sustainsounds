const express = require('express');
const mongoose = require('mongoose');

const eventController = require('./controllers/eventController');

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sustainsounds');

        mongoose.connection.on('open', () => console.log('Db connection established.'));
    } catch (error) {
        console.log('Error connecting to database');
        return process.exit(1);
    }

    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/events', eventController);

    app.listen(3030, () => console.log('REST Service started on port 3030'));
}

start();
