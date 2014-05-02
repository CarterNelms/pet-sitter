var maxHealth = 100;
var maxFullness = 50;
var maxMood = 10;
var Pet = function Pet(species, speciesImg, gender) {
  "use strict";
  var age = arguments[3] !== (void 0) ? arguments[3] : 3;
  var name = arguments[4] !== (void 0) ? arguments[4] : 'Pet';
  this.id = ("pet" + petId++);
  this.species = species;
  this.speciesImg = ("media/pictures/pets/" + speciesImg);
  this.gender = gender;
  this.age = age * 1;
  this.name = name;
  this.health = _.random(maxHealth / 10, maxHealth);
  this.full = _.random(maxFullness / 10, maxFullness);
  this.mood = _.random(maxMood / 10, maxMood);
};
($traceurRuntime.createClass)(Pet, {
  sleep: function() {
    "use strict";
    var amount = _.random(1, 5);
    this.health += amount;
    var lostMood = _.random(0, 1);
    this.mood -= lostMood;
    this.refreshStatus();
  },
  eat: function() {
    "use strict";
    var amount = _.random(1, 3);
    this.full += amount;
    this.refreshStatus();
  },
  play: function() {
    "use strict";
    var amount = _.random(0, 1);
    this.mood += amount;
    var lostHealth = _.random(1, 3);
    var lostFullness = _.random(1, 3);
    this.health -= lostHealth;
    this.full -= lostFullness;
    this.refreshStatus();
  },
  clampStats: function() {
    "use strict";
    this.health = clamp0(this.health, maxHealth);
    this.full = clamp0(this.full, maxFullness);
    this.mood = clamp0(this.mood, maxMood);
  },
  render: function() {
    "use strict";
    $('#pets').append(("<div data-name=" + this.name + " class='pet' id=" + this.id + ">\n                        <div class=container>\n                          <div class=flipper>\n                            <div class=back>\n                              <img src='media/pictures/dead.png'>\n                              R.I.P " + this.name + "<br>\n                              " + (2014 - this.age) + " - 2014\n                            </div>\n                            <div class=front>\n                              <div class=petImgWrap>\n                                <img class=petImg src=" + this.speciesImg + ">\n                              </div>\n                              <div class=title>\n                                " + this.name + " the " + this.species + "<br>\n                                " + this.gender + " - " + this.age + " years old\n                                <div class=interactions>\n                                  <div class=sleep>\n                                    Sleep\n                                  </div>\n                                  <div class=eat>\n                                    Eat\n                                  </div>\n                                  <div class=play>\n                                    Play\n                                  </div>\n                                </div>\n                              </div>\n                              <div class=status>\n                                <div class=statusName>Health </div><div class=statusBarWrap><div class='statusBar healthBar' data-val=" + this.health + "></div></div><br>\n                                <div class=statusName>Fullness </div><div class=statusBarWrap><div class='statusBar fullnessBar' data-val=" + this.full + "></div></div><br>\n                                <div class=statusName>Mood </div><div class=statusBarWrap><div class='statusBar moodBar' data-val=" + this.mood + "></div></div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>"));
    this.refreshStatus();
  },
  refreshStatus: function() {
    "use strict";
    this.clampStats();
    var $petDiv = $('#' + this.id);
    var $healthBar = $petDiv.find('.healthBar');
    var $fullnessBar = $petDiv.find('.fullnessBar');
    var $moodBar = $petDiv.find('.moodBar');
    var healthPercent = (this.health / maxHealth) * 100;
    var fullnessPercent = (this.full / maxFullness) * 100;
    var moodPercent = (this.mood / maxMood) * 100;
    $healthBar.css('width', (healthPercent + "%"));
    $fullnessBar.css('width', (fullnessPercent + "%"));
    $moodBar.css('width', (moodPercent + "%"));
    setColor($healthBar, healthPercent);
    setColor($fullnessBar, fullnessPercent);
    setColor($moodBar, moodPercent);
    function setColor($bar, percent) {
      if (percent < 30) {
        $bar.css('background-color', 'red');
      } else if (percent < 60) {
        $bar.css('background-color', 'yellow');
      } else {
        $bar.css('background-color', 'green');
      }
    }
    if (healthPercent <= 0 || fullnessPercent <= 0) {
      this.death();
    }
  },
  death: function() {
    "use strict";
    var $petDiv = $('#' + this.id);
    var $flipper = $petDiv.find('.flipper');
    $flipper.addClass('dead');
  }
}, {find: function(id) {
    "use strict";
    return _(pets).find((function(p) {
      return p.id === id;
    }));
  }});

//# sourceMappingURL=pet.map
