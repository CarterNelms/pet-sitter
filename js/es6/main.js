(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#add').click(add);
    $('#pets').on('click', '.sleep', sleep);
    $('#pets').on('click', '.eat', eat);
    $('#pets').on('click', '.play', play);
  }
  function sleep() {
    var pet = getPetFromDom(this);
    pet.sleep();
  }
  function eat() {
    var pet = getPetFromDom(this);
    pet.eat();
  }
  function play() {
    var pet = getPetFromDom(this);
    pet.play();
  }
  function getPetFromDom(dom) {
    var id = $(dom).closest('.pet').attr('id');
    return Pet.find(id);
  }
  function add() {
    var gender = $('#gender').val();
    var speciesImg = $('#species').val() + Math.floor(Math.random() * 4) + '.png';
    var species = $('#species option:selected').text();
    var name = $('#name').val() || undefined;
    var age = $('#age').val() || undefined;
    var pet = new Pet(species, speciesImg, gender, age, name);
    pets.push(pet);
    pet.render();
  }
})();

//# sourceMappingURL=main.map
