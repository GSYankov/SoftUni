const { cubeModel } = require('../models');

async function details(req, res, next) {
    const id = req.params.id;
    try {
        const cube = await cubeModel.findById(id).populate('accessories');
        if (!cube) { res.redirect('/not-found'); return; }
        res.render('./cube/details.hbs', { cube });
    } catch (e) {
        next(e);
    }
}

function postCreate(req, res, next) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    // const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);

    cubeModel.create({ name, description, imageUrl, difficultyLevel }).then((cube) => {
        console.log(cube);
        res.redirect('/');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('./cube/create.hbs', { errors: err.errors });
            return;
        }
        next(err);
    });
};

function getCreate(req, res, next) {
    req.view = './cube/create.hbs';
    next()
}

//function getCreate(req, res) {
//    res.render('./cube/create.hbs');
//}

function getEdit(req, res, next) {
    const id = req.params.id;
    cubeModel.findOne({ "_id": id }).then(cube => {
        if (!cube) {
            res.redirect('/not-found');
            return;
        }

        let l1 = cube.difficultyLevel === "1" ? "selected" : "";
        let l2 = cube.difficultyLevel === "2" ? "selected" : "";
        let l3 = cube.difficultyLevel === "3" ? "selected" : "";
        let l4 = cube.difficultyLevel === "4" ? "selected" : "";
        let l5 = cube.difficultyLevel === "5" ? "selected" : "";
        let l6 = cube.difficultyLevel === "6" ? "selected" : "";

        res.render('cube/edit.hbs', { cube, l1, l2, l3, l4, l5, l6 });
    }).catch(next);
}

function postEdit(req, res, next) {
    const { cubeId = null, name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const updates = { name, description, imageUrl, difficultyLevel };
    cubeModel.findById(cubeId).then(cube => {
        const editedCube = {...cube, ...updates };
        cubeModel.create(editedCube).then(
            cubeModel.remove({ "_id": cubeId }).then(

                res.redirect('/'))
        );
    }).catch(next);
}

function postDelete(req, res, next) {
    const cubeId = req.body.id;

    cubeModel.remove({ "_id": cubeId }).then(
        res.redirect('/')
    ).catch(next);
}

module.exports = {
    details,
    postCreate,
    getCreate,
    getEdit,
    postEdit,
    postDelete
};