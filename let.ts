let firstName = 'Universal'; // local scope, global scope and block scope
var lastName = 'Studios'; // local scope and global scope, this ignore blocks

function testScopeFunctions() {
  console.log(firstName); // global scope
  console.log(lastName); // global scope

  var localScope = ''; // local Scope
  let testGlobalScope = ''; // local scope
}
testScopeFunctions();

if (true) {
  let existsInBlock = ''; // local scope, and block scope

  var existsOutsideBlock = 'Marvel'; // local scope and global scope
}

console.log(existsOutsideBlock);
