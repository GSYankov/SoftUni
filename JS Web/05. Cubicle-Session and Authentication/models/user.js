const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cubes: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Cubes' }]
    }
});

module.exports = mongoose.model('Users', userSchema);