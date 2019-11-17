const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.use(session({ secret: 'my secret' }, { httpOnly: true }, { secure: false }));
    app.use(cookieParser());
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'layout' }));
    app.set('views', path.resolve(__basedir, 'views'));
}