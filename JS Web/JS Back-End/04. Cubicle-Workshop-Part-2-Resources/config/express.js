const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'layout' }));
    app.set('views', path.resolve(__basedir, 'views'));
}