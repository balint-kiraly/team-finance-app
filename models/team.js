const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Team = db.model('Team', {});

module.exports = Team;