type User = {
  name: string;
  password: string;
};

const returnUser: Pick<User, 'name'> = {
  name: '',
};
