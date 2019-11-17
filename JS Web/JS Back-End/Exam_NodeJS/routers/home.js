const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/', auth(false), controllers.home.get.home);

router.get('*', auth(false), controllers.home.get.notFound);



module.exports = router;