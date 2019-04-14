handlers.getHome = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');
  let category = ctx.params.category;
  let pets;

  if (ctx.isAuth) {
    try {
      if (category) {
        pets = await petService.getOtherPetsByCategory(category);
      } else {
        pets = await petService.getOtherPets();
      }
      ctx.pets = pets.filter(pet => pet._acl.creator !== sessionStorage.id)
    }
    catch (err) {
      console.log(err);
    }
  }
  

  ctx.loadPartials({
    header: '../views/common/header.hbs',
    footer: '../views/common/footer.hbs',
    basic: '../views/home/basic.hbs',
    dashboard: '../views/home/dashboard.hbs',
    pet: '../views/home/pet.hbs'
  }).then(function () {
    this.partial('views/home/home.hbs');
  });
}