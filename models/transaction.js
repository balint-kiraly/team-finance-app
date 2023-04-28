const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Transaction = db.model('Transaction', {
    name: String,
    category: {
        type: String,
        enum: ['Income', 'Groceries', 'Housing', 'Lifestyle', 'Entertainment']
    },
    date: Date,
    value: Number,
    _userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Transaction;