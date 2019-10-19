module.exports = (app) => {
    app.use(function(req, res, next) {
        const username = req.user ? req.user.username : null;

        res.render(req.view, { username });
    });
}