handlers.getAllSongs = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    try {
        ctx.songs = await songService.getAllSongs();
        let userId = sessionStorage.getItem('id');
        ctx.songs.forEach((song) => {
            song.isCreator = userId === song._acl.creator
        });

        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            song: '../views/song/song.hbs'
        }).then(function () {
            this.partial('../views/song/allSongsPage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
    }

}

handlers.getCreateSong = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs'
    }).then(function () {
        this.partial('../views/song/createSongPage.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.getMySongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    songService.getMySongs().then(function (res) {
        let userId = sessionStorage.getItem('id');
        res.forEach((song) => song.isCreator = song._acl.creator === userId)

        ctx.songs = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            song: '../views/song/song.hbs'
        }).then(function () {
            this.partial('../views/song/mySongsPage.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })


};

handlers.createSong = function (ctx) {

    let data = { ...ctx.params, likeCounter: 0, listenCounter: 0 };

    songService.createSong(data).then(function (res) {
        notifications.showSuccess('Song created successfully');
        ctx.redirect('#/allSongs');
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.removeSong = function (ctx) {

    songService.removeSong(ctx.params.id).then(function () {
        notifications.showSuccess('Song deleted successfully');
        ctx.redirect('#/mySongs');
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.likeSong = function (ctx) {
    let songId = ctx.params.id;
    songService.getSong(songId).then(function (res) {
        res.likeCounter++;
        songService.likeSong(songId, res).then(function (res) {
            notifications.showSuccess('Song liked successfully');
            ctx.redirect('#/allSongs');
        })
    })
}

handlers.listenSong = function (ctx) {
    let songId = ctx.params.id;
    songService.getSong(songId).then(function (res) {
        res.listenCounter++;
        songService.listenSong(songId, res).then(function (res) {
            notifications.showSuccess('Song listened successfully');
            ctx.redirect('#/allSongs');
        })
    })
}