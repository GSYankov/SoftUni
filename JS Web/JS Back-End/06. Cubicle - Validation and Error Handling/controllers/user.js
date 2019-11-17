const bcrypt = require('bcrypt');
const { userModel } = require('../models');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const secret = 'MySuperPrivateSecret';
const options = { expiresIn: '2d' };


function getLogin(req, res) {
    res.render('./user/loginPage.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ 'username': username }).then(authUser => {
        if (!authUser) {
            res.redirect('/login');
            return;
        };

        bcrypt.compare(password, authUser.password).then(result => {
            if (!result) {
                res.redirect('/login');
                return;
            };

            const tocken = jwt.sign({ "userId": authUser.id }, secret, options)
            res.cookie('auth_cookie', tocken).redirect('/');
        });
    });
}

function getRegister(req, res) {
    res.render('./user/registerPage.hbs');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword, email } = req.body;
    let result;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
    } else {
        result = userModel.create({ username, password });
    }

    return result.then(() => {
        res.redirect('./user/loginPage');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('./user/registerPage.hbs', { errors: err.errors });
            return;
        }
        next(err);
    });
};

function getLogout(req, res, next) {
    res.clearCookie('auth_cookie').redirect('/');
};

module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getLogout
}