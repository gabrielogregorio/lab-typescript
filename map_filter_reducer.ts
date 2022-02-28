const arrayNumbers: number[] = [1, 2, 3, 4, 5, 6];
const newArray: number[] = arrayNumbers.map((item) => {
  return item * 2;
});
console.log(arrayNumbers, newArray);

const newArrayFiltered: number[] = arrayNumbers.filter((item) => item % 2 === 0);
console.log(newArrayFiltered);

const initialValue = 0;
const result = arrayNumbers.reduce((accumulator, numberItem) => {
  return accumulator + numberItem;
}, initialValue);
console.log(result);

type personType = { name: string; age: number };
const persons: personType[] = [
  { name: 'person1', age: 30 },
  { name: 'person2', age: 16 },
  { name: 'person3', age: 23 },
  { name: 'person4', age: 27 },
  { name: 'person5', age: 17 },
  { name: 'person6', age: 30 },
  { name: 'person7', age: 19 },
];

type acumulatorOfAge = {
  bigger: personType[];
  minors: personType[];
};
const personsOfAge: acumulatorOfAge = persons.reduce(
  (accumulator: acumulatorOfAge = { bigger: [], minors: [] }, person) => {
    const largerAge = person.age >= 18 ? 'bigger' : 'minors';
    accumulator[largerAge].push(person);
    return accumulator;
  },
  { bigger: [], minors: [] },
);

console.log(personsOfAge);
