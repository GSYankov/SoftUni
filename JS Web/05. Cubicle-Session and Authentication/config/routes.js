const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/create/accessory', accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);
    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);
    app.get('/details/:id', cubeController.details)
    app.get('/about', homeController.about);
    app.get('/not-found', homeController.notFound);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/edit/:id', cubeController.getEdit);
    app.post('/edit', cubeController.postEdit);
    app.post('/delete', cubeController.postDelete);

    app.get('/login', userController.getLogin);
    //app.post('login', cubeController.getEdit);
    app.get('/register', userController.getRegister);
    //app.post('register', cubeController.getEdit);
    //app.post('logout', cubeController.getEdit);


    app.get('/', homeController.index);
};