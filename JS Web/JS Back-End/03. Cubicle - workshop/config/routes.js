const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', cubeController.details)
    app.get('/about', homeController.about);
    app.get('/not-found', homeController.notFound);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/edit/:id', cubeController.getEdit);
    app.post('/edit', cubeController.postEdit);
    app.post('/delete', cubeController.postDelete);
    app.get('/', homeController.index);
};