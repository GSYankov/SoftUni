const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');
const auth = require('../middleware/auth')
const validations = require('../controllers/validations/validations')

module.exports = (app) => {
    app.get('/create/accessory', auth(), accessoryController.createGet);
    app.post('/create/accessory', auth(), accessoryController.createPost);
    app.get('/attach/accessory/:id', auth(), accessoryController.attachGet);
    app.post('/attach/accessory/:id', auth(), accessoryController.attachPost);
    app.get('/details/:id', auth(), cubeController.details);
    app.get('/about', auth(false), homeController.about);
    app.get('/not-found', auth(false), homeController.notFound);
    app.get('/create', auth(), cubeController.getCreate);
    app.post('/create', auth(), cubeController.postCreate);
    app.get('/edit/:id', auth(), cubeController.getEdit);
    app.post('/edit', auth(), cubeController.postEdit);
    app.post('/delete', auth(), cubeController.postDelete);

    app.get('/login', auth(false), userController.getLogin);
    app.post('/login', auth(false), userController.postLogin);
    app.get('/register', auth(false), userController.getRegister);
    app.post('/register', auth(false), validations.register, userController.postRegister);
    app.get('/logout', auth(), userController.getLogout);


    app.get('/', auth(false), homeController.index);
};