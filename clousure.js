function myFunction() {
  function addNumber(value) {
    return 10 + value;
  }

  return {
    addNumber2() {
      return addNumber(2);
    },
    addNumber5() {
      return addNumber(5);
    },
  };
}

let func = myFunction();
console.log(func.addNumber2());
console.log(func.addNumber5());

// ---------------

function showName(name) {
  return function () {
    console.log(name, 'ITEM');
  };
}

function init(nome) {
  setTimeout(showName(nome), 1000);
}

init('Gabriel1');

// -------------

function makeAdded(x) {
  return function (y) {
    return x + y;
  };
}

let add5 = makeAdded(5);
let add10 = makeAdded(10);

console.log(add5(10));
console.log(add10(10));
