/*

- IoC Inversion of Control - (Principe)
- DIP Dependency inversion Principle - (principle)
- DI Dependency Inversion  - (technique implements IoC and Dip)


IoC (inversion of control) is the principle where flow control is inverted, DI (dependency injection) is the pattern that implements
this principle to resolve the dependencies of an object, the object does not create its dependencies
directly, they are injected by another object or container
*/

interface IExample {
  handle(): void;
}

class Example implements IExample {
  handle() {}
}

class App {
  private example: IExample;

  constructor(example: IExample) {
    // here the DIP is happening, dependency inversion principle
    this.example = example;
  }

  start() {
    this.example.handle();
  }
}

// This code is playing the role of DI, this is where the projection of
// dependency, and this is one of the IoC implementations
const handler = new Example();
const app = new App(handler);
app.start();
