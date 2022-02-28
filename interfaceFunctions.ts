interface FuncaoCalculo {
  (a: number, b: number): number;
}

let testes: FuncaoCalculo;

testes = function (n1: number, n2: number): number {
  return n1 + n2;
};

console.log(testes(10, 20));
