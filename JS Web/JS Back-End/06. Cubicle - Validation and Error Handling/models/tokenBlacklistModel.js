const mongoose = require('mongoose');

const tokenBlacklist = new mongoose.Schema({
    tocken: String
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklist);