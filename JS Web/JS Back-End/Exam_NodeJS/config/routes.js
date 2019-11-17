const routers = require('../routers');

module.exports = (app) => {

    app.use('/user', routers.user);

    app.use('/expense', routers.expense);

    app.use('/home', routers.home);

    app.use('/', routers.home);

    app.use('*', routers.home);
};