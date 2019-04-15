handlers.allMovies = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let query = '?query={}&sort={"tickets": -1}';

    movieService.getAllMovies(query).then(function (res) {
        ctx.movies = res.sort(function (a, b) { return Number.parseInt(b.tickets) - Number.parseInt(a.tickets) });
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            movie: '../views/movies/movie.hbs'
        }).then(function () {
            this.partial('views/movies/allMoviesPage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.getAddMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs',
    }).then(function () {
        this.partial('views/movies/addMoviePage.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.addMovie = function (ctx) {
    let movieDetails = { ...ctx.params };

    if (movieDetails.title.length < 6 || !movieDetails.title) {
        notifications.showError('The title should be at least 6 characters long.');
        return
    }

    if (movieDetails.description.length <= 10 || !movieDetails.description) {
        notifications.showError('The description should be at least 10 characters long.');
        return
    }

    if (!movieDetails.imageUrl.startsWith('http://') && !movieDetails.imageUrl.startsWith('https://')) {
        notifications.showError('The image should start with "http://" or "https://".');
        return
    }

    if (Number(movieDetails.tickets) === 'NaN' || !movieDetails.tickets) {
        notifications.showError('The available tickets should be a number.');
        return
    }

    if (movieDetails.genres.split(' ').count === 0 || !movieDetails.genres) {
        notifications.showError('The genres must be separated by a single space');
        return
    }

    movieDetails.genres = movieDetails.genres.split(' ')
    movieDetails.tickets = Number.parseInt(movieDetails.tickets)

    movieService.addMovie(movieDetails).then(function (res) {
        notifications.showSuccess('Movie created successfully.');
        ctx.redirect('#/cinema')
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.buyTicket = function (ctx) {
    let movieId = ctx.params.id;


    movieService.getMovie(movieId).then(function (res) {

        if (res.tickets < 1) {
            notifications.showError('No more available tickets!');
            return
        }

        res.tickets--
        let title = res.title;
        movieService.updateMovie(movieId, res).then(function (res) {
            notifications.showSuccess(`Successfully bought ticket for ${title}!`);
            ctx.redirect('#/cinema')
        }).catch(function (err) {
            console.log(err);
        })
    })
}

handlers.movieDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let movieId = ctx.params.id;

    movieService.getMovie(movieId).then(function (res) {
        ctx.movie = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('views/movies/detailsMoviePage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })
}

handlers.myMovies = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('id');
    let query = `?query={"_acl.creator":"${userId}"}`

    movieService.getAllMovies(query).then(function (res) {
        ctx.movies = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            myMovie: '../views/movies/myMovie.hbs'
        }).then(function () {
            this.partial('views/movies/myMoviesPage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })
}

handlers.getEdit = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let movieId = ctx.params.id;

    movieService.getMovie(movieId).then(function (res) {
        ctx.movie = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('views/movies/editMoviePage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })
}

handlers.editMovie = function (ctx) {
    let movieDetails = { ...ctx.params };

    if (movieDetails.title.length < 6 || !movieDetails.title) {
        notifications.showError('The title should be at least 6 characters long.');
        return
    }

    if (movieDetails.description.length <= 10 || !movieDetails.description) {
        notifications.showError('The description should be at least 10 characters long.');
        return
    }

    if (!movieDetails.imageUrl.startsWith('http://') && !movieDetails.imageUrl.startsWith('https://')) {
        notifications.showError('The image should start with "http://" or "https://".');
        return
    }

    if (Number(movieDetails.tickets) === 'NaN' || !movieDetails.tickets) {
        notifications.showError('The available tickets should be a number.');
        return
    }

    if (movieDetails.genres.split('-').count === 0 || !movieDetails.genres) {
        notifications.showError('The genres must be separated by a single space');
        return
    }

    movieService.updateMovie(movieDetails.id, movieDetails).then(function (res) {
        notifications.showSuccess('Movie edited successfully.');
        ctx.redirect('#/cinema')
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.getDelete = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let movieId = ctx.params.id;

    movieService.getMovie(movieId).then(function (res) {
        ctx.movie = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('views/movies/deleteMoviePage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })
}

handlers.deleteMovie = function (ctx) {
    let movieId = ctx.params.id;

    movieService.removeMovie(movieId).then(function (res) {
        notifications.showSuccess('Movie removed successfully!')
        ctx.redirect('#/home')
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.searchGengre = function (ctx) {
    let key = ctx.params.search
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    movieService.getAllMovies().then(function (res) {
        if (key) {
            ctx.movies = res.filter(m => m.genres.includes(key));
        } else {
            ctx.movies = res.sort(function (a, b) { return Number.parseInt(b.tickets) - Number.parseInt(a.tickets) });
        }

        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            movie: '../views/movies/movie.hbs'
        }).then(function () {
            this.partial('views/movies/allMoviesPage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        console.log(err)
    })
}