const cubes = require('../config/database.json');
const fs = require('fs');

module.exports = {
    details: (req, res) => {
        let cubeId = req.params.cubeId;
        let cube = cubes.filter(function(cube) {
            return cube.id === cubeId;
        })[0];
        res.render('cube/details', cube);
    },
    create: (req, res) => {
        res.render('cube/create');
    },
    createPost: (req, res) => {
        cubes.push({
            id: (cubes.length + 1).toString(),
            image: req.body.imageUrl,
            name: req.body.name,
            level: req.body.difficultyLevel,
            description: req.body.description
        });

        let cubesJson = JSON.stringify(cubes);

        fs.writeFile('./config/database.json', cubesJson, (err) => {
            if (err) {
                throw err;
            }
            console.log('New cubicle added.')
        });

        res.redirect('/');
    },
    deletePost: (req, res) => {
        let cubeId = req.body.cubeId;

        fs.readFile('./config/database.json', 'utf-8', (err, data) => {

            let newCubesArr = JSON.parse(data).filter((cube) => {
                return cube.id !== cubeId;
            });

            let newCubesJson = JSON.stringify(newCubesArr);

            fs.writeFile('./config/database.json', newCubesJson, (err) => {
                if (err) {
                    throw err;
                }

                console.log(`Cube with id: ${cubeId} has been deleted successfully!`)
            });
        });


        res.redirect('/');
    },
    edit: (req, res) => {
        let cubeId = req.params.cubeId;
        fs.readFile('./config/database.json', 'utf-8', (err, data) => {

            let cube = JSON.parse(data).filter(function(cube) {
                return cube.id === cubeId;
            })[0];

            let l1 = cube.level === "1" ? 'selected' : "";
            let l2 = cube.level === "2" ? 'selected' : "";
            let l3 = cube.level === "3" ? 'selected' : "";
            let l4 = cube.level === "4" ? 'selected' : "";
            let l5 = cube.level === "5" ? 'selected' : "";
            let l6 = cube.level === "6" ? 'selected' : "";

            res.render('cube/edit', { cube, l1, l2, l3, l4, l5, l6 });
        });
    },

    editPost: (req, res) => {
        let cubeId = req.body.cubeId;
        let name = req.body.name;
        let image = req.body.imageUrl;
        let description = req.body.description;
        let level = req.body.difficultyLevel;

        let cube = { id: cubeId, name: name, image: image, description: description, level: level };

        fs.readFile('./config/database.json', 'utf-8', (err, data) => {

            let newCubesArr = JSON.parse(data);

            for (var i in newCubesArr) {
                if (newCubesArr[i].id == cubeId) {
                    newCubesArr[i] = cube;
                    break; //Stop this loop, we found it!
                }
            }


            let newCubesJson = JSON.stringify(newCubesArr);

            fs.writeFile('./config/database.json', newCubesJson, (err) => {
                if (err) {
                    throw err;
                }

                console.log(`Cube with id: ${cubeId} has been edited successfully!`)
            });
        });

        res.redirect('/');
    }
}