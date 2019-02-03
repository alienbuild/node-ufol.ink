const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CounterSchema = new Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

module.exports = Counter = mongoose.model('Counter', CounterSchema);