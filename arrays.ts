var users = [
  {
    nameUser: 'Max',
    ageUser: 20
  },
  {
    nameUser: 'Zacarias',
    ageUser: 21
  }
]

const user = users.find((user) => { return user.nameUser === "Zacarias"});
console.log(user); // return user or undefined
