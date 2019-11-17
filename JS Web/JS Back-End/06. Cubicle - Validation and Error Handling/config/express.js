const jwt = require('../middleware/jwt');
const appConfig = require('../app-config');
const models = require('../models'); //const bodyParser = require('body-parser');
//const session = require('express-session');
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const secret = 'secret';

module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(__basedir, 'static')));
    //app.use(session({ secret: 'my secret' }, { httpOnly: true }, { secure: false }));
    app.use(cookieParser(secret));
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'layout' }));
    app.set('views', path.resolve(__basedir, 'views'));
}