const { faker } = window;

class Person {
  constructor() {
    this.name = faker.name.firstName();
    this.age = faker.random.number({ min: 1, max: 50 });
    this.incAge();
  }

  incAge() {
    this.age += 1;
    setTimeout(this.incAge.bind(this), 1000);
  }
}

// eslint-disable-next-line no-unused-vars
const per = new Person();

let people = [];
for (let i = 0; i < 4; i += 1) {
  people.push(new Person());
}

const filterByAge = (limitedAge) =>
  people.filter(({ age }) => age < limitedAge - 1);

setInterval(() => {
  people = filterByAge(40);
  console.log(people);
}, 1000);

function addNewPeople() {
  setInterval(() => {
    people.push(new Person());
  }, 1000);
}

addNewPeople();
