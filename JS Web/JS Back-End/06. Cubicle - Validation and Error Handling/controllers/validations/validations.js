const { body } = require('express-validator');

const register = body('repeatPassword', 'Passwords don\'t match!').custom((value, { req }) => {
    return (value === req.body.password)
});

module.exports = {
    register,
}