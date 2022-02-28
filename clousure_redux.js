const testa = (() => {
  console.log('já cria, executa e atribui');
})();

let funcao = () => {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: () => {
      changeBy(1);
    },
    decrement: () => {
      changeBy(-1);
    },
    value: () => {
      return privateCounter;
    },
  };
};

const Counter = funcao();

console.log(Counter.value()); /* console.logs 0 */
Counter.increment();
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* console.logs 2 */
Counter.decrement();
console.log(Counter.value()); /* console.logs 1 */
