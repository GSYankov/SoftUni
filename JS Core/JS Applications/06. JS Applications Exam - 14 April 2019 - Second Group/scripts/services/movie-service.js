const movieService = (() => {
    function getAllMovies(query) {
        if (query) {
            return kinvey.get('appdata', `Movies${query}`, 'kinvey');
        }

        return kinvey.get('appdata', 'Movies', 'kinvey');
    }

    function addMovie(movie) {
        return kinvey.post('appdata', 'Movies', 'kinvey', movie);
    }

    function getMovie(id) {
        return kinvey.get('appdata', `Movies/${id}`, 'kinvey')
    }

    function updateMovie(id, movie) {
        return kinvey.update('appdata', `Movies/${id}`, 'kinvey', movie)
    }

    function removeMovie(id) {
        return kinvey.remove('appdata', `Movies/${id}`, 'kinvey')
    }

    return {
        getAllMovies,
        addMovie,
        getMovie,
        updateMovie,
        removeMovie
    }
})()