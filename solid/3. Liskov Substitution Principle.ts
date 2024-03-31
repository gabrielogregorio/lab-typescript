/*
LSP says that objects of a class must be replaceable by objects of its derived classes
without this affecting the execution of the program as a whole
*/

// bad example
interface IUser {
  login: () => void;
  getRestrict: () => void;
}

class UserAdmin implements IUser {
  getRestrict() {}
  login() {}
}

class UserDefault implements IUser {
  getRestrict() {
    throw new Error('this user not has access');
  }

  login() {}
}

// when someone needs to receive a being, that consumer has different behaviors
// according to the implementation they use, this violates this principle
// nice example

interface IUser2 {
  login: () => void;
}
interface IUser2Admin extends IUser2 {
  getRestrict: () => void;
}

class UserAdmin2 implements IUser2Admin {
  getRestrict() {}
  login() {}
}

class UserDefault2 implements IUser2 {
  login() {}
}
