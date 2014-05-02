var petId = 0;
function clamp(num, min, max) {
  'use strict';
  num = (num < min) ? min : num;
  num = (num > max) ? max : num;
  return num;
}
function clamp0(num, max) {
  'use strict';
  return clamp(num, 0, max);
}

//# sourceMappingURL=utility.map
