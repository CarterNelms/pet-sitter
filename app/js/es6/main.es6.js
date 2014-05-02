/* global Pet, pets */
(function()
{
  'use strict';

  $(document).ready(init);

  function init()
  {
    $('#add').click(add);
    $('#pets').on('click', '.sleep', sleep);
    $('#pets').on('click', '.eat', eat);
    $('#pets').on('click', '.play', play);
  }

  function sleep()
  {
    let pet = getPetFromDom(this);
    pet.sleep();
  }

  function eat()
  {
    let pet = getPetFromDom(this);
    pet.eat();
  }

  function play()
  {
    let pet = getPetFromDom(this);
    pet.play();
  }

  function getPetFromDom(dom)
  {
    let id = $(dom).closest('.pet').attr('id');
    return Pet.find(id);    
  }

  function add()
  {
    let gender = $('#gender').val();
    let speciesImg = $('#species').val() + Math.floor(Math.random() * 4) + '.png';
    let species = $('#species option:selected').text();
    let name = $('#name').val() || undefined;
    let age = $('#age').val() || undefined;

    let pet = new Pet(species, speciesImg, gender, age, name);
    pets.push(pet);
    pet.render();
  }
})();