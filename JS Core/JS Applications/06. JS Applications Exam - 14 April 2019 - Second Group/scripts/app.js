const handlers = {}

$(() => {
  const app = Sammy('#container', function () {
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

    // Movies
    this.get('#/cinema', handlers.allMovies)
    this.get('#/addMovie', handlers.getAddMovie)
    this.get('#/buyTicket/:id', handlers.buyTicket)
    this.get('#/details/:id', handlers.movieDetails)
    this.get('#/myMovies', handlers.myMovies)
    this.get('#/edit/:id', handlers.getEdit)
    this.get('#/delete/:id', handlers.getDelete)
    this.get('#/movie/all', handlers.searchGengre)

    this.post('#/movie/create', handlers.addMovie)
    this.post('#/movie/edit/:id', handlers.editMovie)
    this.post('#/movie/delete/:id', handlers.deleteMovie)

  });
  app.run('#/home');
});