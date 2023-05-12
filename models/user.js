const db = require('../config/db');
const {Schema} = require("mongoose");

const User = db.model('User', {
    name: String,
    email: String,
    password: String,
    balance: {
        type: Number,
        default: 0
    },
    _teamid: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = User;