const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');
const { validationResult } = require('express-validator');


module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('loginPage.hbs', { pageTitle: 'Login Page' });
        },

        register: (req, res, next) => {
            res.render('registerPage.hbs', { pageTitle: 'Register Page' });
        },

        logout: (req, res, next) => {
            res.clearCookie(config.cookie).redirect('/home');
        },

        info: (req, res, next) => {
            const userId = req.user;

            const hbsObject = {
                pageTitle: 'Account Info',
                amount: req.user.amount,
                marches: req.user.expenses.length,
            }

            res.render('accountInfo.hbs', hbsObject)
        }
    },

    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.render('loginPage.hbs', { errors: errors.errors });
                return
            }

            models.User.findOne({ username }).then((user) => {
                Promise.all([user, user.matchPassword(password)])
                    .then(([user, match]) => {
                        if (!match) {
                            console.log('Password is invalid');
                            return
                        }

                        const token = jwt.createToken({ id: user._id });

                        res
                            .cookie(config.cookie, token)
                            .cookie('username', user.username)
                            .redirect('/home/');

                    })
            })
        },

        register: (req, res, next) => {
            const { username, password, repeatPassword, amount } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.render('registerPage.hbs', { errors: errors.errors });
                return
            }

            models.User.create({ username, password, amount }).then((registeredUser) => {
                const token = jwt.createToken({ id: registeredUser._id });

                res
                    .redirect('/user/login');
            })
        },

        refill: (req, res, next) => {
            const { amount } = req.body;
            const userId = req.user.id;
            req.user.amount = Number(req.user.amount) + Number(amount);
            models.User.findByIdAndUpdate({ _id: userId }, req.user).then(() => {
                res.redirect('/home/');
            })


        }
    }
};