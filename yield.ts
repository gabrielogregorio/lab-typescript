function* process() {
  let id = 0;
  while (true) {
    id += 1;
    yield `process is ${id}`;
  }
}

const generator = process();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
