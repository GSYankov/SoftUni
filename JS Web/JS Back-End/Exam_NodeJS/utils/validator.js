const { body } = require('express-validator');

module.exports = [

    body('username', 'Username should be at least 4 symbolss')
    .isLength({ min: 4 })
    .isAlphanumeric(),

    body('password', 'Password should be at least 8 symbolss')
    .isLength({ min: 8 })

    //body('description', 'Description should be alphanumeric and max 50 characters')
    //.isLength({ max: 50 })
    //.isAlphanumeric(),
    //
    //body('imageUrl')
    //.custom((value) => {
    //    if (!value.startsWith('http')) { throw new Error('Image url should start with http...') }
    //    return true;
    //})
];