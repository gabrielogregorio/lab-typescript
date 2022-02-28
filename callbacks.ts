type callbackData = {
  numeroEnviados: number;
  outraCoisa: number;
  deuErro: boolean;
};

function sendMail(body: string, callback: (data: callbackData) => void) {
  setTimeout(() => {
    const numeroEnviados: number = 7;
    const outraCoisa: number = 1000;
    const deuErro: boolean = false;
    callback({ numeroEnviados, outraCoisa, deuErro });
  }, 2000);
}

sendMail('body request', ({ numeroEnviados, deuErro }) => {
  if (!deuErro) {
    console.log(`Success, send to: ${numeroEnviados} `);
  } else {
    console.log('Ops, one or more erros');
  }
});

console.log('Resposta avisando que o email será enviado!');
