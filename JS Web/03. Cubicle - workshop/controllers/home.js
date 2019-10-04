const cubeModel = require('../models/cube');

function index(req, res, next) {
    const { from, to, search } = req.query;
    const findFn = item => {
        let result = true;
        if (search) {
            result = item.name.toLowerCase().includes(search);
        }
        if (result && from) {
            result = +item.difficultyLevel >= +from;
        }
        if (result && to) {
            result = +item.difficultyLevel <= +to;
        }
        return result;
    }
    cubeModel.find(findFn).then(cubes => {
        res.render('index.hbs', { cubes, search, from, to });
    }).catch(next);
}

function notFound(req, res) {
    res.render('404.hbs');
}

function about(req, res) {
    res.render('about.hbs');
}

module.exports = {
    index,
    notFound,
    about,
};