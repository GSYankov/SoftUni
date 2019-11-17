const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' || pathname.includes('/search') && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not found');
                res.end();
                return;
            }

            fs.readFile('./data/cats.json', 'utf8', (err, allCats) => {

                viewCats = JSON.parse(allCats);

                let searchedData = data;
                if (req.url.includes('/search')) {
                    let query = req.url.split('q=')[1];

                    viewCats = viewCats.filter(function(cat) {
                        return cat.name.includes(query);
                    });

                    searchedData = data.toString().replace('<input type="text" name="q" required/>',
                        `<input type="text" name="q" value="${query}" required/>`);
                }

                let catsTemplate = viewCats.map((cat) => `<li>
                <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
                </li>`);
                let modifiedData = searchedData.toString().replace('{{cats}}', catsTemplate);

                res.writeHead(200, {
                    'ContentType': 'text/html'
                });

                res.write(modifiedData);
                res.end();
            });
        });
    } else {
        return true;
    }
};