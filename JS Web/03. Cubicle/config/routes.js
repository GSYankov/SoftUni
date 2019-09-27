const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');

module.exports = app => {
    app.get('/', homeController.home);
    app.get('/about', homeController.about);
    app.get('/create', cubeController.create);
    app.post('/create', cubeController.createPost);
    app.get('/details/:cubeId', cubeController.details);

    //The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', homeController.error);
}