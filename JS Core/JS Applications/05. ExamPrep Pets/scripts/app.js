const handlers = {}

$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');
    // home page routes
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // user routes
    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    // Pets
    this.get('#/like/:id', handlers.likePet)
    this.get('#/home/:category', handlers.getHome)
    this.get('#/create', handlers.getCreate)
    this.get('#/myPets', handlers.getMyPets)
    this.get('#/edit/:id', handlers.getEditPet)
    this.get('#/details/:id', handlers.getDetailsPet)
    
    this.post('#/createPet', handlers.createPet)
    this.post('#/edit/:id', handlers.editPet)
  });
  app.run('#/home');
});