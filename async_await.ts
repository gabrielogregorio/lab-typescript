function simulatedAsyncAwait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 4000);
  });
}

async function main() {
  try {
    let message = await simulatedAsyncAwait();
    console.log(message);
  } catch (error) {
    console.log('Error');
  }
}

main();
