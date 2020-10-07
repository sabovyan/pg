export function getGladiators(num, Gladiator) {
  const res = [];
  for (let i = 0; i < num; i += 1) {
    res.push(new Gladiator());
  }
  return res;
}

export const removeGladiator = (gladiators) =>
  gladiators.filter((gladiator) => gladiator.health > 0);

export const getRandomNumber = (from, to, step = 0) => {
  let random = Math.random() * (to - from) + from;
  random = random.toFixed(step);
  return random;
};

export const getRandomSpeed = () => getRandomNumber(2, 5, 3);

export const getRandomPower = () => getRandomNumber(2, 5, 1);

export const getRandomHealth = () => getRandomNumber(80, 100, 0);

export const clearIntervals = (gladiators) => {
  gladiators.forEach((every) => clearInterval(every.timerId));
};
