const cubes = require('../config/database.json');

module.exports = {
    home: (req, res) => {
        let allCubes = cubes;
        let search = req.query.search;
        let from = req.query.from;
        let to = req.query.to;

        if (from) {
            allCubes = cubes.filter((cube) => {
                return cube.level >= from;
            });
        }

        if (to) {
            allCubes = allCubes.filter((cube) => {
                return cube.level <= to;
            });
        }

        if (search) {
            allCubes = allCubes.filter((cube) => {
                return cube.name.toUpperCase().includes(search.toUpperCase());
            });
        }

        res.render('index', { allCubes, search, from, to })
    },
    about: (req, res) => {
        res.render('about');
    },
    error: (req, res) => {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', { url: req.url });
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    }
}