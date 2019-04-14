const petService = (() => {

    function likePet(petId, pet) {
        return kinvey.update('appdata', `pets/${petId}`, 'kinvey', pet);
    }

    function getPet(petId) {
        return kinvey.get('appdata', `pets/${petId}`, 'kinvey');
    }

    function getOtherPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    function getOtherPetsByCategory(category) {
        return kinvey.get('appdata', `pets?query={"category": "${category}"}&sort={"likes": -1}`, 'kinvey');
    }

    function createPet(details){
      return kinvey.post('appdata', 'pets', 'kinvey', details)
    }

    function getMyPets(userId){
        return kinvey.get('appdata', `pets?query={"_acl.creator":"${userId}"}`, 'kinvey')
    }

    return {
        getPet,
        likePet,
        getOtherPets,
        getOtherPetsByCategory,
        createPet,
        getMyPets
    }
})()