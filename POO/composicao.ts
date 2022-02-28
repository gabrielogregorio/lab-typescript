class Escritor {
  Escrever(arquivo: string, conteudo: string) {
    console.log(`Escrevendo conteudo "${conteudo}" no arquivo "${arquivo}"`);
  }
}

class Criador {
  Criar(arquivo: string) {
    console.log(`Arquivo "${arquivo}" criado!`);
  }
}

class CriadorPdf {
  Criar(arquivo: string) {
    console.log(`Criando PDF "${arquivo}" `);
  }
}

class ManipuladorNormal {
  arquivo: string;
  escritor: any;
  criador: any;
  constructor(arquivo: string) {
    this.arquivo = arquivo;
    this.escritor = new Escritor();
    this.criador = new Criador();
  }
  salvarEscrever(content: string) {
    this.criador.Criar(this.arquivo);
    this.escritor.Escrever(this.arquivo, content);
  }
}

class ManipuladorUsuarios {
  arquivo: string;
  escritor: any;
  criador: any;

  constructor(arquivo: string) {
    this.arquivo = arquivo;
    this.escritor = new Escritor();
    this.criador = new CriadorPdf();
  }
  salvarEscrever(lista: string) {
    this.criador.Criar(this.arquivo);
    this.escritor.Escrever(this.arquivo, lista);
  }
}

var m = new ManipuladorNormal('arquivo.txt');
m.escritor.Escrever('olámundo,txt', 'texto do arquivo');
m.salvarEscrever('item1, item2, item3');

console.log();

var m2 = new ManipuladorUsuarios('arquivo.pdf');
m2.escritor.Escrever('olámundo,pdf', 'texto do arquivo');
m2.salvarEscrever('item1, item2, item3');
