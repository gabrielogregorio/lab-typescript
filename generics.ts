export const sumFunction = <InputType>(value1: InputType): InputType => {
  return value1;
};

console.log(sumFunction<number>(1));
console.log(sumFunction<string>('1'));
console.log(sumFunction<boolean>(false));
