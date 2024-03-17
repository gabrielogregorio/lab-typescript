function Logger(target: any) {
  console.log('log item', target);
}

@Logger
class Foo {}

function log2(prefix: any, prefix2: any) {
  return (target: any) => {
    console.log(`${prefix} - ${prefix2} - ${target}`);
  };
}

@log2('my text', 'text2')
class Foo2 {}
