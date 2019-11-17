const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');
const authenticate = require('../middleware/authentication')

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
    app.post('/login', userController.postLogin);
    app.get('/register', userController.getRegister);
    app.post('/register', userController.postRegister);
    //app.get('/secret', userController.auth(4), userController.getSecret);
    app.get('/logout', userController.getLogout);


    app.get('/', authenticate.auth(), homeController.index);
};