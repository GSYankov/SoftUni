const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    console.log(req.method);

    if (pathname === '/cats/add-cat' && req.method === 'GET') {

        const filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 File Not Found');
                res.end();
                return;
            }

            const placeholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            const modifiedData = data.toString().replace('{{catBreeds}}', placeholder);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            };
            const oldPath = files.upload.path;
            const newPath = path.normalize(path.join(process.argv[1].replace('index.js', ''), '/content/images/' + files.upload.name));

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`Image succesfully uploaded to: ${newPath}`);
            });

            fs.readFile('./data/cats.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                };

                const allCats = JSON.parse(data);
                allCats.push({ id: (cats.length + 1).toString(), ...fields, image: files.upload.name });
                const json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, (err) => {
                    if (err) {
                        throw err;
                    };
                    console.log('Cat successfully added!');
                })
            });
            res.writeHead(301, { 'location': '/' });
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {

        let formData = "";

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {

            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => {
                    console.log('The breed was updated successfully.')
                });
            });

            res.writeHead(301, { 'location': '/' });
            res.end();
        })
    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/editCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write(filePath + '404 Not found');
                res.end();
            }

            fs.readFile('./data/cats.json', 'utf8', (err, catss) => {


                let catId = Number(req.url.toString().replace('/cats-edit/', ''));
                let allCats = JSON.parse(catss);
                let cat = allCats[catId - 1];

                let viewCat = `<label for="name">Name</label>
                    <input type="text" name="name" id="name" value="${cat.name}">
                    <label for="description">Description</label>
                    <textarea name="description" id="description">${cat.description}</textarea>
                    <label for="image">Image</label>
                    <input type="file" name="upload" id="upload">
                    <label for="breed">Breed</label>
                    <select name="breed" id="breed">
                            {{breeds}}
                    </select>`;

                let modifiedData = data.toString().replace('{{cat}}', viewCat);
                let breedOptions = breeds.map(breed =>
                    `<option value="${breed}"${breed!==cat.breed || 'selected'}>${breed}</option>`
                );

                modifiedData = modifiedData.toString().replace('{{breeds}}', breedOptions);


                res.writeHead(200, {
                    'ContentType': 'text/html'
                });

                res.write(modifiedData);
                res.end();
            });
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/catShelter.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write('404 File not found');
                res.end()
            }

            fs.readFile('./data/cats.json', 'utf8', (err, catss) => {


                let catId = Number(req.url.toString().replace('/cats-find-new-home/', ''));
                let allCats = JSON.parse(catss);
                let cat = allCats[catId - 1];

                let catTemplate = `<img src="${path.join('../content/images/' + cat.image)}" alt="${cat.name}">
                    <label for="name">Name</label>
                    <input type="text" name="name" value="${cat.name}" disabled>
                    <label for="description">Description</label>
                    <textarea name="description" disabled>${cat.description}</textarea>
                    <label for="group">Breed</label>
                    <select name="group" disabled>
                            <option value="${cat.breed}">${cat.breed}</option>
                    </select>`;

                let modifiedData = data.toString().replace('{{cat}}', catTemplate);

                res.writeHead(200, {
                    'ContentType': 'text/html'
                });

                res.write(modifiedData);
                res.end();
            });
        })

    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            };

            let fileName;
            if (files.upload.name !== "") {
                const oldPath = files.upload.path;
                const newPath = path.normalize(path.join(process.argv[1].replace('index.js', ''), '/content/images/' + files.upload.name));

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`Image succesfully uploaded to: ${newPath}`);
                });

                fileName = files.upload.name;
            }

            fs.readFile('./data/cats.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                };

                let catId = Number(req.url.toString().replace('/cats-edit/', ''));
                let cat = cats[catId - 1];

                const allCats = JSON.parse(data);
                allCats[catId - 1] = ({ id: catId, ...fields, image: (fileName || cat.image) });
                const json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, (err) => {
                    if (err) {
                        throw err;
                    };
                    console.log('Cat successfully added!');
                })
            });
            res.writeHead(301, { 'location': '/' });
            res.end();
        });
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        fs.readFile('./data/cats.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            };

            let catId = Number(req.url.toString().replace('/cats-find-new-home/', ''));

            const allCats = JSON.parse(data);
            allCats.splice(catId - 1, 1);
            const json = JSON.stringify(allCats);

            fs.writeFile('./data/cats.json', json, (err) => {
                if (err) {
                    throw err;
                };
                console.log('Cat successfully added!');
            })
        });
        res.writeHead(301, { 'location': '/' });
        res.end();
    } else {
        return true;
    }
}