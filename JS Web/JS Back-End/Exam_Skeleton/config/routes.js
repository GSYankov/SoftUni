const routers = require('../routers');

module.exports = (app) => {

    app.use('/user', routers.user);

    app.use('/course', routers.course);
   
    app.use('/home', routers.home);

    app.use('*', (req, res, next) => {
        res.send('<h1>NOOOOOOO</h1>')
    })
};