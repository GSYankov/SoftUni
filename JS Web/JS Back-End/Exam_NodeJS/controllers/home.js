const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {

            if (req.user) {
                models.Expense.find({ creator: req.user.id }).then((expenses) => {

                    const hbsObject = {
                        pageTitle: 'Home Page',
                        expenses
                    };

                    res.render('homePage.hbs', hbsObject);
                })
            } else {
                const hbsObject = {
                    pageTitle: 'Home Page',
                };
                res.render('homePage.hbs', hbsObject);
            }



        },

        notFound: (req, res, next) => {
            res.render('404.hbs')
        }
    },
};