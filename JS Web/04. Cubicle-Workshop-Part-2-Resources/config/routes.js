const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
    app.get('/create/accessory', accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);
    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);
    app.get('/details/:id', cubeController.details)
    app.get('/about', cubeController.about);
    app.get('/not-found', cubeController.notFound);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/edit/:id', cubeController.getEdit);
    app.post('/edit', cubeController.postEdit);
    app.post('/delete', cubeController.postDelete)
    app.get('/', cubeController.index);
};