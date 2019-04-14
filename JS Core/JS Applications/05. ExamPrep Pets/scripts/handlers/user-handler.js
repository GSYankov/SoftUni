handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: '../views/common/header.hbs',
    footer: '../views/common/footer.hbs'
  }).then(function () {
    this.partial('views/user/registerPage.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: '../views/common/header.hbs',
    footer: '../views/common/footer.hbs'
  }).then(function () {
    this.partial('../../views/user/loginPage.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  if (username.length < 3) {
    notifications.showError('Username must be at least 3 symbols');
    ctx.redirect('#/register');
    return
  } 
  
  if (password.length < 6) {
    notifications.showError('Password must be at least 6 symbols')
    ctx.redirect('#/register')
    return
  }

  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('User registration successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description)
    ctx.redirect('#/register')
  });
}

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showSuccess('Logout successful.');
    ctx.redirect('#/home');
  })
}

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  if (username.length < 3) {
    notifications.showError('Username must be at least 3 symbols');
    ctx.redirect('#/register');
    return
  } 
  
  if (password.length < 3) {
    notifications.showError('Password must be at least 6 symbols')
    ctx.redirect('#/register')
    return
  }

  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('Login successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
}