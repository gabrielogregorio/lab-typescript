let dynamic;

console.time('object');
let object: any = {};
for (let x = 1; x < 5000000; x += 1) {
  object[x.toString()] = `value ${x}`;
}
console.timeEnd('object');

console.time('map');
let map = new Map();
for (let y = 1; y < 5000000; y += 1) {
  map.set(y.toString(), `value ${y}`);
}
console.timeEnd('map');

console.log('--------------------');

console.time('object-get');
for (let x = 1; x < 5000000; x += 1) {
  dynamic = object[x.toString()];
}
console.timeEnd('object-get');

console.time('map-get');
for (let y = 1; y < 5000000; y += 1) {
  dynamic = map.get(y.toString());
}
console.timeEnd('map-get');

// with number index
//object: 736.025ms
//map: 2.540s
//--------------------
//object-get: 3.291ms
//map-get: 234.455ms

// if text index

//object: 796.222ms
//map: 1.456s
//--------------------
//object-get: 126.915ms
//map-get: 103.333ms
