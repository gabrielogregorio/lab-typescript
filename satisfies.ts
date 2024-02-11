type typeUser = 'admin' | 'normal';

export interface User {
  id?: string;
  name: string;
  email: string;
  type: typeUser;
}

// -> user: User (only user)
const user: User = {
  type: 'admin',
  name: 'name-example',
  email: 'email-example,',
};

// -> {type: "normal"; name: string; email: string; } (normal object and is User)
const user2 = {
  type: 'normal',
  name: 'name-example',
  email: 'email-example,',
} satisfies User;
