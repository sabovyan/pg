import { Gladiator, Caesar } from './helper/class.helper.js';
import {
  getGladiators,
  clearIntervals,
  removeGladiator,
} from './helper/function.helper.js';

const gladiatorsQty = document.querySelector('#qty');
const submitButton = document.querySelector('#submit-button');
const list = document.querySelector('.actions');
const errMessage = document.querySelector('.error-message');

const fight = (qty) => {
  let gladiators = getGladiators(qty, Gladiator);
  gladiators.forEach((gladiator) => {
    gladiator.timerId = setInterval(function go() {
      if (gladiators.length === 1) {
        clearInterval(gladiator.timerId);
        const li = document.createElement('li');
        li.innerText = `${gladiators[0].name} won the battle with health ${gladiators[0].health}`;
        list.append(li);
      } else {
        const opponent = gladiator.fight(gladiators, list);

        if (opponent.health < 1) {
          clearIntervals(gladiators);

          const caesarDecision = Caesar.getCaesarDecision();
          const li = document.createElement('li');
          li.innerText = `Caesar showed ${caesarDecision.emoji} to ${gladiator.name}`;
          list.append(li);

          if (caesarDecision.type === 'finish him') {
            gladiators = removeGladiator(gladiators);
            gladiator.timerId = setInterval(go, (6 - gladiator.speed) * 1000);
          } else {
            opponent.health = 50;
            opponent.speed = (
              (opponent.initialSpeed * opponent.health) /
              opponent.initialHealth
            ).toFixed(3);

            gladiator.timerId = setInterval(go, (6 - gladiator.speed) * 1000);
          }
        }
      }
    }, (6 - gladiator.speed) * 1000);
  });
};

submitButton.addEventListener('click', () => {
  const quantity = gladiatorsQty.value;
  try {
    if (quantity < 2) {
      throw new Error('the number should bigger than 1');
    }
  } catch (err) {
    errMessage.textContent = err.message;
  }
  fight(quantity);
});
