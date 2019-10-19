const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [{
            validator: function(v) {
                return v.length >= 5;
            },
            message: props => `${props.value} length should be greater or eaqual than 5!`
        }, ]
    },
    description: {
        type: String,
        validate: [{
            validator: function(v) {
                return v.length < 20;
            },
            message: props => `${props.value} length should be less than 20!`
        }]
    },
    imageUrl: {
        type: String,
        validate: [{
            validator: function(v) {
                return /^(http:\/\/|https:\/\/)/.test(v);
            },
            message: props => `${props.value} URL is not correct!`
        }]
    },
    difficultyLevel: String,
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessories' }],
    creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cube', cubeSchema);