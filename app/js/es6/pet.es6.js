/* exported Pet */
/* global _, pets, petId, clamp0 */
/* jshint unused: false */

let maxHealth = 100;
let maxFullness = 50;
let maxMood = 10;

class Pet{
  constructor(species, speciesImg, gender, age=3, name='Pet')
  {
    this.id = `pet${petId++}`;
    this.species = species;
    this.speciesImg = `media/pictures/pets/${speciesImg}`;
    this.gender = gender;
    this.age = age*1;
    this.name = name;

    this.health = _.random(maxHealth/10, maxHealth);
    this.full = _.random(maxFullness/10, maxFullness);
    this.mood = _.random(maxMood/10, maxMood);
  }

  static find(id)
  {
    return _(pets).find(p=>p.id === id);
  }

  sleep()
  {
    let amount = _.random(1,5);
    this.health += amount;

    let lostMood = _.random(0,1);
    this.mood -= lostMood;

    this.refreshStatus();
  }

  eat()
  {
    let amount = _.random(1,3);
    this.full += amount;

    this.refreshStatus();
  }

  play()
  {
    let amount = _.random(0,1);
    this.mood += amount;

    let lostHealth = _.random(1,3);
    let lostFullness = _.random(1,3);
    this.health -= lostHealth;
    this.full -= lostFullness;

    this.refreshStatus();
  }

  clampStats()
  {
    this.health = clamp0(this.health, maxHealth);
    this.full = clamp0(this.full, maxFullness);
    this.mood = clamp0(this.mood, maxMood);    
  }

  render()
  {
    $('#pets').append(`<div data-name=${this.name} class='pet' id=${this.id}>
                        <div class=container>
                          <div class=flipper>
                            <div class=back>
                              <img src='media/pictures/dead.png'>
                              R.I.P ${this.name}<br>
                              ${2014-this.age} - 2014
                            </div>
                            <div class=front>
                              <div class=petImgWrap>
                                <img class=petImg src=${this.speciesImg}>
                              </div>
                              <div class=title>
                                ${this.name} the ${this.species}<br>
                                ${this.gender} - ${this.age} years old
                                <div class=interactions>
                                  <div class=sleep>
                                    Sleep
                                  </div>
                                  <div class=eat>
                                    Eat
                                  </div>
                                  <div class=play>
                                    Play
                                  </div>
                                </div>
                              </div>
                              <div class=status>
                                <div class=statusName>Health </div><div class=statusBarWrap><div class='statusBar healthBar' data-val=${this.health}></div></div><br>
                                <div class=statusName>Fullness </div><div class=statusBarWrap><div class='statusBar fullnessBar' data-val=${this.full}></div></div><br>
                                <div class=statusName>Mood </div><div class=statusBarWrap><div class='statusBar moodBar' data-val=${this.mood}></div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`);
   this.refreshStatus();
  }

  refreshStatus()
  {
    this.clampStats();
    let $petDiv = $('#'+this.id);
    let $healthBar = $petDiv.find('.healthBar');
    let $fullnessBar = $petDiv.find('.fullnessBar');
    let $moodBar = $petDiv.find('.moodBar');

    let healthPercent = (this.health/maxHealth)*100;
    let fullnessPercent = (this.full/maxFullness)*100;
    let moodPercent = (this.mood/maxMood)*100;

    $healthBar.css('width', `${healthPercent}%`);
    $fullnessBar.css('width', `${fullnessPercent}%`);
    $moodBar.css('width', `${moodPercent}%`);

    setColor($healthBar, healthPercent);
    setColor($fullnessBar, fullnessPercent);
    setColor($moodBar, moodPercent);

    function setColor($bar, percent)
    {
      if(percent < 30)
      {
        $bar.css('background-color', 'red');
      }
      else if(percent < 60)
      {
        $bar.css('background-color', 'yellow');
      }
      else
      {
        $bar.css('background-color', 'green');
      }
    }

    if(healthPercent <= 0 || fullnessPercent <= 0)
    {
      this.death();
    }
  }

  death()
  {
    let $petDiv = $('#'+this.id);
    let $flipper = $petDiv.find('.flipper');
    $flipper.addClass('dead');
  }
}