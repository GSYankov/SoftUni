const songService = (() => {
    function createSong(data) {
        return kinvey.post('appdata', 'songs', 'kinvey', data)
    }

    function getAllSongs() {
        return kinvey.get('appdata','songs','kinvey', '?query={}&sort={"likeCounter": -1}')
    }

    function getMySongs(){
        let userId = sessionStorage.getItem('id');
        
        return kinvey.get('appdata', 'songs', 'kinvey', `?query={"_acl.creator": "${userId}"}`)
    }

    function removeSong(id){
        return kinvey.remove('appdata', `songs/${id}`, 'kinvey')
    }
    
    function getSong(id){
        return kinvey.get('appdata', `songs/${id}`, 'kinvey')
    }

    function likeSong(id, data){
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data)
    }

    function listenSong(id, data){
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data)
    }
    return {
        createSong,
        getAllSongs,
        getMySongs,
        removeSong,
        getSong,
        likeSong,
        listenSong
    }
})()