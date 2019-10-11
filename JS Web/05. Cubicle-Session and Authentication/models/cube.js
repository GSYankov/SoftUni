const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    difficultyLevel: String,
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessories' }],
    creator: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cube', cubeSchema);