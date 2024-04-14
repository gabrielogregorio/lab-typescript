SOLID - Acrônomo para...

# S - SRP - Single Responsibility principle

Uma classe deve ter apenas uma responsabilidade, ela não pode fazer coisas além do motivo dela ter sido criado.

Ela deve ter apenas um motivo para mudar.

```ts
// wrong
interface IExample {
  connect: () => void;
  getExample: () => void;
  createExample: () => void;
  createCategory: () => void;
}

class Example implements IExample {}
```

# O - OCP - Open-Closed Principle

```ts
// cada item adiciona um if, ela está injeçada tem que modificar
// essa classe
class Video {
  calculateInterest(type: 'movie' | 'tv') {
    if (type === 'movie ') {
      //calculate
    } else if (type === 'tv') {
      //
    }
  }
}

// abrir para extensão
abstract class Video2 {
  // abstract não pode ser instanciada
  abstract calculateInterest();
}

class Movie extends Video2 {
  public calculateInterest() {}
}

class Tv extends Video2 {
  public calculateInterest() {}
}
```

# L - LSP - Liskov Substitution Principle (Barbara Liskov)

- Superclases pode ser substituida por suas subclasses (Filho pode substituir pai).
X classe pai - superclasse
y classe filha e extende da X - subclasse

classe X está sendo chamada no programa
você poder substituir a classe X pela Y sem mudar nada.

```ts
class Movie {
  play(){ }
  increaseVolume() {}
}

class Example extends Movie {}

// LSP
const movie = new Movie()

diz que eu posso substituir por
const movie2 = new Example()

// EXAMPLE É UM MOVIE!!!!
// sem erros ou problemas, tudo deve continuar funcionando
//  Exemplo de implementação que VIOLA ISSO
class Example extends Movie {
  play(): void {
    throw new Error('THIS VIOLATES LSP')
  }
}
```

# I - ISP = Interface Segregation Principle

- uma classe não é obrigada a implementar interfaces que ela não utilizará.

se você implementa uma interface, você terá que usar esses métodos.

Se você não precisar, CRIE UMA INTERFACE SÓ COM ESSE MÉTODO (SEGREGUE)

```ts
interface Movie {
  play: () => void;
  increaseVolume: () => void;
}

// ok
class Example implements Movie {
  play: () => void;
  increaseVolume: () => void;
}

// but - this example dont use increaseVolume
class Example2 implements Movie {
  play: () => void;
}

// precisa de SEGREGAR essa interface

interface MovieFixed {
  play: () => void;
}

interface AudioControlFixed {
  increaseVolume: () => void;
}

// ok
class ExampleFixed implements MovieFixed, AudioControlFixed {
  play: () => void;
  increaseVolume: () => void;
}

// but - this example dont use increaseVolume
class Example2Fixed implements MovieFixed {
  play: () => void;
}
```

# D - DIP = Dependency Inversion Principle
- você deve depender de abstrações(é um modelo, uma interface) e não de implementações(é o new Class).

```ts
class DramaCategoryWrong {}

// em ambos os casos, Movie está dependendo de drama
// dependendo da implementação da classe DramaCategoryWrong
// depende da implementação
class MovieWrong {
    category: DramaCategoryWrong
    setCategory(item: DramaCategoryWrong) {
        this.category = item
    } // cria acoplamento
}

class MovieWrong2 {
    getCategory() {
        return new DramaCategoryWrong()
    }
}

// How fix?

interface Category {}

class DramaFixed implements Category {}

class MovieFixed {
    category: Category
    // agora depende da interface Category
    constructor(category: Category) {
        this.category = category
    }

    // or
    setCategory(category: Category) {
        this.category = category
    }
}

const movie = new MovieFixed(new DramaFixed())
// agora o controle da dependencia inverteu, a classe "MovieFixed" não depende mais de outra classe
// MovieFixed depende de Category, não mais de Drama
// se vc tem um objeto e alguém da um new, deve ter algo errado ai, manda para o setter ou constructor e dependendo da abstração  (interface) e não da classe instancida
// você pode usar containers de dependencias para fazer isso
```

