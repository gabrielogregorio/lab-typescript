class Movie {
  /**
   *
   * @param {String} title nome do filme
   * @param {Array} director director que fizeram o filme
   * @param {Array} actors actors que fizeram o filme
   * @param {Int} duration Minutos que o filme dura
   */
  title: string;
  director: string[];
  actors: string[];
  duration: number;
  constructor(title: string, director: string[], actors: string[], duration: number) {
    this.title = title;
    this.director = director;
    this.actors = actors;
    this.duration = duration;
  }

  reproduzir() {
    console.log('Reproduzindo...');
  }

  pausar() {
    console.log('Reproduzindo...');
  }

  ficha() {
    console.log('==================== FILME ===================');
    console.log('| title      :  ' + this.title);
    console.log('| Diretóres  :  ' + this.director.toString());
    console.log('| actors     :  ' + this.actors.toString());
    console.log('| duration   :  ' + this.duration.toString());
    console.log('==============================================');
  }
}

var movie = new Movie(
  'SpiderMan, sem casa para voltar',
  ['Cristopher Nolan'],
  ['Tom Roland', 'Cristina Aguilera'],
  307,
);

movie.reproduzir();
movie.ficha();
