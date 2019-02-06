const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

// Serve static assets if in productions
if (process.env.NODE_ENV === 'production' ) {
    // Redirect
    app.get('/:hash', function(req, res) {
        const id = req.params.hash;
        URL.findOne({ _id: id }, function(err, doc) {
            if(doc) {
                res.redirect(doc.url);
            } else {
                res.redirect('/');
            }
        });
    });
    // Set static folder
    app.use(express.static('client/build'));
    // Load static file
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));