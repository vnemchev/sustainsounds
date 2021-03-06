const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const eventController = require('./controllers/eventController');
const authController = require('./controllers/authController');
const artistController = require('./controllers/artistController');

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sustainsounds');

        mongoose.connection.on('open', () =>
            console.log('Db connection established.'),
        );
    } catch (error) {
        console.log('Error connecting to database');
        return process.exit(1);
    }

    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(auth());

    app.use('/auth', authController);
    app.use('/events', eventController);
    app.use('/artists', artistController);

    app.listen(3030, () => console.log('REST Service started on port 3030'));
}

start();
