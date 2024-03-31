// bad
// the reason for messing with it is to deal with email or change settings, or other things
class UserMagic {
  user: User;
  constructor(user: User) {
    this.user = user;
  }
  changeName() {}
  sendEmail() {}
}

// nice
// the reason for putting it in there is to change the user's settings
class UserSettings {
  user: User;
  constructor(user: User) {
    this.user = user;
  }

  changeName(newName: string) {}
}

// the reason for touching it is to deal with email
class UserEmail {
  user: User;
  constructor(user: User) {
    this.user = user;
  }

  send(emailContent: string) {}
}

class UserService {
  private settings: UserSettings;
  private email: UserEmail;

  constructor(private user: User) {
    this.settings = new UserSettings(user);
    this.email = new UserEmail(user);
  }

  changeUserName(newName: string): void {
    this.settings.changeName(newName);
  }

  sendUserEmail(emailContent: string): void {
    this.email.send(emailContent);
  }
}
