// ====================

// 5. DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)

// bad
class HardDrive {
  read(lba: number, size: number): void {}
}

class Computer {
  private hardDrive: HardDrive;

  constructor() {
    this.hardDrive = new HardDrive();
  }

  boot() {
    this.hardDrive.read(0, 1024);
  }
}

// good
interface StorageDevice {
  read(lba: number, size: number): void;
}

// Details must depend on abstractions.
class HardDrive2 implements StorageDevice {
  read(lba: number, size: number): void {}
}

// Details must depend on abstractions.
class Ssd implements StorageDevice {
  read(lba: number, size: number): void {}
}
// High-level modules should not depend on low-level modules.
// Both must depend on abstractions.
// Abstractions should not depend on details.
class Computer2 {
  private storageDevice: StorageDevice; // Computer depends on the StorageDevice abstraction

  constructor(storageDevice: StorageDevice) {
    this.storageDevice = storageDevice;
  }

  boot() {
    this.storageDevice.read(0, 1024);
  }
}

const hd = new HardDrive2();
const ssd = new Ssd();

const computerWithHd = new Computer2(hd);
computerWithHd.boot();

const computerWithSsd = new Computer2(ssd);
computerWithSsd.boot();

// or another example
interface IUserRepository {}

class MyService {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  example() {
    this.userRepository;
  }
}
