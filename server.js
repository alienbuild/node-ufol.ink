const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const atob = require('atob');

const shorten = require('./routes/api/shorten');

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
app.use('/api/shorten', shorten);

// Redirect
app.get('/:hash', function(req, res) {
    const baseid = req.params.hash;
    const id = atob(baseid);
    URL.findOne({ _id: id }, function(err, doc) {
        if(doc) {
            res.redirect(doc.url);
        } else {
            res.redirect('/');
        }
    });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));