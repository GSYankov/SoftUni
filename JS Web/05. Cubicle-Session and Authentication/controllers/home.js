const { cubeModel } = require('../models');

function index(req, res, next) {
    const { from, to, search } = req.query;
    let query = {};
    if (search) {
        query = {...query, name: { $regex: search, $options: 'i' } };
    }
    if (to) {
        query = {...query, difficultyLevel: { $lte: +to } };
    }
    if (from) {
        query = {
            ...query,
            difficultyLevel: {...query.difficultyLevel, $gte: +from }
        };
    }

    cubeModel.find(query).then(cubes => {
        res.render('home/index.hbs', {
            cubes,
            search,
            from,
            to
        });
    }).catch(next);
}

function notFound(req, res) {
    res.render('404.hbs');
}

function about(req, res) {
    res.render('./home/about.hbs');
}

module.exports = {
    index,
    notFound,
    about
}