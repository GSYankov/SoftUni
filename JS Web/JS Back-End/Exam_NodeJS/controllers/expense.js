const models = require('../models');
const config = require('../config/config');

module.exports = {
    get: {
        create: (req, res, next) => {

            const hbsObject = {
                pageTitle: 'Create expense',
            };
            res.render('createExpensePage.hbs', hbsObject);
        },

        details: (req, res, next) => {

            const { expenseId } = req.params;

            models.Expense.findById(expenseId).then((expense) => {

                const hbsObject = {
                    expense,
                    pageTitle: 'Course Details'
                }
                res.render('detailsExpensePage.hbs', hbsObject);
            }).catch(console.log);
        },

        delete: (req, res, next) => {
            const { expenseId } = req.params;

            models.Expense.findByIdAndRemove(expenseId).then((removedExpense) => {
                res.redirect('/home/');
            });
        }
    },

    post: {
        create: (req, res, next) => {
            const { merchant, total, vault, category, description, isReport } = req.body;
            const date = new Date();
            const report = isReport === 'on';

            models.Expense.create({ merchant, total, vault, category, description, date, report, creator: req.user.id }).then((createdExpense) => {
                req.user.expenses.push(createdExpense._id);
                return models.User.findByIdAndUpdate({ _id: req.user._id }, req.user).then(() => {
                    res.redirect('/home/');
                })
            })
        },
    }
};