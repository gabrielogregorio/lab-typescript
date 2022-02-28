class Calculator {
  sum(x: number, y: number) {
    return x + y;
  }

  static multiply(x: number, y: number) {
    return x * y;
  }
}

const calculator = new Calculator();
console.log(calculator.sum(10, 20));
console.log(Calculator.multiply(10, 20));
