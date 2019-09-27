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
    delete: (req, res) => {
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
    }
}