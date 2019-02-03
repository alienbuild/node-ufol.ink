const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UrlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = URL = mongoose.model('URL', UrlSchema);