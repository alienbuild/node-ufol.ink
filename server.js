const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load URL model
const URL = require('./models/Urls');

// Init app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database key
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));