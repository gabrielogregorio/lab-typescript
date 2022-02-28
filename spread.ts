const namePerson = 'Cristina';
const city = 'Luiziania';

const bio = {
  desc: 'description',
  img: 'file.png',
  task: [
    {
      name: 'task 1',
    },
    {
      name: 'task 2',
    },
  ],
};

const spreadData = {
  namePerson,
  city,
  ...bio,
};

console.log(spreadData);
