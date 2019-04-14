handlers.likePet = function (ctx) {
    let petId = ctx.params.id;
    petService.getPet(petId).then(function (res) {
        res.likes = +res.likes + 1;
        petService.likePet(petId, res).then(function (res) {
            notifications.showSuccess(`${res.name} liked successfully :)`);
            ctx.redirect('#/home');
        })
    })
}

handlers.getCreate = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs'
    }).then(function () {
        this.partial('views/pets/createPetPage.hbs');
    });
}

handlers.createPet = function (ctx) {
    let petDetails = { ...ctx.params, "likes": "0" }

    petService.createPet(petDetails).then(function (res) {
        notifications.showSuccess(`${res.name} created successfully :)`);
        ctx.redirect('#/myPets');
    }).catch(function (err) {
        console.log(err);
    })
}

handlers.getMyPets = function (ctx) {
    ctx.isAuth = userService.isAuth();
    let userId = sessionStorage.getItem('id');

    petService.getMyPets(userId).then(function (res) {
        ctx.pets = res;
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            myPet: '../views/pets/myPet.hbs'
        }).then(function () {
            this.partial('views/pets/myPetsPage.hbs');
        });
    })
}

handlers.getEditPet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    petService.getPet(ctx.params.id).then((res) => {
        ctx.myPet = res;
        console.log(res);
        ctx.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('views/pets/detailsMyPetPage.hbs');
        });
    })
}

handlers.editPet = function (ctx) {
    let petId = ctx.params.id;

    petService.getPet(petId).then(res => {
        let newData = { ...ctx.params, imageURL: res.imageURL, name: res.name, likes: res.likes }
        petService.likePet(petId, newData).then(function (res) {
            notifications.showSuccess(`${res.name} updated successfully :)`);
            ctx.redirect('#/myPets');
        })
    }).catch((err) => {
        console.log(err);
    })
}

handlers.getDetailsPet=function(ctx){
    ctx.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs',
        myPetDetails: '../views/pets/detailsMyPetPage.hbs',
        otherPetDetalils: '../views/pets/detailsOtherPetPage.hbs'
    }).then(function () {
        this.partial('views/pets/details.hbs');
    });
}