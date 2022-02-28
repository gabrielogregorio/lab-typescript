function sendMailPromise(body: string, to: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Email send to ${to}!`);
      // reject("Deu erro!");
    }, 4000);
  });
}

sendMailPromise('body of e-mail', 'email@email.com')
  .then((response: string) => {
    console.log(`msg: ${response}`);
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  })
  .finally(() => {
    console.log('finally');
  });

console.log('last line');
