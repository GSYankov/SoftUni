function getLogin(req, res) {
    res.render('./user/loginPage.hbs');
}

function getRegister(req, res) {
    res.render('./user/registerPage.hbs');
}

module.exports = {
    getLogin,
    getRegister
}