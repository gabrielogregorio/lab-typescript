let data = {
  firstNameDestructuring: 'Vercel',
  age: 22,
  favoriteMovie: {
    firstNameDestructuring: 'Iron Man',
    director: 'anonymous',
  },
  profile: 'github.com/vercel',
};

const list = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

const {
  firstNameDestructuring,
  favoriteMovie: { firstNameDestructuring: nameMovie, ...restMovies },
  ...restData
} = data;

const [item1, , , , , item6] = list;

console.log(firstNameDestructuring, nameMovie);
console.log(item1, item6, restData);
console.log(restMovies);
