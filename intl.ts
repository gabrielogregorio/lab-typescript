function unitValueToBrl(number: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

console.log(unitValueToBrl(1));
console.log(unitValueToBrl(12));
console.log(unitValueToBrl(123));
console.log(unitValueToBrl(1234));
console.log(unitValueToBrl(12345));
console.log(unitValueToBrl(123456));
console.log(unitValueToBrl(1234567));
console.log(unitValueToBrl(12345678));

console.log('-----------------');

function hundredNumberToBrl(number: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number);
}

console.log(hundredNumberToBrl(1));
console.log(hundredNumberToBrl(12));
console.log(hundredNumberToBrl(123));
console.log(hundredNumberToBrl(1234));
console.log(hundredNumberToBrl(12345));
console.log(hundredNumberToBrl(123456));
console.log(hundredNumberToBrl(1234567));
console.log(hundredNumberToBrl(12345678));

console.log('-------------------');

console.log(hundredNumberToBrl(10.1));
console.log(hundredNumberToBrl(10.2));
console.log(hundredNumberToBrl(10.28));
console.log(hundredNumberToBrl(10.289));
console.log(hundredNumberToBrl(0.289));
