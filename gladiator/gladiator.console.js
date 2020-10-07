import {
  getGladiators,
  clearIntervals,
  removeGladiator,
} from './helper/function.helper.js';
import { Caesar, Gladiator } from './helper/class.helper.js';

const start = (num) => {
  if (num === undefined || null) {
    throw new Error('please enter the number of Gladiators');
  }

  let gladiators = getGladiators(num, Gladiator);
  gladiators.forEach((gladiator) => {
    gladiator.timerId = setInterval(function go() {
      if (gladiators.length === 1) {
        clearInterval(gladiator.timerId);
        console.log(
          `${gladiators[0].name} won the battle with health ${gladiators[0].health}`
        );
      } else {
        const opponent = gladiator.fight(gladiators);

        if (opponent.health < 1) {
          clearIntervals(gladiators);

          const caesarDecision = Caesar.getCaesarDecision();
          console.log(
            `Caesar showed ${caesarDecision.emoji} to ${gladiator.name}`
          );

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
