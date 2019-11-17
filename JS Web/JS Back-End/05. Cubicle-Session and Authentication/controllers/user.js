const bcrypt = require('bcrypt');
const { userModel } = require('../models');
const jwt = require('jsonwebtoken');

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
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('./user/registerPage.hbs')
    }

    userModel.findOne({ 'username': username }).then(user => {
        if (user) {
            res.render('./user/registerPage.hbs');
        }

        bcrypt.hash(password, 5, (err, hash) => {
            if (err) { next(err); return; };

            userModel.create({ username, password: hash }).then(user => {
                console.log(user);
                res.redirect('/login');
            });
        });
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