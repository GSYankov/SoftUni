const cubeModel = require('../models/cube');

function details(req, res, next) {
    const id = req.params.id;
    cubeModel.getOne(id).then(cube => {
        if (!cube) { res.redirect('/not-found'); return; }
        res.render('cube/details.hbs', cube);
    }).catch(next);
}


function postCreate(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);
    cubeModel.insert(newCube).then(() => {
        res.redirect('/');
    });
}

function getCreate(req, res) {
    res.render('cube/create.hbs');
}

function getEdit(req, res, next) {
    const id = req.params.id;
    cubeModel.getOne(id).then(cube => {
        if (!cube) {
            res.redirect('/not-found');
            return;
        }

        let l1 = cube.level === "1" ? "selected" : "";
        let l2 = cube.level === "2" ? "selected" : "";
        let l3 = cube.level === "3" ? "selected" : "";
        let l4 = cube.level === "4" ? "selected" : "";
        let l5 = cube.level === "5" ? "selected" : "";
        let l6 = cube.level === "6" ? "selected" : "";

        res.render('cube/edit.hbs', { cube, l1, l2, l3, l4, l5, l6 });
    }).catch(next);
}

function postEdit(req, res) {
    const { cubeId = null, name = null, description = null, imageUrl = null, level = null } = req.body;
    cubeModel.update(cubeId, { name, description, imageUrl, level })

    res.redirect('/');
}

function postDelete(req, res) {
    const id = req.body.cubeId;
    cubeModel.delete(id);
    res.redirect('/');
}

module.exports = {
    details,
    postCreate,
    getCreate,
    getEdit,
    postEdit,
    postDelete
};