import {
  getRandomHealth,
  getRandomSpeed,
  getRandomPower,
  getRandomNumber,
} from './function.helper.js';

const { faker } = window;

export const Caesar = {
  decision: [
    {
      type: 'finish him',
      emoji: '👎',
    },
    {
      type: 'live',
      emoji: '👍',
    },
  ],

  getCaesarDecision() {
    const num = getRandomNumber(0, this.decision.length - 1);
    return this.decision[num];
  },
};

export class Gladiator {
  constructor() {
    this.name = faker.name.findName();
    this.initialSpeed = getRandomSpeed();
    this.initialHealth = getRandomHealth();
    this.power = getRandomPower();
    this.health = this.initialHealth;
    this.speed = this.initialSpeed;
    this.timerId = null;
  }

  toString() {
    return `[${this.name} x ${this.health}]`;
  }

  getOpponent(gladiators) {
    const restOfGladiator = gladiators.filter(
      (gladiator) => gladiator !== this
    );

    const randomPos = getRandomNumber(0, restOfGladiator.length - 1);
    const opponent = restOfGladiator[randomPos];

    return opponent;
  }

  fight(gladiators) {
    const opponent = this.getOpponent(gladiators);
    this.hitOpponent(opponent);
    return opponent;
  }

  hitOpponent(opponent) {
    opponent.health = Math.floor(opponent.health - this.power);
    if (opponent.health >= 0 && opponent.health <= 10) {
      opponent.speed *= 3;
    } else {
      opponent.speed = (
        (opponent.initialSpeed * opponent.health) /
        opponent.initialHealth
      ).toFixed(3);
    }
    console.log(
      `${this.toString()} hits ${opponent.toString()} with power ${this.power}`
    );
  }
}
