// =============
// 4 Interface Segregation Principle
// ISP focuses on interface segregation to ensure classes are not
// forced to rely on methods they don't use.
// The same example as 3 applies here, but the purpose of this is not to force implementation
// of unnecessary methods
//bad example
interface IWorker {
  work(): void;
  eat(): void;
}

class HumanWorker implements IWorker {
  work() {}
  eat() {}
}

class RobotWorker implements IWorker {
  work() {}
  eat() {
    throw new Error("robt's don't eat");
  }
}

// good
interface IWorker2 {
  work(): void;
}

interface Eater2 {
  eat(): void;
}

class HumanWorker2 implements IWorker2, Eater2 {
  work() {}
  eat() {}
}

class RobotWorker2 implements IWorker2 {
  work() {}
}
